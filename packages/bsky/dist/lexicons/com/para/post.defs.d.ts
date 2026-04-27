import { l } from '@atproto/lex';
import * as RichtextFacet from '../../app/bsky/richtext/facet.defs.js';
import * as EmbedImages from '../../app/bsky/embed/images.defs.js';
import * as EmbedVideo from '../../app/bsky/embed/video.defs.js';
import * as EmbedExternal from '../../app/bsky/embed/external.defs.js';
import * as EmbedRecord from '../../app/bsky/embed/record.defs.js';
import * as EmbedRecordWithMedia from '../../app/bsky/embed/recordWithMedia.defs.js';
import * as LabelDefs from '../atproto/label/defs.defs.js';
import * as RepoStrongRef from '../atproto/repo/strongRef.defs.js';
declare const $nsid = "com.para.post";
export { $nsid };
/** Record containing a Para post. */
type Main = {
    $type: 'com.para.post';
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
     * Optional para-specific flairs associated with the post.
     */
    flairs?: string[];
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
    postType?: string;
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
    title?: string;
    /**
     * Client-declared timestamp when this post was originally created.
     */
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record containing a Para post. */
declare const main: l.RecordSchema<"tid", "com.para.post", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.post", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        createdAt: l.DatetimeString;
        title?: string
        /**
         * Client-declared timestamp when this post was originally created.
         */
         | undefined;
        langs?: l.LanguageString[]
        /**
         * Self-label values for this post. Effectively content warnings.
         */
         | undefined;
        tags?: string[]
        /**
         * Optional para-specific flairs associated with the post.
         */
         | undefined;
        reply?: ReplyRef | undefined;
        flairs?: string[]
        /**
         * Optional para-specific post type (policy, matter, meme, etc).
         */
         | undefined;
        postType?: string
        /**
         * Optional title for policy or proposal posts, summarizing the content.
         */
         | undefined;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
        entities?: Entity[]
        /**
         * Annotations of text (mentions, URLs, hashtags, etc)
         */
         | undefined;
        facets?: RichtextFacet.Main[] | undefined;
        $type: "com.para.post";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        createdAt: l.DatetimeString;
        title?: string
        /**
         * Client-declared timestamp when this post was originally created.
         */
         | undefined;
        langs?: l.LanguageString[]
        /**
         * Self-label values for this post. Effectively content warnings.
         */
         | undefined;
        tags?: string[]
        /**
         * Optional para-specific flairs associated with the post.
         */
         | undefined;
        reply?: ReplyRef | undefined;
        flairs?: string[]
        /**
         * Optional para-specific post type (policy, matter, meme, etc).
         */
         | undefined;
        postType?: string
        /**
         * Optional title for policy or proposal posts, summarizing the content.
         */
         | undefined;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
        entities?: Entity[]
        /**
         * Annotations of text (mentions, URLs, hashtags, etc)
         */
         | undefined;
        facets?: RichtextFacet.Main[] | undefined;
        $type: "com.para.post";
    };
}, $type: "com.para.post";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    text: string;
    createdAt: l.DatetimeString;
    title?: string
    /**
     * Client-declared timestamp when this post was originally created.
     */
     | undefined;
    langs?: l.LanguageString[]
    /**
     * Self-label values for this post. Effectively content warnings.
     */
     | undefined;
    tags?: string[]
    /**
     * Optional para-specific flairs associated with the post.
     */
     | undefined;
    reply?: ReplyRef | undefined;
    flairs?: string[]
    /**
     * Optional para-specific post type (policy, matter, meme, etc).
     */
     | undefined;
    postType?: string
    /**
     * Optional title for policy or proposal posts, summarizing the content.
     */
     | undefined;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    embed?: (l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.$Typed<EmbedRecord.Main> | l.$Typed<EmbedRecordWithMedia.Main> | l.Unknown$TypedObject) | undefined;
    entities?: Entity[]
    /**
     * Annotations of text (mentions, URLs, hashtags, etc)
     */
     | undefined;
    facets?: RichtextFacet.Main[] | undefined;
    $type: "com.para.post";
}>;
type ReplyRef = {
    $type?: 'com.para.post#replyRef';
    root: RepoStrongRef.Main;
    parent: RepoStrongRef.Main;
};
export type { ReplyRef };
declare const replyRef: l.TypedObjectSchema<"com.para.post#replyRef", l.Validator<ReplyRef, ReplyRef>>;
export { replyRef };
/** @deprecated use facets instead. */
type Entity = {
    $type?: 'com.para.post#entity';
    index: TextSlice;
    /**
     * Expected values are 'mention' and 'link'.
     */
    type: string;
    value: string;
};
export type { Entity };
/** @deprecated use facets instead. */
declare const entity: l.TypedObjectSchema<"com.para.post#entity", l.Validator<Entity, Entity>>;
export { entity };
/**
 * A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.
 * @deprecated . Use app.bsky.richtext instead
 */
type TextSlice = {
    $type?: 'com.para.post#textSlice';
    start: number;
    end: number;
};
export type { TextSlice };
/**
 * A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings.
 * @deprecated . Use app.bsky.richtext instead
 */
declare const textSlice: l.TypedObjectSchema<"com.para.post#textSlice", l.Validator<TextSlice, TextSlice>>;
export { textSlice };
//# sourceMappingURL=post.defs.d.ts.map