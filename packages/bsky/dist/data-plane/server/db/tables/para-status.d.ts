export declare const tableName = "para_status";
export interface ParaStatus {
    did: string;
    uri: string;
    cid: string;
    status: string;
    party: string | null;
    community: string | null;
    createdAt: string;
    indexedAt: string;
}
export type PartialDB = {
    [tableName]: ParaStatus;
};
//# sourceMappingURL=para-status.d.ts.map