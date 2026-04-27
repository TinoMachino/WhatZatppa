"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountSelectionRequiredError = void 0;
const authorization_error_js_1 = require("./authorization-error.js");
class AccountSelectionRequiredError extends authorization_error_js_1.AuthorizationError {
    constructor(parameters, error_description = 'Account selection required', cause) {
        super(parameters, error_description, 'account_selection_required', cause);
    }
}
exports.AccountSelectionRequiredError = AccountSelectionRequiredError;
//# sourceMappingURL=account-selection-required-error.js.map