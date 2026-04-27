import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedFeedGenerator = Selectable<DatabaseSchemaType['feed_generator']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"any", "app.bsky.feed.generator", import("@atproto/lex").Validator<Omit<app.bsky.feed.generator.$defs.Main, "$type">, Omit<app.bsky.feed.generator.$defs.Main, "$type">>>, IndexedFeedGenerator>;
export default makePlugin;
//# sourceMappingURL=feed-generator.d.ts.map