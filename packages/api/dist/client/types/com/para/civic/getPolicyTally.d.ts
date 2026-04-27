/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    post: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    tally: ComParaCivicDefs.PolicyTally;
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
export declare class NotFoundError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=getPolicyTally.d.ts.map