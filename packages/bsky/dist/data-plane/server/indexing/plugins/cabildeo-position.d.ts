import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface PositionRecord {
    cabildeo: string;
    stance: string;
    optionIndex?: number;
    text: string;
    compassQuadrant?: string;
    createdAt: string;
}
type CabildeoPosition = Selectable<DatabaseSchemaType['cabildeo_position']>;
type IndexedPosition = {
    record: CabildeoPosition;
};
export type PluginType = RecordProcessor<PositionRecord, IndexedPosition>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=cabildeo-position.d.ts.map