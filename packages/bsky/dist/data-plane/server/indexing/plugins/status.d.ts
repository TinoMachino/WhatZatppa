import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"literal:self", "app.bsky.actor.status", import("@atproto/lex").Validator<Omit<app.bsky.actor.status.$defs.Main, "$type">, Omit<app.bsky.actor.status.$defs.Main, "$type">>>, unknown>;
export default makePlugin;
//# sourceMappingURL=status.d.ts.map