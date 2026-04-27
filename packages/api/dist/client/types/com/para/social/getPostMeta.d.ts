/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc';
export type QueryParams = {
    post: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    uri: string;
    postType?: 'policy' | 'matter' | 'meme';
    official?: boolean;
    party?: string;
    community?: string;
    category?: string;
    tags?: string[];
    flairs?: string[];
    voteScore: number;
    interactionMode: 'policy_ballot' | 'reddit_votes';
    createdAt?: string;
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
//# sourceMappingURL=getPostMeta.d.ts.map