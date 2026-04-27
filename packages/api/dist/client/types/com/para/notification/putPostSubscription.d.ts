/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
export type QueryParams = {};
export interface InputSchema {
    post: string;
    reply: boolean;
    quote: boolean;
}
export interface OutputSchema {
    post: string;
    reply: boolean;
    quote: boolean;
    indexedAt?: string;
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
    qp?: QueryParams;
    encoding?: 'application/json';
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=putPostSubscription.d.ts.map