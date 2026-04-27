/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    /** Handle or DID of the actor. */
    actor: string;
    limit?: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    feed: PostView[];
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare class BlockedActorError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class BlockedByActorError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
export interface PostView {
    $type?: 'com.para.feed.getAuthorFeed#postView';
    uri: string;
    cid: string;
    author: string;
    text: string;
    createdAt: string;
    replyRoot?: string;
    replyParent?: string;
    langs?: string[];
    tags?: string[];
    flairs?: string[];
    postType?: string;
}
export declare function isPostView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.feed.getAuthorFeed", "postView">;
export declare function validatePostView<V>(v: V): ValidationResult<PostView & V>;
//# sourceMappingURL=getAuthorFeed.d.ts.map