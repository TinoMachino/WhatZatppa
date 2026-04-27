"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isScopeStringFor = isScopeStringFor;
exports.isScopeSyntaxFor = isScopeSyntaxFor;
/**
 * Allows to quickly check if a scope is for a specific resource.
 */
function isScopeStringFor(value, prefix) {
    if (value.length > prefix.length) {
        // First, check the next char is either : or ?
        const nextChar = value.charCodeAt(prefix.length);
        if (nextChar !== 0x3a /* : */ && nextChar !== 0x3f /* ? */) {
            return false;
        }
        // Then check the full prefix
        return value.startsWith(prefix);
    }
    else {
        // value and prefix must be equal
        return value === prefix;
    }
}
function isScopeSyntaxFor(syntax, prefix) {
    return syntax.prefix === prefix;
}
//# sourceMappingURL=syntax.js.map