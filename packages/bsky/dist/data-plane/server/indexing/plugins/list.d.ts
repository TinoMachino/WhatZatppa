import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedList = Selectable<DatabaseSchemaType['list']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.graph.list", import("@atproto/lex").Validator<Omit<app.bsky.graph.list.$defs.Main, "$type">, Omit<app.bsky.graph.list.$defs.Main, "$type">>>, IndexedList>;
export default makePlugin;
//# sourceMappingURL=list.d.ts.map