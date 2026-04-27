import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"literal:self", "app.bsky.actor.profile", import("@atproto/lex").Validator<Omit<app.bsky.actor.profile.$defs.Main, "$type">, Omit<app.bsky.actor.profile.$defs.Main, "$type">>>, import("../../db/tables/profile").Profile>;
export default makePlugin;
//# sourceMappingURL=profile.d.ts.map