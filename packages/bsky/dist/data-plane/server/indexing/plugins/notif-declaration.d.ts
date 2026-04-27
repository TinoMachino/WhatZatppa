import { app } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"literal:self", "app.bsky.notification.declaration", import("@atproto/lex").Validator<Omit<app.bsky.notification.declaration.$defs.Main, "$type">, Omit<app.bsky.notification.declaration.$defs.Main, "$type">>>, unknown>;
export default makePlugin;
//# sourceMappingURL=notif-declaration.d.ts.map