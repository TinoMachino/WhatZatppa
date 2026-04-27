"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScopePermissions = void 0;
const scope_missing_error_js_1 = require("./scope-missing-error.js");
const account_permission_js_1 = require("./scopes/account-permission.js");
const blob_permission_js_1 = require("./scopes/blob-permission.js");
const identity_permission_js_1 = require("./scopes/identity-permission.js");
const repo_permission_js_1 = require("./scopes/repo-permission.js");
const rpc_permission_js_1 = require("./scopes/rpc-permission.js");
const scopes_set_js_1 = require("./scopes-set.js");
class ScopePermissions {
    constructor(scope) {
        Object.defineProperty(this, "scopes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.scopes = new scopes_set_js_1.ScopesSet(!scope // "" | null | undefined
            ? undefined
            : typeof scope === 'string'
                ? scope.split(' ')
                : scope);
    }
    allowsAccount(options) {
        return this.scopes.matches('account', options);
    }
    assertAccount(options) {
        if (!this.allowsAccount(options)) {
            const scope = account_permission_js_1.AccountPermission.scopeNeededFor(options);
            throw new scope_missing_error_js_1.ScopeMissingError(scope);
        }
    }
    allowsIdentity(options) {
        return this.scopes.matches('identity', options);
    }
    assertIdentity(options) {
        if (!this.allowsIdentity(options)) {
            const scope = identity_permission_js_1.IdentityPermission.scopeNeededFor(options);
            throw new scope_missing_error_js_1.ScopeMissingError(scope);
        }
    }
    allowsBlob(options) {
        return this.scopes.matches('blob', options);
    }
    assertBlob(options) {
        if (!this.allowsBlob(options)) {
            const scope = blob_permission_js_1.BlobPermission.scopeNeededFor(options);
            throw new scope_missing_error_js_1.ScopeMissingError(scope);
        }
    }
    allowsRepo(options) {
        return this.scopes.matches('repo', options);
    }
    assertRepo(options) {
        if (!this.allowsRepo(options)) {
            const scope = repo_permission_js_1.RepoPermission.scopeNeededFor(options);
            throw new scope_missing_error_js_1.ScopeMissingError(scope);
        }
    }
    allowsRpc(options) {
        return this.scopes.matches('rpc', options);
    }
    assertRpc(options) {
        if (!this.allowsRpc(options)) {
            const scope = rpc_permission_js_1.RpcPermission.scopeNeededFor(options);
            throw new scope_missing_error_js_1.ScopeMissingError(scope);
        }
    }
}
exports.ScopePermissions = ScopePermissions;
//# sourceMappingURL=scope-permissions.js.map