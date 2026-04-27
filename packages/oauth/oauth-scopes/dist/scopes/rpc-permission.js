"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcPermission = exports.isAudParam = exports.isLxmParam = exports.isNsid = exports.isAtprotoAudience = void 0;
const did_1 = require("@atproto/did");
Object.defineProperty(exports, "isAtprotoAudience", { enumerable: true, get: function () { return did_1.isAtprotoAudience; } });
const nsid_js_1 = require("../lib/nsid.js");
Object.defineProperty(exports, "isNsid", { enumerable: true, get: function () { return nsid_js_1.isNsid; } });
const parser_js_1 = require("../lib/parser.js");
const syntax_string_js_1 = require("../lib/syntax-string.js");
const syntax_js_1 = require("../lib/syntax.js");
const isLxmParam = (value) => value === '*' || (0, nsid_js_1.isNsid)(value);
exports.isLxmParam = isLxmParam;
const isAudParam = (value) => value === '*' || (0, did_1.isAtprotoAudience)(value);
exports.isAudParam = isAudParam;
class RpcPermission {
    constructor(aud, lxm) {
        Object.defineProperty(this, "aud", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: aud
        });
        Object.defineProperty(this, "lxm", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: lxm
        });
    }
    matches(options) {
        const { aud, lxm } = this;
        return ((aud === '*' || aud === options.aud) &&
            (lxm.includes('*') || lxm.includes(options.lxm)));
    }
    toString() {
        return RpcPermission.parser.format(this);
    }
    static fromString(scope) {
        if (!(0, syntax_js_1.isScopeStringFor)(scope, 'rpc'))
            return null;
        const syntax = syntax_string_js_1.ScopeStringSyntax.fromString(scope);
        return RpcPermission.fromSyntax(syntax);
    }
    static fromSyntax(syntax) {
        const result = RpcPermission.parser.parse(syntax);
        if (!result)
            return null;
        // rpc:*?aud=* is forbidden
        if (result.aud === '*' && result.lxm.includes('*'))
            return null;
        return new RpcPermission(result.aud, result.lxm);
    }
    static scopeNeededFor(options) {
        return RpcPermission.parser.format({
            aud: options.aud,
            lxm: [options.lxm],
        });
    }
}
exports.RpcPermission = RpcPermission;
Object.defineProperty(RpcPermission, "parser", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new parser_js_1.Parser('rpc', {
        lxm: {
            multiple: true,
            required: true,
            validate: exports.isLxmParam,
            normalize: (value) => value.length > 1 && value.includes('*')
                ? ['*']
                : [...new Set(value)].sort(),
        },
        aud: {
            multiple: false,
            required: true,
            validate: exports.isAudParam,
        },
    }, 'lxm')
});
//# sourceMappingURL=rpc-permission.js.map