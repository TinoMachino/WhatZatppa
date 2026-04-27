import { l } from '@atproto/lex';
import * as RichtextFacet from '../richtext/facet.defs.js';
import * as EmbedImages from '../embed/images.defs.js';
import * as EmbedVideo from '../embed/video.defs.js';
import * as EmbedExternal from '../embed/external.defs.js';
import * as EmbedRecord from '../embed/record.defs.js';
import * as EmbedRecordWithMedia from '../embed/recordWithMedia.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
declare const $nsid = "app.bsky.feed.post";
export { $nsid };
/** Record containing a Bluesky post. */
type Main = {
    $type: 'app.bsky.feed.post';
    /**
     * The primary post content. May be an empty string, if there are embeds.
     */
    text: string;
    /**
     * @deprecated replaced by app.bsky.richtext.facet.
     */
    entities?: Entity[];
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
    facets?: RichtextFacet.Main[];
    reply?: ReplyRef;
    embed?: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject;
    /**
     * Indicates human language of post primary text content.
     */
    langs?: l.LanguageString[];
    /**
     * Self-label values for this post. Effectively content warnings.
     */
    labels?: l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject;
    /**
     * Additional hashtags, in addition to any included in post text and facets.
     */
    tags?: string[];
    /**
     * Client-declared timestamp when this post was originally created.
     */
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record containing a Bluesky post. */
declare const main: l.RecordSchema<"tid", "app.bsky.feed.post", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.feed.post", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
        tags?: string[]
        /**
         * Client-declared timestamp when this post was originally created.
         */
         | undefined;
        createdAt: l.DatetimeString;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        reply?: ReplyRef | undefined;
        langs?: l.LanguageString[]
        /**
         * Self-label values for this post. Effectively content warnings.
         */
         | undefined;
        entities?: Entity[]
        /**
         * Annotations of text (mentions, URLs, hashtags, etc)
         */
         | undefined;
        facets?: RichtextFacet.Main[] | undefined;
        $type: "app.bsky.feed.post";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
        tags?: string[]
        /**
         * Client-declared timestamp when this post was originally created.
         */
         | undefined;
        createdAt: l.DatetimeString;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        reply?: ReplyRef | undefined;
        langs?: l.LanguageString[]
        /**
         * Self-label values for this post. Effectively content warnings.
         */
         | undefined;
        entities?: Entity[]
        /**
         * Annotations of text (mentions, URLs, hashtags, etc)
         */
         | undefined;
        facets?: RichtextFacet.Main[] | undefined;
        $type: "app.bsky.feed.post";
    };
}, $type: "app.bsky.feed.post";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    text: string;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    tags?: string[]
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    createdAt: l.DatetimeString;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reply?: ReplyRef | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "app.bsky.feed.post";
}>;
type ReplyRef = {
    $type?: 'app.bsky.feed.post#replyRef';
    root: RepoStrongRef.Main;
    parent: RepoStrongRef.Main;
};
export type { ReplyRef };
declare const replyRef: l.TypedObjectSchema<"app.bsky.feed.post#replyRef", l.Validator<ReplyRef, ReplyRef>>;
export { replyRef };
/** @deprecated use facets instead. */
type Entity = {
    $type?: 'app.bsky.feed.post#entity';
    index: TextSlice;
    /**
     * Expected values are 'mention' and 'link'.
     */
    type: string;
    value: string;
};
export type { Entity };
/** @deprecated use facets instead. */
declare const entity: l.TypedObjectSchema<"app.bsky.feed.post#entity", l.Validator<Entity, Entity>>;
export { entity };
/**
 * A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.
 * @deprecated . Use app.bsky.richtext instead
 */
type TextSlice = {
    $type?: 'app.bsky.feed.post#textSlice';
    start: number;
    end: number;
};
export type { TextSlice };
/**
 * A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.
 * @deprecated . Use app.bsky.richtext instead
 */
declare const textSlice: l.TypedObjectSchema<"app.bsky.feed.post#textSlice", l.Validator<TextSlice, TextSlice>>;
export { textSlice };
//# sourceMappingURL=post.defs.d.ts.map