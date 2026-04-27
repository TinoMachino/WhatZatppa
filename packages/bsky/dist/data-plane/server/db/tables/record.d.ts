import { ColumnType } from 'kysely';
export interface Record {
    uri: string;
    cid: string;
    did: string;
    json: string;
    indexedAt: string;
    takedownRef: string | null;
    tags: ColumnType<string[] | null, string | undefined, string> | null;
}
export declare const tableName = "record";
export type PartialDB = {
    [tableName]: Record;
};
//# sourceMappingURL=record.d.ts.map