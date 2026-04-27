"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopesSet = exports.ScopeMissingError = void 0;
const scope_missing_error_js_1 = require("./scope-missing-error.js");
Object.defineProperty(exports, "ScopeMissingError", { enumerable: true, get: function () { return scope_missing_error_js_1.ScopeMissingError; } });
const account_permission_js_1 = require("./scopes/account-permission.js");
const blob_permission_js_1 = require("./scopes/blob-permission.js");
const identity_permission_js_1 = require("./scopes/identity-permission.js");
const repo_permission_js_1 = require("./scopes/repo-permission.js");
const rpc_permission_js_1 = require("./scopes/rpc-permission.js");
/**
 * Utility class to manage a set of scopes and check if they match specific
 * options for a given resource.
 */
class ScopesSet extends Set {
    /**
     * Check if the container has a scope that matches the given options for a
     * specific resource.
     */
    matches(resource, options) {
        for (const scope of this) {
            if (permissionScopeMatches(scope, resource, options))
                return true;
        }
        return false;
    }
    assert(resource, options) {
        if (!this.matches(resource, options)) {
            const scope = scopeNeededFor(resource, options);
            throw new scope_missing_error_js_1.ScopeMissingError(scope);
        }
    }
    some(fn) {
        for (const scope of this)
            if (fn(scope))
                return true;
        return false;
    }
    every(fn) {
        for (const scope of this)
            if (!fn(scope))
                return false;
        return true;
    }
    *filter(fn) {
        for (const scope of this)
            if (fn(scope))
                yield scope;
    }
    *map(fn) {
        for (const scope of this)
            yield fn(scope);
    }
    static fromString(string) {
        return new ScopesSet(string?.split(' '));
    }
}
exports.ScopesSet = ScopesSet;
function scopeNeededFor(resource, options) {
    switch (resource) {
        case 'account':
            return account_permission_js_1.AccountPermission.scopeNeededFor(options);
        case 'identity':
            return identity_permission_js_1.IdentityPermission.scopeNeededFor(options);
        case 'repo':
            return repo_permission_js_1.RepoPermission.scopeNeededFor(options);
        case 'rpc':
            return rpc_permission_js_1.RpcPermission.scopeNeededFor(options);
        case 'blob':
            return blob_permission_js_1.BlobPermission.scopeNeededFor(options);
    }
    // @ts-expect-error
    throw new TypeError(`Unknown resource: ${resource}`);
}
function permissionScopeMatches(scope, resource, options) {
    // @NOTE we might want to cache the parsed scopes though, in practice, a
    // single scope is unlikely to be parsed multiple times during a single
    // request.
    const permission = parsePermissionScope(resource, scope);
    if (!permission)
        return false;
    // @ts-expect-error
    return permission.matches(options);
}
function parsePermissionScope(resource, scope) {
    switch (resource) {
        case 'account':
            return account_permission_js_1.AccountPermission.fromString(scope);
        case 'identity':
            return identity_permission_js_1.IdentityPermission.fromString(scope);
        case 'repo':
            return repo_permission_js_1.RepoPermission.fromString(scope);
        case 'rpc':
            return rpc_permission_js_1.RpcPermission.fromString(scope);
        case 'blob':
            return blob_permission_js_1.BlobPermission.fromString(scope);
        default:
            return null;
    }
}
//# sourceMappingURL=scopes-set.js.map