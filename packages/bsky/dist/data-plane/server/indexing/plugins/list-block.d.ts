import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedListBlock = Selectable<DatabaseSchemaType['list_block']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.graph.listblock", import("@atproto/lex").Validator<Omit<app.bsky.graph.listblock.$defs.Main, "$type">, Omit<app.bsky.graph.listblock.$defs.Main, "$type">>>, IndexedListBlock>;
export default makePlugin;
//# sourceMappingURL=list-block.d.ts.map