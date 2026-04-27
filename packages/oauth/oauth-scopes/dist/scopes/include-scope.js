"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncludeScope = exports.isNsid = void 0;
const did_1 = require("@atproto/did");
const nsid_js_1 = require("../lib/nsid.js");
Object.defineProperty(exports, "isNsid", { enumerable: true, get: function () { return nsid_js_1.isNsid; } });
const parser_js_1 = require("../lib/parser.js");
const syntax_lexicon_js_1 = require("../lib/syntax-lexicon.js");
const syntax_string_js_1 = require("../lib/syntax-string.js");
const syntax_js_1 = require("../lib/syntax.js");
const repo_permission_js_1 = require("./repo-permission.js");
const rpc_permission_js_1 = require("./rpc-permission.js");
/**
 * This is used to handle "include:" oauth scope values, used to include
 * permissions from a lexicon defined permission set. Not being a resource
 * permission, it does not implement `Matchable`.
 */
class IncludeScope {
    constructor(nsid, aud = undefined) {
        Object.defineProperty(this, "nsid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: nsid
        });
        Object.defineProperty(this, "aud", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: aud
        });
    }
    toString() {
        return IncludeScope.parser.format(this);
    }
    toPermissions(permissionSet) {
        return Array.from(this.buildPermissions(permissionSet));
    }
    toScopes(permissionSet) {
        return Array.from(this.buildPermissions(permissionSet), (p) => p.toString());
    }
    /**
     * Converts an "include:" to the list of permissions it includes, based on the
     * lexicon defined permission set.
     */
    *buildPermissions(permissionSet) {
        for (const lexPermission of permissionSet.permissions) {
            const syntax = this.parseLexPermission(lexPermission);
            if (!syntax)
                continue;
            const resourcePermission = toResourcePermission(syntax);
            if (!resourcePermission)
                continue;
            if (this.isAllowedPermission(resourcePermission)) {
                yield resourcePermission;
            }
        }
    }
    parseLexPermission(permission) {
        // This function converts permissions listed in the permission set into
        // their respective ScopeSyntax representations, handling special cases as
        // needed.
        if (isLexPermissionForResource(permission, 'repo')) {
            return new syntax_lexicon_js_1.LexPermissionSyntax(permission);
        }
        if (isLexPermissionForResource(permission, 'rpc')) {
            // "rpc" permissions with a defined audience are not allowed in permission
            // sets
            if (permission.aud !== undefined && permission.aud !== '*') {
                return null;
            }
            // "rpc" permissions can "inherit" their audience from "aud" param defined
            // in the "include:<nsid>?aud=<audience>" scope the permission set was
            // loaded from.
            if (permission.inheritAud === true &&
                permission.aud === undefined &&
                this.aud !== undefined) {
                const { inheritAud, ...rest } = permission;
                return new syntax_lexicon_js_1.LexPermissionSyntax({ aud: this.aud, ...rest });
            }
            return new syntax_lexicon_js_1.LexPermissionSyntax(permission);
        }
        return null;
    }
    /**
     * Verifies that a permission included through a lexicon permission set is
     * allowed in the context of the `include:` scope. This basically checks that
     * the permission is "under" the namespace authority of the `include:` scope,
     * and that it only contains "repo:", "rpc:", or "blob:" permissions.
     */
    isAllowedPermission(permission) {
        if (permission instanceof rpc_permission_js_1.RpcPermission) {
            return permission.lxm.every(this.isParentAuthorityOf, this);
        }
        if (permission instanceof repo_permission_js_1.RepoPermission) {
            return permission.collection.every(this.isParentAuthorityOf, this);
        }
        throw new TypeError(`Unexpected permission ${permission}`);
    }
    /**
     * Verifies that a permission item's nsid is under the same authority as the
     * nsid of the lexicon itself (which is the same as the nsid of the `include:`
     * scope).
     */
    isParentAuthorityOf(otherNsid) {
        if (otherNsid === '*') {
            return false;
        }
        const lexiconNsid = this.nsid;
        const groupPrefixEnd = lexiconNsid.lastIndexOf('.');
        // There should always be a dot, but since this is a security feature, let's
        // be strict about it.
        if (groupPrefixEnd === -1) {
            throw new TypeError('Dot character (".") missing from lexicon NSID');
        }
        // Make sure that otherNsid is at least as long as the "group prefix"
        if (groupPrefixEnd >= otherNsid.length - 1) {
            return false;
        }
        // Make sure that the "otherNsid" starts with the group of the lexiconNsid,
        // up to the dot itself. We check in reverse order as nsids tend to have
        // long common prefixes.
        for (let i = groupPrefixEnd; i >= 0; i--) {
            if (lexiconNsid.charCodeAt(i) !== otherNsid.charCodeAt(i)) {
                return false;
            }
        }
        return true;
    }
    static fromString(scope) {
        if (!(0, syntax_js_1.isScopeStringFor)(scope, 'include'))
            return null;
        const syntax = syntax_string_js_1.ScopeStringSyntax.fromString(scope);
        return IncludeScope.fromSyntax(syntax);
    }
    static fromSyntax(syntax) {
        const result = IncludeScope.parser.parse(syntax);
        if (!result)
            return null;
        return new IncludeScope(result.nsid, result.aud);
    }
}
exports.IncludeScope = IncludeScope;
Object.defineProperty(IncludeScope, "parser", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new parser_js_1.Parser('include', {
        nsid: {
            multiple: false,
            required: true,
            validate: nsid_js_1.isNsid,
        },
        aud: {
            multiple: false,
            required: false,
            validate: did_1.isAtprotoAudience,
        },
    }, 'nsid')
});
function toResourcePermission(syntax) {
    if ((0, syntax_js_1.isScopeSyntaxFor)(syntax, 'repo')) {
        return repo_permission_js_1.RepoPermission.fromSyntax(syntax);
    }
    if ((0, syntax_js_1.isScopeSyntaxFor)(syntax, 'rpc')) {
        return rpc_permission_js_1.RpcPermission.fromSyntax(syntax);
    }
    return null;
}
function isLexPermissionForResource(permission, type) {
    return permission.resource === type;
}
//# sourceMappingURL=include-scope.js.map