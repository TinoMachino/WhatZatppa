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
    snapshots: Snapshot[];
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
export interface Snapshot {
    $type?: 'com.para.discourse.getSnapshot#snapshot';
    community: string;
    bucket: string;
    postCount: number;
    uniqueAuthors: number;
    /** Scaled 0-100 */
    avgConstructiveness?: number;
    /** Scaled 0-100 */
    semanticVolatility?: number;
    /** Scaled 0-100 */
    lexicalDiversity?: number;
    /** Scaled 0-100 */
    polarizationDelta?: number;
    /** Scaled 0-100 */
    echoChamberIndex?: number;
    topKeywords?: string;
    sentimentDistribution?: string;
}
export declare function isSnapshot<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.discourse.getSnapshot", "snapshot">;
export declare function validateSnapshot<V>(v: V): ValidationResult<Snapshot & V>;
//# sourceMappingURL=getSnapshot.d.ts.map