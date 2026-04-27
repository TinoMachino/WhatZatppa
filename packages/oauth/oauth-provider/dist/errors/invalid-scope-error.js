"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidScopeError = void 0;
const authorization_error_js_1 = require("./authorization-error.js");
/**
 * @see {@link https://datatracker.ietf.org/doc/html/draft-ietf-oauth-v2-1-11#section-4.1.2.1}
 */
class InvalidScopeError extends authorization_error_js_1.AuthorizationError {
    constructor(parameters, error_description, cause) {
        super(parameters, error_description, 'invalid_scope', cause);
    }
}
exports.InvalidScopeError = InvalidScopeError;
//# sourceMappingURL=invalid-scope-error.js.map