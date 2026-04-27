/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    cabildeo: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cabildeo: ComParaCivicDefs.CabildeoView;
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
//# sourceMappingURL=getCabildeo.d.ts.map