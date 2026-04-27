"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LexPermissionSyntax = void 0;
const isArray = Array.isArray;
/**
 * Translates a {@link LexiconPermission} into a {@link ScopeSyntax}.
 */
class LexPermissionSyntax {
    constructor(lexPermission) {
        Object.defineProperty(this, "lexPermission", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: lexPermission
        });
    }
    get prefix() {
        return this.lexPermission.resource;
    }
    get positional() {
        return undefined;
    }
    get(key) {
        // Ignore reserved keywords
        if (key === 'type')
            return undefined;
        if (key === 'resource')
            return undefined;
        // Ignore inherited properties (toString(), etc.)
        if (!Object.hasOwn(this.lexPermission, key))
            return undefined;
        return this.lexPermission[key];
    }
    *keys() {
        for (const key of Object.keys(this.lexPermission)) {
            if (this.get(key) !== undefined)
                yield key;
        }
    }
    getSingle(key) {
        const value = this.get(key);
        if (isArray(value))
            return null;
        return value;
    }
    getMulti(key) {
        const value = this.get(key);
        if (value === undefined)
            return undefined;
        if (!isArray(value))
            return null;
        return value;
    }
    toJSON() {
        return this.lexPermission;
    }
}
exports.LexPermissionSyntax = LexPermissionSyntax;
//# sourceMappingURL=syntax-lexicon.js.map