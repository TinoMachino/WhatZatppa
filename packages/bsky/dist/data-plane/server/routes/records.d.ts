import { ServiceImpl } from '@connectrpc/connect';
import { l } from '@atproto/lex';
import { Service } from '../../../proto/bsky_connect';
import { PostRecordMeta, Record } from '../../../proto/bsky_pb';
import { Database } from '../db';
declare const _default: (db: Database) => Partial<ServiceImpl<typeof Service>>;
export default _default;
export declare const getRecords: (db: Database, ns?: l.Main<l.RecordSchema>) => (req: {
    uris: string[];
}) => Promise<{
    records: Record[];
}>;
export declare const getPostRecords: (db: Database) => (req: {
    uris: string[];
}) => Promise<{
    records: Record[];
    meta: PostRecordMeta[];
}>;
//# sourceMappingURL=records.d.ts.map