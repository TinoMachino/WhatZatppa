"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATIC_SCOPE_VALUES = exports.isScopeStringFor = void 0;
exports.isStaticScopeValue = isStaticScopeValue;
exports.isAtprotoOauthScope = isAtprotoOauthScope;
exports.normalizeAtprotoOauthScope = normalizeAtprotoOauthScope;
exports.normalizeAtprotoOauthScopeValue = normalizeAtprotoOauthScopeValue;
const syntax_js_1 = require("./lib/syntax.js");
Object.defineProperty(exports, "isScopeStringFor", { enumerable: true, get: function () { return syntax_js_1.isScopeStringFor; } });
const util_js_1 = require("./lib/util.js");
const account_permission_js_1 = require("./scopes/account-permission.js");
const blob_permission_js_1 = require("./scopes/blob-permission.js");
const identity_permission_js_1 = require("./scopes/identity-permission.js");
const include_scope_js_1 = require("./scopes/include-scope.js");
const repo_permission_js_1 = require("./scopes/repo-permission.js");
const rpc_permission_js_1 = require("./scopes/rpc-permission.js");
exports.STATIC_SCOPE_VALUES = Object.freeze([
    'atproto',
    'transition:email',
    'transition:generic',
    'transition:chat.bsky',
]);
function isStaticScopeValue(value) {
    return exports.STATIC_SCOPE_VALUES.includes(value);
}
/**
 * @note This function does not only verify the scope string format (with
 * {@link isScopeStringFor}), but also checks if the provided parameters are
 * valid according to the respective scope syntax definition. This allows
 * excluding scopes that cannot be fully interpreted by the current version of
 * the code.
 */
function isAtprotoOauthScope(value) {
    return (isStaticScopeValue(value) ||
        account_permission_js_1.AccountPermission.fromString(value) != null ||
        blob_permission_js_1.BlobPermission.fromString(value) != null ||
        identity_permission_js_1.IdentityPermission.fromString(value) != null ||
        include_scope_js_1.IncludeScope.fromString(value) != null ||
        repo_permission_js_1.RepoPermission.fromString(value) != null ||
        rpc_permission_js_1.RpcPermission.fromString(value) != null);
}
function normalizeAtprotoOauthScope(scope) {
    return scope
        .split(' ')
        .map(normalizeAtprotoOauthScopeValue)
        .filter(util_js_1.isNonNullable)
        .sort()
        .join(' ');
}
function normalizeAtprotoOauthScopeValue(value) {
    if (isStaticScopeValue(value))
        return value;
    for (const Scope of [
        account_permission_js_1.AccountPermission,
        blob_permission_js_1.BlobPermission,
        identity_permission_js_1.IdentityPermission,
        include_scope_js_1.IncludeScope,
        repo_permission_js_1.RepoPermission,
        rpc_permission_js_1.RpcPermission,
    ]) {
        const parsed = Scope.fromString(value);
        if (parsed)
            return parsed.toString();
    }
    return null;
}
//# sourceMappingURL=atproto-oauth-scope.js.map