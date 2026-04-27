/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ComParaFeedGetAuthorFeed from './getAuthorFeed.js';
export type QueryParams = {
    /** List of Para post AT-URIs to return. */
    uris: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    posts: ComParaFeedGetAuthorFeed.PostView[];
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
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=getPosts.d.ts.map