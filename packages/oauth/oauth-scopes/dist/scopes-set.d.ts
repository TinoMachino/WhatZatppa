import { ScopeMissingError } from './scope-missing-error.js';
import { AccountPermissionMatch } from './scopes/account-permission.js';
import { BlobPermissionMatch } from './scopes/blob-permission.js';
import { IdentityPermissionMatch } from './scopes/identity-permission.js';
import { RepoPermissionMatch } from './scopes/repo-permission.js';
import { RpcPermissionMatch } from './scopes/rpc-permission.js';
export { ScopeMissingError };
export type ScopeMatchingOptionsByResource = {
    account: AccountPermissionMatch;
    identity: IdentityPermissionMatch;
    repo: RepoPermissionMatch;
    rpc: RpcPermissionMatch;
    blob: BlobPermissionMatch;
};
/**
 * Utility class to manage a set of scopes and check if they match specific
 * options for a given resource.
 */
export declare class ScopesSet extends Set<string> {
    /**
     * Check if the container has a scope that matches the given options for a
     * specific resource.
     */
    matches<R extends keyof ScopeMatchingOptionsByResource>(resource: R, options: ScopeMatchingOptionsByResource[R]): boolean;
    assert<R extends keyof ScopeMatchingOptionsByResource>(resource: R, options: ScopeMatchingOptionsByResource[R]): void;
    some(fn: (scope: string) => boolean): boolean;
    every(fn: (scope: string) => boolean): boolean;
    filter(fn: (scope: string) => boolean): Generator<string, void, unknown>;
    map<O>(fn: (scope: string) => O): Generator<O, void, unknown>;
    static fromString(string?: string): ScopesSet;
}
//# sourceMappingURL=scopes-set.d.ts.map