import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface DelegationRecord {
    cabildeo?: string;
    delegateTo: string;
    scopeFlairs?: string[];
    reason?: string;
    createdAt: string;
}
type CabildeoDelegation = Selectable<DatabaseSchemaType['cabildeo_delegation']>;
type IndexedDelegation = {
    record: CabildeoDelegation;
};
export type PluginType = RecordProcessor<DelegationRecord, IndexedDelegation>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=cabildeo-delegation.d.ts.map