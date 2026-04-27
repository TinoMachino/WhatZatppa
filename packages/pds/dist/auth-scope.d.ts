export declare enum AuthScope {
    Access = "com.atproto.access",
    Refresh = "com.atproto.refresh",
    AppPass = "com.atproto.appPass",
    AppPassPrivileged = "com.atproto.appPassPrivileged",
    SignupQueued = "com.atproto.signupQueued",
    Takendown = "com.atproto.takendown"
}
export declare const ACCESS_FULL: readonly [AuthScope.Access];
export declare const ACCESS_PRIVILEGED: readonly [AuthScope.Access, AuthScope.AppPassPrivileged];
export declare const ACCESS_STANDARD: readonly [AuthScope.Access, AuthScope.AppPassPrivileged, AuthScope.AppPass];
export declare function isAuthScope(val: unknown): val is AuthScope;
export declare function isAccessFull(scope: AuthScope): scope is (typeof ACCESS_FULL)[number];
export declare function isAccessPrivileged(scope: AuthScope): scope is (typeof ACCESS_PRIVILEGED)[number];
export declare function isTakendown(scope: unknown): scope is AuthScope.Takendown;
//# sourceMappingURL=auth-scope.d.ts.map