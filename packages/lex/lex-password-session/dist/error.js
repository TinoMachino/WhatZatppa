"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexAuthFactorError = void 0;
const lex_client_1 = require("@atproto/lex-client");
/**
 * Error thrown when two-factor authentication (2FA) is required.
 *
 * This error is thrown by {@link PasswordSession.login} when the server
 * requires an additional authentication factor (e.g., email code). Catch this
 * error to prompt the user for their 2FA code and retry the login with the
 * `authFactorToken` parameter.
 *
 * @example Handling 2FA requirement
 * ```ts
 * import { PasswordSession, LexAuthFactorError } from '@atproto/lex-password-session'
 *
 * try {
 *   const session = await PasswordSession.login({
 *     service: 'https://bsky.social',
 *     identifier: 'alice.bsky.social',
 *     password: 'xxxx-xxxx-xxxx-xxxx',
 *   })
 * } catch (err) {
 *   if (err instanceof LexAuthFactorError) {
 *     // Prompt user for 2FA code
 *     const token = await promptUser('Enter 2FA code from email:')
 *
 *     // Retry with the 2FA token
 *     const session = await PasswordSession.login({
 *       service: 'https://bsky.social',
 *       identifier: 'alice.bsky.social',
 *       password: 'xxxx-xxxx-xxxx-xxxx',
 *       authFactorToken: token,
 *     })
 *   }
 * }
 * ```
 *
 * @extends LexError
 */
class LexAuthFactorError extends lex_client_1.LexError {
    cause;
    name = 'LexAuthFactorError';
    /**
     * Creates a new LexAuthFactorError.
     *
     * @param cause - The underlying XRPC failure response from the server
     */
    constructor(cause) {
        super(cause.error, cause.message ?? 'Auth factor token required', { cause });
        this.cause = cause;
    }
}
exports.LexAuthFactorError = LexAuthFactorError;
//# sourceMappingURL=error.js.map