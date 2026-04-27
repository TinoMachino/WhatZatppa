import { ColumnType } from 'kysely';
export declare const tableName = "para_community_membership";
export interface ParaCommunityMembership {
    uri: string;
    cid: string;
    creator: string;
    communityUri: string;
    membershipState: string;
    roles: ColumnType<string[] | null, string[] | null, string[] | null>;
    source: string | null;
    joinedAt: string;
    leftAt: string | null;
    indexedAt: string;
}
export type PartialDB = {
    [tableName]: ParaCommunityMembership;
};
//# sourceMappingURL=para-community-membership.d.ts.map