import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface VoteRecord {
    subject?: string;
    subjectType?: string;
    cabildeo?: string;
    selectedOption?: number;
    signal?: number;
    reason?: string;
    isDirect: boolean;
    delegatedFrom?: string[];
    createdAt: string;
}
type CabildeoVote = Selectable<DatabaseSchemaType['cabildeo_vote']>;
type ParaPolicyVote = Selectable<DatabaseSchemaType['para_policy_vote']>;
type IndexedVote = {
    cabildeoRecord?: CabildeoVote;
    policyRecord?: ParaPolicyVote;
};
export type PluginType = RecordProcessor<VoteRecord, IndexedVote>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=cabildeo-vote.d.ts.map