import { AtUri } from '@atproto/syntax';
import { ActorStoreReader } from '../../../../actor-store/actor-store-reader';
import * as ComParaCommunityBoard from '../../../../lexicon/types/com/para/community/board';
import * as ComParaCommunityGetBoard from '../../../../lexicon/types/com/para/community/getBoard';
import * as ComParaCommunityGovernance from '../../../../lexicon/types/com/para/community/governance';
import * as ComParaCommunityMembership from '../../../../lexicon/types/com/para/community/membership';
import * as ComParaCommunityListBoards from '../../../../lexicon/types/com/para/community/listBoards';
export declare const BOARD_COLLECTION = "com.para.community.board";
export declare const MEMBERSHIP_COLLECTION = "com.para.community.membership";
export declare const GOVERNANCE_COLLECTION = "com.para.community.governance";
export declare const LIST_COLLECTION = "app.bsky.graph.list";
export declare const STARTERPACK_COLLECTION = "app.bsky.graph.starterpack";
export declare const LIST_ITEM_COLLECTION = "app.bsky.graph.listitem";
export declare const DEFAULT_MODERATOR_CAPABILITIES: string[];
export declare const COMMUNITY_MEMBER_CAPABILITIES: string[];
export declare const COMMUNITY_NON_MEMBER_CAPABILITIES: string[];
export declare const COMMUNITY_MODERATOR_CAPABILITIES: string[];
export declare const GLOBAL_COMMUNITY_CAPABILITIES: string[];
export type LocalBoard = {
    uri: string;
    cid: string;
    record: ComParaCommunityBoard.Record;
};
export type LocalGovernanceRecord = ComParaCommunityGovernance.Record;
export declare const normalizeCommunityName: (value: string) => string;
export declare const normalizeQuadrant: (value: string) => string;
export declare const normalizeSlug: (value: string) => string;
export declare const deriveBoardSlug: (name: string, rkey: string) => string;
export declare const buildDelegatesChatId: (boardRkey: string) => string;
export declare const buildSubdelegatesChatId: (boardRkey: string) => string;
export declare const buildSeedGovernanceRecord: ({ did, name, slug, createdAt, }: {
    did: string;
    name: string;
    slug: string;
    createdAt: string;
}) => ComParaCommunityGovernance.Record;
export declare const listLocalBoards: (store: ActorStoreReader, limit?: number) => Promise<LocalBoard[]>;
export declare const findMatchingBoardByIdentity: ({ store, name, quadrant, }: {
    store: ActorStoreReader;
    name: string;
    quadrant: string;
}) => Promise<LocalBoard | null>;
export declare const findLocalBoard: ({ store, uri, communityId, }: {
    store: ActorStoreReader;
    uri?: string;
    communityId?: string;
}) => Promise<LocalBoard | null>;
export declare const getLocalMembership: ({ store, viewerDid, boardUri, }: {
    store: ActorStoreReader;
    viewerDid: string;
    boardUri: string;
}) => Promise<ComParaCommunityMembership.Record | null>;
export declare const getMembershipUriForBoard: ({ viewerDid, boardUri, }: {
    viewerDid: string;
    boardUri: string;
}) => AtUri;
export declare const getViewerCapabilities: (membership?: Pick<ComParaCommunityMembership.Record, "membershipState" | "roles"> | null) => string[];
export declare const getLocalGovernance: ({ store, creatorDid, board, }: {
    store: ActorStoreReader;
    creatorDid: string;
    board: LocalBoard;
}) => Promise<LocalGovernanceRecord | null>;
export declare const getFoundingMemberCount: ({ store, board, }: {
    store: ActorStoreReader;
    board: LocalBoard;
}) => Promise<number>;
export declare const toGetBoardView: (args: {
    board: LocalBoard;
    creatorDid: string;
    creatorHandle?: string;
    creatorDisplayName?: string;
    viewerMembershipState?: string;
    viewerRoles?: string[];
    memberCount?: number;
}) => ComParaCommunityGetBoard.BoardView;
export declare const toListBoardView: (args: {
    board: LocalBoard;
    creatorDid: string;
    creatorHandle?: string;
    creatorDisplayName?: string;
    viewerMembershipState?: string;
    viewerRoles?: string[];
    memberCount?: number;
}) => ComParaCommunityListBoards.BoardView;
export declare const toGovernanceSummary: (governance: LocalGovernanceRecord | null) => ComParaCommunityGetBoard.GovernanceSummary | undefined;
//# sourceMappingURL=util.d.ts.map