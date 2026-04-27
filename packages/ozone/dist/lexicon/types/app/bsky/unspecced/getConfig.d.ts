/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    checkEmailConfirmed?: boolean;
    liveNow?: LiveNowConfig[];
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
export interface LiveNowConfig {
    $type?: 'app.bsky.unspecced.getConfig#liveNowConfig';
    did: string;
    domains: string[];
}
export declare function isLiveNowConfig<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.unspecced.getConfig", "liveNowConfig">;
export declare function validateLiveNowConfig<V>(v: V): ValidationResult<LiveNowConfig & V>;
//# sourceMappingURL=getConfig.d.ts.map