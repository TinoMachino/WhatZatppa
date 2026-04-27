/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
import type * as ComParaActorDefs from './defs.js';
export type QueryParams = {
    /** Handle or DID of the actor. */
    actor: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    actor: string;
    stats: ComParaActorDefs.ProfileStats;
    status?: ComParaActorDefs.StatusView;
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
export declare class BlockedActorError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class BlockedByActorError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=getProfileStats.d.ts.map