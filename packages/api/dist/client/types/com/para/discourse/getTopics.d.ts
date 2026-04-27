/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    community?: string;
    timeframe: '1h' | '24h' | '7d' | '30d';
};
export type InputSchema = undefined;
export interface OutputSchema {
    topics: Topic[];
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
export interface Topic {
    $type?: 'com.para.discourse.getTopics#topic';
    clusterLabel: string;
    keywords?: string;
    postCount: number;
    authorCount: number;
    /** Scaled 0-100 */
    avgSentiment?: number;
}
export declare function isTopic<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.discourse.getTopics", "topic">;
export declare function validateTopic<V>(v: V): ValidationResult<Topic & V>;
//# sourceMappingURL=getTopics.d.ts.map