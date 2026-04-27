/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../util';
import type * as AppBskyRichtextFacet from '../../app/bsky/richtext/facet.js';
import type * as AppBskyEmbedImages from '../../app/bsky/embed/images.js';
import type * as AppBskyEmbedVideo from '../../app/bsky/embed/video.js';
import type * as AppBskyEmbedExternal from '../../app/bsky/embed/external.js';
import type * as AppBskyEmbedRecord from '../../app/bsky/embed/record.js';
import type * as AppBskyEmbedRecordWithMedia from '../../app/bsky/embed/recordWithMedia.js';
import type * as ComAtprotoLabelDefs from '../atproto/label/defs.js';
import type * as ComAtprotoRepoStrongRef from '../atproto/repo/strongRef.js';
export interface Main {
    $type: 'com.para.post';
    /** The primary post content. May be an empty string, if there are embeds. */
    text: string;
    /** DEPRECATED: replaced by app.bsky.richtext.facet. */
    entities?: Entity[];
    /** Annotations of text (mentions, URLs, hashtags, etc) */
    facets?: AppBskyRichtextFacet.Main[];
    reply?: ReplyRef;
    embed?: $Typed<AppBskyEmbedImages.Main> | $Typed<AppBskyEmbedVideo.Main> | $Typed<AppBskyEmbedExternal.Main> | $Typed<AppBskyEmbedRecord.Main> | $Typed<AppBskyEmbedRecordWithMedia.Main> | {
        $type: string;
    };
    /** Indicates human language of post primary text content. */
    langs?: string[];
    labels?: $Typed<ComAtprotoLabelDefs.SelfLabels> | {
        $type: string;
    };
    /** Additional hashtags, in addition to any included in post text and facets. */
    tags?: string[];
    /** Optional para-specific flairs associated with the post. */
    flairs?: string[];
    /** Optional para-specific post type (policy, matter, meme, etc). */
    postType?: string;
    /** Optional title for policy or proposal posts, summarizing the content. */
    title?: string;
    /** Client-declared timestamp when this post was originally created. */
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../util").$TypedObject<V, "com.para.post", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
export interface ReplyRef {
    $type?: 'com.para.post#replyRef';
    root: ComAtprotoRepoStrongRef.Main;
    parent: ComAtprotoRepoStrongRef.Main;
}
export declare function isReplyRef<V>(v: V): v is import("../../../util").$TypedObject<V, "com.para.post", "replyRef">;
export declare function validateReplyRef<V>(v: V): ValidationResult<ReplyRef & V>;
/** Deprecated: use facets instead. */
export interface Entity {
    $type?: 'com.para.post#entity';
    index: TextSlice;
    /** Expected values are 'mention' and 'link'. */
    type: string;
    value: string;
}
export declare function isEntity<V>(v: V): v is import("../../../util").$TypedObject<V, "com.para.post", "entity">;
export declare function validateEntity<V>(v: V): ValidationResult<Entity & V>;
/** Deprecated. Use app.bsky.richtext instead -- A text segment. Start is inclusive, end is exclusive. Indices are for utf16-encoded strings. */
export interface TextSlice {
    $type?: 'com.para.post#textSlice';
    start: number;
    end: number;
}
export declare function isTextSlice<V>(v: V): v is import("../../../util").$TypedObject<V, "com.para.post", "textSlice">;
export declare function validateTextSlice<V>(v: V): ValidationResult<TextSlice & V>;
//# sourceMappingURL=post.d.ts.map