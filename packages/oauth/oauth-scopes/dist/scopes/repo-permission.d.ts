import { Nsid, isNsid } from '../lib/nsid.js';
import { Parser } from '../lib/parser.js';
import { ResourcePermission } from '../lib/resource-permission.js';
import { NeArray, NeRoArray, ScopeSyntax } from '../lib/syntax.js';
export { type Nsid, isNsid };
export declare const REPO_ACTIONS: readonly ["create", "update", "delete"];
export type RepoAction = (typeof REPO_ACTIONS)[number];
export declare const isRepoAction: (value: unknown) => value is "delete" | "create" | "update";
export type CollectionParam = '*' | Nsid;
export declare const isCollectionParam: (value: unknown) => value is CollectionParam;
export type RepoPermissionMatch = {
    collection: string;
    action: RepoAction;
};
export declare class RepoPermission implements ResourcePermission<'repo', RepoPermissionMatch> {
    readonly collection: NeRoArray<'*' | Nsid>;
    readonly action: NeRoArray<RepoAction>;
    constructor(collection: NeRoArray<'*' | Nsid>, action: NeRoArray<RepoAction>);
    matches({ action, collection }: RepoPermissionMatch): boolean;
    toString(): import("../lib/syntax.js").ScopeStringFor<"repo">;
    protected static readonly parser: Parser<"repo", {
        collection: {
            multiple: true;
            required: true;
            validate: (value: unknown) => value is CollectionParam;
            normalize: (value: NeRoArray<import("../lib/syntax.js").ParamValue>) => readonly ["*"] | NeArray<`${string}.${string}.${string}`> | ["*" | `${string}.${string}.${string}`];
        };
        action: {
            multiple: true;
            required: false;
            validate: (value: unknown) => value is "delete" | "create" | "update";
            default: readonly ["create", "update", "delete"];
            normalize: (value: NeRoArray<import("../lib/syntax.js").ParamValue>) => readonly ["create", "update", "delete"] | NeArray<"delete" | "create" | "update">;
        };
    }>;
    static fromString(scope: string): RepoPermission | null;
    static fromSyntax(syntax: ScopeSyntax<'repo'>): RepoPermission | null;
    static scopeNeededFor(options: RepoPermissionMatch): string;
}
//# sourceMappingURL=repo-permission.d.ts.map