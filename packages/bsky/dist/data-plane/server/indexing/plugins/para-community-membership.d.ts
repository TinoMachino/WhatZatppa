import { Selectable } from 'kysely';
import { BackgroundQueue } from '../../background';
import { Database } from '../../db';
import { DatabaseSchemaType } from '../../db/database-schema';
import { RecordProcessor } from '../processor';
interface ParaCommunityMembershipRecord {
    community: string;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked';
    roles?: string[];
    source?: string;
    joinedAt: string;
    leftAt?: string;
}
type IndexedParaCommunityMembership = Selectable<DatabaseSchemaType['para_community_membership']>;
export type PluginType = RecordProcessor<ParaCommunityMembershipRecord, IndexedParaCommunityMembership>;
export declare const makePlugin: (db: Database, background: BackgroundQueue) => PluginType;
export default makePlugin;
//# sourceMappingURL=para-community-membership.d.ts.map