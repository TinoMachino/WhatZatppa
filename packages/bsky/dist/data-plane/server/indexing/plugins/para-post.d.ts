import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface ParaPostRecord {
    text: string;
    createdAt: string;
    reply?: {
        root: {
            uri: string;
            cid: string;
        };
        parent: {
            uri: string;
            cid: string;
        };
    };
    embed?: unknown;
    langs?: string[];
    labels?: unknown;
    tags?: string[];
    flairs?: string[];
    postType?: string;
}
type ParaPost = Selectable<DatabaseSchemaType['para_post']>;
type IndexedParaPost = {
    post: ParaPost;
    facets?: {
        type: 'mention' | 'link';
        value: string;
    }[];
};
export type PluginType = RecordProcessor<ParaPostRecord, IndexedParaPost>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=para-post.d.ts.map