/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
export type QueryParams = {};
export interface InputSchema {
    cabildeo: string;
    sessionId: string;
    present?: boolean;
}
export interface OutputSchema {
    cabildeo: string;
    present: boolean;
    expiresAt?: string;
}
export interface CallOptions {
    signal?: AbortSignal;
    headers?: HeadersMap;
    qp?: QueryParams;
    encoding?: 'application/json';
}
export interface Response {
    success: boolean;
    headers: HeadersMap;
    data: OutputSchema;
}
export declare class NotFoundError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class InvalidPhaseError extends XRPCError {
    constructor(src: XRPCError);
}
export declare class LiveStatusRequiredError extends XRPCError {
    constructor(src: XRPCError);
}
export declare function toKnownErr(e: any): any;
//# sourceMappingURL=putLivePresence.d.ts.map