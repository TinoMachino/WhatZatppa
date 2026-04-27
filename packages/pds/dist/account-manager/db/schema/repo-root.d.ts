import { DatetimeString } from '@atproto/lex';
export interface RepoRoot {
    did: string;
    cid: string;
    rev: string;
    indexedAt: DatetimeString;
}
export declare const tableName = "repo_root";
export type PartialDB = {
    [tableName]: RepoRoot;
};
//# sourceMappingURL=repo-root.d.ts.map