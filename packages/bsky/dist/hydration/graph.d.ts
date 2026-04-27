import { AtUriString, DidString } from '@atproto/syntax';
import { DataPlaneClient } from '../data-plane/client';
import { FollowInfo } from '../proto/bsky_pb';
import { BlockRecord, FollowRecord, ListItemRecord, ListRecord, StarterPackRecord, VerificationRecord } from '../views/types.js';
import { HydrationMap, ItemRef, RecordInfo } from './util';
export type List = RecordInfo<ListRecord>;
export type Lists = HydrationMap<AtUriString, List>;
export type ListItem = RecordInfo<ListItemRecord>;
export type ListItems = HydrationMap<AtUriString, ListItem>;
export type ListViewerState = {
    viewerMuted?: string;
    viewerListBlockUri?: AtUriString;
    viewerInList?: string;
};
export type ListViewerStates = HydrationMap<AtUriString, ListViewerState>;
export type ListMembershipState = {
    actorListItemUri?: AtUriString;
};
export type ListMembershipStates = HydrationMap<AtUriString, HydrationMap<DidString, ListMembershipState>>;
export type Follow = RecordInfo<FollowRecord>;
export type Follows = HydrationMap<AtUriString, Follow>;
export type Block = RecordInfo<BlockRecord>;
export type StarterPack = RecordInfo<StarterPackRecord>;
export type StarterPacks = HydrationMap<AtUriString, StarterPack>;
export type Verification = RecordInfo<VerificationRecord>;
export type Verifications = HydrationMap<AtUriString, Verification>;
export type StarterPackAgg = {
    joinedWeek: number;
    joinedAllTime: number;
    listItemSampleUris?: AtUriString[];
};
export type StarterPackAggs = HydrationMap<AtUriString, StarterPackAgg>;
export type ListAgg = {
    listItems: number;
};
export type ListAggs = HydrationMap<AtUriString, ListAgg>;
export type RelationshipPair = [didA: DidString, didB: DidString];
export declare class Blocks {
    _blocks: Map<string, BlockEntry>;
    constructor();
    static key(didA: string, didB: string): string;
    set(didA: string, didB: string, block: BlockEntry): Blocks;
    get(didA: string, didB: string): BlockEntry | null;
    merge(blocks: Blocks): Blocks;
}
export type BlockEntry = {
    blockUri: AtUriString | undefined;
    blockListUri: AtUriString | undefined;
};
export declare class GraphHydrator {
    dataplane: DataPlaneClient;
    constructor(dataplane: DataPlaneClient);
    getLists(uris: AtUriString[], includeTakedowns?: boolean): Promise<Lists>;
    getListItems(uris: AtUriString[], includeTakedowns?: boolean): Promise<ListItems>;
    getListViewerStates(uris: AtUriString[], viewer: string): Promise<ListViewerStates>;
    private getMutesAndBlocks;
    getBidirectionalBlocks(pairs: RelationshipPair[]): Promise<Blocks>;
    getFollows(uris: AtUriString[], includeTakedowns?: boolean): Promise<Follows>;
    getVerifications(uris: AtUriString[], includeTakedowns?: boolean): Promise<Verifications>;
    getBlocks(uris: AtUriString[], includeTakedowns?: boolean): Promise<HydrationMap<AtUriString, Block>>;
    getActorFollows(input: {
        did: DidString;
        cursor?: string;
        limit?: number;
    }): Promise<{
        follows: FollowInfo[];
        cursor: string;
    }>;
    getActorFollowers(input: {
        did: DidString;
        cursor?: string;
        limit?: number;
    }): Promise<{
        followers: FollowInfo[];
        cursor: string;
    }>;
    getStarterPacks(uris: AtUriString[], includeTakedowns?: boolean): Promise<StarterPacks>;
    getStarterPackAggregates(refs: ItemRef[]): Promise<StarterPackAggs>;
    getListAggregates(refs: ItemRef[]): Promise<ListAggs>;
}
//# sourceMappingURL=graph.d.ts.map