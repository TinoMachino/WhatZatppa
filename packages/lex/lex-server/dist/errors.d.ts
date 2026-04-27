import { LexError, LexErrorCode, LexErrorData } from '@atproto/lex-data';
import { WWWAuthenticate } from './lib/www-authenticate.js';
export { LexError };
export type { LexErrorCode, LexErrorData, WWWAuthenticate };
/**
 * Base error class for representing errors that should be converted to XRPC
 * error responses.
 */
export declare class LexServerError<N extends LexErrorCode = LexErrorCode> extends LexError<N> {
    readonly status: number;
    readonly body: LexErrorData<N>;
    name: string;
    readonly headers?: Headers;
    constructor(status: number, body: LexErrorData<N>, headers?: HeadersInit, options?: ErrorOptions);
    toJSON(): LexErrorData<N>;
    toResponse(): Response;
    static from(cause: unknown): LexServerError;
}
/**
 * Error class for authentication failures in XRPC server handlers.
 *
 * Extends {@link LexError} to include WWW-Authenticate header support,
 * which is required by HTTP authentication standards (RFC 7235).
 * The error automatically generates the appropriate 401 response with
 * the WWW-Authenticate header when converted to a Response.
 *
 * @typeParam N - The Lexicon error code type
 *
 * @example Throwing an auth error
 * ```typescript
 * import { LexServerAuthError } from '@atproto/lex-server'
 *
 * throw new LexServerAuthError(
 *   'AuthenticationRequired',
 *   'Invalid or expired token',
 *   { Bearer: { error: 'InvalidToken', realm: 'api.example.com' } }
 * )
 * ```
 */
export declare class LexServerAuthError<N extends LexErrorCode = LexErrorCode> extends LexServerError<N> {
    readonly wwwAuthenticate: WWWAuthenticate;
    name: string;
    /**
     * Creates a new authentication error.
     *
     * @param error - The Lexicon error code (e.g., 'AuthenticationRequired')
     * @param message - Human-readable error message
     * @param wwwAuthenticate - WWW-Authenticate header parameters
     * @param options - Standard Error options including `cause`
     */
    constructor(error: N, message: string, wwwAuthenticate?: WWWAuthenticate, options?: ErrorOptions);
    /**
     * Creates a LexServerAuthError from an existing LexError.
     *
     * If the input is already a LexServerAuthError, returns it unchanged.
     * Otherwise, wraps the error with the provided WWW-Authenticate parameters.
     *
     * @param cause - The original LexError to wrap
     * @param wwwAuthenticate - WWW-Authenticate header parameters
     * @returns A LexServerAuthError instance
     *
     * @example
     * ```typescript
     * function authenticate(token: string): Promise<User> {
     *   try {
     *     return await validateToken(token)
     *   } catch (cause) {
     *     throw LexServerAuthError.from(cause, {
     *       Bearer: { error: 'InvalidToken' }
     *     })
     *   }
     * }
     * ```
     */
    static from(cause: unknown, wwwAuthenticate?: WWWAuthenticate): LexServerAuthError;
}
//# sourceMappingURL=errors.d.ts.map