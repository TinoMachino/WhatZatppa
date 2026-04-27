/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import type * as ComParaFeedGetAuthorFeed from './getAuthorFeed.js';
export type QueryParams = {
    /** Reference (AT-URI) to the post record. */
    uri: string;
    /** How many levels of reply depth to include. */
    depth?: number;
    /** How many levels of parent posts to include. */
    parentHeight?: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    post: ComParaFeedGetAuthorFeed.PostView;
    parents: ComParaFeedGetAuthorFeed.PostView[];
    replies: ComParaFeedGetAuthorFeed.PostView[];
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
export declare class NotFoundError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=getPostThread.d.ts.map