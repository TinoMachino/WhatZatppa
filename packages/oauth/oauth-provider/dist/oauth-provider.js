"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OAuthProvider = exports.LexResolver = exports.Keyset = exports.AccessTokenMode = void 0;
const node_crypto_1 = require("node:crypto");
const jwk_1 = require("@atproto/jwk");
Object.defineProperty(exports, "Keyset", { enumerable: true, get: function () { return jwk_1.Keyset; } });
const lex_resolver_1 = require("@atproto/lex-resolver");
Object.defineProperty(exports, "LexResolver", { enumerable: true, get: function () { return lex_resolver_1.LexResolver; } });
const oauth_types_1 = require("@atproto/oauth-types");
const fetch_node_1 = require("@atproto-labs/fetch-node");
const simple_store_memory_1 = require("@atproto-labs/simple-store-memory");
const access_token_mode_js_1 = require("./access-token/access-token-mode.js");
Object.defineProperty(exports, "AccessTokenMode", { enumerable: true, get: function () { return access_token_mode_js_1.AccessTokenMode; } });
const account_manager_js_1 = require("./account/account-manager.js");
const account_store_js_1 = require("./account/account-store.js");
const client_manager_js_1 = require("./client/client-manager.js");
const client_store_js_1 = require("./client/client-store.js");
const constants_js_1 = require("./constants.js");
const customization_js_1 = require("./customization/customization.js");
const device_manager_js_1 = require("./device/device-manager.js");
const device_store_js_1 = require("./device/device-store.js");
const account_selection_required_error_js_1 = require("./errors/account-selection-required-error.js");
const authorization_error_js_1 = require("./errors/authorization-error.js");
const consent_required_error_js_1 = require("./errors/consent-required-error.js");
const invalid_dpop_key_binding_error_js_1 = require("./errors/invalid-dpop-key-binding-error.js");
const invalid_dpop_proof_error_js_1 = require("./errors/invalid-dpop-proof-error.js");
const invalid_grant_error_js_1 = require("./errors/invalid-grant-error.js");
const invalid_request_error_js_1 = require("./errors/invalid-request-error.js");
const login_required_error_js_1 = require("./errors/login-required-error.js");
const lexicon_manager_js_1 = require("./lexicon/lexicon-manager.js");
const lexicon_store_js_1 = require("./lexicon/lexicon-store.js");
const date_js_1 = require("./lib/util/date.js");
const error_js_1 = require("./lib/util/error.js");
const build_metadata_js_1 = require("./metadata/build-metadata.js");
const oauth_verifier_js_1 = require("./oauth-verifier.js");
const replay_store_js_1 = require("./replay/replay-store.js");
const code_js_1 = require("./request/code.js");
const request_manager_js_1 = require("./request/request-manager.js");
const request_store_js_1 = require("./request/request-store.js");
const request_uri_js_1 = require("./request/request-uri.js");
const token_manager_js_1 = require("./token/token-manager.js");
const token_store_js_1 = require("./token/token-store.js");
const par_response_error_js_1 = require("./types/par-response-error.js");
class OAuthProvider extends oauth_verifier_js_1.OAuthVerifier {
    accessTokenMode;
    hooks;
    metadata;
    customization;
    authenticationMaxAge;
    accountManager;
    deviceManager;
    clientManager;
    lexiconManager;
    requestManager;
    tokenManager;
    constructor({ 
    // OAuthProviderConfig
    authenticationMaxAge = constants_js_1.AUTHENTICATION_MAX_AGE, tokenMaxAge = constants_js_1.TOKEN_MAX_AGE, accessTokenMode = access_token_mode_js_1.AccessTokenMode.stateless, metadata, safeFetch = (0, fetch_node_1.safeFetchWrap)(), store, // compound store implementation
    lexResolver = new lex_resolver_1.LexResolver({ fetch: safeFetch }), 
    // Required stores
    accountStore = (0, account_store_js_1.asAccountStore)(store), deviceStore = (0, device_store_js_1.asDeviceStore)(store), lexiconStore = (0, lexicon_store_js_1.asLexiconStore)(store), tokenStore = (0, token_store_js_1.asTokenStore)(store), requestStore = (0, request_store_js_1.asRequestStore)(store), 
    // Optional stores
    clientStore = (0, client_store_js_1.ifClientStore)(store), replayStore = (0, replay_store_js_1.ifReplayStore)(store), clientJwksCache = new simple_store_memory_1.SimpleStoreMemory({
        maxSize: 50_000_000,
        ttl: 600e3,
    }), clientMetadataCache = new simple_store_memory_1.SimpleStoreMemory({
        maxSize: 50_000_000,
        ttl: 600e3,
    }), loopbackMetadata = oauth_types_1.atprotoLoopbackClientMetadata, 
    // OAuthHooks &
    // OAuthVerifierOptions &
    // DeviceManagerOptions &
    // Customization
    ...rest }) {
        super({ replayStore, ...rest });
        // @NOTE: hooks don't really need a type parser, as all zod can actually
        // check at runtime is the fact that the values are functions. The only way
        // we would benefit from zod here would be to wrap the functions with a
        // validator for the provided function's return types, which we don't
        // really need if types are respected.
        this.hooks = rest;
        this.accessTokenMode = accessTokenMode;
        this.authenticationMaxAge = authenticationMaxAge;
        this.metadata = (0, build_metadata_js_1.buildMetadata)(this.issuer, this.keyset, metadata);
        this.customization = customization_js_1.customizationSchema.parse(rest);
        this.deviceManager = new device_manager_js_1.DeviceManager(deviceStore, {
            ...rest,
            cookie: {
                ...rest.cookie,
                // "secure" defaults to "true" in DeviceManager. For the oauth routes to
                // work from localhost on Safari, we need to explicitly set secure to
                // false for localhost usage. This is not really an issue with Chrome
                // and Firefox, but Safari enforces it strictly.
                secure: !this.issuer.startsWith('http:'),
            },
        });
        this.accountManager = new account_manager_js_1.AccountManager(this.issuer, accountStore, this.hooks, this.customization);
        this.clientManager = new client_manager_js_1.ClientManager(this.metadata, this.keyset, this.hooks, clientStore || null, loopbackMetadata || null, safeFetch, clientJwksCache, clientMetadataCache);
        this.lexiconManager = new lexicon_manager_js_1.LexiconManager(lexiconStore, lexResolver);
        this.requestManager = new request_manager_js_1.RequestManager(requestStore, this.lexiconManager, this.signer, this.metadata, this.hooks);
        this.tokenManager = new token_manager_js_1.TokenManager(tokenStore, this.lexiconManager, this.signer, this.hooks, this.accessTokenMode, tokenMaxAge);
    }
    get jwks() {
        return this.keyset.publicJwks;
    }
    /**
     * @returns true if the user's consent is required for the requested scopes
     */
    checkConsentRequired(parameters, clientData) {
        // Client was never authorized before
        if (!clientData)
            return true;
        // Client explicitly asked for consent
        if (parameters.prompt === 'consent')
            return true;
        // No scope requested, and client is known by user, no consent required
        const requestedScopes = parameters.scope?.split(' ');
        if (requestedScopes == null)
            return false;
        // Ensure that all requested scopes were previously authorized by the user
        const { authorizedScopes } = clientData;
        return !requestedScopes.every((scope) => authorizedScopes.includes(scope));
    }
    checkLoginRequired(deviceAccount) {
        const authAge = Date.now() - deviceAccount.updatedAt.getTime();
        return authAge > this.authenticationMaxAge;
    }
    async authenticateClient(clientCredentials, dpopProof, options) {
        const client = await this.clientManager.getClient(clientCredentials.client_id);
        if (client.metadata.dpop_bound_access_tokens &&
            !dpopProof &&
            !options?.allowMissingDpopProof) {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP proof required');
        }
        if (dpopProof && !client.metadata.dpop_bound_access_tokens) {
            throw new invalid_dpop_proof_error_js_1.InvalidDpopProofError('DPoP proof not allowed for this client');
        }
        const clientAuth = await client.authenticate(clientCredentials, {
            authorizationServerIdentifier: this.issuer,
        });
        if (clientAuth.method === 'private_key_jwt') {
            // Clients MUST NOT use their client assertion key to sign DPoP proofs
            if (dpopProof && clientAuth.jkt === dpopProof.jkt) {
                throw new invalid_request_error_js_1.InvalidRequestError('The DPoP proof must be signed with a different key than the client assertion');
            }
            // https://www.rfc-editor.org/rfc/rfc7523.html#section-3
            // > 7.  [...] The authorization server MAY ensure that JWTs are not
            // >     replayed by maintaining the set of used "jti" values for the
            // >     length of time for which the JWT would be considered valid based
            // >     on the applicable "exp" instant.
            const unique = await this.replayManager.uniqueAuth(clientAuth.jti, client.id, clientAuth.exp);
            if (!unique) {
                throw new invalid_grant_error_js_1.InvalidGrantError(`${clientAuth.method} jti reused`);
            }
        }
        return { client, clientAuth };
    }
    async decodeJAR(client, input) {
        const { payload } = await client.decodeRequestObject(input.request, this.issuer);
        const { jti } = payload;
        if (!jti) {
            throw new invalid_request_error_js_1.InvalidRequestError('Request object payload must contain a "jti" claim');
        }
        if (!(await this.replayManager.uniqueJar(jti, client.id))) {
            throw new invalid_request_error_js_1.InvalidRequestError('Request object was replayed');
        }
        const parameters = await oauth_types_1.oauthAuthorizationRequestParametersSchema
            .parseAsync(payload)
            .catch((err) => {
            const msg = (0, error_js_1.formatError)(err, 'Invalid parameters in JAR');
            throw new invalid_request_error_js_1.InvalidRequestError(msg, err);
        });
        return parameters;
    }
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc9126}
     */
    async pushedAuthorizationRequest(credentials, authorizationRequest, dpopProof) {
        try {
            const { client, clientAuth } = await this.authenticateClient(credentials, dpopProof, 
            // Allow missing DPoP header for PAR requests as rfc9449 allows it
            // (though the dpop_jkt parameter must be present in that case, see
            // check bellow).
            { allowMissingDpopProof: true });
            const parameters = 'request' in authorizationRequest // Handle JAR
                ? await this.decodeJAR(client, authorizationRequest)
                : authorizationRequest;
            if (!parameters.dpop_jkt) {
                if (client.metadata.dpop_bound_access_tokens) {
                    if (dpopProof)
                        parameters.dpop_jkt = dpopProof.jkt;
                    else {
                        // @NOTE When both PAR and DPoP are used, either the DPoP header, or
                        // the dpop_jkt parameter must be present. We do not enforce this
                        // for legacy reasons.
                        // https://datatracker.ietf.org/doc/html/rfc9449#section-10.1
                    }
                }
            }
            else {
                if (!client.metadata.dpop_bound_access_tokens) {
                    throw new invalid_request_error_js_1.InvalidRequestError('DPoP bound access tokens are not enabled for this client');
                }
                // Proof is optional if the dpop_jkt is provided, but if it is provided,
                // it must match the DPoP proof JKT.
                if (dpopProof && dpopProof.jkt !== parameters.dpop_jkt) {
                    throw new invalid_dpop_key_binding_error_js_1.InvalidDpopKeyBindingError();
                }
            }
            const { requestUri, expiresAt } = await this.requestManager.createAuthorizationRequest(client, clientAuth, parameters, null);
            return {
                request_uri: requestUri,
                expires_in: (0, date_js_1.dateToRelativeSeconds)(expiresAt),
            };
        }
        catch (err) {
            // https://datatracker.ietf.org/doc/html/rfc9126#section-2.3-1
            // > Since initial processing of the pushed authorization request does not
            // > involve resource owner interaction, error codes related to user
            // > interaction, such as "access_denied", are never returned.
            if (err instanceof authorization_error_js_1.AuthorizationError && !(0, par_response_error_js_1.isPARResponseError)(err.error)) {
                throw new invalid_request_error_js_1.InvalidRequestError(err.error_description, err);
            }
            throw err;
        }
    }
    async processAuthorizationRequest(client, deviceId, query) {
        // PAR
        if ('request_uri' in query) {
            const requestUri = (0, request_uri_js_1.parseRequestUri)(query.request_uri, {
                path: ['query', 'request_uri'],
            });
            return this.requestManager.get(requestUri, deviceId, client.id);
        }
        // JAR
        if ('request' in query) {
            // @NOTE Since JAR are signed with the client's private key, a JAR *could*
            // technically be used to authenticate the client when requests are
            // created without PAR (i.e. created on the fly by the authorize
            // endpoint). This implementation actually used to support this
            // (un-spec'd) behavior. That support was removed:
            // - Because it was not actually used
            // - Because it was not part of any standard
            // - Because it makes extending the client authentication mechanism more
            //   complex since any extension would not only need to affect the
            //   "private_key_jwt" auth method but also the JAR "request" object.
            const parameters = await this.decodeJAR(client, query);
            return this.requestManager.createAuthorizationRequest(client, null, parameters, deviceId);
        }
        // "Regular" authorization request (created on the fly by directing the user
        // to the authorization endpoint with all the parameters in the url).
        return this.requestManager.createAuthorizationRequest(client, null, query, deviceId);
    }
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-4.1.1}
     */
    async authorize(query, { deviceId, deviceMetadata }) {
        const { issuer } = this;
        // If there is a chance to redirect the user to the client, let's do
        // it by wrapping the error in an AuthorizationError.
        const throwAuthorizationError = 'redirect_uri' in query
            ? (err) => {
                // https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-4.1.2.1
                throw authorization_error_js_1.AuthorizationError.from(query, err);
            }
            : null;
        const client = await this.clientManager
            .getClient(query.client_id)
            .catch(throwAuthorizationError);
        const { parameters, requestUri } = await this.processAuthorizationRequest(client, deviceId, query).catch(throwAuthorizationError);
        try {
            const sessions = (await this.accountManager.listDeviceAccounts(deviceId)).map((deviceAccount) => ({
                account: deviceAccount.account,
                selected: matchesHint.call(parameters, deviceAccount),
                // @TODO Return the session expiration date instead of a boolean to
                // avoid having to rely on a leeway when "accepting" the request.
                loginRequired: parameters.prompt === 'login' ||
                    this.checkLoginRequired(deviceAccount),
                consentRequired: this.checkConsentRequired(parameters, deviceAccount.authorizedClients.get(client.id)),
            }));
            // https://openid.net/specs/openid-connect-core-1_0.html#AuthRequest
            // prompt=select_account
            //
            // > The Authorization Server SHOULD prompt the End-User to select a user
            // > account. This enables an End-User who has multiple accounts at the
            // > Authorization Server to select amongst the multiple accounts that
            // > they might have current sessions for. If it cannot obtain an account
            // > selection choice made by the End-User, it MUST return an error,
            // > typically account_selection_required.
            if (parameters.prompt === 'select_account' && !sessions.length) {
                throw new account_selection_required_error_js_1.AccountSelectionRequiredError(parameters);
            }
            // prompt=none
            //
            // > The Authorization Server MUST NOT display any authentication or
            // > consent user interface pages. An error is returned if an End-User is
            // > not already authenticated or the Client does not have pre-configured
            // > consent for the requested Claims or does not fulfill other conditions
            // > for processing the request. The error code will typically be
            // > login_required, interaction_required, or another code defined in
            // > Section 3.1.2.6. This can be used as a method to check for existing
            // > authentication and/or consent.
            if (parameters.prompt === 'none') {
                const ssoSessions = sessions.filter(matchesHint, parameters);
                if (ssoSessions.length > 1) {
                    throw new account_selection_required_error_js_1.AccountSelectionRequiredError(parameters);
                }
                if (ssoSessions.length < 1) {
                    throw new login_required_error_js_1.LoginRequiredError(parameters);
                }
                const ssoSession = ssoSessions[0];
                if (ssoSession.loginRequired) {
                    throw new login_required_error_js_1.LoginRequiredError(parameters);
                }
                if (ssoSession.consentRequired) {
                    throw new consent_required_error_js_1.ConsentRequiredError(parameters);
                }
                const code = await this.requestManager.setAuthorized(requestUri, client, ssoSession.account, deviceId, deviceMetadata);
                return { issuer, parameters, redirect: { code } };
            }
            // Automatic SSO when a hint was provided that matches a single session
            if (parameters.prompt == null && parameters.login_hint != null) {
                const ssoSessions = sessions.filter(matchesHint, parameters);
                if (ssoSessions.length === 1) {
                    const ssoSession = ssoSessions[0];
                    if (!ssoSession.loginRequired && !ssoSession.consentRequired) {
                        const code = await this.requestManager.setAuthorized(requestUri, client, ssoSession.account, deviceId, deviceMetadata);
                        return { issuer, parameters, redirect: { code } };
                    }
                }
            }
            return {
                issuer,
                client,
                parameters,
                requestUri,
                sessions,
                selectedSub: parameters.prompt == null ||
                    parameters.prompt === 'login' ||
                    parameters.prompt === 'consent'
                    ? sessions.find(matchesHint, parameters)?.account.sub
                    : undefined,
                permissionSets: await this.lexiconManager
                    .getPermissionSetsFromScope(parameters.scope)
                    .catch((cause) => {
                    throw new authorization_error_js_1.AuthorizationError(parameters, 'Unable to retrieve permission sets', 'invalid_scope', cause);
                }),
            };
        }
        catch (err) {
            try {
                await this.requestManager.delete(requestUri);
            }
            catch {
                // There are two error here. Better keep the outer one.
                //
                // @TODO Maybe move this entire code to the /authorize endpoint
                // (allowing to log this error)
            }
            throw authorization_error_js_1.AuthorizationError.from(parameters, err);
        }
    }
    async token(clientCredentials, clientMetadata, request, dpopProof) {
        const { client, clientAuth } = await this.authenticateClient(clientCredentials, dpopProof);
        if (!this.metadata.grant_types_supported?.includes(request.grant_type)) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`Grant type "${request.grant_type}" is not supported by the server`);
        }
        if (!client.metadata.grant_types.includes(request.grant_type)) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`"${request.grant_type}" grant type is not allowed for this client`);
        }
        if (request.grant_type === 'authorization_code') {
            return this.authorizationCodeGrant(client, clientAuth, clientMetadata, request, dpopProof);
        }
        if (request.grant_type === 'refresh_token') {
            return this.refreshTokenGrant(client, clientAuth, clientMetadata, request, dpopProof);
        }
        throw new invalid_grant_error_js_1.InvalidGrantError(`Grant type "${request.grant_type}" not supported`);
    }
    async compareClientAuth(client, clientAuth, dpopProof, initial) {
        // Fool proofing, ensure that the client is authenticating using the right method
        if (clientAuth.method !== client.metadata.token_endpoint_auth_method) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`Client authentication method mismatch (expected ${client.metadata.token_endpoint_auth_method}, got ${clientAuth.method})`);
        }
        if (initial.clientId !== client.id) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`Token was not issued to this client`);
        }
        const { parameters } = initial;
        if (parameters.dpop_jkt) {
            if (!dpopProof) {
                throw new invalid_grant_error_js_1.InvalidGrantError(`DPoP proof is required for this request`);
            }
            else if (parameters.dpop_jkt !== dpopProof.jkt) {
                throw new invalid_grant_error_js_1.InvalidGrantError(`DPoP proof does not match the expected JKT`);
            }
        }
        if (!initial.clientAuth) {
            // If the client did not use PAR, it was not authenticated when the request
            // was initially created (see authorize() method in OAuthProvider). Since
            // PAR is not mandatory, and since the token exchange currently taking place
            // *is* authenticated (`clientAuth`), we allow "upgrading" the
            // authentication method (the token created will be bound to the current
            // clientAuth).
            return;
        }
        switch (initial.clientAuth.method) {
            case oauth_types_1.CLIENT_ASSERTION_TYPE_JWT_BEARER: // LEGACY
            case 'private_key_jwt':
                if (clientAuth.method !== 'private_key_jwt') {
                    throw new invalid_grant_error_js_1.InvalidGrantError(`Client authentication method mismatch (expected ${initial.clientAuth.method})`);
                }
                if (clientAuth.kid !== initial.clientAuth.kid ||
                    clientAuth.alg !== initial.clientAuth.alg ||
                    clientAuth.jkt !== initial.clientAuth.jkt) {
                    throw new invalid_grant_error_js_1.InvalidGrantError(`The session was initiated with a different key than the client assertion currently used`);
                }
                break;
            case 'none':
                // @NOTE We allow the client to "upgrade" to a confidential client if
                // the session was initially created without client authentication.
                break;
            default:
                throw new invalid_grant_error_js_1.InvalidGrantError(
                // @ts-expect-error (future proof, backwards compatibility)
                `Invalid method "${initial.clientAuth.method}"`);
        }
    }
    async authorizationCodeGrant(client, clientAuth, clientMetadata, input, dpopProof) {
        const code = await code_js_1.codeSchema
            .parseAsync(input.code, { path: ['code'] })
            .catch((err) => {
            const msg = (0, error_js_1.formatError)(err, 'Invalid code');
            throw new invalid_grant_error_js_1.InvalidGrantError(msg, err);
        });
        const data = await this.requestManager
            .consumeCode(code)
            .catch(async (err) => {
            // Code not found in request manager: check for replays
            const tokenInfo = await this.tokenManager.findByCode(code);
            if (tokenInfo) {
                // try/finally to ensure that both code path get executed (sequentially)
                try {
                    // "code" was replayed, delete existing session
                    await this.tokenManager.deleteToken(tokenInfo.id);
                }
                finally {
                    // As an additional security measure, we also sign the device out,
                    // so that the device cannot be used to access the account anymore
                    // without a new authentication.
                    const { deviceId, sub } = tokenInfo.data;
                    if (deviceId) {
                        await this.accountManager.removeDeviceAccount(deviceId, sub);
                    }
                }
            }
            throw invalid_grant_error_js_1.InvalidGrantError.from(err, `Invalid code`);
        });
        // @NOTE at this point, the request data was removed from the store and only
        // exists in memory here (in the "data" variable). Because of this, any
        // error thrown after this point will permanently cause the request data to
        // be lost.
        await this.compareClientAuth(client, clientAuth, dpopProof, data);
        // If the DPoP proof was not provided earlier (PAR / authorize), let's add
        // it now.
        const parameters = dpopProof &&
            client.metadata.dpop_bound_access_tokens &&
            !data.parameters.dpop_jkt
            ? { ...data.parameters, dpop_jkt: dpopProof.jkt }
            : data.parameters;
        await this.validateCodeGrant(parameters, input);
        const { account } = await this.accountManager.getAccount(data.sub);
        return this.tokenManager.createToken(client, clientAuth, clientMetadata, account, data.deviceId, parameters, code);
    }
    async validateCodeGrant(parameters, input) {
        if (parameters.redirect_uri !== input.redirect_uri) {
            throw new invalid_grant_error_js_1.InvalidGrantError('The redirect_uri parameter must match the one used in the authorization request');
        }
        if (parameters.code_challenge) {
            if (!input.code_verifier) {
                throw new invalid_grant_error_js_1.InvalidGrantError('code_verifier is required');
            }
            if (input.code_verifier.length < 43) {
                throw new invalid_grant_error_js_1.InvalidGrantError('code_verifier too short');
            }
            switch (parameters.code_challenge_method) {
                case undefined: // default is "plain"
                case 'plain':
                    if (parameters.code_challenge !== input.code_verifier) {
                        throw new invalid_grant_error_js_1.InvalidGrantError('Invalid code_verifier');
                    }
                    break;
                case 'S256': {
                    const inputChallenge = Buffer.from(parameters.code_challenge, 'base64');
                    const computedChallenge = (0, node_crypto_1.createHash)('sha256')
                        .update(input.code_verifier)
                        .digest();
                    if (inputChallenge.compare(computedChallenge) !== 0) {
                        throw new invalid_grant_error_js_1.InvalidGrantError('Invalid code_verifier');
                    }
                    break;
                }
                default:
                    // Should never happen (because request validation should catch this)
                    throw new Error(`Unsupported code_challenge_method`);
            }
            const unique = await this.replayManager.uniqueCodeChallenge(parameters.code_challenge);
            if (!unique) {
                throw new invalid_grant_error_js_1.InvalidGrantError('Code challenge already used');
            }
        }
        else if (input.code_verifier !== undefined) {
            throw new invalid_request_error_js_1.InvalidRequestError("code_challenge parameter wasn't provided");
        }
    }
    async refreshTokenGrant(client, clientAuth, clientMetadata, input, dpopProof) {
        const refreshToken = await token_store_js_1.refreshTokenSchema
            .parseAsync(input.refresh_token, { path: ['refresh_token'] })
            .catch((err) => {
            const msg = (0, error_js_1.formatError)(err, 'Invalid refresh token');
            throw new invalid_grant_error_js_1.InvalidGrantError(msg, err);
        });
        const tokenInfo = await this.tokenManager.consumeRefreshToken(refreshToken);
        try {
            const { data } = tokenInfo;
            await this.compareClientAuth(client, clientAuth, dpopProof, data);
            await this.validateRefreshGrant(client, clientAuth, data);
            return await this.tokenManager.rotateToken(client, clientAuth, clientMetadata, tokenInfo);
        }
        catch (err) {
            await this.tokenManager.deleteToken(tokenInfo.id);
            throw err;
        }
    }
    async validateRefreshGrant(client, clientAuth, data) {
        const [sessionLifetime, refreshLifetime] = clientAuth.method !== 'none' || client.info.isFirstParty
            ? [
                constants_js_1.CONFIDENTIAL_CLIENT_SESSION_LIFETIME,
                constants_js_1.CONFIDENTIAL_CLIENT_REFRESH_LIFETIME,
            ]
            : [constants_js_1.PUBLIC_CLIENT_SESSION_LIFETIME, constants_js_1.PUBLIC_CLIENT_REFRESH_LIFETIME];
        const sessionAge = Date.now() - data.createdAt.getTime();
        if (sessionAge > sessionLifetime) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`Session expired`);
        }
        const refreshAge = Date.now() - data.updatedAt.getTime();
        if (refreshAge > refreshLifetime) {
            throw new invalid_grant_error_js_1.InvalidGrantError(`Refresh token expired`);
        }
    }
    /**
     * @see {@link https://datatracker.ietf.org/doc/html/rfc7009#section-2.1 rfc7009}
     */
    async revoke(clientCredentials, { token }, dpopProof) {
        // > The authorization server first validates the client credentials (in
        // > case of a confidential client)
        const { client, clientAuth } = await this.authenticateClient(clientCredentials, dpopProof);
        const tokenInfo = await this.tokenManager.findToken(token);
        if (tokenInfo) {
            // > [...] and then verifies whether the token was issued to the client
            // > making the revocation request.
            const { data } = tokenInfo;
            await this.compareClientAuth(client, clientAuth, dpopProof, data);
            // > In the next step, the authorization server invalidates the token. The
            // > invalidation takes place immediately, and the token cannot be used
            // > again after the revocation.
            await this.tokenManager.deleteToken(tokenInfo.id);
        }
    }
    async decodeToken(tokenType, token, dpopProof) {
        const tokenPayload = await super.decodeToken(tokenType, token, dpopProof);
        if (this.accessTokenMode !== access_token_mode_js_1.AccessTokenMode.stateless) {
            // @NOTE in non stateless mode, some claims can be omitted (most notably
            // "scope"). We load the token claims here (allowing to ensure that the
            // token is still valid, and to retrieve a (potentially updated) set of
            // claims).
            const tokenClaims = await this.tokenManager.loadTokenClaims(tokenType, tokenPayload);
            Object.assign(tokenPayload, tokenClaims);
        }
        return tokenPayload;
    }
}
exports.OAuthProvider = OAuthProvider;
function matchesHint({ account }) {
    const hint = this.login_hint;
    if (!hint)
        return false;
    return account.sub === hint || account.preferred_username === hint;
}
//# sourceMappingURL=oauth-provider.js.map