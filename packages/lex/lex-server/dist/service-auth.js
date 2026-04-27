"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceAuth = serviceAuth;
exports.isPayloadObject = isPayloadObject;
const tslib_1 = require("tslib");
const crypto = tslib_1.__importStar(require("@atproto/crypto"));
const did_1 = require("@atproto/did");
const lex_data_1 = require("@atproto/lex-data");
const lex_schema_1 = require("@atproto/lex-schema");
const did_resolver_1 = require("@atproto-labs/did-resolver");
const errors_js_1 = require("./errors.js");
const BEARER_PREFIX = 'Bearer ';
/**
 * Creates an authentication handler for verifying AT Protocol service auth JWTs.
 *
 * Service auth is the standard authentication mechanism for server-to-server
 * communication in the AT Protocol. It uses JWT bearer tokens signed by the
 * caller's DID signing key, with the signature verified against the public
 * key in the caller's DID document.
 *
 * The handler performs the following validations:
 * - Extracts and parses the Bearer token from the Authorization header
 * - Validates JWT structure and claims (aud, exp, iat, lxm, nonce)
 * - Resolves the issuer's DID document
 * - Verifies the JWT signature against the `#atproto` verification method
 * - Checks nonce uniqueness to prevent replay attacks
 *
 * @param options - Configuration options for service auth
 * @returns An auth handler function for use with {@link LexRouter.add}
 *
 * @example Basic usage
 * ```typescript
 * import { LexRouter, serviceAuth } from '@atproto/lex-server'
 *
 * const router = new LexRouter()
 *
 * const auth = serviceAuth({
 *   audience: 'did:web:api.example.com',
 *   unique: async (nonce) => {
 *     // Check if nonce has been seen, return true if unique
 *     const isNew = await redis.setnx(`nonce:${nonce}`, '1')
 *     if (isNew) await redis.expire(`nonce:${nonce}`, 600)
 *     return isNew
 *   }
 * })
 *
 * router.add(myMethod, {
 *   handler: async (ctx) => {
 *     console.log('Authenticated as:', ctx.credentials.did)
 *     return { body: { success: true } }
 *   },
 *   auth
 * })
 * ```
 */
function serviceAuth({ audience, maxAge = 5 * 60, unique, ...options }) {
    const didResolver = (0, did_resolver_1.createDidResolver)(options);
    return async ({ request, method }) => {
        const { signal } = request;
        const jwt = await parseJwtBearer(request, {
            lxm: method.nsid,
            maxAge,
            audience,
            unique,
        });
        let didDocument = await didResolver
            .resolve(jwt.payload.iss, { signal })
            .catch((cause) => {
            throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Could not resolve DID document', { Bearer: { error: 'DidResolutionFailed' } }, { cause });
        });
        const key = getAtprotoSigningKey(didDocument);
        if (!key || !(await verifyJwt(jwt, key))) {
            signal.throwIfAborted();
            // Try refreshing the DID document in case it was updated
            didDocument = await didResolver
                .resolve(jwt.payload.iss, { signal, noCache: true })
                .catch((cause) => {
                throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Could not resolve DID document', { Bearer: { error: 'DidResolutionFailed' } }, { cause });
            });
            // Verify again with the fresh key (if it changed)
            const keyFresh = getAtprotoSigningKey(didDocument);
            if (!keyFresh || key === keyFresh || !(await verifyJwt(jwt, keyFresh))) {
                throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Invalid JWT signature', { Bearer: { error: 'BadJwtSignature' } });
            }
        }
        return {
            did: didDocument.id,
            didDocument,
            jwt,
        };
    };
}
async function verifyJwt(jwt, key) {
    try {
        return await crypto.verifySignature(key, jwt.message, jwt.signature, {
            jwtAlg: jwt.header.alg,
            allowMalleableSig: true,
        });
    }
    catch (cause) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Could not verify JWT signature', { Bearer: { error: 'BadJwtSignature' } }, { cause });
    }
}
function getAtprotoSigningKey(didDocument) {
    try {
        const key = didDocument.verificationMethod?.find(isAtprotoVerificationMethod, didDocument);
        if (key?.publicKeyMultibase) {
            if (key.type === 'EcdsaSecp256r1VerificationKey2019') {
                const keyBytes = crypto.multibaseToBytes(key.publicKeyMultibase);
                return crypto.formatDidKey(crypto.P256_JWT_ALG, keyBytes);
            }
            else if (key.type === 'EcdsaSecp256k1VerificationKey2019') {
                const keyBytes = crypto.multibaseToBytes(key.publicKeyMultibase);
                return crypto.formatDidKey(crypto.SECP256K1_JWT_ALG, keyBytes);
            }
            else if (key.type === 'Multikey') {
                const parsed = crypto.parseMultikey(key.publicKeyMultibase);
                return crypto.formatDidKey(parsed.jwtAlg, parsed.keyBytes);
            }
        }
    }
    catch {
        // Invalid key, ignore
    }
    return null;
}
function isAtprotoVerificationMethod(vm) {
    return typeof vm === 'object' && (0, did_1.matchesIdentifier)(this.id, 'atproto', vm.id);
}
async function parseJwtBearer(request, options) {
    const authorization = request.headers.get('authorization');
    if (!authorization?.startsWith(BEARER_PREFIX)) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Bearer token required', { Bearer: { error: 'MissingBearer' } });
    }
    const token = authorization.slice(BEARER_PREFIX.length).trim();
    return parseJwt(token, options);
}
async function parseJwt(token, options) {
    const { length, 0: headerB64, 1: payloadB64, 2: signatureB64, } = token.split('.');
    if (length !== 3) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Invalid JWT token', { Bearer: { error: 'BadJwt' } });
    }
    let header;
    try {
        header = jsonFromBase64(headerB64, isHeaderObject);
    }
    catch (cause) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Invalid JWT token', { Bearer: { error: 'BadJwt' } }, { cause });
    }
    if (header.alg === 'none' ||
        // service tokens are not OAuth 2.0 access tokens
        // https://datatracker.ietf.org/doc/html/rfc9068
        header.typ === 'at+jwt' ||
        // "refresh+jwt" is a non-standard type used by the @atproto packages
        header.typ === 'refresh+jwt' ||
        // "DPoP" proofs are not meant to be used as service tokens
        // https://datatracker.ietf.org/doc/html/rfc9449
        header.typ === 'dpop+jwt') {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Invalid JWT token', { Bearer: { error: 'BadJwt' } });
    }
    let payload;
    try {
        payload = jsonFromBase64(payloadB64, isPayloadObject);
    }
    catch (cause) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Invalid JWT token', { Bearer: { error: 'BadJwt' } }, { cause });
    }
    if (options.audience !== null && options.audience !== payload.aud) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Invalid audience', {
            Bearer: { error: 'InvalidAudience' },
        });
    }
    const now = Math.floor(Date.now() / 1000);
    if (payload.nbf != null && now < payload.nbf) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'JWT token not yet valid', { Bearer: { error: 'JwtNotYetValid' } });
    }
    if (now > payload.exp) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'JWT token expired', { Bearer: { error: 'JwtExpired' } });
    }
    // Prevent issuer from generating very long-lived tokens
    if (timeDiff(now, payload.exp) > options.maxAge ||
        timeDiff(now, payload.iat) > options.maxAge) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'JWT token too old', { Bearer: { error: 'JwtTooOld' } });
    }
    if (payload.lxm != null && typeof payload.lxm !== options.lxm) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Invalid JWT lexicon method ("lxm")', { Bearer: { error: 'BadJwtLexiconMethod' } });
    }
    if (payload.nonce != null && !(await (0, options.unique)(payload.nonce))) {
        throw new errors_js_1.LexServerAuthError('AuthenticationRequired', 'Replay attack detected: nonce is not unique', { Bearer: { error: 'NonceNotUnique' } });
    }
    return {
        header,
        payload,
        message: textEncoder.encode(`${headerB64}.${payloadB64}`),
        signature: (0, lex_data_1.fromBase64)(signatureB64, 'base64url'),
    };
}
const textEncoder = /*#__PURE__*/ new TextEncoder();
function isHeaderObject(obj) {
    return ((0, lex_data_1.isPlainObject)(obj) &&
        typeof obj.alg === 'string' &&
        (obj.typ === undefined || typeof obj.typ === 'string'));
}
function isPayloadObject(obj) {
    return ((0, lex_data_1.isPlainObject)(obj) &&
        typeof obj.iss === 'string' &&
        typeof obj.aud === 'string' &&
        (obj.lxm === undefined || typeof obj.lxm === 'string') &&
        (obj.nonce === undefined || typeof obj.nonce === 'string') &&
        (obj.iat === undefined || isPositiveInt(obj.iat)) &&
        (obj.nbf === undefined || isPositiveInt(obj.nbf)) &&
        isPositiveInt(obj.exp) &&
        (0, lex_schema_1.isDidString)(obj.iss) &&
        (0, lex_schema_1.isDidString)(obj.aud));
}
function timeDiff(t1, t2) {
    if (t2 === undefined)
        return 0;
    return Math.abs(t1 - t2);
}
function isPositiveInt(value) {
    return typeof value === 'number' && Number.isInteger(value) && value > 0;
}
function jsonFromBase64(b64, isType) {
    const obj = JSON.parse((0, lex_data_1.utf8FromBase64)(b64, 'base64url'));
    if (isType(obj))
        return obj;
    throw new Error('Invalid type');
}
//# sourceMappingURL=service-auth.js.map