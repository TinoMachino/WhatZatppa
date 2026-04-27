import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface ParaCommunityBoardRecord {
    name: string;
    description?: string;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    createdAt: string;
}
type IndexedParaCommunityBoard = Selectable<DatabaseSchemaType['para_community_board']>;
export type PluginType = RecordProcessor<ParaCommunityBoardRecord, IndexedParaCommunityBoard>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=para-community-board.d.ts.map