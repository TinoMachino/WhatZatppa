/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    cabildeo: string;
    stance?: 'for' | 'against' | 'amendment' | (string & {});
    limit?: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    positions: ComParaCivicDefs.PositionView[];
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
//# sourceMappingURL=listCabildeoPositions.d.ts.map