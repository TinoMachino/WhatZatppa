import { AtUriString, DidString } from '@atproto/syntax';
import { DataPlaneClient } from '../data-plane/client';
import { FeatureGatesClient, ScopedFeatureGatesClient } from '../feature-gates';
import { app } from '../lexicons/index.js';
import { BookmarkInfo, Notification } from '../proto/bsky_pb';
import { ParsedLabelers } from '../util';
import { ActivitySubscriptionStates, ActorHydrator, Actors, KnownFollowersStates, ProfileAggs, ProfileViewerStates } from './actor';
import { FeedGenAggs, FeedGenViewerStates, FeedGens, FeedHydrator, FeedItem, type GetPostsHydrationOptions, Likes, Post, PostAggs, PostViewerStates, Postgates, Posts, Reposts, ThreadContexts, Threadgates } from './feed';
import { Follows, GraphHydrator, ListAggs, ListItems, ListMembershipStates, ListViewerStates, Lists, StarterPackAggs, StarterPacks, Verifications } from './graph';
import { LabelHydrator, LabelerAggs, LabelerViewerStates, Labelers, Labels } from './label';
import { HydrationMap, ItemRef, RecordInfo } from './util';
export declare class HydrateCtx {
    private vals;
    labelers: ParsedLabelers;
    viewer: `did:${string}:${string}` | null;
    includeTakedowns: boolean | undefined;
    overrideIncludeTakedownsForActor: boolean | undefined;
    include3pBlocks: boolean | undefined;
    skipViewerBlocks: boolean | undefined;
    includeDebugField: boolean | undefined;
    features: ScopedFeatureGatesClient;
    constructor(vals: HydrateCtxVals);
    get skipCacheForViewer(): `did:${string}:${string}`[] | undefined;
    copy<V extends Partial<HydrateCtxVals>>(vals?: V): HydrateCtx & V;
}
export type HydrateCtxWithViewer = HydrateCtx & {
    viewer: string;
};
export type HydrateCtxVals = {
    labelers: ParsedLabelers;
    viewer: DidString | null;
    includeTakedowns?: boolean;
    overrideIncludeTakedownsForActor?: boolean;
    include3pBlocks?: boolean;
    skipViewerBlocks?: boolean;
    includeDebugField?: boolean;
    features: ScopedFeatureGatesClient;
};
export type HydrationState = {
    ctx?: HydrateCtx;
    actors?: Actors;
    profileViewers?: ProfileViewerStates;
    profileAggs?: ProfileAggs;
    posts?: Posts;
    postAggs?: PostAggs;
    postViewers?: PostViewerStates;
    threadContexts?: ThreadContexts;
    postBlocks?: PostBlocks;
    reposts?: Reposts;
    follows?: Follows;
    followBlocks?: FollowBlocks;
    threadgates?: Threadgates;
    postgates?: Postgates;
    lists?: Lists;
    listAggs?: ListAggs;
    listMemberships?: ListMembershipStates;
    listViewers?: ListViewerStates;
    listItems?: ListItems;
    likes?: Likes;
    likeBlocks?: LikeBlocks;
    labels?: Labels;
    feedgens?: FeedGens;
    feedgenViewers?: FeedGenViewerStates;
    feedgenAggs?: FeedGenAggs;
    starterPacks?: StarterPacks;
    starterPackAggs?: StarterPackAggs;
    labelers?: Labelers;
    labelerViewers?: LabelerViewerStates;
    labelerAggs?: LabelerAggs;
    knownFollowers?: KnownFollowersStates;
    activitySubscriptions?: ActivitySubscriptionStates;
    bidirectionalBlocks?: BidirectionalBlocks;
    verifications?: Verifications;
    bookmarks?: Bookmarks;
};
export type PostBlock = {
    embed: boolean;
    parent: boolean;
    root: boolean;
};
export type PostBlocks = HydrationMap<AtUriString, PostBlock>;
export type LikeBlock = boolean;
export type LikeBlocks = HydrationMap<AtUriString, LikeBlock>;
export type FollowBlock = boolean;
export type FollowBlocks = HydrationMap<AtUriString, FollowBlock>;
export type BidirectionalBlocks = HydrationMap<DidString, HydrationMap<DidString, boolean>>;
export type Bookmark = {
    ref?: {
        key: string;
    };
    subjectUri: string;
    subjectCid: string;
    indexedAt?: Date;
};
export type Bookmarks = HydrationMap<DidString, HydrationMap<string, Bookmark>>;
/**
 * Additional config passed from `ServerConfig` to the `Hydrator` instance.
 * Values within this config object may be passed to other sub-hydrators.
 */
export type HydratorConfig = {
    debugFieldAllowedDids: Set<string>;
    featureGatesClient: FeatureGatesClient;
};
export declare class Hydrator {
    dataplane: DataPlaneClient;
    actor: ActorHydrator;
    feed: FeedHydrator;
    graph: GraphHydrator;
    label: LabelHydrator;
    serviceLabelers: Set<string>;
    config: HydratorConfig;
    constructor(dataplane: DataPlaneClient, serviceLabelers: readonly DidString[] | undefined, config: HydratorConfig);
    hydrateProfileViewers(dids: DidString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateProfiles(dids: DidString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateProfilesBasic(dids: DidString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateProfilesDetailed(dids: DidString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateLists(uris: AtUriString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateListsBasic(uris: AtUriString[], ctx: HydrateCtx, opts?: {
        skipAuthors: boolean;
    }): Promise<HydrationState>;
    hydrateListItems(uris: AtUriString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateListsMembership(uris: AtUriString[], did: DidString, ctx: HydrateCtx): Promise<HydrationState>;
    hydratePosts(refs: {
        uri: AtUriString;
    }[], ctx: HydrateCtx, state?: HydrationState, options?: Pick<GetPostsHydrationOptions, 'processDynamicTagsForView'>): Promise<HydrationState>;
    private hydratePostBlocks;
    hydrateFeedItems(items: FeedItem[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateThreadPosts(refs: ItemRef[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateFeedGens(uris: AtUriString[], // @TODO any way to get refs here?
    ctx: HydrateCtx): Promise<HydrationState>;
    hydrateStarterPacksBasic(uris: AtUriString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateStarterPacks(uris: AtUriString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateLikes(authorDid: DidString, uris: AtUriString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateReposts(uris: AtUriString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateNotifications(notifs: Notification[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateBookmarks(bookmarkInfos: BookmarkInfo[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateFollows(uris: AtUriString[], ctx: HydrateCtx): Promise<HydrationState>;
    hydrateBidirectionalBlocks(didMap: Map<DidString, DidString[]>, // DID -> DID[]
    ctx: HydrateCtx): Promise<BidirectionalBlocks>;
    hydrateLabelers(dids: DidString[], ctx: HydrateCtx): Promise<HydrationState>;
    getRecord(uri: AtUriString, includeTakedowns?: boolean): Promise<import("./actor").ChatDeclaration | import("./actor").GermDeclaration | import("./actor").NotificationDeclaration | import("./actor").Status | Post | import("./feed").Like | import("./feed").Repost | import("./feed").FeedGen | import("./feed").Threadgate | import("./feed").Postgate | import("./graph").List | import("./graph").ListItem | import("./graph").Follow | import("./graph").Block | import("./graph").StarterPack | import("./label").Labeler | RecordInfo<app.bsky.actor.profile.$defs.Main> | undefined>;
    createContext<V extends Omit<HydrateCtxVals, 'features'> & {
        features?: ScopedFeatureGatesClient;
    }>(vals: V): Promise<HydrateCtx & {
        viewer: V['viewer'];
    }>;
    resolveUri(uriStr: AtUriString): Promise<AtUriString>;
}
export declare const mergeStates: (stateA: HydrationState, stateB: HydrationState) => HydrationState;
export declare const mergeManyStates: (...states: HydrationState[]) => HydrationState;
//# sourceMappingURL=hydrator.d.ts.map