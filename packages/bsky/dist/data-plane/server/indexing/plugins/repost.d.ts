import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedRepost = Selectable<DatabaseSchemaType['repost']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.feed.repost", import("@atproto/lex").Validator<Omit<app.bsky.feed.repost.$defs.Main, "$type">, Omit<app.bsky.feed.repost.$defs.Main, "$type">>>, IndexedRepost>;
export default makePlugin;
//# sourceMappingURL=repost.d.ts.map