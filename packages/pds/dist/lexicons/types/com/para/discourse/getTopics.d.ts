/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    community?: string;
    timeframe: '1h' | '24h' | '7d' | '30d';
};
export type InputSchema = undefined;
export interface OutputSchema {
    topics: Topic[];
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