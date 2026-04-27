import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface ParaStatusRecord {
    status: string;
    party?: string;
    community?: string;
    createdAt: string;
}
type IndexedParaStatus = Selectable<DatabaseSchemaType['para_status']>;
export type PluginType = RecordProcessor<ParaStatusRecord, IndexedParaStatus>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=para-status.d.ts.map