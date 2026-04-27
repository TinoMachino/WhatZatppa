import { AtprotoAudience } from '@atproto/did';
import { LexiconPermission, LexiconPermissionSet } from '../lib/lexicon.js';
import { Nsid, isNsid } from '../lib/nsid.js';
import { Parser } from '../lib/parser.js';
import { ScopeStringFor, ScopeSyntax } from '../lib/syntax.js';
import { RepoPermission } from './repo-permission.js';
import { RpcPermission } from './rpc-permission.js';
export { type LexiconPermission, type LexiconPermissionSet, type Nsid, isNsid };
/**
 * This is used to handle "include:" oauth scope values, used to include
 * permissions from a lexicon defined permission set. Not being a resource
 * permission, it does not implement `Matchable`.
 */
export declare class IncludeScope {
    readonly nsid: Nsid;
    readonly aud: undefined | AtprotoAudience;
    constructor(nsid: Nsid, aud?: undefined | AtprotoAudience);
    toString(): ScopeStringFor<"include">;
    toPermissions(permissionSet: LexiconPermissionSet): Array<RepoPermission | RpcPermission>;
    toScopes(permissionSet: LexiconPermissionSet): Array<ScopeStringFor<'repo' | 'rpc'>>;
    /**
     * Converts an "include:" to the list of permissions it includes, based on the
     * lexicon defined permission set.
     */
    buildPermissions(permissionSet: LexiconPermissionSet): Generator<RepoPermission | RpcPermission, void, unknown>;
    protected parseLexPermission(permission: LexiconPermission): ScopeSyntax<'repo' | 'rpc'> | null;
    /**
     * Verifies that a permission included through a lexicon permission set is
     * allowed in the context of the `include:` scope. This basically checks that
     * the permission is "under" the namespace authority of the `include:` scope,
     * and that it only contains "repo:", "rpc:", or "blob:" permissions.
     */
    protected isAllowedPermission(permission: RpcPermission | RepoPermission): boolean;
    /**
     * Verifies that a permission item's nsid is under the same authority as the
     * nsid of the lexicon itself (which is the same as the nsid of the `include:`
     * scope).
     */
    isParentAuthorityOf(otherNsid: '*' | Nsid): boolean;
    protected static readonly parser: Parser<"include", {
        nsid: {
            multiple: false;
            required: true;
            validate: (v: unknown) => v is Nsid;
        };
        aud: {
            multiple: false;
            required: false;
            validate: (value: unknown) => value is AtprotoAudience;
        };
    }>;
    static fromString(scope: string): IncludeScope | null;
    static fromSyntax(syntax: ScopeSyntax<'include'>): IncludeScope | null;
}
//# sourceMappingURL=include-scope.d.ts.map