import { LexiconPermissionSet } from '@atproto/lex-document';
import { LexResolver } from '@atproto/lex-resolver';
import { IncludeScope, Nsid } from '@atproto/oauth-scopes';
import { LexiconGetter } from './lexicon-getter.js';
import { LexiconStore } from './lexicon-store.js';
export * from './lexicon-store.js';
export declare class LexiconManager {
    protected readonly lexiconGetter: LexiconGetter;
    constructor(store: LexiconStore, lexResolver: LexResolver);
    getPermissionSetsFromScope(scope?: string): Promise<Map<string, {
        type: "permission-set";
        permissions: {
            [x: string]: string | number | boolean | string[] | number[] | boolean[];
            type: "permission";
            resource: string;
        }[];
        title?: string | undefined;
        'title:lang'?: Record<string, string> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string> | undefined;
        description?: string | undefined;
    }>>;
    /**
     * Transforms a scope string from an authorization request into a scope
     * composed solely of granular permission scopes, transforming any NSID
     * into its corresponding permission scopes.
     */
    buildTokenScope(scope: string): Promise<string>;
    /**
     * Given a list of scope values, extract those that are NSIDs and return their
     * corresponding permission sets.
     */
    protected extractPermissionSets(includeScopes: IncludeScope[]): Promise<Map<string, {
        type: "permission-set";
        permissions: {
            [x: string]: string | number | boolean | string[] | number[] | boolean[];
            type: "permission";
            resource: string;
        }[];
        title?: string | undefined;
        'title:lang'?: Record<string, string> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string> | undefined;
        description?: string | undefined;
    }>>;
    protected getPermissionSets(nsids: Set<Nsid>): Promise<Map<string, {
        type: "permission-set";
        permissions: {
            [x: string]: string | number | boolean | string[] | number[] | boolean[];
            type: "permission";
            resource: string;
        }[];
        title?: string | undefined;
        'title:lang'?: Record<string, string> | undefined;
        detail?: string | undefined;
        'detail:lang'?: Record<string, string> | undefined;
        description?: string | undefined;
    }>>;
    protected getPermissionSetEntry(nsid: Nsid): Promise<[nsid: Nsid, permissionSet: LexiconPermissionSet]>;
    protected getPermissionSet(nsid: Nsid): Promise<LexiconPermissionSet>;
}
export declare function nsidToPermissionScopes(this: Map<string, LexiconPermissionSet>, includeScope: IncludeScope): string[];
//# sourceMappingURL=lexicon-manager.d.ts.map