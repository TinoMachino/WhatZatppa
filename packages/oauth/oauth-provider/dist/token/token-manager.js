"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenManager = exports.Signer = exports.AccessTokenMode = void 0;
const jwk_1 = require("@atproto/jwk");
const lex_resolver_1 = require("@atproto/lex-resolver");
const access_token_mode_js_1 = require("../access-token/access-token-mode.js");
Object.defineProperty(exports, "AccessTokenMode", { enumerable: true, get: function () { return access_token_mode_js_1.AccessTokenMode; } });
const constants_js_1 = require("../constants.js");
const invalid_grant_error_js_1 = require("../errors/invalid-grant-error.js");
const invalid_request_error_js_1 = require("../errors/invalid-request-error.js");
const invalid_token_error_js_1 = require("../errors/invalid-token-error.js");
const date_js_1 = require("../lib/util/date.js");
const code_js_1 = require("../request/code.js");
const signer_js_1 = require("../signer/signer.js");
Object.defineProperty(exports, "Signer", { enumerable: true, get: function () { return signer_js_1.Signer; } });
const refresh_token_js_1 = require("./refresh-token.js");
const token_id_js_1 = require("./token-id.js");
class TokenManager {
    store;
    lexiconManager;
    signer;
    hooks;
    accessTokenMode;
    tokenMaxAge;
    constructor(store, lexiconManager, signer, hooks, accessTokenMode, tokenMaxAge = constants_js_1.TOKEN_MAX_AGE) {
        this.store = store;
        this.lexiconManager = lexiconManager;
        this.signer = signer;
        this.hooks = hooks;
        this.accessTokenMode = accessTokenMode;
        this.tokenMaxAge = tokenMaxAge;
    }
    createTokenExpiry(now = new Date()) {
        return new Date(now.getTime() + this.tokenMaxAge);
    }
    async createAccessToken(tokenId, client, account, parameters, issuedAt, expiresAt, scope) {
        const claims = {
            jti: tokenId,
            sub: account.sub,
            iat: (0, date_js_1.dateToEpoch)(issuedAt),
            exp: (0, date_js_1.dateToEpoch)(expiresAt),
            aud: account.aud,
            ...(parameters.dpop_jkt && {
                cnf: { jkt: parameters.dpop_jkt },
            }),
            // Because tokens can end-up being quite big, we only include the scope in
            // stateless mode.
            ...(this.accessTokenMode === access_token_mode_js_1.AccessTokenMode.stateless && {
                scope,
            }),
            // https://datatracker.ietf.org/doc/html/rfc8693#section-4.3
            client_id: client.id,
        };
        const claimsOverride = await this.hooks.onCreateToken?.call(null, {
            client,
            account,
            parameters,
            claims,
        });
        return this.signer.createAccessToken(claimsOverride ?? claims);
    }
    async createToken(client, clientAuth, clientMetadata, account, deviceId, parameters, code) {
        await this.validateTokenParams(client, clientAuth, parameters);
        const tokenId = await (0, token_id_js_1.generateTokenId)();
        const refreshToken = client.metadata.grant_types.includes('refresh_token')
            ? await (0, refresh_token_js_1.generateRefreshToken)()
            : undefined;
        const now = new Date();
        const expiresAt = this.createTokenExpiry(now);
        const scope = await this.lexiconManager
            .buildTokenScope(parameters.scope)
            .catch((err) => {
            // Parse expected errors
            if (err instanceof lex_resolver_1.LexResolverError) {
                throw new invalid_request_error_js_1.InvalidRequestError(err.message, err);
            }
            // Unexpected error
            throw err;
        });
        const accessToken = await this.createAccessToken(tokenId, client, account, parameters, now, expiresAt, scope);
        const response = this.buildTokenResponse(inferTokenType(parameters), accessToken, refreshToken, expiresAt, account.sub, scope);
        const tokenData = {
            createdAt: now,
            updatedAt: now,
            expiresAt,
            clientId: client.id,
            clientAuth,
            deviceId,
            sub: account.sub,
            parameters,
            details: null,
            scope,
            code,
        };
        await this.store.createToken(tokenId, tokenData, refreshToken);
        try {
            await this.hooks.onTokenCreated?.call(null, {
                client,
                clientAuth,
                clientMetadata,
                account,
                parameters,
            });
            return response;
        }
        catch (err) {
            // If the hook fails, we delete the token to avoid leaving a dangling
            // token in the store.
            await this.deleteToken(tokenId);
            throw err;
        }
    }
    async validateTokenParams(client, clientAuth, parameters) {
        if (client.metadata.dpop_bound_access_tokens && !parameters.dpop_jkt) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`DPoP JKT is required for DPoP bound access tokens`);
        }
    }
    buildTokenResponse(tokenType, accessToken, refreshToken, expiresAt, sub, scope) {
        return {
            access_token: accessToken,
            token_type: tokenType,
            refresh_token: refreshToken,
            scope,
            // @NOTE using a getter so that the value gets computed when the JSON
            // response is generated, allowing to value to be as accurate as possible.
            get expires_in() {
                return (0, date_js_1.dateToRelativeSeconds)(expiresAt);
            },
            // ATPROTO extension: add the sub claim to the token response to allow
            // clients to resolve the PDS url (audience) using the did resolution
            // mechanism.
            sub,
        };
    }
    async rotateToken(client, clientAuth, clientMetadata, tokenInfo) {
        const { account, data } = tokenInfo;
        const { parameters } = data;
        await this.validateTokenParams(client, clientAuth, parameters);
        const nextTokenId = await (0, token_id_js_1.generateTokenId)();
        const nextRefreshToken = await (0, refresh_token_js_1.generateRefreshToken)();
        const now = new Date();
        const expiresAt = this.createTokenExpiry(now);
        // @NOTE since the permission sets are stored in a persistent store,
        // it's fine to propagate a 500 (server_error) here as the values should
        // be retrievable from the store.
        const scope = await this.lexiconManager.buildTokenScope(parameters.scope);
        await this.store.rotateToken(tokenInfo.id, nextTokenId, nextRefreshToken, {
            updatedAt: now,
            expiresAt,
            // @NOTE Normally, the clientAuth not change over time. There are two
            // exceptions:
            // - Upgrade from a legacy representation of client authentication to
            //   a modern one.
            // - Allow clients to become "confidential" if they were previously
            //   "public"
            clientAuth,
            scope,
        });
        const accessToken = await this.createAccessToken(nextTokenId, client, account, parameters, now, expiresAt, scope);
        const response = this.buildTokenResponse(inferTokenType(parameters), accessToken, nextRefreshToken, expiresAt, account.sub, scope);
        await this.hooks.onTokenRefreshed?.call(null, {
            client,
            clientAuth,
            clientMetadata,
            account,
            parameters,
        });
        return response;
    }
    /**
     * @note The token validity is not guaranteed. The caller must ensure that the
     * token is valid before using the returned token info.
     */
    async findToken(token) {
        if ((0, token_id_js_1.isTokenId)(token)) {
            return this.getTokenInfo(token);
        }
        else if ((0, code_js_1.isCode)(token)) {
            return this.findByCode(token);
        }
        else if ((0, refresh_token_js_1.isRefreshToken)(token)) {
            return this.findByRefreshToken(token);
        }
        else if ((0, jwk_1.isSignedJwt)(token)) {
            return this.findByAccessToken(token);
        }
        else {
            throw new invalid_request_error_js_1.InvalidRequestError(`Invalid token`);
        }
    }
    async findByAccessToken(token) {
        const { payload } = await this.signer.verifyAccessToken(token, {
            clockTolerance: Infinity,
        });
        const tokenInfo = await this.getTokenInfo(payload.jti);
        if (!tokenInfo)
            return null;
        // Fool-proof: Invalid store implementation ?
        if (payload.sub !== tokenInfo.account.sub) {
            await this.deleteToken(tokenInfo.id);
            throw new Error(`Account sub (${tokenInfo.account.sub}) does not match token sub (${payload.sub})`);
        }
        return tokenInfo;
    }
    async findByRefreshToken(token) {
        return this.store.findTokenByRefreshToken(token);
    }
    async consumeRefreshToken(token) {
        // @NOTE concurrent refreshes of the same refresh token could theoretically
        // lead to two new tokens (access & refresh) being created. This is deemed
        // acceptable for now (as the mechanism can only be used once since only one
        // of the two refresh token created will be valid, and any future refresh
        // attempts from outdated tokens will cause the entire session to be
        // invalidated). Ideally, the store should be able to handle this case by
        // atomically consuming the refresh token and returning the token info.
        // @TODO Add another store method that atomically consumes the refresh token
        // with a lock.
        const tokenInfo = await this.findByRefreshToken(token).catch((err) => {
            throw invalid_grant_error_js_1.InvalidGrantError.from(err, `Invalid refresh token`);
        });
        if (!tokenInfo) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`Invalid refresh token`);
        }
        if (tokenInfo.currentRefreshToken !== token) {
            await this.deleteToken(tokenInfo.id);
            throw new invalid_grant_error_js_1.InvalidGrantError(`Refresh token replayed`);
        }
        return tokenInfo;
    }
    async findByCode(code) {
        return this.store.findTokenByCode(code);
    }
    async deleteToken(tokenId) {
        return this.store.deleteToken(tokenId);
    }
    async getTokenInfo(tokenId) {
        return this.store.readToken(tokenId);
    }
    /**
     * This method is called to when decoding a token that was encoded in
     * {@link AccessTokenMode.light} mode, using data from the store to fill the
     * data that was omitted in the token itself.
     */
    async loadTokenClaims(tokenType, tokenPayload) {
        const tokenId = tokenPayload.jti;
        const tokenInfo = await this.getTokenInfo(tokenId).catch((err) => {
            throw invalid_token_error_js_1.InvalidTokenError.from(err, tokenType);
        });
        if (!tokenInfo) {
            throw new invalid_token_error_js_1.InvalidTokenError(tokenType, `Invalid token`);
        }
        const { account, data } = tokenInfo;
        // Fool proof, make sure that the database & token payload are consistent.
        // These should both be either undefined or a string so it's safe to compare
        // the values directly.
        if (tokenPayload.cnf?.jkt !== data.parameters.dpop_jkt) {
            await this.deleteToken(tokenId);
            throw new invalid_token_error_js_1.InvalidTokenError(tokenType, `Invalid token`);
        }
        if (isCurrentTokenExpired(tokenInfo)) {
            await this.deleteToken(tokenId);
            throw new invalid_token_error_js_1.InvalidTokenError(tokenType, `Token expired`);
        }
        return {
            jti: tokenId,
            sub: account.sub,
            iat: (0, date_js_1.dateToEpoch)(data.updatedAt),
            exp: (0, date_js_1.dateToEpoch)(data.expiresAt),
            aud: account.aud,
            scope: data.scope ?? data.parameters.scope,
            // https://datatracker.ietf.org/doc/html/rfc8693#section-4.3
            client_id: data.clientId,
        };
    }
    async listAccountTokens(sub) {
        const results = await this.store.listAccountTokens(sub);
        return results
            .filter((tokenInfo) => tokenInfo.account.sub === sub) // Fool proof
            .filter((tokenInfo) => !isCurrentTokenExpired(tokenInfo));
    }
}
exports.TokenManager = TokenManager;
function isCurrentTokenExpired(tokenInfo) {
    return tokenInfo.data.expiresAt.getTime() < Date.now();
}
function inferTokenType(parameters) {
    if (parameters.dpop_jkt) {
        return 'DPoP';
    }
    return 'Bearer';
}
//# sourceMappingURL=token-manager.js.map