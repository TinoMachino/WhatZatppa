import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedLike = Selectable<DatabaseSchemaType['like']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.feed.like", import("@atproto/lex").Validator<Omit<app.bsky.feed.like.$defs.Main, "$type">, Omit<app.bsky.feed.like.$defs.Main, "$type">>>, IndexedLike>;
export default makePlugin;
//# sourceMappingURL=like.d.ts.map