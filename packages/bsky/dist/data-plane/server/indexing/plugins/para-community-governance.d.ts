import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { RecordProcessor } from '../processor';
type GovernanceRecord = Record<string, unknown>;
export type PluginType = RecordProcessor<GovernanceRecord, GovernanceRecord>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=para-community-governance.d.ts.map