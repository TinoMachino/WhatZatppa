import { l } from '@atproto/lex';
import * as FeedPostgate from '../feed/postgate.defs.js';
import * as FeedThreadgate from '../feed/threadgate.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
declare const $nsid = "app.bsky.draft.defs";
export { $nsid };
/** A draft with an identifier, used to store drafts in private storage (stash). */
type DraftWithId = {
    $type?: 'app.bsky.draft.defs#draftWithId';
    /**
     * A TID to be used as a draft identifier.
     */
    id: l.TidString;
    draft: Draft;
};
export type { DraftWithId };
/** A draft with an identifier, used to store drafts in private storage (stash). */
declare const draftWithId: l.TypedObjectSchema<"app.bsky.draft.defs#draftWithId", l.Validator<DraftWithId, DraftWithId>>;
export { draftWithId };
/** A draft containing an array of draft posts. */
type Draft = {
    $type?: 'app.bsky.draft.defs#draft';
    /**
     * UUIDv4 identifier of the device that created this draft.
     */
    deviceId?: string;
    /**
     * The device and/or platform on which the draft was created.
     */
    deviceName?: string;
    /**
     * Array of draft posts that compose this draft.
     */
    posts: DraftPost[];
    /**
     * Indicates human language of posts primary text content.
     */
    langs?: l.LanguageString[];
    /**
     * Embedding rules for the postgates to be created when this draft is published.
     */
    postgateEmbeddingRules?: (l.$Typed<FeedPostgate.DisableRule> | l.Unknown$TypedObject)[];
    /**
     * Allow-rules for the threadgate to be created when this draft is published.
     */
    threadgateAllow?: (l.$Typed<FeedThreadgate.MentionRule> | l.$Typed<FeedThreadgate.FollowerRule> | l.$Typed<FeedThreadgate.FollowingRule> | l.$Typed<FeedThreadgate.ListRule> | l.Unknown$TypedObject)[];
};
export type { Draft };
/** A draft containing an array of draft posts. */
declare const draft: l.TypedObjectSchema<"app.bsky.draft.defs#draft", l.Validator<Draft, Draft>>;
export { draft };
/** One of the posts that compose a draft. */
type DraftPost = {
    $type?: 'app.bsky.draft.defs#draftPost';
    /**
     * The primary post content. It has a higher limit than post contents to allow storing a larger text that can later be refined into smaller posts.
     */
    text: string;
    /**
     * Self-label values for this post. Effectively content warnings.
     */
    labels?: l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject;
    embedImages?: DraftEmbedImage[];
    embedVideos?: DraftEmbedVideo[];
    embedExternals?: DraftEmbedExternal[];
    embedRecords?: DraftEmbedRecord[];
};
export type { DraftPost };
/** One of the posts that compose a draft. */
declare const draftPost: l.TypedObjectSchema<"app.bsky.draft.defs#draftPost", l.Validator<DraftPost, DraftPost>>;
export { draftPost };
/** View to present drafts data to users. */
type DraftView = {
    $type?: 'app.bsky.draft.defs#draftView';
    /**
     * A TID to be used as a draft identifier.
     */
    id: l.TidString;
    draft: Draft;
    /**
     * The time the draft was created.
     */
    createdAt: l.DatetimeString;
    /**
     * The time the draft was last updated.
     */
    updatedAt: l.DatetimeString;
};
export type { DraftView };
/** View to present drafts data to users. */
declare const draftView: l.TypedObjectSchema<"app.bsky.draft.defs#draftView", l.Validator<DraftView, DraftView>>;
export { draftView };
type DraftEmbedLocalRef = {
    $type?: 'app.bsky.draft.defs#draftEmbedLocalRef';
    /**
     * Local, on-device ref to file to be embedded. Embeds are currently device-bound for drafts.
     */
    path: string;
};
export type { DraftEmbedLocalRef };
declare const draftEmbedLocalRef: l.TypedObjectSchema<"app.bsky.draft.defs#draftEmbedLocalRef", l.Validator<DraftEmbedLocalRef, DraftEmbedLocalRef>>;
export { draftEmbedLocalRef };
type DraftEmbedCaption = {
    $type?: 'app.bsky.draft.defs#draftEmbedCaption';
    lang: l.LanguageString;
    content: string;
};
export type { DraftEmbedCaption };
declare const draftEmbedCaption: l.TypedObjectSchema<"app.bsky.draft.defs#draftEmbedCaption", l.Validator<DraftEmbedCaption, DraftEmbedCaption>>;
export { draftEmbedCaption };
type DraftEmbedImage = {
    $type?: 'app.bsky.draft.defs#draftEmbedImage';
    localRef: DraftEmbedLocalRef;
    alt?: string;
};
export type { DraftEmbedImage };
declare const draftEmbedImage: l.TypedObjectSchema<"app.bsky.draft.defs#draftEmbedImage", l.Validator<DraftEmbedImage, DraftEmbedImage>>;
export { draftEmbedImage };
type DraftEmbedVideo = {
    $type?: 'app.bsky.draft.defs#draftEmbedVideo';
    localRef: DraftEmbedLocalRef;
    alt?: string;
    captions?: DraftEmbedCaption[];
};
export type { DraftEmbedVideo };
declare const draftEmbedVideo: l.TypedObjectSchema<"app.bsky.draft.defs#draftEmbedVideo", l.Validator<DraftEmbedVideo, DraftEmbedVideo>>;
export { draftEmbedVideo };
type DraftEmbedExternal = {
    $type?: 'app.bsky.draft.defs#draftEmbedExternal';
    uri: l.UriString;
};
export type { DraftEmbedExternal };
declare const draftEmbedExternal: l.TypedObjectSchema<"app.bsky.draft.defs#draftEmbedExternal", l.Validator<DraftEmbedExternal, DraftEmbedExternal>>;
export { draftEmbedExternal };
type DraftEmbedRecord = {
    $type?: 'app.bsky.draft.defs#draftEmbedRecord';
    record: RepoStrongRef.Main;
};
export type { DraftEmbedRecord };
declare const draftEmbedRecord: l.TypedObjectSchema<"app.bsky.draft.defs#draftEmbedRecord", l.Validator<DraftEmbedRecord, DraftEmbedRecord>>;
export { draftEmbedRecord };
//# sourceMappingURL=defs.defs.d.ts.map