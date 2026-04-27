import { chat } from '../../../../lexicons';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"literal:self", "chat.bsky.actor.declaration", import("@atproto/lex").Validator<Omit<chat.bsky.actor.declaration.$defs.Main, "$type">, Omit<chat.bsky.actor.declaration.$defs.Main, "$type">>>, unknown>;
export default makePlugin;
//# sourceMappingURL=chat-declaration.d.ts.map