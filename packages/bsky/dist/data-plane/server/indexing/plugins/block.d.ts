import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedBlock = Selectable<DatabaseSchemaType['actor_block']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.graph.block", import("@atproto/lex").Validator<Omit<app.bsky.graph.block.$defs.Main, "$type">, Omit<app.bsky.graph.block.$defs.Main, "$type">>>, IndexedBlock>;
export default makePlugin;
//# sourceMappingURL=block.d.ts.map