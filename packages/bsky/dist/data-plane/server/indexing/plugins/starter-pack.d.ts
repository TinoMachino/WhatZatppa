import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedStarterPack = Selectable<DatabaseSchemaType['starter_pack']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.graph.starterpack", import("@atproto/lex").Validator<Omit<app.bsky.graph.starterpack.$defs.Main, "$type">, Omit<app.bsky.graph.starterpack.$defs.Main, "$type">>>, IndexedStarterPack>;
export default makePlugin;
//# sourceMappingURL=starter-pack.d.ts.map