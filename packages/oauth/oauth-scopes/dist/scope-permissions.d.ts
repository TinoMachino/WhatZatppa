import { AccountPermissionMatch } from './scopes/account-permission.js';
import { BlobPermissionMatch } from './scopes/blob-permission.js';
import { IdentityPermissionMatch } from './scopes/identity-permission.js';
import { RepoPermissionMatch } from './scopes/repo-permission.js';
import { RpcPermissionMatch } from './scopes/rpc-permission.js';
import { ScopesSet } from './scopes-set.js';
export type { AccountPermissionMatch, BlobPermissionMatch, IdentityPermissionMatch, RepoPermissionMatch, RpcPermissionMatch, };
export declare class ScopePermissions {
    readonly scopes: ScopesSet;
    constructor(scope?: null | string | Iterable<string>);
    allowsAccount(options: AccountPermissionMatch): boolean;
    assertAccount(options: AccountPermissionMatch): void;
    allowsIdentity(options: IdentityPermissionMatch): boolean;
    assertIdentity(options: IdentityPermissionMatch): void;
    allowsBlob(options: BlobPermissionMatch): boolean;
    assertBlob(options: BlobPermissionMatch): void;
    allowsRepo(options: RepoPermissionMatch): boolean;
    assertRepo(options: RepoPermissionMatch): void;
    allowsRpc(options: RpcPermissionMatch): boolean;
    assertRpc(options: RpcPermissionMatch): void;
}
//# sourceMappingURL=scope-permissions.d.ts.map