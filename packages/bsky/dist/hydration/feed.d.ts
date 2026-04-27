import { AtUriString, DidString } from '@atproto/syntax';
import { DataPlaneClient } from '../data-plane/client';
import { FeedGenRecord, GateRecord, LikeRecord, PostRecord, PostgateRecord, RepostRecord } from '../views/types.js';
import { HydrationMap, ItemRef, RecordInfo } from './util';
export type Post = RecordInfo<PostRecord> & {
    violatesThreadGate: boolean;
    violatesEmbeddingRules: boolean;
    hasThreadGate: boolean;
    hasPostGate: boolean;
    tags: Set<string>;
    /**
     * Debug information for internal development
     */
    debug?: {
        tags?: string[];
    };
};
export type Posts = HydrationMap<AtUriString, Post>;
export type PostViewerState = {
    like?: AtUriString;
    repost?: AtUriString;
    bookmarked?: boolean;
    threadMuted?: boolean;
};
export type PostViewerStates = HydrationMap<AtUriString, PostViewerState>;
export type ThreadContext = {
    like?: AtUriString;
};
export type ThreadContexts = HydrationMap<AtUriString, ThreadContext>;
export type PostAgg = {
    likes: number;
    replies: number;
    reposts: number;
    quotes: number;
    bookmarks: number;
};
export type PostAggs = HydrationMap<AtUriString, PostAgg>;
export type Like = RecordInfo<LikeRecord>;
export type Likes = HydrationMap<AtUriString, Like>;
export type Repost = RecordInfo<RepostRecord>;
export type Reposts = HydrationMap<AtUriString, Repost>;
export type FeedGenAgg = {
    likes: number;
};
export type FeedGenAggs = HydrationMap<AtUriString, FeedGenAgg>;
export type FeedGen = RecordInfo<FeedGenRecord>;
export type FeedGens = HydrationMap<AtUriString, FeedGen>;
export type FeedGenViewerState = {
    like?: AtUriString;
};
export type FeedGenViewerStates = HydrationMap<AtUriString, FeedGenViewerState>;
export type Threadgate = RecordInfo<GateRecord>;
export type Threadgates = HydrationMap<AtUriString, Threadgate>;
export type Postgate = RecordInfo<PostgateRecord>;
export type Postgates = HydrationMap<AtUriString, Postgate>;
export type ThreadRef = ItemRef & {
    threadRoot: AtUriString;
};
export type FeedItem = {
    post: ItemRef;
    repost?: ItemRef;
    /**
     * If true, overrides the `reason` with `app.bsky.feed.defs#reasonPin`. Used
     * only in author feeds.
     */
    authorPinned?: boolean;
};
export type GetPostsHydrationOptions = {
    processDynamicTagsForView?: 'thread' | 'search';
};
export declare class FeedHydrator {
    dataplane: DataPlaneClient;
    constructor(dataplane: DataPlaneClient);
    getPosts(uris: AtUriString[], includeTakedowns?: boolean, given?: Posts, viewer?: string | null, options?: GetPostsHydrationOptions): Promise<Posts>;
    getPostViewerStates(refs: ThreadRef[], viewer: string): Promise<PostViewerStates>;
    private getThreadMutes;
    getThreadContexts(refs: ThreadRef[]): Promise<ThreadContexts>;
    getPostAggregates(refs: ItemRef[], viewer: DidString | null): Promise<PostAggs>;
    getFeedGens(uris: AtUriString[], includeTakedowns?: boolean): Promise<FeedGens>;
    getFeedGenViewerStates(uris: AtUriString[], viewer: DidString): Promise<FeedGenViewerStates>;
    getFeedGenAggregates(refs: ItemRef[], viewer: DidString | null): Promise<FeedGenAggs>;
    getThreadgatesForPosts(postUris: AtUriString[], includeTakedowns?: boolean): Promise<Threadgates>;
    getThreadgateRecords(uris: AtUriString[], includeTakedowns?: boolean): Promise<Threadgates>;
    getPostgatesForPosts(postUris: AtUriString[], includeTakedowns?: boolean): Promise<Postgates>;
    getPostgateRecords(uris: AtUriString[], includeTakedowns?: boolean): Promise<Postgates>;
    getLikes(uris: AtUriString[], includeTakedowns?: boolean): Promise<Likes>;
    getReposts(uris: AtUriString[], includeTakedowns?: boolean): Promise<Reposts>;
}
//# sourceMappingURL=feed.d.ts.map