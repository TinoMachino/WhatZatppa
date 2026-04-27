import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedFollow = Selectable<DatabaseSchemaType['follow']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.graph.follow", import("@atproto/lex").Validator<Omit<app.bsky.graph.follow.$defs.Main, "$type">, Omit<app.bsky.graph.follow.$defs.Main, "$type">>>, IndexedFollow>;
export default makePlugin;
//# sourceMappingURL=follow.d.ts.map