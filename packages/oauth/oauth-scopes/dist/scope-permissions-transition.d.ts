import { AccountPermissionMatch, BlobPermissionMatch, RepoPermissionMatch, RpcPermissionMatch, ScopePermissions } from './scope-permissions.js';
/**
 * Overrides the default permission set to allow transitional scopes to be used
 * in place of the generic scopes.
 */
export declare class ScopePermissionsTransition extends ScopePermissions {
    get hasTransitionGeneric(): boolean;
    get hasTransitionEmail(): boolean;
    get hasTransitionChatBsky(): boolean;
    allowsAccount(options: AccountPermissionMatch): boolean;
    allowsBlob(options: BlobPermissionMatch): boolean;
    allowsRepo(options: RepoPermissionMatch): boolean;
    allowsRpc(options: RpcPermissionMatch): boolean;
}
//# sourceMappingURL=scope-permissions-transition.d.ts.map