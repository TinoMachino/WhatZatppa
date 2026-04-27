import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
import * as EmbedImages from '../embed/images.defs.js';
import * as EmbedVideo from '../embed/video.defs.js';
import * as EmbedExternal from '../embed/external.defs.js';
import * as EmbedRecord from '../embed/record.defs.js';
import * as EmbedRecordWithMedia from '../embed/recordWithMedia.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as RichtextFacet from '../richtext/facet.defs.js';
import * as GraphDefs from '../graph/defs.defs.js';
declare const $nsid = "app.bsky.feed.defs";
export { $nsid };
type PostView = {
    $type?: 'app.bsky.feed.defs#postView';
    uri: l.AtUriString;
    cid: l.CidString;
    author: ActorDefs.ProfileViewBasic;
    record: l.LexMap;
    embed?: l.$Typed<EmbedImages.View> | l.$Typed<EmbedVideo.View> | l.$Typed<EmbedExternal.View> | l.$Typed<EmbedRecord.View> | l.$Typed<EmbedRecordWithMedia.View> | l.Unknown$TypedObject;
    bookmarkCount?: number;
    replyCount?: number;
    repostCount?: number;
    likeCount?: number;
    quoteCount?: number;
    indexedAt: l.DatetimeString;
    viewer?: ViewerState;
    labels?: LabelDefs.Label[];
    threadgate?: ThreadgateView;
    /**
     * Debug information for internal development
     */
    debug?: l.LexMap;
};
export type { PostView };
declare const postView: l.TypedObjectSchema<"app.bsky.feed.defs#postView", l.Validator<PostView, PostView>>;
export { postView };
/** Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests. */
type ViewerState = {
    $type?: 'app.bsky.feed.defs#viewerState';
    repost?: l.AtUriString;
    like?: l.AtUriString;
    bookmarked?: boolean;
    threadMuted?: boolean;
    replyDisabled?: boolean;
    embeddingDisabled?: boolean;
    pinned?: boolean;
};
export type { ViewerState };
/** Metadata about the requesting account's relationship with the subject content. Only has meaningful content for authed requests. */
declare const viewerState: l.TypedObjectSchema<"app.bsky.feed.defs#viewerState", l.Validator<ViewerState, ViewerState>>;
export { viewerState };
/** Metadata about this post within the context of the thread it is in. */
type ThreadContext = {
    $type?: 'app.bsky.feed.defs#threadContext';
    rootAuthorLike?: l.AtUriString;
};
export type { ThreadContext };
/** Metadata about this post within the context of the thread it is in. */
declare const threadContext: l.TypedObjectSchema<"app.bsky.feed.defs#threadContext", l.Validator<ThreadContext, ThreadContext>>;
export { threadContext };
type FeedViewPost = {
    $type?: 'app.bsky.feed.defs#feedViewPost';
    post: PostView;
    reply?: ReplyRef;
    reason?: l.$Typed<ReasonRepost> | l.$Typed<ReasonPin> | l.Unknown$TypedObject;
    /**
     * Context provided by feed generator that may be passed back alongside interactions.
     */
    feedContext?: string;
    /**
     * Unique identifier per request that may be passed back alongside interactions.
     */
    reqId?: string;
};
export type { FeedViewPost };
declare const feedViewPost: l.TypedObjectSchema<"app.bsky.feed.defs#feedViewPost", l.Validator<FeedViewPost, FeedViewPost>>;
export { feedViewPost };
type ReplyRef = {
    $type?: 'app.bsky.feed.defs#replyRef';
    root: l.$Typed<PostView> | l.$Typed<NotFoundPost> | l.$Typed<BlockedPost> | l.Unknown$TypedObject;
    parent: l.$Typed<PostView> | l.$Typed<NotFoundPost> | l.$Typed<BlockedPost> | l.Unknown$TypedObject;
    /**
     * When parent is a reply to another post, this is the author of that post.
     */
    grandparentAuthor?: ActorDefs.ProfileViewBasic;
};
export type { ReplyRef };
declare const replyRef: l.TypedObjectSchema<"app.bsky.feed.defs#replyRef", l.Validator<ReplyRef, ReplyRef>>;
export { replyRef };
type ReasonRepost = {
    $type?: 'app.bsky.feed.defs#reasonRepost';
    by: ActorDefs.ProfileViewBasic;
    uri?: l.AtUriString;
    cid?: l.CidString;
    indexedAt: l.DatetimeString;
};
export type { ReasonRepost };
declare const reasonRepost: l.TypedObjectSchema<"app.bsky.feed.defs#reasonRepost", l.Validator<ReasonRepost, ReasonRepost>>;
export { reasonRepost };
type ReasonPin = {
    $type?: 'app.bsky.feed.defs#reasonPin';
};
export type { ReasonPin };
declare const reasonPin: l.TypedObjectSchema<"app.bsky.feed.defs#reasonPin", l.Validator<ReasonPin, ReasonPin>>;
export { reasonPin };
type ThreadViewPost = {
    $type?: 'app.bsky.feed.defs#threadViewPost';
    post: PostView;
    parent?: l.$Typed<ThreadViewPost> | l.$Typed<NotFoundPost> | l.$Typed<BlockedPost> | l.Unknown$TypedObject;
    replies?: (l.$Typed<ThreadViewPost> | l.$Typed<NotFoundPost> | l.$Typed<BlockedPost> | l.Unknown$TypedObject)[];
    threadContext?: ThreadContext;
};
export type { ThreadViewPost };
declare const threadViewPost: l.TypedObjectSchema<"app.bsky.feed.defs#threadViewPost", l.Validator<ThreadViewPost, ThreadViewPost>>;
export { threadViewPost };
type NotFoundPost = {
    $type?: 'app.bsky.feed.defs#notFoundPost';
    uri: l.AtUriString;
    notFound: true;
};
export type { NotFoundPost };
declare const notFoundPost: l.TypedObjectSchema<"app.bsky.feed.defs#notFoundPost", l.Validator<NotFoundPost, NotFoundPost>>;
export { notFoundPost };
type BlockedPost = {
    $type?: 'app.bsky.feed.defs#blockedPost';
    uri: l.AtUriString;
    blocked: true;
    author: BlockedAuthor;
};
export type { BlockedPost };
declare const blockedPost: l.TypedObjectSchema<"app.bsky.feed.defs#blockedPost", l.Validator<BlockedPost, BlockedPost>>;
export { blockedPost };
type BlockedAuthor = {
    $type?: 'app.bsky.feed.defs#blockedAuthor';
    did: l.DidString;
    viewer?: ActorDefs.ViewerState;
};
export type { BlockedAuthor };
declare const blockedAuthor: l.TypedObjectSchema<"app.bsky.feed.defs#blockedAuthor", l.Validator<BlockedAuthor, BlockedAuthor>>;
export { blockedAuthor };
type GeneratorView = {
    $type?: 'app.bsky.feed.defs#generatorView';
    uri: l.AtUriString;
    cid: l.CidString;
    did: l.DidString;
    creator: ActorDefs.ProfileView;
    displayName: string;
    description?: string;
    descriptionFacets?: RichtextFacet.Main[];
    avatar?: l.UriString;
    likeCount?: number;
    acceptsInteractions?: boolean;
    labels?: LabelDefs.Label[];
    viewer?: GeneratorViewerState;
    contentMode?: 'app.bsky.feed.defs#contentModeUnspecified' | 'app.bsky.feed.defs#contentModeVideo' | l.UnknownString;
    indexedAt: l.DatetimeString;
};
export type { GeneratorView };
declare const generatorView: l.TypedObjectSchema<"app.bsky.feed.defs#generatorView", l.Validator<GeneratorView, GeneratorView>>;
export { generatorView };
type GeneratorViewerState = {
    $type?: 'app.bsky.feed.defs#generatorViewerState';
    like?: l.AtUriString;
};
export type { GeneratorViewerState };
declare const generatorViewerState: l.TypedObjectSchema<"app.bsky.feed.defs#generatorViewerState", l.Validator<GeneratorViewerState, GeneratorViewerState>>;
export { generatorViewerState };
type SkeletonFeedPost = {
    $type?: 'app.bsky.feed.defs#skeletonFeedPost';
    post: l.AtUriString;
    reason?: l.$Typed<SkeletonReasonRepost> | l.$Typed<SkeletonReasonPin> | l.Unknown$TypedObject;
    /**
     * Context that will be passed through to client and may be passed to feed generator back alongside interactions.
     */
    feedContext?: string;
};
export type { SkeletonFeedPost };
declare const skeletonFeedPost: l.TypedObjectSchema<"app.bsky.feed.defs#skeletonFeedPost", l.Validator<SkeletonFeedPost, SkeletonFeedPost>>;
export { skeletonFeedPost };
type SkeletonReasonRepost = {
    $type?: 'app.bsky.feed.defs#skeletonReasonRepost';
    repost: l.AtUriString;
};
export type { SkeletonReasonRepost };
declare const skeletonReasonRepost: l.TypedObjectSchema<"app.bsky.feed.defs#skeletonReasonRepost", l.Validator<SkeletonReasonRepost, SkeletonReasonRepost>>;
export { skeletonReasonRepost };
type SkeletonReasonPin = {
    $type?: 'app.bsky.feed.defs#skeletonReasonPin';
};
export type { SkeletonReasonPin };
declare const skeletonReasonPin: l.TypedObjectSchema<"app.bsky.feed.defs#skeletonReasonPin", l.Validator<SkeletonReasonPin, SkeletonReasonPin>>;
export { skeletonReasonPin };
type ThreadgateView = {
    $type?: 'app.bsky.feed.defs#threadgateView';
    uri?: l.AtUriString;
    cid?: l.CidString;
    record?: l.LexMap;
    lists?: GraphDefs.ListViewBasic[];
};
export type { ThreadgateView };
declare const threadgateView: l.TypedObjectSchema<"app.bsky.feed.defs#threadgateView", l.Validator<ThreadgateView, ThreadgateView>>;
export { threadgateView };
type Interaction = {
    $type?: 'app.bsky.feed.defs#interaction';
    item?: l.AtUriString;
    event?: 'app.bsky.feed.defs#requestLess' | 'app.bsky.feed.defs#requestMore' | 'app.bsky.feed.defs#clickthroughItem' | 'app.bsky.feed.defs#clickthroughAuthor' | 'app.bsky.feed.defs#clickthroughReposter' | 'app.bsky.feed.defs#clickthroughEmbed' | 'app.bsky.feed.defs#interactionSeen' | 'app.bsky.feed.defs#interactionLike' | 'app.bsky.feed.defs#interactionRepost' | 'app.bsky.feed.defs#interactionReply' | 'app.bsky.feed.defs#interactionQuote' | 'app.bsky.feed.defs#interactionShare' | l.UnknownString;
    /**
     * Context on a feed item that was originally supplied by the feed generator on getFeedSkeleton.
     */
    feedContext?: string;
    /**
     * Unique identifier per request that may be passed back alongside interactions.
     */
    reqId?: string;
};
export type { Interaction };
declare const interaction: l.TypedObjectSchema<"app.bsky.feed.defs#interaction", l.Validator<Interaction, Interaction>>;
export { interaction };
/** Request that less content like the given feed item be shown in the feed */
type RequestLess = 'app.bsky.feed.defs#requestLess';
export type { RequestLess };
/** Request that less content like the given feed item be shown in the feed */
declare const requestLess: l.TokenSchema<"app.bsky.feed.defs#requestLess">;
export { requestLess };
/** Request that more content like the given feed item be shown in the feed */
type RequestMore = 'app.bsky.feed.defs#requestMore';
export type { RequestMore };
/** Request that more content like the given feed item be shown in the feed */
declare const requestMore: l.TokenSchema<"app.bsky.feed.defs#requestMore">;
export { requestMore };
/** User clicked through to the feed item */
type ClickthroughItem = 'app.bsky.feed.defs#clickthroughItem';
export type { ClickthroughItem };
/** User clicked through to the feed item */
declare const clickthroughItem: l.TokenSchema<"app.bsky.feed.defs#clickthroughItem">;
export { clickthroughItem };
/** User clicked through to the author of the feed item */
type ClickthroughAuthor = 'app.bsky.feed.defs#clickthroughAuthor';
export type { ClickthroughAuthor };
/** User clicked through to the author of the feed item */
declare const clickthroughAuthor: l.TokenSchema<"app.bsky.feed.defs#clickthroughAuthor">;
export { clickthroughAuthor };
/** User clicked through to the reposter of the feed item */
type ClickthroughReposter = 'app.bsky.feed.defs#clickthroughReposter';
export type { ClickthroughReposter };
/** User clicked through to the reposter of the feed item */
declare const clickthroughReposter: l.TokenSchema<"app.bsky.feed.defs#clickthroughReposter">;
export { clickthroughReposter };
/** User clicked through to the embedded content of the feed item */
type ClickthroughEmbed = 'app.bsky.feed.defs#clickthroughEmbed';
export type { ClickthroughEmbed };
/** User clicked through to the embedded content of the feed item */
declare const clickthroughEmbed: l.TokenSchema<"app.bsky.feed.defs#clickthroughEmbed">;
export { clickthroughEmbed };
/** Declares the feed generator returns any types of posts. */
type ContentModeUnspecified = 'app.bsky.feed.defs#contentModeUnspecified';
export type { ContentModeUnspecified };
/** Declares the feed generator returns any types of posts. */
declare const contentModeUnspecified: l.TokenSchema<"app.bsky.feed.defs#contentModeUnspecified">;
export { contentModeUnspecified };
/** Declares the feed generator returns posts containing app.bsky.embed.video embeds. */
type ContentModeVideo = 'app.bsky.feed.defs#contentModeVideo';
export type { ContentModeVideo };
/** Declares the feed generator returns posts containing app.bsky.embed.video embeds. */
declare const contentModeVideo: l.TokenSchema<"app.bsky.feed.defs#contentModeVideo">;
export { contentModeVideo };
/** Feed item was seen by user */
type InteractionSeen = 'app.bsky.feed.defs#interactionSeen';
export type { InteractionSeen };
/** Feed item was seen by user */
declare const interactionSeen: l.TokenSchema<"app.bsky.feed.defs#interactionSeen">;
export { interactionSeen };
/** User liked the feed item */
type InteractionLike = 'app.bsky.feed.defs#interactionLike';
export type { InteractionLike };
/** User liked the feed item */
declare const interactionLike: l.TokenSchema<"app.bsky.feed.defs#interactionLike">;
export { interactionLike };
/** User reposted the feed item */
type InteractionRepost = 'app.bsky.feed.defs#interactionRepost';
export type { InteractionRepost };
/** User reposted the feed item */
declare const interactionRepost: l.TokenSchema<"app.bsky.feed.defs#interactionRepost">;
export { interactionRepost };
/** User replied to the feed item */
type InteractionReply = 'app.bsky.feed.defs#interactionReply';
export type { InteractionReply };
/** User replied to the feed item */
declare const interactionReply: l.TokenSchema<"app.bsky.feed.defs#interactionReply">;
export { interactionReply };
/** User quoted the feed item */
type InteractionQuote = 'app.bsky.feed.defs#interactionQuote';
export type { InteractionQuote };
/** User quoted the feed item */
declare const interactionQuote: l.TokenSchema<"app.bsky.feed.defs#interactionQuote">;
export { interactionQuote };
/** User shared the feed item */
type InteractionShare = 'app.bsky.feed.defs#interactionShare';
export type { InteractionShare };
/** User shared the feed item */
declare const interactionShare: l.TokenSchema<"app.bsky.feed.defs#interactionShare">;
export { interactionShare };
//# sourceMappingURL=defs.defs.d.ts.map