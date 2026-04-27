import { $Typed, Un$Typed, Unknown$TypedObject, UriString } from '@atproto/lex';
import { AtUriString, DatetimeString, DidString } from '@atproto/syntax';
import { Actor, ProfileViewerState } from '../hydration/actor';
import { FeedItem, Repost } from '../hydration/feed';
import { HydrationState } from '../hydration/hydrator';
import { Label } from '../hydration/label';
import { ImageUriBuilder } from '../image/uri';
import { Notification } from '../proto/bsky_pb';
import { ActivitySubscription, BlockedPost, BookmarkView, Embed, EmbedView, ExternalEmbed, ExternalEmbedView, FeedViewPost, FollowRecord, GeneratorView, GetPostThreadV2QueryParams, ImagesEmbed, ImagesEmbedView, KnownFollowers, LabelerRecord, LabelerView, LabelerViewDetailed, LikeRecord, ListItemView, ListView, ListViewBasic, MaybePostView, NotFoundPost, NotificationRecordDeleted, NotificationView, PostEmbedView, PostRecord, PostView, ProfileAssociatedActivitySubscription, ProfileAssociatedChat, ProfileRecord, ProfileView, ProfileViewBasic, ProfileViewDetailed, ProfileViewer, ReasonPin, ReasonRepost, RecordEmbed, RecordEmbedView, RecordWithMedia, RecordWithMediaView, ReplyRef, RepostRecord, StarterPackView, StarterPackViewBasic, StatusView, ThreadItem, ThreadOtherItem, ThreadViewPost, ThreadgateView, VerificationRecord, VerificationState, VideoEmbed, VideoEmbedView } from './types.js';
import { VideoUriBuilder } from './util';
export declare class Views {
    private opts;
    imgUriBuilder: ImageUriBuilder;
    videoUriBuilder: VideoUriBuilder;
    indexedAtEpoch: Date | undefined;
    private threadTagsBumpDown;
    private threadTagsHide;
    private visibilityTagHide;
    private visibilityTagRankPrefix;
    constructor(opts: {
        imgUriBuilder: ImageUriBuilder;
        videoUriBuilder: VideoUriBuilder;
        indexedAtEpoch: Date | undefined;
        threadTagsBumpDown: readonly string[];
        threadTagsHide: readonly string[];
        visibilityTagHide: string;
        visibilityTagRankPrefix: string;
    });
    actorIsNoHosted(did: DidString, state: HydrationState): boolean;
    actorIsDeactivated(did: DidString, state: HydrationState): boolean;
    actorIsTakendown(did: DidString, state: HydrationState): boolean;
    noUnauthenticatedPost(state: HydrationState, post: PostView): boolean;
    viewerBlockExists(did: DidString, state: HydrationState): boolean;
    viewerMuteExists(did: DidString, state: HydrationState): boolean;
    blockingByList(viewer: ProfileViewerState, state: HydrationState): undefined | AtUriString;
    blockedByList(viewer: ProfileViewerState, state: HydrationState): undefined | AtUriString;
    mutedByList(viewer: ProfileViewerState, state: HydrationState): undefined | AtUriString;
    recordActive(uri: AtUriString, state: HydrationState): AtUriString | undefined;
    viewerSeesNeedsReview({ did, uri }: {
        did?: DidString;
        uri?: AtUriString;
    }, state: HydrationState): boolean;
    replyIsHiddenByThreadgate(replyUri: AtUriString, rootPostUri: AtUriString, state: HydrationState): boolean;
    profileDetailed(did: DidString, state: HydrationState): Un$Typed<ProfileViewDetailed> | undefined;
    profile(did: DidString, state: HydrationState): Un$Typed<ProfileView> | undefined;
    profileBasic(did: DidString, state: HydrationState): Un$Typed<ProfileViewBasic> | undefined;
    profileCabildeoLive(did: DidString, state: HydrationState): {
        $type: "com.para.civic.defs#cabildeoLive";
        cabildeoUri: AtUriString;
        community: string;
        phase: any;
        expiresAt: DatetimeString;
    } | undefined;
    profileAssociatedChat(actor: Actor): ProfileAssociatedChat | undefined;
    profileAssociatedActivitySubscription(actor: Actor): ProfileAssociatedActivitySubscription;
    profileKnownFollowers(did: DidString, state: HydrationState): ProfileView | undefined;
    profileViewer(did: DidString, state: HydrationState): ProfileViewer | undefined;
    profileViewerActivitySubscription(profileViewer: ProfileViewerState, did: DidString, state: HydrationState): ActivitySubscription | undefined;
    profileWebsite(did: DidString, state: HydrationState): UriString | undefined;
    knownFollowers(did: DidString, state: HydrationState): KnownFollowers | undefined;
    verification(did: DidString, state: HydrationState): VerificationState | undefined;
    status(did: DidString, state: HydrationState): StatusView | undefined;
    blockedProfileViewer(did: DidString, state: HydrationState): ProfileViewer | undefined;
    list(uri: AtUriString, state: HydrationState): Un$Typed<ListView> | undefined;
    listBasic(uri: AtUriString, state: HydrationState): Un$Typed<ListViewBasic> | undefined;
    listItemView(uri: AtUriString, did: DidString, state: HydrationState): Un$Typed<ListItemView> | undefined;
    starterPackBasic(uri: AtUriString, state: HydrationState): Un$Typed<StarterPackViewBasic> | undefined;
    starterPack(uri: AtUriString, state: HydrationState): Un$Typed<StarterPackView> | undefined;
    selfLabels({ uri, cid, record, }: {
        uri?: AtUriString;
        cid?: string;
        record?: PostRecord | LikeRecord | RepostRecord | FollowRecord | ProfileRecord | LabelerRecord | VerificationRecord | NotificationRecordDeleted;
    }): Label[];
    labeler(did: DidString, state: HydrationState): Un$Typed<LabelerView> | undefined;
    labelerDetailed(did: DidString, state: HydrationState): Un$Typed<LabelerViewDetailed> | undefined;
    feedItemBlocksAndMutes(item: FeedItem, state: HydrationState): {
        originatorMuted: boolean;
        originatorBlocked: boolean;
        authorMuted: boolean;
        authorBlocked: boolean;
        ancestorAuthorBlocked: boolean;
    };
    feedGenerator(uri: AtUriString, state: HydrationState): Un$Typed<GeneratorView> | undefined;
    threadgate(uri: AtUriString, state: HydrationState): Un$Typed<ThreadgateView> | undefined;
    post(uri: AtUriString, state: HydrationState, depth?: number): Un$Typed<PostView> | undefined;
    feedViewPost(item: FeedItem, state: HydrationState): Un$Typed<FeedViewPost> | undefined;
    replyRef(uri: AtUriString, state: HydrationState): Un$Typed<ReplyRef> | undefined;
    maybePost(uri: AtUriString, state: HydrationState): $Typed<MaybePostView>;
    blockedPost(uri: AtUriString, authorDid: DidString, state: HydrationState): $Typed<BlockedPost>;
    notFoundPost(uri: AtUriString): $Typed<NotFoundPost>;
    reasonRepost(uri: AtUriString, repost: Repost, state: HydrationState): $Typed<ReasonRepost> | undefined;
    reasonPin(): $Typed<ReasonPin>;
    bookmark(key: string, state: HydrationState): Un$Typed<BookmarkView> | undefined;
    thread(skele: {
        anchor: AtUriString;
        uris: AtUriString[];
    }, state: HydrationState, opts: {
        height: number;
        depth: number;
    }): $Typed<ThreadViewPost> | $Typed<NotFoundPost> | $Typed<BlockedPost>;
    threadParent(childUri: AtUriString, rootUri: string, state: HydrationState, height: number): $Typed<ThreadViewPost> | $Typed<NotFoundPost> | $Typed<BlockedPost> | undefined;
    threadReplies(parentUri: AtUriString, rootUri: AtUriString, childrenByParentUri: Record<AtUriString, AtUriString[]>, state: HydrationState, depth: number): ($Typed<ThreadViewPost> | $Typed<BlockedPost>)[] | undefined;
    threadV2(skeleton: {
        anchor: AtUriString;
        uris: AtUriString[];
    }, state: HydrationState, { above, below, branchingFactor, sort, }: {
        above: number;
        below: number;
        branchingFactor: number;
        sort: GetPostThreadV2QueryParams['sort'];
    }): {
        hasOtherReplies: boolean;
        thread: ThreadItem[];
    };
    private threadV2Parent;
    private threadV2Replies;
    private threadV2ItemPost;
    private threadV2ItemNoUnauthenticated;
    private threadV2ItemNotFound;
    private threadV2ItemBlocked;
    threadOtherV2(skeleton: {
        anchor: AtUriString;
        uris: AtUriString[];
    }, state: HydrationState, { below, branchingFactor, }: {
        below: number;
        branchingFactor: number;
    }): ThreadOtherItem[];
    private threadOtherV2Replies;
    private threadOtherV2ItemPostAnchor;
    private threadOtherV2ItemPost;
    private checkThreadV2ReplyInclusion;
    private isOtherThreadPost;
    private groupThreadChildrenByParent;
    embed(postUri: AtUriString, embed: $Typed<Embed> | Unknown$TypedObject, state: HydrationState, depth: number): $Typed<EmbedView> | undefined;
    imagesEmbed(did: DidString, embed: ImagesEmbed): $Typed<ImagesEmbedView>;
    videoEmbed(did: DidString, embed: VideoEmbed): $Typed<VideoEmbedView>;
    externalEmbed(did: DidString, embed: ExternalEmbed): $Typed<ExternalEmbedView>;
    embedNotFound(uri: AtUriString): $Typed<RecordEmbedView>;
    embedDetached(uri: AtUriString): $Typed<RecordEmbedView>;
    embedBlocked(uri: AtUriString, state: HydrationState): $Typed<RecordEmbedView>;
    embedPostView(uri: AtUriString, state: HydrationState, depth: number): $Typed<PostEmbedView> | undefined;
    recordEmbed(postUri: AtUriString, embed: RecordEmbed, state: HydrationState, depth: number, withTypeTag: false): RecordEmbedView;
    recordEmbed(postUri: AtUriString, embed: RecordEmbed, state: HydrationState, depth: number, withTypeTag?: true): $Typed<RecordEmbedView>;
    private recordEmbedWrapper;
    recordWithMediaEmbed(postUri: AtUriString, embed: RecordWithMedia, state: HydrationState, depth: number): $Typed<RecordWithMediaView> | undefined;
    userReplyDisabled(uri: AtUriString, state: HydrationState): boolean | undefined;
    userPostEmbeddingDisabled(uri: AtUriString, state: HydrationState): boolean | undefined;
    viewerPinned(uri: AtUriString, state: HydrationState, authorDid: string): boolean | undefined;
    notification(notif: Notification, lastSeenAt: string | undefined, state: HydrationState): Un$Typed<NotificationView> | undefined;
    indexedAt({ sortedAt, indexedAt }: {
        sortedAt: Date;
        indexedAt: Date;
    }): Date;
}
//# sourceMappingURL=index.d.ts.map