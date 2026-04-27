import { Insertable } from 'kysely';
import { Cid, l } from '@atproto/lex';
import { AtUri } from '@atproto/syntax';
import { BackgroundQueue } from '../background';
import { Database } from '../db';
import { DatabaseSchema } from '../db/database-schema';
import { Notification } from '../db/tables/notification';
type RecordProcessorOptions<TSchema extends l.RecordSchema, TRow> = {
    schema?: TSchema;
    lexId?: TSchema['$type'];
    insertFn: (db: DatabaseSchema, uri: AtUri, cid: Cid, obj: l.InferInput<TSchema>, timestamp: string) => Promise<TRow | null>;
    findDuplicate: (db: DatabaseSchema, uri: AtUri, obj: l.InferInput<TSchema>) => Promise<AtUri | null>;
    deleteFn: (db: DatabaseSchema, uri: AtUri) => Promise<TRow | null>;
    notifsForInsert: (obj: TRow) => Notif[];
    notifsForDelete: (prev: TRow, replacedBy: TRow | null) => {
        notifs: Notif[];
        toDelete: string[];
    };
    updateAggregates?: (db: DatabaseSchema, obj: TRow) => Promise<void>;
};
type Notif = Insertable<Notification>;
export declare class RecordProcessor<TSchema extends l.RecordSchema, TRow> {
    private appDb;
    private background;
    private options;
    constructor(appDb: Database, background: BackgroundQueue, options: RecordProcessorOptions<TSchema, TRow>);
    get db(): DatabaseSchema;
    get collection(): TSchema['$type'];
    matchesSchema<I>(obj: I): obj is I & l.InferInput<TSchema>;
    assertValidRecord(obj: unknown): asserts obj is l.InferInput<TSchema>;
    insertRecord(uri: AtUri, cid: Cid, obj: unknown, timestamp: string, opts?: {
        disableNotifs?: boolean;
    }): Promise<void>;
    updateRecord(uri: AtUri, cid: Cid, obj: unknown, timestamp: string, opts?: {
        disableNotifs?: boolean;
    }): Promise<void>;
    deleteRecord(uri: AtUri, cascading?: boolean): Promise<void>;
    handleNotifs(op: {
        deleted?: TRow;
        inserted?: TRow;
    }): Promise<void>;
    filterNotifsForThreadMutes(notifs: Notif[]): Promise<Notif[]>;
    isNotifBlockedByThreadMute(notif: Notif): Promise<boolean>;
    aggregateOnCommit(indexed: TRow): void;
}
export default RecordProcessor;
//# sourceMappingURL=processor.d.ts.map