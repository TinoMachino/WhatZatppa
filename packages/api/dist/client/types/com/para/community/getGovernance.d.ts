/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import type * as ComParaCommunityDefs from './defs.js';
export type QueryParams = {
    /** Community identifier or label (for example: mx-federal or p/mx-federal). */
    community: string;
    /** Optional stable identifier for the community. */
    communityId?: string;
    /** Maximum number of candidate members considered for role assignment. */
    limit?: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    source: 'network' | 'repo' | 'mock' | (string & {});
    community: string;
    communityId?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    moderators: ComParaCommunityDefs.ModeratorView[];
    officials: ComParaCommunityDefs.OfficialView[];
    deputies: ComParaCommunityDefs.DeputyRoleView[];
    metadata?: ComParaCommunityDefs.Metadata;
    editHistory: ComParaCommunityDefs.HistoryEntry[];
    counters: ComParaCommunityDefs.Summary;
    summary: ComParaCommunityDefs.Summary;
    computedAt: string;
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
//# sourceMappingURL=getGovernance.d.ts.map