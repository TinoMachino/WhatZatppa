"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlobPermission = exports.DEFAULT_ACCEPT = void 0;
const mime_js_1 = require("../lib/mime.js");
const parser_js_1 = require("../lib/parser.js");
const syntax_string_js_1 = require("../lib/syntax-string.js");
const syntax_js_1 = require("../lib/syntax.js");
exports.DEFAULT_ACCEPT = Object.freeze(['*/*']);
class BlobPermission {
    constructor(accept) {
        Object.defineProperty(this, "accept", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: accept
        });
    }
    matches(options) {
        return (0, mime_js_1.matchesAnyAccept)(this.accept, options.mime);
    }
    toString() {
        return BlobPermission.parser.format(this);
    }
    static fromString(scope) {
        if (!(0, syntax_js_1.isScopeStringFor)(scope, 'blob'))
            return null;
        const syntax = syntax_string_js_1.ScopeStringSyntax.fromString(scope);
        return BlobPermission.fromSyntax(syntax);
    }
    static fromSyntax(syntax) {
        const result = BlobPermission.parser.parse(syntax);
        if (!result)
            return null;
        return new BlobPermission(result.accept);
    }
    static scopeNeededFor(options) {
        return BlobPermission.parser.format({
            accept: [options.mime],
        });
    }
}
exports.BlobPermission = BlobPermission;
Object.defineProperty(BlobPermission, "parser", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new parser_js_1.Parser('blob', {
        accept: {
            multiple: true,
            required: true,
            validate: mime_js_1.isAccept,
            normalize: (value) => {
                // Returns a more concise representation of the accept values.
                if (value.includes('*/*'))
                    return exports.DEFAULT_ACCEPT;
                return value
                    .map(toLowerCase)
                    .filter(isNonRedundant)
                    .sort();
            },
        },
    }, 'accept')
});
function toLowerCase(value) {
    return (typeof value === 'string' ? value.toLowerCase() : value);
}
function isNonRedundant(value, index, arr) {
    if (typeof value !== 'string') {
        return true;
    }
    if (value.endsWith('/*')) {
        // assuming the array contains unique element, wildcards cannot be redundant
        // with one another ('image/*' is not redundant with 'text/*')
        return true;
    }
    const base = value.split('/', 1)[0];
    if (arr.includes(`${base}/*`)) {
        // If another value in the array is a wildcard for the same base, we can
        // skip this one as it is redundant. e.g. if the array contains 'image/png'
        // and 'image/*', we can skip 'image/png' because 'image/*' already covers
        // it.
        return false;
    }
    return true;
}
//# sourceMappingURL=blob-permission.js.map