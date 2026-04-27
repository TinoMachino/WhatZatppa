import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"tid", "app.bsky.feed.postgate", import("@atproto/lex").Validator<Omit<app.bsky.feed.postgate.$defs.Main, "$type">, Omit<app.bsky.feed.postgate.$defs.Main, "$type">>>, import("../../db/tables/post-gate").Postgate>;
export default makePlugin;
//# sourceMappingURL=post-gate.d.ts.map