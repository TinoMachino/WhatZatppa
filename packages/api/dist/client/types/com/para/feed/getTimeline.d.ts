/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ComParaFeedGetAuthorFeed from './getAuthorFeed.js';
export type QueryParams = {
    limit?: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    feed: ComParaFeedGetAuthorFeed.PostView[];
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
//# sourceMappingURL=getTimeline.d.ts.map