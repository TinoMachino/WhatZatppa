"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DpopManager = exports.dpopManagerOptionsSchema = exports.DpopNonce = void 0;
const node_crypto_1 = require("node:crypto");
const jose_1 = require("jose");
const zod_1 = require("zod");
const jwk_1 = require("@atproto/jwk");
const constants_js_1 = require("../constants.js");
const invalid_dpop_proof_error_js_1 = require("../errors/invalid-dpop-proof-error.js");
const use_dpop_nonce_error_js_1 = require("../errors/use-dpop-nonce-error.js");
const cast_js_1 = require("../lib/util/cast.js");
const dpop_nonce_js_1 = require("./dpop-nonce.js");
Object.defineProperty(exports, "DpopNonce", { enumerable: true, get: function () { return dpop_nonce_js_1.DpopNonce; } });
const { JOSEError } = jose_1.errors;
exports.dpopManagerOptionsSchema = zod_1.z.object({
    /**
     * Set this to `false` to disable the use of nonces in DPoP proofs. Set this
     * to a secret Uint8Array or hex encoded string to use a predictable seed for
     * all nonces (typically useful when multiple instances are running). Leave
     * undefined to generate a random seed at startup.
     */
    dpopSecret: zod_1.z.union([zod_1.z.literal(false), dpop_nonce_js_1.dpopSecretSchema]).optional(),
    dpopRotationInterval: dpop_nonce_js_1.rotationIntervalSchema.optional(),
});
class DpopManager {
    dpopNonce;
    constructor(options = {}) {
        const { dpopSecret, dpopRotationInterval } = exports.dpopManagerOptionsSchema.parse(options);
        this.dpopNonce =
            dpopSecret === false
                ? undefined
                : new dpop_nonce_js_1.DpopNonce(dpopSecret, dpopRotationInterval);
    }
    nextNonce() {
        return this.dpopNonce?.next();
    }
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc9449#section-4.3}
     */
    async checkProof(httpMethod, httpUrl, httpHeaders, accessToken) {
        // Fool proofing against use of empty string
        if (!httpMethod) {
            throw new TypeError('HTTP method is required');
        }
        const proof = extractProof(httpHeaders);
        if (!proof)
            return null;
        const { protectedHeader, payload } = await (0, jose_1.jwtVerify)(proof, jose_1.EmbeddedJWK, {
            typ: 'dpop+jwt',
            maxTokenAge: 10, // Will ensure presence & validity of "iat" claim
            clockTolerance: constants_js_1.DPOP_NONCE_MAX_AGE / 1e3,
        }).catch((err) => {
            throw wrapInvalidDpopProofError(err, 'Failed to verify DPoP proof');
        });
        // @NOTE For legacy & backwards compatibility reason, we cannot use
        // `jwtPayloadSchema` here as it will reject DPoP proofs containing a query
        // or fragment component in the "htu" claim.
        // const { ath, htm, htu, jti, nonce } = await jwtPayloadSchema
        //   .parseAsync(payload)
        //   .catch((err) => {
        //     throw buildInvalidDpopProofError('Invalid DPoP proof', err)
        //   })
        // @TODO Uncomment previous lines (and remove redundant checks bellow) once
        // we decide to drop legacy support.
        const { ath, htm, htu, jti, nonce } = payload;
        if (nonce !== undefined && typeof nonce !== 'string') {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('Invalid DPoP "nonce" type');
        }
        if (!jti || typeof jti !== 'string') {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "jti" missing');
        }
        // Note rfc9110#section-9.1 states that the method name is case-sensitive
        if (!htm || htm !== httpMethod) {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "htm" mismatch');
        }
        if (!htu || typeof htu !== 'string') {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('Invalid DPoP "htu" type');
        }
        // > To reduce the likelihood of false negatives, servers SHOULD employ
        // > syntax-based normalization (Section 6.2.2 of [RFC3986]) and
        // > scheme-based normalization (Section 6.2.3 of [RFC3986]) before
        // > comparing the htu claim.
        //
        // RFC9449 section 4.3. Checking DPoP Proofs - https://datatracker.ietf.org/doc/html/rfc9449#section-4.3
        if (!htu || parseHtu(htu) !== normalizeHtuUrl(httpUrl)) {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "htu" mismatch');
        }
        if (!nonce && this.dpopNonce) {
            throw new use_dpop_nonce_error_js_1.UseDpopNonceError();
        }
        if (nonce && !this.dpopNonce?.check(nonce)) {
            throw new use_dpop_nonce_error_js_1.UseDpopNonceError('DPoP "nonce" mismatch');
        }
        if (accessToken) {
            const accessTokenHash = (0, node_crypto_1.createHash)('sha256').update(accessToken).digest();
            if (ath !== accessTokenHash.toString('base64url')) {
                throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "ath" mismatch');
            }
        }
        else if (ath !== undefined) {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "ath" claim not allowed');
        }
        // @NOTE we can assert there is a jwk because the jwtVerify used the
        // EmbeddedJWK key getter mechanism.
        const jwk = protectedHeader.jwk;
        const jkt = await (0, jose_1.calculateJwkThumbprint)(jwk, 'sha256').catch((err) => {
            throw wrapInvalidDpopProofError(err, 'Failed to calculate jkt');
        });
        // @NOTE We freeze the proof to prevent accidental modification (esp. from
        // hooks).
        return Object.freeze({ jti, jkt, htm, htu });
    }
}
exports.DpopManager = DpopManager;
function extractProof(httpHeaders) {
    const dpopHeader = httpHeaders['dpop'];
    switch (typeof dpopHeader) {
        case 'string':
            if (dpopHeader)
                return dpopHeader;
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP header cannot be empty');
        case 'object':
            // @NOTE the "0" case should never happen a node.js HTTP server will only
            // return an array if the header is set multiple times.
            if (dpopHeader.length === 1 && dpopHeader[0])
                return dpopHeader[0];
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP header must contain a single proof');
        default:
            return null;
    }
}
/**
 * Constructs the HTTP URI (htu) claim as defined in RFC9449.
 *
 * The htu claim is the normalized URL of the HTTP request, excluding the query
 * string and fragment. This function ensures that the URL is normalized by
 * removing the search and hash components, as well as by using an URL object to
 * simplify the pathname (e.g. removing dot segments).
 *
 * @returns The normalized URL as a string.
 * @see {@link https://datatracker.ietf.org/doc/html/rfc9449#section-4.3}
 */
function normalizeHtuUrl(url) {
    // NodeJS's `URL` normalizes the pathname, so we can just use that.
    return url.origin + url.pathname;
}
function parseHtu(htu) {
    const url = (0, cast_js_1.ifURL)(htu);
    if (!url) {
        throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "htu" is not a valid URL');
    }
    // @NOTE the checks bellow can be removed once once jwtPayloadSchema is used
    // to validate the DPoP proof payload as it already performs these checks
    // (though the htuSchema).
    if (url.password || url.username) {
        throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "htu" must not contain credentials');
    }
    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP "htu" must be http or https');
    }
    // @NOTE For legacy & backwards compatibility reason, we allow a query and
    // fragment in the DPoP proof's htu. This is not a standard behavior as the
    // htu is not supposed to contain query or fragment.
    // NodeJS's `URL` normalizes the pathname.
    return normalizeHtuUrl(url);
}
function wrapInvalidDpopProofError(err, title) {
    const msg = err instanceof JOSEError || err instanceof jwk_1.ValidationError
        ? `${title}: ${err.message}`
        : title;
    return new invalid_dpop_proof_error_js_1.InvalidDpopProofError(msg, err);
}
//# sourceMappingURL=dpop-manager.js.map