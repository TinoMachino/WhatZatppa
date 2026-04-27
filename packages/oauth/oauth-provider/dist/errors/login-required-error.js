"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRequiredError = void 0;
const authorization_error_js_1 = require("./authorization-error.js");
class LoginRequiredError extends authorization_error_js_1.AuthorizationError {
    constructor(parameters, error_description = 'Login is required', cause) {
        super(parameters, error_description, 'login_required', cause);
    }
}
exports.LoginRequiredError = LoginRequiredError;
//# sourceMappingURL=login-required-error.js.map