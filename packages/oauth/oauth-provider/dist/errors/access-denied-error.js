"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessDeniedError = void 0;
const authorization_error_js_1 = require("./authorization-error.js");
class AccessDeniedError extends authorization_error_js_1.AuthorizationError {
    constructor(parameters, error_description = 'Access denied', cause) {
        super(parameters, error_description, 'access_denied', cause);
    }
}
exports.AccessDeniedError = AccessDeniedError;
//# sourceMappingURL=access-denied-error.js.map