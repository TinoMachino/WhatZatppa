import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface CabildeoRecord {
    title: string;
    description: string;
    community: string;
    communities?: string[];
    flairs?: string[];
    region?: string;
    geoRestricted?: boolean;
    options: unknown;
    minQuorum?: number;
    phase: string;
    phaseDeadline?: string;
    createdAt: string;
}
type CabildeoCabildeo = Selectable<DatabaseSchemaType['cabildeo_cabildeo']>;
type IndexedCabildeo = {
    record: CabildeoCabildeo;
};
export type PluginType = RecordProcessor<CabildeoRecord, IndexedCabildeo>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=cabildeo.d.ts.map