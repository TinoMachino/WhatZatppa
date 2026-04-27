import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface HighlightRecord {
    subjectUri: string;
    subjectCid?: string;
    text: string;
    start: number;
    end: number;
    color: string;
    tag?: string;
    community?: string;
    state?: string;
    party?: string;
    visibility: string;
    createdAt: string;
}
type HighlightAnnotation = Selectable<DatabaseSchemaType['highlight_annotation']>;
type IndexedHighlight = {
    record: HighlightAnnotation;
};
export type PluginType = RecordProcessor<HighlightRecord, IndexedHighlight>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=highlight.d.ts.map