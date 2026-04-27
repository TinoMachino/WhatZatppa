/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap } from '@atproto/xrpc';
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    communityId?: string;
    uri?: string;
};
export type InputSchema = undefined;
export type OutputSchema = Output;
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
export interface GovernanceSummary {
    $type?: 'com.para.community.getBoard#governanceSummary';
    moderatorCount: number;
    officialCount: number;
    deputyRoleCount: number;
    lastPublishedAt?: string;
}
export declare function isGovernanceSummary<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.getBoard", "governanceSummary">;
export declare function validateGovernanceSummary<V>(v: V): ValidationResult<GovernanceSummary & V>;
export interface BoardView {
    $type?: 'com.para.community.getBoard#boardView';
    uri: string;
    cid: string;
    creatorDid: string;
    creatorHandle?: string;
    creatorDisplayName?: string;
    communityId: string;
    slug: string;
    name: string;
    description?: string;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    memberCount: number;
    viewerMembershipState: 'none' | 'pending' | 'active' | 'left' | 'removed' | 'blocked' | (string & {});
    viewerRoles?: string[];
    status?: 'draft' | 'active' | (string & {});
    founderStarterPackUri?: string;
    createdAt: string;
    governanceSummary?: GovernanceSummary;
}
export declare function isBoardView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.getBoard", "boardView">;
export declare function validateBoardView<V>(v: V): ValidationResult<BoardView & V>;
export interface Output {
    $type?: 'com.para.community.getBoard#output';
    board: BoardView;
    viewerCapabilities: string[];
}
export declare function isOutput<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.getBoard", "output">;
export declare function validateOutput<V>(v: V): ValidationResult<Output & V>;
//# sourceMappingURL=getBoard.d.ts.map