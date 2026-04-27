"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexServerAuthError = exports.LexServerError = exports.LexError = void 0;
const lex_client_1 = require("@atproto/lex-client");
const lex_data_1 = require("@atproto/lex-data");
Object.defineProperty(exports, "LexError", { enumerable: true, get: function () { return lex_data_1.LexError; } });
const lex_schema_1 = require("@atproto/lex-schema");
const www_authenticate_js_1 = require("./lib/www-authenticate.js");
/**
 * Base error class for representing errors that should be converted to XRPC
 * error responses.
 */
class LexServerError extends lex_data_1.LexError {
    status;
    body;
    name = 'LexServerError';
    headers;
    constructor(status, body, headers, options) {
        super(body.error, body.message, options);
        this.status = status;
        this.body = body;
        this.headers = headers ? new Headers(headers) : undefined;
    }
    toJSON() {
        return this.body;
    }
    toResponse() {
        const { status, headers } = this;
        // @NOTE using this.toJSON() instead of this.body to allow overrides in subclasses
        return Response.json(this.toJSON(), { status, headers });
    }
    static from(cause) {
        if (cause instanceof LexServerError) {
            return cause;
        }
        // Convert @atproto/lex-client errors to downstream LexServerError
        if (cause instanceof lex_client_1.XrpcError) {
            const { status, body, headers } = cause.toDownstreamError();
            return new LexServerError(status, body, headers, { cause });
        }
        // Convert @atproto/lex-schema validation errors to 400 Bad Request
        if (cause instanceof lex_schema_1.LexValidationError) {
            return new LexServerError(400, cause.toJSON(), undefined, {
                cause,
            });
        }
        // Any other error is treated as a generic 500 Internal Server Error
        if (cause instanceof lex_data_1.LexError) {
            return new LexServerError(500, cause.toJSON(), undefined, {
                cause,
            });
        }
        return new LexServerError(500, { error: 'InternalServerError', message: 'An internal error occurred' }, undefined, { cause });
    }
}
exports.LexServerError = LexServerError;
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
class LexServerAuthError extends LexServerError {
    wwwAuthenticate;
    name = 'LexServerAuthError';
    /**
     * Creates a new authentication error.
     *
     * @param error - The Lexicon error code (e.g., 'AuthenticationRequired')
     * @param message - Human-readable error message
     * @param wwwAuthenticate - WWW-Authenticate header parameters
     * @param options - Standard Error options including `cause`
     */
    constructor(error, message, wwwAuthenticate = {}, options) {
        const headers = Object.keys(wwwAuthenticate).length
            ? new Headers({
                'WWW-Authenticate': (0, www_authenticate_js_1.formatWWWAuthenticateHeader)(wwwAuthenticate),
                'Access-Control-Expose-Headers': 'WWW-Authenticate', // CORS
            })
            : undefined;
        super(401, { error, message }, headers, options);
        this.wwwAuthenticate = wwwAuthenticate;
    }
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
    static from(cause, wwwAuthenticate) {
        if (cause instanceof LexServerAuthError) {
            return cause;
        }
        if (cause instanceof lex_data_1.LexError) {
            return new LexServerAuthError(cause.error, cause.message, wwwAuthenticate, { cause });
        }
        return new LexServerAuthError('AuthenticationRequired', 'Authentication failed', wwwAuthenticate, { cause });
    }
}
exports.LexServerAuthError = LexServerAuthError;
//# sourceMappingURL=errors.js.map