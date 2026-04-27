/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    /** Optional community filter. */
    community?: string;
    /** Optional phase filter. */
    phase?: 'draft' | 'open' | 'deliberating' | 'voting' | 'resolved' | (string & {});
    limit?: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    cabildeos: ComParaCivicDefs.CabildeoView[];
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
//# sourceMappingURL=listCabildeos.d.ts.map