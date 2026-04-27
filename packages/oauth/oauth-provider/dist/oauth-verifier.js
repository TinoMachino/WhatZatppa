"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthVerifier = exports.Keyset = exports.Key = exports.DpopNonce = void 0;
const jwk_1 = require("@atproto/jwk");
Object.defineProperty(exports, "Key", { enumerable: true, get: function () { return jwk_1.Key; } });
Object.defineProperty(exports, "Keyset", { enumerable: true, get: function () { return jwk_1.Keyset; } });
const oauth_types_1 = require("@atproto/oauth-types");
const dpop_manager_js_1 = require("./dpop/dpop-manager.js");
const dpop_nonce_js_1 = require("./dpop/dpop-nonce.js");
Object.defineProperty(exports, "DpopNonce", { enumerable: true, get: function () { return dpop_nonce_js_1.DpopNonce; } });
const invalid_dpop_key_binding_error_js_1 = require("./errors/invalid-dpop-key-binding-error.js");
const invalid_dpop_proof_error_js_1 = require("./errors/invalid-dpop-proof-error.js");
const invalid_token_error_js_1 = require("./errors/invalid-token-error.js");
const use_dpop_nonce_error_js_1 = require("./errors/use-dpop-nonce-error.js");
const www_authenticate_error_js_1 = require("./errors/www-authenticate-error.js");
const authorization_header_js_1 = require("./lib/util/authorization-header.js");
const function_js_1 = require("./lib/util/function.js");
const replay_manager_js_1 = require("./replay/replay-manager.js");
const replay_store_memory_js_1 = require("./replay/replay-store-memory.js");
const replay_store_redis_js_1 = require("./replay/replay-store-redis.js");
const signer_js_1 = require("./signer/signer.js");
class OAuthVerifier {
    onDecodeToken;
    issuer;
    keyset;
    dpopManager;
    replayManager;
    signer;
    constructor({ redis, issuer, keyset, replayStore = redis != null
        ? new replay_store_redis_js_1.ReplayStoreRedis({ redis })
        : new replay_store_memory_js_1.ReplayStoreMemory(), onDecodeToken, ...rest }) {
        const dpopMgrOptions = rest;
        const issuerParsed = oauth_types_1.oauthIssuerIdentifierSchema.parse(issuer);
        const issuerUrl = new URL(issuerParsed);
        // @TODO (?) support issuer with path
        if (issuerUrl.pathname !== '/') {
            throw new TypeError(`"issuer" must be an URL with no path, search or hash (${issuerUrl})`);
        }
        this.issuer = issuerParsed;
        this.keyset = keyset instanceof jwk_1.Keyset ? keyset : new jwk_1.Keyset(keyset);
        this.dpopManager = new dpop_manager_js_1.DpopManager(dpopMgrOptions);
        this.replayManager = new replay_manager_js_1.ReplayManager(replayStore);
        this.signer = new signer_js_1.Signer(this.issuer, this.keyset);
        this.onDecodeToken = onDecodeToken;
    }
    nextDpopNonce() {
        return this.dpopManager.nextNonce();
    }
    async checkDpopProof(httpMethod, httpUrl, httpHeaders, accessToken) {
        const dpopProof = await this.dpopManager.checkProof(httpMethod, httpUrl, httpHeaders, accessToken);
        if (dpopProof) {
            const unique = await this.replayManager.uniqueDpop(dpopProof.jti);
            if (!unique)
                throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP proof replayed');
        }
        return dpopProof;
    }
    async decodeToken(tokenType, token, dpopProof) {
        if (!(0, jwk_1.isSignedJwt)(token)) {
            throw new invalid_token_error_js_1.InvalidTokenError(tokenType, `Malformed token`);
        }
        const { payload } = await this.signer
            .verifyAccessToken(token)
            .catch((err) => {
            throw invalid_token_error_js_1.InvalidTokenError.from(err, tokenType);
        });
        if (payload.cnf?.jkt) {
            // An access token with a cnf.jkt claim must be a DPoP token
            if (tokenType !== 'DPoP') {
                throw new invalid_token_error_js_1.InvalidTokenError('DPoP', `Access token is bound to a DPoP proof, but token type is ${tokenType}`);
            }
            // DPoP token type must be used with a DPoP proof
            if (!dpopProof) {
                throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError(`DPoP proof required`);
            }
            // DPoP proof must be signed with the key that matches the "cnf" claim
            if (payload.cnf.jkt !== dpopProof.jkt) {
                throw new invalid_dpop_key_binding_error_js_1.InvalidDpopKeyBindingError();
            }
        }
        else {
            // An access token without a cnf.jkt claim must be a Bearer token
            if (tokenType !== 'Bearer') {
                throw new invalid_token_error_js_1.InvalidTokenError('Bearer', `Bearer token type must be used without a DPoP proof`);
            }
            // @NOTE We ignore (but allow) DPoP proofs for Bearer tokens
        }
        const payloadOverride = await this.onDecodeToken?.call(null, {
            tokenType,
            token,
            payload,
            dpopProof,
        });
        return payloadOverride ?? payload;
    }
    /**
     * @throws {WWWAuthenticateError}
     * @throws {InvalidTokenError}
     */
    async authenticateRequest(httpMethod, httpUrl, httpHeaders, verifyOptions) {
        const [tokenType, token] = (0, authorization_header_js_1.parseAuthorizationHeader)(httpHeaders['authorization']);
        try {
            const dpopProof = await this.checkDpopProof(httpMethod, httpUrl, httpHeaders, token);
            const tokenPayload = await this.decodeToken(tokenType, token, dpopProof);
            this.verifyTokenPayload(tokenType, tokenPayload, verifyOptions);
            return tokenPayload;
        }
        catch (err) {
            if (err instanceof use_dpop_nonce_error_js_1.UseDpopNonceError)
                throw err.toWwwAuthenticateError();
            if (err instanceof www_authenticate_error_js_1.WWWAuthenticateError)
                throw err;
            throw invalid_token_error_js_1.InvalidTokenError.from(err, tokenType);
        }
    }
    verifyTokenPayload(tokenType, tokenPayload, options) {
        if (options?.audience) {
            const { aud } = tokenPayload;
            const hasMatch = aud != null &&
                (Array.isArray(aud)
                    ? options.audience.some(function_js_1.includedIn, aud)
                    : options.audience.includes(aud));
            if (!hasMatch) {
                const details = `(got: ${aud}, expected one of: ${options.audience})`;
                throw new invalid_token_error_js_1.InvalidTokenError(tokenType, `Invalid audience ${details}`);
            }
        }
        if (options?.scope) {
            const { scope } = tokenPayload;
            const scopes = scope?.split(' ');
            if (!scopes || !options.scope.some(function_js_1.includedIn, scopes)) {
                const details = `(got: ${scope}, expected one of: ${options.scope})`;
                throw new invalid_token_error_js_1.InvalidTokenError(tokenType, `Invalid scope ${details}`);
            }
        }
        if (tokenPayload.exp != null && tokenPayload.exp * 1000 <= Date.now()) {
            const expirationDate = new Date(tokenPayload.exp * 1000).toISOString();
            throw new invalid_token_error_js_1.InvalidTokenError(tokenType, `Token expired at ${expirationDate}`);
        }
    }
}
exports.OAuthVerifier = OAuthVerifier;
//# sourceMappingURL=oauth-verifier.js.map