import { Selectable } from 'kysely';
import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
type IndexedLabeler = Selectable<DatabaseSchemaType['labeler']>;
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"literal:self", "app.bsky.labeler.service", import("@atproto/lex").Validator<Omit<app.bsky.labeler.service.$defs.Main, "$type">, Omit<app.bsky.labeler.service.$defs.Main, "$type">>>, IndexedLabeler>;
export default makePlugin;
//# sourceMappingURL=labeler.d.ts.map