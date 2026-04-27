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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPublicKeyObject = exports.createSecretKeyObject = exports.AuthVerifier = void 0;
exports.isUserOrAdmin = isUserOrAdmin;
const node_crypto_1 = require("node:crypto");
const jose = __importStar(require("jose"));
const key_encoder_1 = __importDefault(require("key-encoder"));
const common_1 = require("@atproto/common");
const identity_1 = require("@atproto/identity");
const lex_1 = require("@atproto/lex");
const oauth_provider_1 = require("@atproto/oauth-provider");
const oauth_scopes_1 = require("@atproto/oauth-scopes");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("./auth-scope");
const db_1 = require("./db");
const http_1 = require("./util/http");
class AuthVerifier {
    constructor(accountManager, idResolver, oauthVerifier, opts) {
        Object.defineProperty(this, "accountManager", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: accountManager
        });
        Object.defineProperty(this, "idResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: idResolver
        });
        Object.defineProperty(this, "oauthVerifier", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: oauthVerifier
        });
        Object.defineProperty(this, "_publicUrl", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_jwtKey", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_adminPass", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "dids", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        // verifiers (arrow fns to preserve scope)
        Object.defineProperty(this, "unauthenticated", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: (ctx) => {
                setAuthHeaders(ctx.res);
                // @NOTE this auth method is typically used as fallback when no other auth
                // method is applicable. This means that the presence of an "authorization"
                // header means that that header is invalid (as it did not match any of the
                // other auth methods).
                if (ctx.req.headers['authorization']) {
                    throw new xrpc_server_1.AuthRequiredError('Invalid authorization header');
                }
                return {
                    credentials: null,
                };
            }
        });
        Object.defineProperty(this, "adminToken", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                setAuthHeaders(ctx.res);
                const parsed = parseBasicAuth(ctx.req);
                if (!parsed) {
                    throw new xrpc_server_1.AuthRequiredError();
                }
                const { username, password } = parsed;
                if (username !== 'admin' || password !== this._adminPass) {
                    throw new xrpc_server_1.AuthRequiredError();
                }
                return { credentials: { type: 'admin_token' } };
            }
        });
        Object.defineProperty(this, "modService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                setAuthHeaders(ctx.res);
                if (!this.dids.modService) {
                    throw new xrpc_server_1.AuthRequiredError('Untrusted issuer', 'UntrustedIss');
                }
                const payload = await this.verifyServiceJwt(ctx.req, {
                    iss: [this.dids.modService, `${this.dids.modService}#atproto_labeler`],
                });
                return {
                    credentials: {
                        type: 'mod_service',
                        did: payload.iss,
                    },
                };
            }
        });
        Object.defineProperty(this, "moderator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                const type = extractAuthType(ctx.req);
                if (type === AuthType.BEARER) {
                    return this.modService(ctx);
                }
                else {
                    return this.adminToken(ctx);
                }
            }
        });
        Object.defineProperty(this, "userServiceAuth", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                setAuthHeaders(ctx.res);
                const payload = await this.verifyServiceJwt(ctx.req);
                return {
                    credentials: {
                        type: 'user_service_auth',
                        did: payload.iss,
                    },
                };
            }
        });
        Object.defineProperty(this, "userServiceAuthOptional", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: async (ctx) => {
                const type = extractAuthType(ctx.req);
                if (type === AuthType.BEARER) {
                    return await this.userServiceAuth(ctx);
                }
                else {
                    return this.unauthenticated(ctx);
                }
            }
        });
        this._publicUrl = opts.publicUrl;
        this._jwtKey = opts.jwtKey;
        this._adminPass = opts.adminPass;
        this.dids = opts.dids;
    }
    access(options) {
        const { scopes, ...statusOptions } = options;
        const verifyJwtOptions = {
            audience: this.dids.pds,
            typ: 'at+jwt',
            scopes: 
            // @NOTE We can reject taken down credentials based on the scope if
            // "checkTakedown" is set.
            statusOptions.checkTakedown && scopes.includes(auth_scope_1.AuthScope.Takendown)
                ? scopes.filter((s) => s !== auth_scope_1.AuthScope.Takendown)
                : scopes,
        };
        return async (ctx) => {
            setAuthHeaders(ctx.res);
            const { sub: did, scope } = await this.verifyBearerJwt(ctx.req, verifyJwtOptions);
            await this.verifyStatus(did, statusOptions);
            return {
                credentials: { type: 'access', did, scope },
            };
        };
    }
    refresh(options) {
        const verifyOptions = {
            clockTolerance: options?.allowExpired ? Infinity : undefined,
            typ: 'refresh+jwt',
            // when using entryway, proxying refresh credentials
            audience: this.dids.entryway ? this.dids.entryway : this.dids.pds,
            scopes: [auth_scope_1.AuthScope.Refresh],
        };
        return async (ctx) => {
            setAuthHeaders(ctx.res);
            const result = await this.verifyBearerJwt(ctx.req, verifyOptions);
            const tokenId = result.jti;
            if (!tokenId) {
                throw new xrpc_server_1.AuthRequiredError('Unexpected missing refresh token id', 'MissingTokenId');
            }
            return {
                credentials: {
                    type: 'refresh',
                    did: result.sub,
                    scope: result.scope,
                    tokenId,
                },
            };
        };
    }
    authorization({ scopes = auth_scope_1.ACCESS_STANDARD, additional = [], ...options }) {
        const access = this.access({
            ...options,
            scopes: [...scopes, ...additional],
        });
        const oauth = this.oauth(options);
        return async (ctx) => {
            const type = extractAuthType(ctx.req);
            if (type === AuthType.BEARER) {
                return access(ctx);
            }
            if (type === AuthType.DPOP) {
                return oauth(ctx);
            }
            // Auth headers are set through the access and oauth methods so we only
            // need to set them here if we reach this point
            setAuthHeaders(ctx.res);
            if (type !== null) {
                throw new xrpc_server_1.InvalidRequestError('Unexpected authorization type', 'InvalidToken');
            }
            throw new xrpc_server_1.AuthRequiredError(undefined, 'AuthMissing');
        };
    }
    authorizationOrAdminTokenOptional(opts) {
        const authorization = this.authorization(opts);
        return async (ctx) => {
            const type = extractAuthType(ctx.req);
            if (type === AuthType.BEARER || type === AuthType.DPOP) {
                return authorization(ctx);
            }
            else if (type === AuthType.BASIC) {
                return this.adminToken(ctx);
            }
            else {
                return this.unauthenticated(ctx);
            }
        };
    }
    authorizationOrUserServiceAuth(options) {
        const authorizationVerifier = this.authorization(options);
        return async (ctx) => {
            if (isDefinitelyServiceAuth(ctx.req)) {
                return this.userServiceAuth(ctx);
            }
            else {
                return authorizationVerifier(ctx);
            }
        };
    }
    oauth({ authorize, ...verifyStatusOptions }) {
        const verifyTokenOptions = {
            audience: [this.dids.pds],
            scope: ['atproto'],
        };
        return async (ctx) => {
            setAuthHeaders(ctx.res);
            const { req, res } = ctx;
            // https://datatracker.ietf.org/doc/html/rfc9449#section-8.2
            const dpopNonce = this.oauthVerifier.nextDpopNonce();
            if (dpopNonce) {
                res.setHeader('DPoP-Nonce', dpopNonce);
                res.appendHeader('Access-Control-Expose-Headers', 'DPoP-Nonce');
            }
            const originalUrl = req.originalUrl || req.url || '/';
            const url = new URL(originalUrl, this._publicUrl);
            const { scope, sub: did } = await this.oauthVerifier
                .authenticateRequest(req.method || 'GET', url, req.headers, verifyTokenOptions)
                .catch((err) => {
                // Make sure to include any WWW-Authenticate header in the response
                // (particularly useful for DPoP's "use_dpop_nonce" error)
                if (err instanceof oauth_provider_1.WWWAuthenticateError) {
                    res.setHeader('WWW-Authenticate', err.wwwAuthenticateHeader);
                    res.appendHeader('Access-Control-Expose-Headers', 'WWW-Authenticate');
                }
                if (err instanceof oauth_provider_1.OAuthError) {
                    throw new xrpc_server_1.XRPCError(err.status, err.error_description, err.error);
                }
                throw err;
            });
            if (!(0, lex_1.isDidString)(did)) {
                throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
            }
            await this.verifyStatus(did, verifyStatusOptions);
            const permissions = new oauth_scopes_1.ScopePermissionsTransition(scope?.split(' '));
            // Should never happen
            if (!permissions.scopes.has('atproto')) {
                throw new xrpc_server_1.InvalidRequestError('OAuth token does not have "atproto" scope', 'InvalidToken');
            }
            await authorize(permissions, ctx);
            return {
                credentials: {
                    type: 'oauth',
                    did,
                    permissions,
                },
            };
        };
    }
    async verifyStatus(did, options) {
        if (options.checkDeactivated || options.checkTakedown) {
            await this.findAccount(did, options);
        }
    }
    /**
     * Finds an account by its handle or DID, returning possibly deactivated or
     * taken down accounts (unless `options.checkDeactivated` or
     * `options.checkTakedown` are set to true, respectively).
     */
    async findAccount(handleOrDid, options) {
        const account = await this.accountManager.getAccount(handleOrDid, {
            includeDeactivated: true,
            includeTakenDown: true,
        });
        if (!account) {
            // will be turned into ExpiredToken for the client if proxied by entryway
            throw new xrpc_server_1.ForbiddenError('Account not found', 'AccountNotFound');
        }
        if (options.checkTakedown && (0, db_1.softDeleted)(account)) {
            throw new xrpc_server_1.AuthRequiredError('Account has been taken down', 'AccountTakedown');
        }
        if (options.checkDeactivated && account.deactivatedAt) {
            throw new xrpc_server_1.AuthRequiredError('Account is deactivated', 'AccountDeactivated');
        }
        return account;
    }
    /**
     * Wraps {@link jose.jwtVerify} into a function that also validates the token
     * payload's type and wraps errors into {@link InvalidRequestError}.
     */
    async verifyBearerJwt(req, { scopes, ...options }) {
        const token = bearerTokenFromReq(req);
        if (!token) {
            throw new xrpc_server_1.AuthRequiredError(undefined, 'AuthMissing');
        }
        const { payload, protectedHeader } = await jose
            .jwtVerify(token, this._jwtKey, { ...options, typ: undefined })
            .catch((cause) => {
            if (cause instanceof jose.errors.JWTExpired) {
                throw new xrpc_server_1.InvalidRequestError('Token has expired', 'ExpiredToken', {
                    cause,
                });
            }
            else {
                throw new xrpc_server_1.InvalidRequestError('Token could not be verified', 'InvalidToken', { cause });
            }
        });
        // @NOTE: the "typ" is now set in production environments, so we should be
        // able to safely check it through jose.jwtVerify(). However, tests depend
        // on @atproto/pds-entryway which does not set "typ" in the access tokens.
        // For that reason, we still allow it to be missing.
        if (protectedHeader.typ && options.typ !== protectedHeader.typ) {
            throw new xrpc_server_1.InvalidRequestError('Invalid token type', 'InvalidToken');
        }
        const { sub, aud, scope, lxm, cnf, jti } = payload;
        if (typeof lxm !== 'undefined') {
            // Service auth tokens should never make it to here. But since service
            // auth tokens do not have a "typ" header, the "typ" check above will not
            // catch them. This check here is mainly to protect against the
            // hypothetical case in which a PDS would issue service auth tokens using
            // its private key.
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (typeof cnf !== 'undefined') {
            // Proof-of-Possession (PoP) tokens are not allowed here
            // https://www.rfc-editor.org/rfc/rfc7800.html
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (typeof sub !== 'string' || !(0, lex_1.isDidString)(sub)) {
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (typeof aud !== 'string' || !aud.startsWith('did:')) {
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (typeof jti !== 'string' && typeof jti !== 'undefined') {
            throw new xrpc_server_1.InvalidRequestError('Malformed token', 'InvalidToken');
        }
        if (!(0, auth_scope_1.isAuthScope)(scope) || !scopes.includes(scope)) {
            throw new xrpc_server_1.InvalidRequestError('Bad token scope', 'InvalidToken');
        }
        return { sub, aud, jti, scope: scope };
    }
    async verifyServiceJwt(req, opts) {
        const jwtStr = bearerTokenFromReq(req);
        if (!jwtStr) {
            throw new xrpc_server_1.AuthRequiredError('missing jwt', 'MissingJwt');
        }
        const nsid = (0, xrpc_server_1.parseReqNsid)(req);
        const payload = await (0, xrpc_server_1.verifyJwt)(jwtStr, null, nsid, async (iss, forceRefresh) => {
            if (opts?.iss && !opts.iss.includes(iss)) {
                throw new xrpc_server_1.AuthRequiredError('Untrusted issuer', 'UntrustedIss');
            }
            const [did, serviceId] = iss.split('#');
            const keyId = serviceId === 'atproto_labeler' ? 'atproto_label' : 'atproto';
            const didDoc = await this.idResolver.did.resolve(did, forceRefresh);
            if (!didDoc) {
                throw new xrpc_server_1.AuthRequiredError('could not resolve iss did');
            }
            const parsedKey = (0, common_1.getVerificationMaterial)(didDoc, keyId);
            if (!parsedKey) {
                throw new xrpc_server_1.AuthRequiredError('missing or bad key in did doc');
            }
            const didKey = (0, identity_1.getDidKeyFromMultibase)(parsedKey);
            if (!didKey) {
                throw new xrpc_server_1.AuthRequiredError('missing or bad key in did doc');
            }
            return didKey;
        });
        if (payload.aud !== this.dids.pds &&
            (!this.dids.entryway || payload.aud !== this.dids.entryway)) {
            throw new xrpc_server_1.AuthRequiredError('jwt audience does not match service did', 'BadJwtAudience');
        }
        return payload;
    }
}
exports.AuthVerifier = AuthVerifier;
// HELPERS
// ---------
function isUserOrAdmin(auth, did) {
    if (!auth.credentials) {
        return false;
    }
    else if (auth.credentials.type === 'admin_token') {
        return true;
    }
    else {
        return auth.credentials.did === did;
    }
}
var AuthType;
(function (AuthType) {
    AuthType["BASIC"] = "Basic";
    AuthType["BEARER"] = "Bearer";
    AuthType["DPOP"] = "DPoP";
})(AuthType || (AuthType = {}));
const parseAuthorizationHeader = (req) => {
    const authorization = req.headers['authorization'];
    if (!authorization)
        return [null];
    const result = authorization.split(' ');
    if (result.length !== 2) {
        throw new xrpc_server_1.InvalidRequestError('Malformed authorization header', 'InvalidToken');
    }
    // authorization type is case-insensitive
    const authType = result[0].toUpperCase();
    const type = Object.hasOwn(AuthType, authType) ? AuthType[authType] : null;
    if (type)
        return [type, result[1]];
    throw new xrpc_server_1.InvalidRequestError(`Unsupported authorization type: ${result[0]}`, 'InvalidToken');
};
/**
 * @note Not all service auth tokens are guaranteed to have "lxm" claim, so this
 * function should not be used to verify service auth tokens. It is only used to
 * check if a token is definitely a service auth token.
 */
const isDefinitelyServiceAuth = (req) => {
    const token = bearerTokenFromReq(req);
    if (!token)
        return false;
    const payload = jose.decodeJwt(token);
    return payload['lxm'] != null;
};
const extractAuthType = (req) => {
    const [type] = parseAuthorizationHeader(req);
    return type;
};
const bearerTokenFromReq = (req) => {
    const [type, token] = parseAuthorizationHeader(req);
    return type === AuthType.BEARER ? token : null;
};
const parseBasicAuth = (req) => {
    try {
        const [type, b64] = parseAuthorizationHeader(req);
        if (type !== AuthType.BASIC)
            return null;
        const decoded = Buffer.from(b64, 'base64').toString('utf8');
        // We must not use split(':') because the password can contain colons
        const colon = decoded.indexOf(':');
        if (colon === -1)
            return null;
        const username = decoded.slice(0, colon);
        const password = decoded.slice(colon + 1);
        return { username, password };
    }
    catch (err) {
        return null;
    }
};
const createSecretKeyObject = (secret) => {
    return (0, node_crypto_1.createSecretKey)(Buffer.from(secret));
};
exports.createSecretKeyObject = createSecretKeyObject;
const keyEncoder = new key_encoder_1.default('secp256k1');
const createPublicKeyObject = (publicKeyHex) => {
    const key = keyEncoder.encodePublic(publicKeyHex, 'raw', 'pem');
    return (0, node_crypto_1.createPublicKey)({ format: 'pem', key });
};
exports.createPublicKeyObject = createPublicKeyObject;
function setAuthHeaders(res) {
    res.setHeader('Cache-Control', 'private');
    (0, http_1.appendVary)(res, 'Authorization');
}
//# sourceMappingURL=auth-verifier.js.map