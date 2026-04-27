/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ComParaHighlightDefs from './defs.js';
export type QueryParams = {
    highlight: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    highlight?: ComParaHighlightDefs.HighlightView;
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
//# sourceMappingURL=getHighlight.d.ts.map