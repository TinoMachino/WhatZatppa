"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityPermission = exports.IDENTITY_ATTRIBUTES = void 0;
const parser_js_1 = require("../lib/parser.js");
const syntax_string_js_1 = require("../lib/syntax-string.js");
const syntax_js_1 = require("../lib/syntax.js");
const util_js_1 = require("../lib/util.js");
exports.IDENTITY_ATTRIBUTES = Object.freeze(['handle', '*']);
class IdentityPermission {
    constructor(attr) {
        Object.defineProperty(this, "attr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: attr
        });
    }
    matches(options) {
        return this.attr === '*' || this.attr === options.attr;
    }
    toString() {
        return IdentityPermission.parser.format(this);
    }
    static fromString(scope) {
        if (!(0, syntax_js_1.isScopeStringFor)(scope, 'identity'))
            return null;
        const syntax = syntax_string_js_1.ScopeStringSyntax.fromString(scope);
        return IdentityPermission.fromSyntax(syntax);
    }
    static fromSyntax(syntax) {
        const result = IdentityPermission.parser.parse(syntax);
        if (!result)
            return null;
        return new IdentityPermission(result.attr);
    }
    static scopeNeededFor(options) {
        return IdentityPermission.parser.format(options);
    }
}
exports.IdentityPermission = IdentityPermission;
Object.defineProperty(IdentityPermission, "parser", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new parser_js_1.Parser('identity', {
        attr: {
            multiple: false,
            required: true,
            validate: (0, util_js_1.knownValuesValidator)(exports.IDENTITY_ATTRIBUTES),
        },
    }, 'attr')
});
//# sourceMappingURL=identity-permission.js.map