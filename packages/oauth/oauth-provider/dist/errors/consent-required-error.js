"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsentRequiredError = void 0;
const authorization_error_js_1 = require("./authorization-error.js");
class ConsentRequiredError extends authorization_error_js_1.AuthorizationError {
    constructor(parameters, error_description = 'User consent required', cause) {
        super(parameters, error_description, 'consent_required', cause);
    }
}
exports.ConsentRequiredError = ConsentRequiredError;
//# sourceMappingURL=consent-required-error.js.map