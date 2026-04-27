import { Agent, XrpcFailure } from '@atproto/lex-client';
import { com } from './lexicons/index.js';
/**
 * Represents a failure response when refreshing a session.
 *
 * This type captures the possible error responses from
 * `com.atproto.server.refreshSession`, including both expected errors
 * (e.g., invalid/expired refresh token) and unexpected errors (e.g., network issues).
 */
export type RefreshFailure = XrpcFailure<typeof com.atproto.server.refreshSession.main>;
/**
 * Represents a failure response when deleting a session.
 *
 * This type captures the possible error responses from
 * `com.atproto.server.deleteSession`, including both expected errors
 * and unexpected errors (e.g., network issues, server unavailability).
 */
export type DeleteFailure = XrpcFailure<typeof com.atproto.server.deleteSession.main>;
/**
 * Persisted session data containing authentication credentials and service information.
 *
 * This type extends the response from `com.atproto.server.createSession` with the
 * service URL used for authentication. Store this data securely to resume sessions
 * later without re-authenticating.
 */
export type SessionData = com.atproto.server.createSession.$OutputBody & {
    service: string;
};
export type LoginOptions = PasswordSessionOptions & {
    service: string | URL;
    identifier: string;
    password: string;
    allowTakendown?: boolean;
    authFactorToken?: string;
};
export type PasswordSessionOptions = {
    /**
     * Custom fetch implementation to use for network requests
     */
    fetch?: typeof globalThis.fetch;
    /**
     * Called whenever the session is successfully created/refreshed, and new
     * credentials have been obtained. Use this hook to persist the updated
     * session information.
     *
     * If this callback returns a promise, this function will never be called
     * again (on the same process) until the promise resolves.
     *
     * @note this function **must** not throw
     */
    onUpdated?: (this: PasswordSession, data: SessionData) => void | Promise<void>;
    /**
     * Called whenever the session update fails due to an expected error, such as
     * a network issue or server unavailability. This function can be used to log
     * the error or notify the user, but should not assume that the session is
     * invalid.
     *
     * @note this function **must** not throw
     */
    onUpdateFailure?: (this: PasswordSession, data: SessionData, err: RefreshFailure) => void | Promise<void>;
    /**
     * Called whenever the session is deleted, either due to an explicit logout or
     * because the refresh operation indicated that the session is no longer
     * valid. Use this hook to clean up any persisted session information and
     * update the application state accordingly.
     *
     * @note this function **must** not throw
     */
    onDeleted?: (this: PasswordSession, data: SessionData) => void | Promise<void>;
    /**
     * Called whenever a session deletion fails due to an unexpected error, such
     * as a network issue or server unavailability. This function can be used to
     * log the error or notify the user. When this function is called, the session
     * might still be valid on the server. It is up to the implementation to
     * decide whether to retry the deletion or keep the session active. Ignoring
     * these errors is not recommended as it can lead to orphaned sessions on the
     * server, or security issues if the user believes they have logged out when a
     * bad actor is still using the session. The implementation should consider
     * keeping track of failed deletions and retrying them later, until they
     * succeed.
     *
     * @note this function **must** not throw
     */
    onDeleteFailure?: (this: PasswordSession, data: SessionData, err: DeleteFailure) => void | Promise<void>;
};
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
export declare class PasswordSession implements Agent, AsyncDisposable {
    #private;
    protected readonly options: PasswordSessionOptions;
    constructor(sessionData: SessionData, options?: PasswordSessionOptions);
    /**
     * The DID (Decentralized Identifier) of the authenticated account.
     *
     * @throws {Error} If the session has been destroyed (logged out).
     */
    get did(): `did:${string}:${string}`;
    /**
     * The handle (username) of the authenticated account.
     *
     * @throws {Error} If the session has been destroyed (logged out).
     */
    get handle(): `${string}.${string}`;
    /**
     * The current session data containing authentication credentials.
     *
     * @throws {Error} If the session has been destroyed (logged out).
     */
    get session(): SessionData;
    /**
     * Whether this session has been destroyed (logged out).
     *
     * Once destroyed, this session instance can no longer be used for
     * authenticated requests. Create a new session via {@link PasswordSession.login}
     * or {@link PasswordSession.resume}.
     */
    get destroyed(): boolean;
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
    fetchHandler(path: string, init: RequestInit): Promise<Response>;
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
    refresh(): Promise<SessionData>;
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
    logout(): Promise<void>;
    [Symbol.asyncDispose](): Promise<void>;
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
    static createAccount(body: com.atproto.server.createAccount.$InputBody, { service, headers, ...options }: PasswordSessionOptions & {
        headers?: HeadersInit;
        service: string | URL;
    }): Promise<PasswordSession>;
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
    static login(input: string | URL | LoginOptions): Promise<PasswordSession>;
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
    static resume(data: SessionData, options: PasswordSessionOptions): Promise<PasswordSession>;
    /**
     * Delete a session without having to {@link resume resume()} it first, or
     * provide hooks.
     *
     * @throws In case of unexpected error (network issue, server down, etc)
     * meaning that the session may still be valid.
     */
    static delete(data: SessionData, options?: PasswordSessionOptions): Promise<void>;
}
//# sourceMappingURL=password-session.d.ts.map