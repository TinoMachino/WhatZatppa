/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
export type QueryParams = {
    post: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    post: string;
    reply: boolean;
    quote: boolean;
    indexedAt?: string;
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
//# sourceMappingURL=getPostSubscription.d.ts.map