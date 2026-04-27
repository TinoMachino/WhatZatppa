export interface Bookmark {
    creator: string;
    key: string;
    subjectUri: string;
    subjectCid: string;
    indexedAt: string;
}
export declare const tableName = "bookmark";
export type PartialDB = {
    [tableName]: Bookmark;
};
//# sourceMappingURL=bookmark.d.ts.map