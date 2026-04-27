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
    sentiment: SentimentDistribution;
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
export interface SentimentDistribution {
    $type?: 'com.para.discourse.getSentiment#sentimentDistribution';
    /** Scaled 0-100 */
    anger: number;
    /** Scaled 0-100 */
    fear: number;
    /** Scaled 0-100 */
    trust: number;
    /** Scaled 0-100 */
    uncertainty: number;
    /** Scaled 0-100 */
    neutral: number;
}
export declare function isSentimentDistribution<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.discourse.getSentiment", "sentimentDistribution">;
export declare function validateSentimentDistribution<V>(v: V): ValidationResult<SentimentDistribution & V>;
//# sourceMappingURL=getSentiment.d.ts.map