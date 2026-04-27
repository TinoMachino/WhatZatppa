export interface PrivateData {
    actorDid: string;
    namespace: string;
    key: string;
    payload: string;
    indexedAt: string;
    updatedAt: string;
}
export declare const tableName = "private_data";
export type PartialDB = {
    [tableName]: PrivateData;
};
//# sourceMappingURL=private-data.d.ts.map