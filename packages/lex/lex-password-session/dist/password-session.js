"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordSession = void 0;
const lex_client_1 = require("@atproto/lex-client");
const error_js_1 = require("./error.js");
const index_js_1 = require("./lexicons/index.js");
const util_js_1 = require("./util.js");
/**
 * Password-based authentication session for AT Protocol services.
 *
 * This class provides session management for CLI tools, scripts, and bots that
 * need to authenticate with AT Protocol services using password credentials.
 * It implements the {@link Agent} interface, allowing it to be used directly
 * with AT Protocol clients.
 *
 * **Security Warning:** It is strongly recommended to use app passwords instead
 * of main account credentials. App passwords provide limited access and can be
 * revoked independently without compromising your main account. For browser-based
 * applications, use OAuth-based authentication instead.
 *
 * @example Basic usage with app password
 * ```ts
 * const session = await PasswordSession.login({
 *   service: 'https://bsky.social',
 *   identifier: 'alice.bsky.social',
 *   password: 'xxxx-xxxx-xxxx-xxxx', // App password
 *   onUpdated: (data) => saveToStorage(data),
 *   onDeleted: (data) => clearStorage(data.did),
 * })
 *
 * const client = new Client(session)
 * // Use client to make authenticated requests
 * ```
 *
 * @example Resuming a persisted session
 * ```ts
 * const savedData = JSON.parse(fs.readFileSync('session.json', 'utf8'))
 * const session = await PasswordSession.resume(savedData, {
 *   onUpdated: (data) => saveToStorage(data),
 *   onDeleted: (data) => clearStorage(data.did),
 * })
 * ```
 *
 * @implements {Agent}
 */
class PasswordSession {
    options;
    /**
     * Internal {@link Agent} used for session management towards the
     * authentication service only.
     */
    #serviceAgent;
    #sessionData;
    #sessionPromise;
    constructor(sessionData, options = {}) {
        this.options = options;
        this.#serviceAgent = (0, lex_client_1.buildAgent)({
            service: sessionData.service,
            fetch: options.fetch,
        });
        this.#sessionData = sessionData;
        this.#sessionPromise = Promise.resolve(this.#sessionData);
    }
    /**
     * The DID (Decentralized Identifier) of the authenticated account.
     *
     * @throws {Error} If the session has been destroyed (logged out).
     */
    get did() {
        return this.session.did;
    }
    /**
     * The handle (username) of the authenticated account.
     *
     * @throws {Error} If the session has been destroyed (logged out).
     */
    get handle() {
        return this.session.handle;
    }
    /**
     * The current session data containing authentication credentials.
     *
     * @throws {Error} If the session has been destroyed (logged out).
     */
    get session() {
        if (this.#sessionData)
            return this.#sessionData;
        throw new Error('Logged out');
    }
    /**
     * Whether this session has been destroyed (logged out).
     *
     * Once destroyed, this session instance can no longer be used for
     * authenticated requests. Create a new session via {@link PasswordSession.login}
     * or {@link PasswordSession.resume}.
     */
    get destroyed() {
        return this.#sessionData === null;
    }
    /**
     * Handles authenticated fetch requests to the user's PDS.
     *
     * This method implements the {@link Agent} interface and is called by
     * AT Protocol clients to make authenticated requests. It automatically:
     * - Adds the access token to request headers
     * - Detects expired tokens and triggers refresh
     * - Retries requests after successful token refresh
     *
     * @param path - The request path (will be resolved against the PDS URL)
     * @param init - Standard fetch RequestInit options (headers, body, etc.)
     * @returns The fetch Response from the PDS
     * @throws {TypeError} If an 'authorization' header is already set in init
     */
    async fetchHandler(path, init) {
        const headers = new Headers(init.headers);
        if (headers.has('authorization')) {
            throw new TypeError("Unexpected 'authorization' header set");
        }
        const sessionPromise = this.#sessionPromise;
        const sessionData = await sessionPromise;
        const fetch = this.options.fetch ?? globalThis.fetch;
        headers.set('authorization', `Bearer ${sessionData.accessJwt}`);
        const initialRes = await fetch(fetchUrl(sessionData, path), {
            ...init,
            headers,
        });
        const refreshNeeded = initialRes.status === 401 ||
            (initialRes.status === 400 &&
                (await (0, util_js_1.extractXrpcErrorCode)(initialRes)) === 'ExpiredToken');
        if (!refreshNeeded) {
            return initialRes;
        }
        // Refresh session (unless it was already refreshed in the meantime)
        const newSessionPromise = this.#sessionPromise === sessionPromise
            ? this.refresh()
            : this.#sessionPromise;
        // Error should have been propagated through hooks
        const newSessionData = await newSessionPromise.catch((_err) => null);
        if (!newSessionData) {
            return initialRes;
        }
        // refresh silently failed, no point in retrying.
        if (newSessionData.accessJwt === sessionData.accessJwt) {
            return initialRes;
        }
        if (init?.signal?.aborted) {
            return initialRes;
        }
        // The stream was already consumed. We cannot retry the request. A solution
        // would be to tee() the input stream but that would bufferize the entire
        // stream in memory which can lead to memory starvation. Instead, we will
        // return the original response and let the calling code handle retries.
        if (ReadableStream && init?.body instanceof ReadableStream) {
            return initialRes;
        }
        // Make sure the initial request is cancelled to avoid leaking resources
        // (NodeJS 👀): https://undici.nodejs.org/#/?id=garbage-collection
        if (!initialRes.bodyUsed) {
            await initialRes.body?.cancel();
        }
        // Finally, retry the request with the new access token
        headers.set('authorization', `Bearer ${newSessionData.accessJwt}`);
        return fetch(fetchUrl(newSessionData, path), { ...init, headers });
    }
    /**
     * Refreshes the session by obtaining new access and refresh tokens.
     *
     * This method is automatically called by {@link fetchHandler} when the access
     * token expires. You can also call it manually to proactively refresh tokens.
     *
     * On success, the {@link PasswordSessionOptions.onUpdated} callback is invoked
     * with the new session data. On expected failures (invalid session), the
     * {@link PasswordSessionOptions.onDeleted} callback is invoked. On unexpected
     * failures (network issues), the {@link PasswordSessionOptions.onUpdateFailure}
     * callback is invoked and the existing session data is preserved.
     *
     * @returns The refreshed session data
     * @throws {RefreshFailure} If the session is no longer valid (triggers onDeleted)
     */
    async refresh() {
        this.#sessionPromise = this.#sessionPromise.then(async (sessionData) => {
            const response = await (0, lex_client_1.xrpcSafe)(this.#serviceAgent, index_js_1.com.atproto.server.refreshSession.main, { headers: { Authorization: `Bearer ${sessionData.refreshJwt}` } });
            if (!response.success && response.matchesSchemaErrors()) {
                // Expected errors that indicate the session is no longer valid
                await this.options.onDeleted?.call(this, sessionData);
                // Update the session promise to a rejected state
                this.#sessionData = null;
                throw response;
            }
            if (!response.success) {
                // We failed to refresh the token, assume the session might still be
                // valid by returning the existing session.
                await this.options.onUpdateFailure?.call(this, sessionData, response);
                return sessionData;
            }
            const data = response.body;
            // Historically, refreshSession did not return all the fields from
            // getSession. In particular, emailConfirmed and didDoc were missing.
            // Similarly, some servers might not return the didDoc in refreshSession.
            // We fetch them via getSession if missing, allowing to ensure that we are
            // always talking with the right PDS.
            if (data.emailConfirmed == null || data.didDoc == null) {
                const extraData = await (0, lex_client_1.xrpcSafe)(this.#serviceAgent, index_js_1.com.atproto.server.getSession.main, { headers: { Authorization: `Bearer ${data.accessJwt}` } });
                if (extraData.success && extraData.body.did === data.did) {
                    Object.assign(data, extraData.body);
                }
            }
            const newSession = {
                ...data,
                service: sessionData.service,
            };
            await this.options.onUpdated?.call(this, newSession);
            return (this.#sessionData = newSession);
        });
        return this.#sessionPromise;
    }
    /**
     * Logs out by deleting the session on the server.
     *
     * This method invalidates both the access and refresh tokens on the server,
     * preventing any further use of this session. After successful logout, the
     * session is marked as destroyed and the {@link PasswordSessionOptions.onDeleted}
     * callback is invoked.
     *
     * If the logout request fails due to network issues or server unavailability,
     * the {@link PasswordSessionOptions.onDeleteFailure} callback is invoked and
     * the session remains active locally. In this case, you should retry the
     * logout later to ensure the session is properly invalidated on the server.
     *
     * @throws {DeleteFailure} If the logout request fails due to unexpected errors
     */
    async logout() {
        let reason = null;
        this.#sessionPromise = this.#sessionPromise.then(async (sessionData) => {
            const result = await (0, lex_client_1.xrpcSafe)(this.#serviceAgent, index_js_1.com.atproto.server.deleteSession.main, { headers: { Authorization: `Bearer ${sessionData.refreshJwt}` } });
            if (result.success || result.matchesSchemaErrors()) {
                await this.options.onDeleted?.call(this, sessionData);
                // Update the session promise to a rejected state
                this.#sessionData = null;
                throw new Error('Logged out');
            }
            else {
                // Capture the reason for the failure to re-throw in the outer promise
                reason = result;
                // An unknown/unexpected error occurred (network, server down, etc)
                await this.options.onDeleteFailure?.call(this, sessionData, result);
                // Keep the session in an active state
                return sessionData;
            }
        });
        return this.#sessionPromise.then((_session) => {
            // If the promise above resolved, then logout failed. Re-throw the
            // reason captured earlier.
            throw reason;
        }, (_err) => {
            // Successful logout
        });
    }
    async [Symbol.asyncDispose]() {
        await this.logout();
    }
    /**
     * Creates a new account and returns an authenticated session.
     *
     * This static method registers a new account on the specified service and
     * automatically creates an authenticated session for it.
     *
     * @param body - Account creation parameters (handle, email, password, etc.)
     * @param options - Session options including the service URL
     * @returns A new PasswordSession for the created account
     * @throws If account creation fails (e.g., handle taken, invalid invite code)
     *
     * @example
     * ```ts
     * const session = await PasswordSession.createAccount(
     *   {
     *     handle: 'alice.bsky.social',
     *     email: 'alice@example.com',
     *     password: 'secure-password',
     *   },
     *   {
     *     service: 'https://bsky.social',
     *     onUpdated: (data) => saveToStorage(data),
     *   }
     * )
     * ```
     */
    static async createAccount(body, { service, headers, ...options }) {
        const response = await (0, lex_client_1.xrpc)((0, lex_client_1.buildAgent)({ service, headers, fetch: options.fetch }), index_js_1.com.atproto.server.createAccount.main, { body });
        const data = {
            ...response.body,
            service: String(service),
        };
        const agent = new PasswordSession(data, options);
        await options.onUpdated?.call(agent, data);
        return agent;
    }
    /**
     * Creates a new authenticated session using password credentials.
     *
     * This static method authenticates with the specified service and returns
     * a new PasswordSession instance that can be used for authenticated requests.
     *
     * **Security Warning:** It is strongly recommended to use app passwords instead
     * of main account credentials. App passwords can be created in your account
     * settings and provide limited access that can be revoked independently. For
     * browser-based applications, use OAuth-based authentication instead.
     *
     * @param options - Login options including service URL, identifier, and password
     * @param options.service - The AT Protocol service URL (e.g., 'https://bsky.social')
     * @param options.identifier - The user's handle or DID
     * @param options.password - The user's password or app password
     * @param options.allowTakendown - If true, allow login to takendown accounts
     * @param options.authFactorToken - 2FA token if required by the server
     * @returns A new authenticated PasswordSession
     * @throws {LexAuthFactorError} If the server requires a 2FA token
     * @throws If authentication fails (invalid credentials, etc.)
     *
     * **Basic login with app password in script**
     * @example
     * ```ts
     * // .env
     * // APP_PASSWORD_CREDENTIALS="https://<handle>:<app-password>@<pds-hosting-provider>"
     *
     * // Make sure to dispose (or logout) the session when done to avoid leaking
     * // resources and leaving orphaned sessions on the server
     * await using session = await PasswordSession.login(process.env.APP_PASSWORD_CREDENTIALS)
     *
     * // Use session to make authenticated requests
     * ```
     *
     * **Basic login with user password (not recommended!!!)**
     * @example
     * ```ts
     * const session = await PasswordSession.login({
     *   service: 'https://bsky.social',
     *   identifier: 'alice.bsky.social',
     *   password: 'xxxx',
     *   onUpdated: (data) => saveToStorage(data),
     *   onDeleted: (data) => clearStorage(data.did),
     * })
     *
     * // Next time, use resume with the persisted session data to avoid storing
     * // user credentials.
     * ```
     *
     * **Handling 2FA requirement**
     * @example
     * ```ts
     * try {
     *   const session = await PasswordSession.login({
     *     service: 'https://bsky.social',
     *     identifier: 'alice.bsky.social',
     *     password: 'xxxx',
     *   })
     * } catch (err) {
     *   if (err instanceof LexAuthFactorError) {
     *     const token = await promptUser('Enter 2FA code:')
     *     const session = await PasswordSession.login({
     *       service: 'https://bsky.social',
     *       identifier: 'alice.bsky.social',
     *       password: 'xxxx',
     *       authFactorToken: token,
     *     })
     *   }
     * }
     * ```
     */
    static async login(input) {
        const { service, identifier, password, allowTakendown, authFactorToken, ...options } = typeof input === 'string' || input instanceof URL
            ? parseLoginUrl(input)
            : input;
        const xrpcAgent = (0, lex_client_1.buildAgent)({
            service,
            fetch: options.fetch,
        });
        const response = await (0, lex_client_1.xrpcSafe)(xrpcAgent, index_js_1.com.atproto.server.createSession.main, { body: { identifier, password, allowTakendown, authFactorToken } });
        if (!response.success) {
            if (response.error === 'AuthFactorTokenRequired') {
                throw new error_js_1.LexAuthFactorError(response);
            }
            throw response.reason;
        }
        const data = {
            ...response.body,
            service: String(service),
        };
        const agent = new PasswordSession(data, options);
        await options.onUpdated?.call(agent, data);
        return agent;
    }
    /**
     * Resume an existing session, ensuring it is still valid by refreshing it.
     * Any error thrown here indicates that the session is definitely no longer
     * valid. Network errors will be propagated through the
     * {@link PasswordSessionOptions.onUpdateFailure} hook, and not re-thrown
     * here. This means that a resolved promise does not necessarily indicate a
     * valid session, only that it's refresh did not definitively fail.
     *
     * This is the same as calling {@link PasswordSession.refresh} after
     * constructing the {@link PasswordSession} manually.
     *
     * @throws If, and only if, the session is definitely no longer valid.
     */
    static async resume(data, options) {
        const agent = new PasswordSession(data, options);
        await agent.refresh();
        return agent;
    }
    /**
     * Delete a session without having to {@link resume resume()} it first, or
     * provide hooks.
     *
     * @throws In case of unexpected error (network issue, server down, etc)
     * meaning that the session may still be valid.
     */
    static async delete(data, options) {
        const agent = new PasswordSession(data, options);
        await agent.logout();
    }
}
exports.PasswordSession = PasswordSession;
function fetchUrl(sessionData, path) {
    const pdsUrl = (0, util_js_1.extractPdsUrl)(sessionData.didDoc);
    return new URL(path, pdsUrl ?? sessionData.service);
}
function parseLoginUrl(input) {
    const url = typeof input === 'string' ? new URL(input) : input;
    if (url.pathname !== '/') {
        throw new TypeError('Invalid login URL: unexpected pathname');
    }
    if (url.hash) {
        throw new TypeError('Invalid login URL: unexpected hash');
    }
    if (url.search) {
        throw new TypeError('Invalid login URL: unexpected search parameters');
    }
    if (!url.username || !url.password) {
        throw new TypeError('Invalid login URL: missing identifier or password');
    }
    return {
        service: url.origin,
        identifier: url.username,
        password: url.password,
    };
}
//# sourceMappingURL=password-session.js.map