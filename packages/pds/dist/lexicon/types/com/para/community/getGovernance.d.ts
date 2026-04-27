import type * as ComParaCommunityDefs from './defs.js';
export type QueryParams = {
    /** Community identifier or label (for example: mx-federal or p/mx-federal). */
    community: string;
    /** Optional stable identifier for the community. */
    communityId?: string;
    /** Maximum number of candidate members considered for role assignment. */
    limit: number;
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
//# sourceMappingURL=getGovernance.d.ts.map