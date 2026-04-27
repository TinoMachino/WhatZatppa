import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface ParaPostMetaRecord {
    post: string;
    postType: 'policy' | 'matter' | 'meme';
    official?: boolean;
    party?: string;
    community?: string;
    category?: string;
    tags?: string[];
    flairs?: string[];
    voteScore: number;
    createdAt: string;
}
type ParaPostMeta = Selectable<DatabaseSchemaType['para_post_meta']>;
export type PluginType = RecordProcessor<ParaPostMetaRecord, ParaPostMeta>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=para-post-meta.d.ts.map