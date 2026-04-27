"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RepoPermission = exports.isCollectionParam = exports.isRepoAction = exports.REPO_ACTIONS = exports.isNsid = void 0;
const nsid_js_1 = require("../lib/nsid.js");
Object.defineProperty(exports, "isNsid", { enumerable: true, get: function () { return nsid_js_1.isNsid; } });
const parser_js_1 = require("../lib/parser.js");
const syntax_string_js_1 = require("../lib/syntax-string.js");
const syntax_js_1 = require("../lib/syntax.js");
const util_js_1 = require("../lib/util.js");
exports.REPO_ACTIONS = Object.freeze([
    'create',
    'update',
    'delete',
]);
exports.isRepoAction = (0, util_js_1.knownValuesValidator)(exports.REPO_ACTIONS);
const isCollectionParam = (value) => value === '*' || (0, nsid_js_1.isNsid)(value);
exports.isCollectionParam = isCollectionParam;
class RepoPermission {
    constructor(collection, action) {
        Object.defineProperty(this, "collection", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: collection
        });
        Object.defineProperty(this, "action", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: action
        });
    }
    matches({ action, collection }) {
        return (this.action.includes(action) &&
            (this.collection.includes('*') ||
                this.collection.includes(collection)));
    }
    toString() {
        return RepoPermission.parser.format(this);
    }
    static fromString(scope) {
        if (!(0, syntax_js_1.isScopeStringFor)(scope, 'repo'))
            return null;
        const syntax = syntax_string_js_1.ScopeStringSyntax.fromString(scope);
        return RepoPermission.fromSyntax(syntax);
    }
    static fromSyntax(syntax) {
        const result = RepoPermission.parser.parse(syntax);
        if (!result)
            return null;
        return new RepoPermission(result.collection, result.action);
    }
    static scopeNeededFor(options) {
        return RepoPermission.parser.format({
            collection: [options.collection],
            action: [options.action],
        });
    }
}
exports.RepoPermission = RepoPermission;
Object.defineProperty(RepoPermission, "parser", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new parser_js_1.Parser('repo', {
        collection: {
            multiple: true,
            required: true,
            validate: exports.isCollectionParam,
            normalize: (value) => {
                if (value.length > 1) {
                    if (value.includes('*'))
                        return ['*'];
                    return [...new Set(value)].sort();
                }
                return value;
            },
        },
        action: {
            multiple: true,
            required: false,
            validate: exports.isRepoAction,
            default: exports.REPO_ACTIONS,
            normalize: (value) => {
                return value === exports.REPO_ACTIONS
                    ? exports.REPO_ACTIONS // No need to filter if the default was used
                    : exports.REPO_ACTIONS.filter(includedIn, value);
            },
        },
    }, 'collection')
});
/**
 * Special utility function to be used as predicate for array methods like
 * `Array.prototype.includes`, etc. When used as predicate, it expects that
 * the array method is called with a `thisArg` that is a readonly array of
 * the same type as the `value` parameter.
 */
function includedIn(value) {
    return this.includes(value);
}
//# sourceMappingURL=repo-permission.js.map