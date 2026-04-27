"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoVerifySignatureWithKey = exports.verifyJwt = exports.createServiceAuthHeaders = exports.createServiceJwt = void 0;
const common = __importStar(require("@atproto/common"));
const common_1 = require("@atproto/common");
const crypto = __importStar(require("@atproto/crypto"));
const lex_schema_1 = require("@atproto/lex-schema");
const errors_1 = require("./errors");
const createServiceJwt = async (params) => {
    const { iss, aud, keypair } = params;
    const iat = params.iat ?? Math.floor(Date.now() / 1e3);
    const exp = params.exp ?? iat + common_1.MINUTE / 1e3;
    const lxm = params.lxm ?? undefined;
    const jti = await crypto.randomStr(16, 'hex');
    const header = {
        typ: 'JWT',
        alg: keypair.jwtAlg,
    };
    const payload = common.noUndefinedVals({
        iat,
        iss,
        aud,
        exp,
        lxm,
        jti,
    });
    const toSignStr = `${jsonToB64Url(header)}.${jsonToB64Url(payload)}`;
    const toSign = Buffer.from(toSignStr, 'utf8');
    const sig = Buffer.from(await keypair.sign(toSign));
    return `${toSignStr}.${sig.toString('base64url')}`;
};
exports.createServiceJwt = createServiceJwt;
const createServiceAuthHeaders = async (params) => {
    const jwt = await (0, exports.createServiceJwt)(params);
    return {
        headers: { authorization: `Bearer ${jwt}` },
    };
};
exports.createServiceAuthHeaders = createServiceAuthHeaders;
const jsonToB64Url = (json) => {
    return Buffer.from(JSON.stringify(json)).toString('base64url');
};
const verifyJwt = async (jwtStr, ownDid, // null indicates to skip the audience check
lxm, // null indicates to skip the lxm check
getSigningKey, verifySignatureWithKey = exports.cryptoVerifySignatureWithKey) => {
    const parts = jwtStr.split('.');
    if (parts.length !== 3) {
        throw new errors_1.AuthRequiredError('poorly formatted jwt', 'BadJwt');
    }
    const header = parseHeader(parts[0]);
    // The spec does not describe what to do with the "typ" claim. We can,
    // however, forbid some values that are not compatible with our use case.
    if (
    // service tokens are not OAuth 2.0 access tokens
    // https://datatracker.ietf.org/doc/html/rfc9068
    header['typ'] === 'at+jwt' ||
        // "refresh+jwt" is a non-standard type used by the @atproto packages
        header['typ'] === 'refresh+jwt' ||
        // "DPoP" proofs are not meant to be used as service tokens
        // https://datatracker.ietf.org/doc/html/rfc9449
        header['typ'] === 'dpop+jwt') {
        throw new errors_1.AuthRequiredError(`Invalid jwt type "${header['typ']}"`, 'BadJwtType');
    }
    const payload = parsePayload(parts[1]);
    const sig = parts[2];
    if (Date.now() / 1000 > payload.exp) {
        throw new errors_1.AuthRequiredError('jwt expired', 'JwtExpired');
    }
    if (ownDid !== null && payload.aud !== ownDid) {
        throw new errors_1.AuthRequiredError('jwt audience does not match service did', 'BadJwtAudience');
    }
    if (lxm !== null && payload.lxm !== lxm) {
        throw new errors_1.AuthRequiredError(payload.lxm !== undefined
            ? `bad jwt lexicon method ("lxm"). must match: ${lxm}`
            : `missing jwt lexicon method ("lxm"). must match: ${lxm}`, 'BadJwtLexiconMethod');
    }
    if (!payload.iss || !isDidStringOrService(payload.iss)) {
        throw new errors_1.AuthRequiredError('jwt iss is not a valid did', 'BadJwtIss');
    }
    const msgBytes = Buffer.from(parts.slice(0, 2).join('.'), 'utf8');
    const sigBytes = Buffer.from(sig, 'base64url');
    const signingKey = await getSigningKey(payload.iss, false);
    const { alg } = header;
    let validSig;
    try {
        validSig = await verifySignatureWithKey(signingKey, msgBytes, sigBytes, alg);
    }
    catch (err) {
        throw new errors_1.AuthRequiredError('could not verify jwt signature', 'BadJwtSignature');
    }
    if (!validSig) {
        // get fresh signing key in case it failed due to a recent rotation
        const freshSigningKey = await getSigningKey(payload.iss, true);
        try {
            validSig =
                freshSigningKey !== signingKey
                    ? await verifySignatureWithKey(freshSigningKey, msgBytes, sigBytes, alg)
                    : false;
        }
        catch (err) {
            throw new errors_1.AuthRequiredError('could not verify jwt signature', 'BadJwtSignature');
        }
    }
    if (!validSig) {
        throw new errors_1.AuthRequiredError('jwt signature does not match jwt issuer', 'BadJwtSignature');
    }
    return payload;
};
exports.verifyJwt = verifyJwt;
const cryptoVerifySignatureWithKey = async (key, msgBytes, sigBytes, alg) => {
    return crypto.verifySignature(key, msgBytes, sigBytes, {
        jwtAlg: alg,
        allowMalleableSig: true,
    });
};
exports.cryptoVerifySignatureWithKey = cryptoVerifySignatureWithKey;
const parseB64UrlToJson = (b64) => {
    return JSON.parse(Buffer.from(b64, 'base64url').toString('utf8'));
};
const parseHeader = (b64) => {
    const header = parseB64UrlToJson(b64);
    if (!header || typeof header !== 'object' || typeof header.alg !== 'string') {
        throw new errors_1.AuthRequiredError('poorly formatted jwt', 'BadJwt');
    }
    return header;
};
const parsePayload = (b64) => {
    const payload = parseB64UrlToJson(b64);
    if (!payload ||
        typeof payload !== 'object' ||
        typeof payload.iss !== 'string' ||
        typeof payload.aud !== 'string' ||
        typeof payload.exp !== 'number' ||
        (payload.lxm && typeof payload.lxm !== 'string') ||
        (payload.nonce && typeof payload.nonce !== 'string')) {
        throw new errors_1.AuthRequiredError('poorly formatted jwt', 'BadJwt');
    }
    return payload;
};
function isDidStringOrService(value) {
    const hashIdx = value.indexOf('#');
    if (hashIdx === -1) {
        return (0, lex_schema_1.isDidString)(value);
    }
    // basic validation of the fragment part
    const fragmentLen = value.length - hashIdx - 1;
    if (fragmentLen < 1 || value.includes('#', hashIdx + 1)) {
        return false;
    }
    // Validate the did part
    const didPart = value.slice(0, hashIdx);
    return (0, lex_schema_1.isDidString)(didPart);
}
//# sourceMappingURL=auth.js.map