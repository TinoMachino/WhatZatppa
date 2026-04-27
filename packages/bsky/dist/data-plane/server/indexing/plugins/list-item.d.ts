import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedListItem = Selectable<DatabaseSchemaType['list_item']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.graph.listitem", import("@atproto/lex").Validator<Omit<app.bsky.graph.listitem.$defs.Main, "$type">, Omit<app.bsky.graph.listitem.$defs.Main, "$type">>>, IndexedListItem>;
export default makePlugin;
//# sourceMappingURL=list-item.d.ts.map