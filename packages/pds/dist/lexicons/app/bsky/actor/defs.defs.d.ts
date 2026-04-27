import { l } from '@atproto/lex';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as CivicDefs from '../../../com/para/civic/defs.defs.js';
import * as GraphDefs from '../graph/defs.defs.js';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
import * as NotificationDefs from '../notification/defs.defs.js';
import * as FeedThreadgate from '../feed/threadgate.defs.js';
import * as FeedPostgate from '../feed/postgate.defs.js';
import * as EmbedExternal from '../embed/external.defs.js';
declare const $nsid = "app.bsky.actor.defs";
export { $nsid };
type ProfileViewBasic = {
    $type?: 'app.bsky.actor.defs#profileViewBasic';
    did: l.DidString;
    handle: l.HandleString;
    displayName?: string;
    pronouns?: string;
    avatar?: l.UriString;
    associated?: ProfileAssociated;
    viewer?: ViewerState;
    labels?: LabelDefs.Label[];
    createdAt?: l.DatetimeString;
    verification?: VerificationState;
    status?: StatusView;
    cabildeoLive?: CivicDefs.CabildeoLive;
    /**
     * Debug information for internal development
     */
    debug?: l.LexMap;
};
export type { ProfileViewBasic };
declare const profileViewBasic: l.TypedObjectSchema<"app.bsky.actor.defs#profileViewBasic", l.Validator<ProfileViewBasic, ProfileViewBasic>>;
export { profileViewBasic };
type ProfileView = {
    $type?: 'app.bsky.actor.defs#profileView';
    did: l.DidString;
    handle: l.HandleString;
    displayName?: string;
    pronouns?: string;
    description?: string;
    avatar?: l.UriString;
    associated?: ProfileAssociated;
    indexedAt?: l.DatetimeString;
    createdAt?: l.DatetimeString;
    viewer?: ViewerState;
    labels?: LabelDefs.Label[];
    verification?: VerificationState;
    status?: StatusView;
    cabildeoLive?: CivicDefs.CabildeoLive;
    /**
     * Debug information for internal development
     */
    debug?: l.LexMap;
};
export type { ProfileView };
declare const profileView: l.TypedObjectSchema<"app.bsky.actor.defs#profileView", l.Validator<ProfileView, ProfileView>>;
export { profileView };
type ProfileViewDetailed = {
    $type?: 'app.bsky.actor.defs#profileViewDetailed';
    did: l.DidString;
    handle: l.HandleString;
    displayName?: string;
    description?: string;
    pronouns?: string;
    website?: l.UriString;
    avatar?: l.UriString;
    banner?: l.UriString;
    followersCount?: number;
    followsCount?: number;
    postsCount?: number;
    associated?: ProfileAssociated;
    joinedViaStarterPack?: GraphDefs.StarterPackViewBasic;
    indexedAt?: l.DatetimeString;
    createdAt?: l.DatetimeString;
    viewer?: ViewerState;
    labels?: LabelDefs.Label[];
    pinnedPost?: RepoStrongRef.Main;
    verification?: VerificationState;
    status?: StatusView;
    cabildeoLive?: CivicDefs.CabildeoLive;
    /**
     * Debug information for internal development
     */
    debug?: l.LexMap;
};
export type { ProfileViewDetailed };
declare const profileViewDetailed: l.TypedObjectSchema<"app.bsky.actor.defs#profileViewDetailed", l.Validator<ProfileViewDetailed, ProfileViewDetailed>>;
export { profileViewDetailed };
type ProfileAssociated = {
    $type?: 'app.bsky.actor.defs#profileAssociated';
    lists?: number;
    feedgens?: number;
    starterPacks?: number;
    labeler?: boolean;
    chat?: ProfileAssociatedChat;
    activitySubscription?: ProfileAssociatedActivitySubscription;
    germ?: ProfileAssociatedGerm;
};
export type { ProfileAssociated };
declare const profileAssociated: l.TypedObjectSchema<"app.bsky.actor.defs#profileAssociated", l.Validator<ProfileAssociated, ProfileAssociated>>;
export { profileAssociated };
type ProfileAssociatedChat = {
    $type?: 'app.bsky.actor.defs#profileAssociatedChat';
    allowIncoming: 'all' | 'none' | 'following' | l.UnknownString;
    allowGroupInvites?: 'all' | 'none' | 'following' | l.UnknownString;
};
export type { ProfileAssociatedChat };
declare const profileAssociatedChat: l.TypedObjectSchema<"app.bsky.actor.defs#profileAssociatedChat", l.Validator<ProfileAssociatedChat, ProfileAssociatedChat>>;
export { profileAssociatedChat };
type ProfileAssociatedGerm = {
    $type?: 'app.bsky.actor.defs#profileAssociatedGerm';
    messageMeUrl: l.UriString;
    showButtonTo: 'usersIFollow' | 'everyone' | l.UnknownString;
};
export type { ProfileAssociatedGerm };
declare const profileAssociatedGerm: l.TypedObjectSchema<"app.bsky.actor.defs#profileAssociatedGerm", l.Validator<ProfileAssociatedGerm, ProfileAssociatedGerm>>;
export { profileAssociatedGerm };
type ProfileAssociatedActivitySubscription = {
    $type?: 'app.bsky.actor.defs#profileAssociatedActivitySubscription';
    allowSubscriptions: 'followers' | 'mutuals' | 'none' | l.UnknownString;
};
export type { ProfileAssociatedActivitySubscription };
declare const profileAssociatedActivitySubscription: l.TypedObjectSchema<"app.bsky.actor.defs#profileAssociatedActivitySubscription", l.Validator<ProfileAssociatedActivitySubscription, ProfileAssociatedActivitySubscription>>;
export { profileAssociatedActivitySubscription };
/** Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests. */
type ViewerState = {
    $type?: 'app.bsky.actor.defs#viewerState';
    muted?: boolean;
    mutedByList?: GraphDefs.ListViewBasic;
    blockedBy?: boolean;
    blocking?: l.AtUriString;
    blockingByList?: GraphDefs.ListViewBasic;
    following?: l.AtUriString;
    followedBy?: l.AtUriString;
    /**
     * This property is present only in selected cases, as an optimization.
     */
    knownFollowers?: KnownFollowers;
    /**
     * This property is present only in selected cases, as an optimization.
     */
    activitySubscription?: NotificationDefs.ActivitySubscription;
};
export type { ViewerState };
/** Metadata about the requesting account's relationship with the subject account. Only has meaningful content for authed requests. */
declare const viewerState: l.TypedObjectSchema<"app.bsky.actor.defs#viewerState", l.Validator<ViewerState, ViewerState>>;
export { viewerState };
/** The subject's followers whom you also follow */
type KnownFollowers = {
    $type?: 'app.bsky.actor.defs#knownFollowers';
    count: number;
    followers: ProfileViewBasic[];
};
export type { KnownFollowers };
/** The subject's followers whom you also follow */
declare const knownFollowers: l.TypedObjectSchema<"app.bsky.actor.defs#knownFollowers", l.Validator<KnownFollowers, KnownFollowers>>;
export { knownFollowers };
/** Represents the verification information about the user this object is attached to. */
type VerificationState = {
    $type?: 'app.bsky.actor.defs#verificationState';
    /**
     * All verifications issued by trusted verifiers on behalf of this user. Verifications by untrusted verifiers are not included.
     */
    verifications: VerificationView[];
    /**
     * The user's status as a verified account.
     */
    verifiedStatus: 'valid' | 'invalid' | 'none' | l.UnknownString;
    /**
     * The user's status as a trusted verifier.
     */
    trustedVerifierStatus: 'valid' | 'invalid' | 'none' | l.UnknownString;
};
export type { VerificationState };
/** Represents the verification information about the user this object is attached to. */
declare const verificationState: l.TypedObjectSchema<"app.bsky.actor.defs#verificationState", l.Validator<VerificationState, VerificationState>>;
export { verificationState };
/** An individual verification for an associated subject. */
type VerificationView = {
    $type?: 'app.bsky.actor.defs#verificationView';
    /**
     * The user who issued this verification.
     */
    issuer: l.DidString;
    /**
     * The AT-URI of the verification record.
     */
    uri: l.AtUriString;
    /**
     * True if the verification passes validation, otherwise false.
     */
    isValid: boolean;
    /**
     * Timestamp when the verification was created.
     */
    createdAt: l.DatetimeString;
};
export type { VerificationView };
/** An individual verification for an associated subject. */
declare const verificationView: l.TypedObjectSchema<"app.bsky.actor.defs#verificationView", l.Validator<VerificationView, VerificationView>>;
export { verificationView };
type Preferences = (l.$Typed<AdultContentPref> | l.$Typed<ContentLabelPref> | l.$Typed<SavedFeedsPref> | l.$Typed<SavedFeedsPrefV2> | l.$Typed<PersonalDetailsPref> | l.$Typed<DeclaredAgePref> | l.$Typed<FeedViewPref> | l.$Typed<ThreadViewPref> | l.$Typed<InterestsPref> | l.$Typed<MutedWordsPref> | l.$Typed<HiddenPostsPref> | l.$Typed<BskyAppStatePref> | l.$Typed<LabelersPref> | l.$Typed<PostInteractionSettingsPref> | l.$Typed<VerificationPrefs> | l.$Typed<LiveEventPreferences> | l.Unknown$TypedObject)[];
export type { Preferences };
declare const preferences: l.ArraySchema<l.Validator<l.Unknown$TypedObject | {
    $type: "app.bsky.actor.defs#adultContentPref";
    enabled: boolean;
} | {
    $type: "app.bsky.actor.defs#contentLabelPref";
    labelerDid?: l.DidString | undefined;
    label: string;
    visibility: "ignore" | "show" | "warn" | "hide" | l.UnknownString;
} | {
    $type: "app.bsky.actor.defs#savedFeedsPref";
    pinned: l.AtUriString[];
    saved: l.AtUriString[];
    timelineIndex?: number | undefined;
} | {
    $type: "app.bsky.actor.defs#savedFeedsPrefV2";
    items: SavedFeed[];
} | {
    $type: "app.bsky.actor.defs#personalDetailsPref";
    birthDate?: l.DatetimeString | undefined;
} | {
    $type: "app.bsky.actor.defs#declaredAgePref";
    isOverAge13?: boolean
    /**
     * Indicates if the user has declared that they are over 16 years of age.
     */
     | undefined;
    isOverAge16?: boolean
    /**
     * Indicates if the user has declared that they are over 18 years of age.
     */
     | undefined;
    isOverAge18?: boolean | undefined;
} | {
    $type: "app.bsky.actor.defs#feedViewPref";
    feed: string;
    hideReplies?: boolean
    /**
     * Hide replies in the feed if they are not by followed users.
     */
     | undefined;
    hideRepliesByUnfollowed?: boolean
    /**
     * Hide replies in the feed if they do not have this number of likes.
     */
     | undefined;
    hideRepliesByLikeCount?: number
    /**
     * Hide reposts in the feed.
     */
     | undefined;
    hideReposts?: boolean
    /**
     * Hide quote posts in the feed.
     */
     | undefined;
    hideQuotePosts?: boolean | undefined;
} | {
    $type: "app.bsky.actor.defs#threadViewPref";
    sort?: ("oldest" | "newest" | "most-likes" | "random" | "hotness" | l.UnknownString) | undefined;
} | {
    $type: "app.bsky.actor.defs#interestsPref";
    tags: string[];
} | {
    $type: "app.bsky.actor.defs#mutedWordsPref";
    items: MutedWord[];
} | {
    $type: "app.bsky.actor.defs#hiddenPostsPref";
    items: l.AtUriString[];
} | {
    $type: "app.bsky.actor.defs#bskyAppStatePref";
    activeProgressGuide?: BskyAppProgressGuide
    /**
     * An array of tokens which identify nudges (modals, popups, tours, highlight dots) that should be shown to the user.
     */
     | undefined;
    queuedNudges?: string[]
    /**
     * Storage for NUXs the user has encountered.
     */
     | undefined;
    nuxs?: Nux[] | undefined;
} | {
    $type: "app.bsky.actor.defs#labelersPref";
    labelers: LabelerPrefItem[];
} | {
    $type: "app.bsky.actor.defs#postInteractionSettingsPref";
    threadgateAllowRules?: (l.$Typed<FeedThreadgate.MentionRule> | l.$Typed<FeedThreadgate.FollowerRule> | l.$Typed<FeedThreadgate.FollowingRule> | l.$Typed<FeedThreadgate.ListRule> | l.Unknown$TypedObject)[]
    /**
     * Matches postgate record. List of rules defining who can embed this users posts. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    postgateEmbeddingRules?: (l.$Typed<FeedPostgate.DisableRule> | l.Unknown$TypedObject)[] | undefined;
} | {
    $type: "app.bsky.actor.defs#verificationPrefs";
    hideBadges?: boolean | undefined;
} | {
    $type: "app.bsky.actor.defs#liveEventPreferences";
    hiddenFeedIds?: string[]
    /**
     * Whether to hide all feeds from live events.
     */
     | undefined;
    hideAllFeeds?: boolean | undefined;
}, l.Unknown$TypedObject | {
    $type: "app.bsky.actor.defs#adultContentPref";
    enabled: boolean;
} | {
    $type: "app.bsky.actor.defs#contentLabelPref";
    labelerDid?: l.DidString | undefined;
    label: string;
    visibility: "ignore" | "show" | "warn" | "hide" | l.UnknownString;
} | {
    $type: "app.bsky.actor.defs#savedFeedsPref";
    pinned: l.AtUriString[];
    saved: l.AtUriString[];
    timelineIndex?: number | undefined;
} | {
    $type: "app.bsky.actor.defs#savedFeedsPrefV2";
    items: SavedFeed[];
} | {
    $type: "app.bsky.actor.defs#personalDetailsPref";
    birthDate?: l.DatetimeString | undefined;
} | {
    $type: "app.bsky.actor.defs#declaredAgePref";
    isOverAge13?: boolean
    /**
     * Indicates if the user has declared that they are over 16 years of age.
     */
     | undefined;
    isOverAge16?: boolean
    /**
     * Indicates if the user has declared that they are over 18 years of age.
     */
     | undefined;
    isOverAge18?: boolean | undefined;
} | {
    $type: "app.bsky.actor.defs#feedViewPref";
    feed: string;
    hideReplies?: boolean
    /**
     * Hide replies in the feed if they are not by followed users.
     */
     | undefined;
    hideRepliesByUnfollowed?: boolean
    /**
     * Hide replies in the feed if they do not have this number of likes.
     */
     | undefined;
    hideRepliesByLikeCount?: number
    /**
     * Hide reposts in the feed.
     */
     | undefined;
    hideReposts?: boolean
    /**
     * Hide quote posts in the feed.
     */
     | undefined;
    hideQuotePosts?: boolean | undefined;
} | {
    $type: "app.bsky.actor.defs#threadViewPref";
    sort?: ("oldest" | "newest" | "most-likes" | "random" | "hotness" | l.UnknownString) | undefined;
} | {
    $type: "app.bsky.actor.defs#interestsPref";
    tags: string[];
} | {
    $type: "app.bsky.actor.defs#mutedWordsPref";
    items: MutedWord[];
} | {
    $type: "app.bsky.actor.defs#hiddenPostsPref";
    items: l.AtUriString[];
} | {
    $type: "app.bsky.actor.defs#bskyAppStatePref";
    activeProgressGuide?: BskyAppProgressGuide
    /**
     * An array of tokens which identify nudges (modals, popups, tours, highlight dots) that should be shown to the user.
     */
     | undefined;
    queuedNudges?: string[]
    /**
     * Storage for NUXs the user has encountered.
     */
     | undefined;
    nuxs?: Nux[] | undefined;
} | {
    $type: "app.bsky.actor.defs#labelersPref";
    labelers: LabelerPrefItem[];
} | {
    $type: "app.bsky.actor.defs#postInteractionSettingsPref";
    threadgateAllowRules?: (l.$Typed<FeedThreadgate.MentionRule> | l.$Typed<FeedThreadgate.FollowerRule> | l.$Typed<FeedThreadgate.FollowingRule> | l.$Typed<FeedThreadgate.ListRule> | l.Unknown$TypedObject)[]
    /**
     * Matches postgate record. List of rules defining who can embed this users posts. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    postgateEmbeddingRules?: (l.$Typed<FeedPostgate.DisableRule> | l.Unknown$TypedObject)[] | undefined;
} | {
    $type: "app.bsky.actor.defs#verificationPrefs";
    hideBadges?: boolean | undefined;
} | {
    $type: "app.bsky.actor.defs#liveEventPreferences";
    hiddenFeedIds?: string[]
    /**
     * Whether to hide all feeds from live events.
     */
     | undefined;
    hideAllFeeds?: boolean | undefined;
}>>;
export { preferences };
type AdultContentPref = {
    $type?: 'app.bsky.actor.defs#adultContentPref';
    enabled: boolean;
};
export type { AdultContentPref };
declare const adultContentPref: l.TypedObjectSchema<"app.bsky.actor.defs#adultContentPref", l.Validator<AdultContentPref, AdultContentPref>>;
export { adultContentPref };
type ContentLabelPref = {
    $type?: 'app.bsky.actor.defs#contentLabelPref';
    /**
     * Which labeler does this preference apply to? If undefined, applies globally.
     */
    labelerDid?: l.DidString;
    label: string;
    visibility: 'ignore' | 'show' | 'warn' | 'hide' | l.UnknownString;
};
export type { ContentLabelPref };
declare const contentLabelPref: l.TypedObjectSchema<"app.bsky.actor.defs#contentLabelPref", l.Validator<ContentLabelPref, ContentLabelPref>>;
export { contentLabelPref };
type SavedFeed = {
    $type?: 'app.bsky.actor.defs#savedFeed';
    id: string;
    type: 'feed' | 'list' | 'timeline' | l.UnknownString;
    value: string;
    pinned: boolean;
};
export type { SavedFeed };
declare const savedFeed: l.TypedObjectSchema<"app.bsky.actor.defs#savedFeed", l.Validator<SavedFeed, SavedFeed>>;
export { savedFeed };
type SavedFeedsPrefV2 = {
    $type?: 'app.bsky.actor.defs#savedFeedsPrefV2';
    items: SavedFeed[];
};
export type { SavedFeedsPrefV2 };
declare const savedFeedsPrefV2: l.TypedObjectSchema<"app.bsky.actor.defs#savedFeedsPrefV2", l.Validator<SavedFeedsPrefV2, SavedFeedsPrefV2>>;
export { savedFeedsPrefV2 };
type SavedFeedsPref = {
    $type?: 'app.bsky.actor.defs#savedFeedsPref';
    pinned: l.AtUriString[];
    saved: l.AtUriString[];
    timelineIndex?: number;
};
export type { SavedFeedsPref };
declare const savedFeedsPref: l.TypedObjectSchema<"app.bsky.actor.defs#savedFeedsPref", l.Validator<SavedFeedsPref, SavedFeedsPref>>;
export { savedFeedsPref };
type PersonalDetailsPref = {
    $type?: 'app.bsky.actor.defs#personalDetailsPref';
    /**
     * The birth date of account owner.
     */
    birthDate?: l.DatetimeString;
};
export type { PersonalDetailsPref };
declare const personalDetailsPref: l.TypedObjectSchema<"app.bsky.actor.defs#personalDetailsPref", l.Validator<PersonalDetailsPref, PersonalDetailsPref>>;
export { personalDetailsPref };
/** Read-only preference containing value(s) inferred from the user's declared birthdate. Absence of this preference object in the response indicates that the user has not made a declaration. */
type DeclaredAgePref = {
    $type?: 'app.bsky.actor.defs#declaredAgePref';
    /**
     * Indicates if the user has declared that they are over 13 years of age.
     */
    isOverAge13?: boolean;
    /**
     * Indicates if the user has declared that they are over 16 years of age.
     */
    isOverAge16?: boolean;
    /**
     * Indicates if the user has declared that they are over 18 years of age.
     */
    isOverAge18?: boolean;
};
export type { DeclaredAgePref };
/** Read-only preference containing value(s) inferred from the user's declared birthdate. Absence of this preference object in the response indicates that the user has not made a declaration. */
declare const declaredAgePref: l.TypedObjectSchema<"app.bsky.actor.defs#declaredAgePref", l.Validator<DeclaredAgePref, DeclaredAgePref>>;
export { declaredAgePref };
type FeedViewPref = {
    $type?: 'app.bsky.actor.defs#feedViewPref';
    /**
     * The URI of the feed, or an identifier which describes the feed.
     */
    feed: string;
    /**
     * Hide replies in the feed.
     */
    hideReplies?: boolean;
    /**
     * Hide replies in the feed if they are not by followed users.
     */
    hideRepliesByUnfollowed?: boolean;
    /**
     * Hide replies in the feed if they do not have this number of likes.
     */
    hideRepliesByLikeCount?: number;
    /**
     * Hide reposts in the feed.
     */
    hideReposts?: boolean;
    /**
     * Hide quote posts in the feed.
     */
    hideQuotePosts?: boolean;
};
export type { FeedViewPref };
declare const feedViewPref: l.TypedObjectSchema<"app.bsky.actor.defs#feedViewPref", l.Validator<FeedViewPref, FeedViewPref>>;
export { feedViewPref };
type ThreadViewPref = {
    $type?: 'app.bsky.actor.defs#threadViewPref';
    /**
     * Sorting mode for threads.
     */
    sort?: 'oldest' | 'newest' | 'most-likes' | 'random' | 'hotness' | l.UnknownString;
};
export type { ThreadViewPref };
declare const threadViewPref: l.TypedObjectSchema<"app.bsky.actor.defs#threadViewPref", l.Validator<ThreadViewPref, ThreadViewPref>>;
export { threadViewPref };
type InterestsPref = {
    $type?: 'app.bsky.actor.defs#interestsPref';
    /**
     * A list of tags which describe the account owner's interests gathered during onboarding.
     */
    tags: string[];
};
export type { InterestsPref };
declare const interestsPref: l.TypedObjectSchema<"app.bsky.actor.defs#interestsPref", l.Validator<InterestsPref, InterestsPref>>;
export { interestsPref };
type MutedWordTarget = 'content' | 'tag' | l.UnknownString;
export type { MutedWordTarget };
declare const mutedWordTarget: l.StringSchema<{
    knownValues: ["content", "tag"];
    maxLength: 640;
    maxGraphemes: 64;
}>;
export { mutedWordTarget };
/** A word that the account owner has muted. */
type MutedWord = {
    $type?: 'app.bsky.actor.defs#mutedWord';
    id?: string;
    /**
     * The muted word itself.
     */
    value: string;
    /**
     * The intended targets of the muted word.
     */
    targets: MutedWordTarget[];
    /**
     * Groups of users to apply the muted word to. If undefined, applies to all users.
     */
    actorTarget?: 'all' | 'exclude-following' | l.UnknownString;
    /**
     * The date and time at which the muted word will expire and no longer be applied.
     */
    expiresAt?: l.DatetimeString;
};
export type { MutedWord };
/** A word that the account owner has muted. */
declare const mutedWord: l.TypedObjectSchema<"app.bsky.actor.defs#mutedWord", l.Validator<MutedWord, MutedWord>>;
export { mutedWord };
type MutedWordsPref = {
    $type?: 'app.bsky.actor.defs#mutedWordsPref';
    /**
     * A list of words the account owner has muted.
     */
    items: MutedWord[];
};
export type { MutedWordsPref };
declare const mutedWordsPref: l.TypedObjectSchema<"app.bsky.actor.defs#mutedWordsPref", l.Validator<MutedWordsPref, MutedWordsPref>>;
export { mutedWordsPref };
type HiddenPostsPref = {
    $type?: 'app.bsky.actor.defs#hiddenPostsPref';
    /**
     * A list of URIs of posts the account owner has hidden.
     */
    items: l.AtUriString[];
};
export type { HiddenPostsPref };
declare const hiddenPostsPref: l.TypedObjectSchema<"app.bsky.actor.defs#hiddenPostsPref", l.Validator<HiddenPostsPref, HiddenPostsPref>>;
export { hiddenPostsPref };
type LabelersPref = {
    $type?: 'app.bsky.actor.defs#labelersPref';
    labelers: LabelerPrefItem[];
};
export type { LabelersPref };
declare const labelersPref: l.TypedObjectSchema<"app.bsky.actor.defs#labelersPref", l.Validator<LabelersPref, LabelersPref>>;
export { labelersPref };
type LabelerPrefItem = {
    $type?: 'app.bsky.actor.defs#labelerPrefItem';
    did: l.DidString;
};
export type { LabelerPrefItem };
declare const labelerPrefItem: l.TypedObjectSchema<"app.bsky.actor.defs#labelerPrefItem", l.Validator<LabelerPrefItem, LabelerPrefItem>>;
export { labelerPrefItem };
/** A grab bag of state that's specific to the bsky.app program. Third-party apps shouldn't use this. */
type BskyAppStatePref = {
    $type?: 'app.bsky.actor.defs#bskyAppStatePref';
    activeProgressGuide?: BskyAppProgressGuide;
    /**
     * An array of tokens which identify nudges (modals, popups, tours, highlight dots) that should be shown to the user.
     */
    queuedNudges?: string[];
    /**
     * Storage for NUXs the user has encountered.
     */
    nuxs?: Nux[];
};
export type { BskyAppStatePref };
/** A grab bag of state that's specific to the bsky.app program. Third-party apps shouldn't use this. */
declare const bskyAppStatePref: l.TypedObjectSchema<"app.bsky.actor.defs#bskyAppStatePref", l.Validator<BskyAppStatePref, BskyAppStatePref>>;
export { bskyAppStatePref };
/** If set, an active progress guide. Once completed, can be set to undefined. Should have unspecced fields tracking progress. */
type BskyAppProgressGuide = {
    $type?: 'app.bsky.actor.defs#bskyAppProgressGuide';
    guide: string;
};
export type { BskyAppProgressGuide };
/** If set, an active progress guide. Once completed, can be set to undefined. Should have unspecced fields tracking progress. */
declare const bskyAppProgressGuide: l.TypedObjectSchema<"app.bsky.actor.defs#bskyAppProgressGuide", l.Validator<BskyAppProgressGuide, BskyAppProgressGuide>>;
export { bskyAppProgressGuide };
/** A new user experiences (NUX) storage object */
type Nux = {
    $type?: 'app.bsky.actor.defs#nux';
    id: string;
    completed: boolean;
    /**
     * Arbitrary data for the NUX. The structure is defined by the NUX itself. Limited to 300 characters.
     */
    data?: string;
    /**
     * The date and time at which the NUX will expire and should be considered completed.
     */
    expiresAt?: l.DatetimeString;
};
export type { Nux };
/** A new user experiences (NUX) storage object */
declare const nux: l.TypedObjectSchema<"app.bsky.actor.defs#nux", l.Validator<Nux, Nux>>;
export { nux };
/** Preferences for how verified accounts appear in the app. */
type VerificationPrefs = {
    $type?: 'app.bsky.actor.defs#verificationPrefs';
    /**
     * Hide the blue check badges for verified accounts and trusted verifiers.
     */
    hideBadges?: boolean;
};
export type { VerificationPrefs };
/** Preferences for how verified accounts appear in the app. */
declare const verificationPrefs: l.TypedObjectSchema<"app.bsky.actor.defs#verificationPrefs", l.Validator<VerificationPrefs, VerificationPrefs>>;
export { verificationPrefs };
/** Preferences for live events. */
type LiveEventPreferences = {
    $type?: 'app.bsky.actor.defs#liveEventPreferences';
    /**
     * A list of feed IDs that the user has hidden from live events.
     */
    hiddenFeedIds?: string[];
    /**
     * Whether to hide all feeds from live events.
     */
    hideAllFeeds?: boolean;
};
export type { LiveEventPreferences };
/** Preferences for live events. */
declare const liveEventPreferences: l.TypedObjectSchema<"app.bsky.actor.defs#liveEventPreferences", l.Validator<LiveEventPreferences, LiveEventPreferences>>;
export { liveEventPreferences };
/** Default post interaction settings for the account. These values should be applied as default values when creating new posts. These refs should mirror the threadgate and postgate records exactly. */
type PostInteractionSettingsPref = {
    $type?: 'app.bsky.actor.defs#postInteractionSettingsPref';
    /**
     * Matches threadgate record. List of rules defining who can reply to this users posts. If value is an empty array, no one can reply. If value is undefined, anyone can reply.
     */
    threadgateAllowRules?: (l.$Typed<FeedThreadgate.MentionRule> | l.$Typed<FeedThreadgate.FollowerRule> | l.$Typed<FeedThreadgate.FollowingRule> | l.$Typed<FeedThreadgate.ListRule> | l.Unknown$TypedObject)[];
    /**
     * Matches postgate record. List of rules defining who can embed this users posts. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
    postgateEmbeddingRules?: (l.$Typed<FeedPostgate.DisableRule> | l.Unknown$TypedObject)[];
};
export type { PostInteractionSettingsPref };
/** Default post interaction settings for the account. These values should be applied as default values when creating new posts. These refs should mirror the threadgate and postgate records exactly. */
declare const postInteractionSettingsPref: l.TypedObjectSchema<"app.bsky.actor.defs#postInteractionSettingsPref", l.Validator<PostInteractionSettingsPref, PostInteractionSettingsPref>>;
export { postInteractionSettingsPref };
type StatusView = {
    $type?: 'app.bsky.actor.defs#statusView';
    uri?: l.AtUriString;
    cid?: l.CidString;
    /**
     * The status for the account.
     */
    status: 'app.bsky.actor.status#live' | l.UnknownString;
    record: l.LexMap;
    /**
     * An optional embed associated with the status.
     */
    embed?: l.$Typed<EmbedExternal.View> | l.Unknown$TypedObject;
    labels?: LabelDefs.Label[];
    /**
     * The date when this status will expire. The application might choose to no longer return the status after expiration.
     */
    expiresAt?: l.DatetimeString;
    /**
     * True if the status is not expired, false if it is expired. Only present if expiration was set.
     */
    isActive?: boolean;
    /**
     * True if the user's go-live access has been disabled by a moderator, false otherwise.
     */
    isDisabled?: boolean;
};
export type { StatusView };
declare const statusView: l.TypedObjectSchema<"app.bsky.actor.defs#statusView", l.Validator<StatusView, StatusView>>;
export { statusView };
//# sourceMappingURL=defs.defs.d.ts.map