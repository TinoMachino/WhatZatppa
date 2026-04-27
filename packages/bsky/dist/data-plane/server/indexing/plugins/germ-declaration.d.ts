import { com } from '../../../../lexicons/index.js';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
export type PluginType = ReturnType<typeof makePlugin>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => RecordProcessor<import("@atproto/lex").RecordSchema<"literal:self", "com.germnetwork.declaration", import("@atproto/lex").Validator<Omit<com.germnetwork.declaration.$defs.Main, "$type">, Omit<com.germnetwork.declaration.$defs.Main, "$type">>>, unknown>;
export default makePlugin;
//# sourceMappingURL=germ-declaration.d.ts.map