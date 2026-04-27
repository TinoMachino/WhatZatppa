"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorizationError = void 0;
const authorization_response_error_js_1 = require("../types/authorization-response-error.js");
const error_parser_js_1 = require("./error-parser.js");
const oauth_error_js_1 = require("./oauth-error.js");
class AuthorizationError extends oauth_error_js_1.OAuthError {
    parameters;
    constructor(parameters, error_description, error = 'invalid_request', cause) {
        super(error, error_description, 400, cause);
        this.parameters = parameters;
    }
    static from(parameters, cause) {
        if (cause instanceof AuthorizationError)
            return cause;
        const payload = (0, error_parser_js_1.buildErrorPayload)(cause);
        return new AuthorizationError(parameters, payload.error_description, (0, authorization_response_error_js_1.isAuthorizationResponseError)(payload.error)
            ? payload.error // Propagate "error" derived from the cause
            : rootCause(cause) instanceof oauth_error_js_1.OAuthError
                ? 'invalid_request'
                : 'server_error', cause);
    }
}
exports.AuthorizationError = AuthorizationError;
function rootCause(err) {
    while (err instanceof Error && err.cause != null) {
        err = err.cause;
    }
    return err;
}
//# sourceMappingURL=authorization-error.js.map