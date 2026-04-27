"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountPermission = exports.ACCOUNT_ACTIONS = exports.ACCOUNT_ATTRIBUTES = void 0;
const parser_js_1 = require("../lib/parser.js");
const syntax_string_js_1 = require("../lib/syntax-string.js");
const syntax_js_1 = require("../lib/syntax.js");
const util_js_1 = require("../lib/util.js");
exports.ACCOUNT_ATTRIBUTES = Object.freeze([
    'email',
    'repo',
    'status',
]);
exports.ACCOUNT_ACTIONS = Object.freeze(['read', 'manage']);
class AccountPermission {
    constructor(attr, action) {
        Object.defineProperty(this, "attr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: attr
        });
        Object.defineProperty(this, "action", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: action
        });
    }
    matches(options) {
        return (this.attr === options.attr &&
            (this.action.includes('manage') || this.action.includes(options.action)));
    }
    toString() {
        return AccountPermission.parser.format(this);
    }
    static fromString(scope) {
        if (!(0, syntax_js_1.isScopeStringFor)(scope, 'account'))
            return null;
        const syntax = syntax_string_js_1.ScopeStringSyntax.fromString(scope);
        return AccountPermission.fromSyntax(syntax);
    }
    static fromSyntax(syntax) {
        const result = AccountPermission.parser.parse(syntax);
        if (!result)
            return null;
        return new AccountPermission(result.attr, result.action);
    }
    static scopeNeededFor(options) {
        return AccountPermission.parser.format({
            attr: options.attr,
            action: [options.action],
        });
    }
}
exports.AccountPermission = AccountPermission;
Object.defineProperty(AccountPermission, "parser", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new parser_js_1.Parser('account', {
        attr: {
            multiple: false,
            required: true,
            validate: (0, util_js_1.knownValuesValidator)(exports.ACCOUNT_ATTRIBUTES),
        },
        action: {
            multiple: true,
            required: false,
            validate: (0, util_js_1.knownValuesValidator)(exports.ACCOUNT_ACTIONS),
            default: ['read'],
        },
    }, 'attr')
});
//# sourceMappingURL=account-permission.js.map