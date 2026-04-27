"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ACCESS_STANDARD = exports.ACCESS_PRIVILEGED = exports.ACCESS_FULL = exports.AuthScope = void 0;
exports.isAuthScope = isAuthScope;
exports.isAccessFull = isAccessFull;
exports.isAccessPrivileged = isAccessPrivileged;
exports.isTakendown = isTakendown;
// @TODO sync-up with current method names, consider backwards compat.
var AuthScope;
(function (AuthScope) {
    AuthScope["Access"] = "com.atproto.access";
    AuthScope["Refresh"] = "com.atproto.refresh";
    AuthScope["AppPass"] = "com.atproto.appPass";
    AuthScope["AppPassPrivileged"] = "com.atproto.appPassPrivileged";
    AuthScope["SignupQueued"] = "com.atproto.signupQueued";
    AuthScope["Takendown"] = "com.atproto.takendown";
})(AuthScope || (exports.AuthScope = AuthScope = {}));
exports.ACCESS_FULL = [AuthScope.Access];
exports.ACCESS_PRIVILEGED = [
    ...exports.ACCESS_FULL,
    AuthScope.AppPassPrivileged,
];
exports.ACCESS_STANDARD = [
    ...exports.ACCESS_PRIVILEGED,
    AuthScope.AppPass,
];
const authScopesValues = new Set(Object.values(AuthScope));
function isAuthScope(val) {
    return authScopesValues.has(val);
}
function isAccessFull(scope) {
    return exports.ACCESS_FULL.includes(scope);
}
function isAccessPrivileged(scope) {
    return exports.ACCESS_PRIVILEGED.includes(scope);
}
function isTakendown(scope) {
    return scope === AuthScope.Takendown;
}
//# sourceMappingURL=auth-scope.js.map