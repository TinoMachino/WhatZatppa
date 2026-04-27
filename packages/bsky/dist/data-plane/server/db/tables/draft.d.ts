export interface Draft {
    creator: string;
    key: string;
    createdAt: string;
    updatedAt: string;
    payload: string;
}
export declare const tableName = "draft";
export type PartialDB = {
    [tableName]: Draft;
};
//# sourceMappingURL=draft.d.ts.map