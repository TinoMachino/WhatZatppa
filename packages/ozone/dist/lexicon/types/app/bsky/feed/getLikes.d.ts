/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyActorDefs from '../actor/defs.js';
export type QueryParams = {
    /** AT-URI of the subject (eg, a post record). */
    uri: string;
    /** CID of the subject record (aka, specific version of record), to filter likes. */
    cid?: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    uri: string;
    cid?: string;
    cursor?: string;
    likes: Like[];
}
export type HandlerInput = void;
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | HandlerSuccess;
export interface Like {
    $type?: 'app.bsky.feed.getLikes#like';
    indexedAt: string;
    createdAt: string;
    actor: AppBskyActorDefs.ProfileView;
}
export declare function isLike<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.feed.getLikes", "like">;
export declare function validateLike<V>(v: V): ValidationResult<Like & V>;
//# sourceMappingURL=getLikes.d.ts.map