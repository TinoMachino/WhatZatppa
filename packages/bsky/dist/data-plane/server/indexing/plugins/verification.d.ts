import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedVerification = Selectable<DatabaseSchemaType['verification']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.graph.verification", import("@atproto/lex").Validator<Omit<app.bsky.graph.verification.$defs.Main, "$type">, Omit<app.bsky.graph.verification.$defs.Main, "$type">>>, IndexedVerification>;
export default makePlugin;
//# sourceMappingURL=verification.d.ts.map