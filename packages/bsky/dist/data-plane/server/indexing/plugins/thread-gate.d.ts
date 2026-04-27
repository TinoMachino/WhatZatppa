import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.feed.threadgate", import("@atproto/lex").Validator<Omit<app.bsky.feed.threadgate.$defs.Main, "$type">, Omit<app.bsky.feed.threadgate.$defs.Main, "$type">>>, import("../../db/tables/thread-gate").ThreadGate>;
export default makePlugin;
//# sourceMappingURL=thread-gate.d.ts.map