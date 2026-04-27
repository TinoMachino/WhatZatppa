import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
import * as FeedDefs from '../feed/defs.defs.js';
declare const $nsid = "app.bsky.unspecced.defs";
export { $nsid };
type SkeletonSearchPost = {
    $type?: 'app.bsky.unspecced.defs#skeletonSearchPost';
    uri: l.AtUriString;
};
export type { SkeletonSearchPost };
declare const skeletonSearchPost: l.TypedObjectSchema<"app.bsky.unspecced.defs#skeletonSearchPost", l.Validator<SkeletonSearchPost, SkeletonSearchPost>>;
export { skeletonSearchPost };
type SkeletonSearchActor = {
    $type?: 'app.bsky.unspecced.defs#skeletonSearchActor';
    did: l.DidString;
};
export type { SkeletonSearchActor };
declare const skeletonSearchActor: l.TypedObjectSchema<"app.bsky.unspecced.defs#skeletonSearchActor", l.Validator<SkeletonSearchActor, SkeletonSearchActor>>;
export { skeletonSearchActor };
type SkeletonSearchStarterPack = {
    $type?: 'app.bsky.unspecced.defs#skeletonSearchStarterPack';
    uri: l.AtUriString;
};
export type { SkeletonSearchStarterPack };
declare const skeletonSearchStarterPack: l.TypedObjectSchema<"app.bsky.unspecced.defs#skeletonSearchStarterPack", l.Validator<SkeletonSearchStarterPack, SkeletonSearchStarterPack>>;
export { skeletonSearchStarterPack };
type TrendingTopic = {
    $type?: 'app.bsky.unspecced.defs#trendingTopic';
    topic: string;
    displayName?: string;
    description?: string;
    link: string;
};
export type { TrendingTopic };
declare const trendingTopic: l.TypedObjectSchema<"app.bsky.unspecced.defs#trendingTopic", l.Validator<TrendingTopic, TrendingTopic>>;
export { trendingTopic };
type SkeletonTrend = {
    $type?: 'app.bsky.unspecced.defs#skeletonTrend';
    topic: string;
    displayName: string;
    link: string;
    startedAt: l.DatetimeString;
    postCount: number;
    status?: 'hot' | l.UnknownString;
    category?: string;
    dids: l.DidString[];
};
export type { SkeletonTrend };
declare const skeletonTrend: l.TypedObjectSchema<"app.bsky.unspecced.defs#skeletonTrend", l.Validator<SkeletonTrend, SkeletonTrend>>;
export { skeletonTrend };
type TrendView = {
    $type?: 'app.bsky.unspecced.defs#trendView';
    topic: string;
    displayName: string;
    link: string;
    startedAt: l.DatetimeString;
    postCount: number;
    status?: 'hot' | l.UnknownString;
    category?: string;
    actors: ActorDefs.ProfileViewBasic[];
};
export type { TrendView };
declare const trendView: l.TypedObjectSchema<"app.bsky.unspecced.defs#trendView", l.Validator<TrendView, TrendView>>;
export { trendView };
type ThreadItemPost = {
    $type?: 'app.bsky.unspecced.defs#threadItemPost';
    post: FeedDefs.PostView;
    /**
     * This post has more parents that were not present in the response. This is just a boolean, without the number of parents.
     */
    moreParents: boolean;
    /**
     * This post has more replies that were not present in the response. This is a numeric value, which is best-effort and might not be accurate.
     */
    moreReplies: number;
    /**
     * This post is part of a contiguous thread by the OP from the thread root. Many different OP threads can happen in the same thread.
     */
    opThread: boolean;
    /**
     * The threadgate created by the author indicates this post as a reply to be hidden for everyone consuming the thread.
     */
    hiddenByThreadgate: boolean;
    /**
     * This is by an account muted by the viewer requesting it.
     */
    mutedByViewer: boolean;
};
export type { ThreadItemPost };
declare const threadItemPost: l.TypedObjectSchema<"app.bsky.unspecced.defs#threadItemPost", l.Validator<ThreadItemPost, ThreadItemPost>>;
export { threadItemPost };
type ThreadItemNoUnauthenticated = {
    $type?: 'app.bsky.unspecced.defs#threadItemNoUnauthenticated';
};
export type { ThreadItemNoUnauthenticated };
declare const threadItemNoUnauthenticated: l.TypedObjectSchema<"app.bsky.unspecced.defs#threadItemNoUnauthenticated", l.Validator<ThreadItemNoUnauthenticated, ThreadItemNoUnauthenticated>>;
export { threadItemNoUnauthenticated };
type ThreadItemNotFound = {
    $type?: 'app.bsky.unspecced.defs#threadItemNotFound';
};
export type { ThreadItemNotFound };
declare const threadItemNotFound: l.TypedObjectSchema<"app.bsky.unspecced.defs#threadItemNotFound", l.Validator<ThreadItemNotFound, ThreadItemNotFound>>;
export { threadItemNotFound };
type ThreadItemBlocked = {
    $type?: 'app.bsky.unspecced.defs#threadItemBlocked';
    author: FeedDefs.BlockedAuthor;
};
export type { ThreadItemBlocked };
declare const threadItemBlocked: l.TypedObjectSchema<"app.bsky.unspecced.defs#threadItemBlocked", l.Validator<ThreadItemBlocked, ThreadItemBlocked>>;
export { threadItemBlocked };
/** The computed state of the age assurance process, returned to the user in question on certain authenticated requests. */
type AgeAssuranceState = {
    $type?: 'app.bsky.unspecced.defs#ageAssuranceState';
    /**
     * The timestamp when this state was last updated.
     */
    lastInitiatedAt?: l.DatetimeString;
    /**
     * The status of the age assurance process.
     */
    status: 'unknown' | 'pending' | 'assured' | 'blocked' | l.UnknownString;
};
export type { AgeAssuranceState };
/** The computed state of the age assurance process, returned to the user in question on certain authenticated requests. */
declare const ageAssuranceState: l.TypedObjectSchema<"app.bsky.unspecced.defs#ageAssuranceState", l.Validator<AgeAssuranceState, AgeAssuranceState>>;
export { ageAssuranceState };
/** Object used to store age assurance data in stash. */
type AgeAssuranceEvent = {
    $type?: 'app.bsky.unspecced.defs#ageAssuranceEvent';
    /**
     * The date and time of this write operation.
     */
    createdAt: l.DatetimeString;
    /**
     * The status of the age assurance process.
     */
    status: 'unknown' | 'pending' | 'assured' | l.UnknownString;
    /**
     * The unique identifier for this instance of the age assurance flow, in UUID format.
     */
    attemptId: string;
    /**
     * The email used for AA.
     */
    email?: string;
    /**
     * The IP address used when initiating the AA flow.
     */
    initIp?: string;
    /**
     * The user agent used when initiating the AA flow.
     */
    initUa?: string;
    /**
     * The IP address used when completing the AA flow.
     */
    completeIp?: string;
    /**
     * The user agent used when completing the AA flow.
     */
    completeUa?: string;
};
export type { AgeAssuranceEvent };
/** Object used to store age assurance data in stash. */
declare const ageAssuranceEvent: l.TypedObjectSchema<"app.bsky.unspecced.defs#ageAssuranceEvent", l.Validator<AgeAssuranceEvent, AgeAssuranceEvent>>;
export { ageAssuranceEvent };
//# sourceMappingURL=defs.defs.d.ts.map