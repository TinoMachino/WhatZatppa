/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    query?: string;
    state?: string;
    participationKind?: 'matter' | 'policy' | (string & {});
    flairId?: string;
    sort: 'recent' | 'activity' | 'size' | (string & {});
    limit: number;
    cursor?: string;
    /** Optional territory quadrant to filter communities by */
    quadrant?: string;
};
export type InputSchema = undefined;
export type OutputSchema = Output;
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
export interface BoardView {
    $type?: 'com.para.community.listBoards#boardView';
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
    governanceSummary?: {
        moderatorCount: number;
        officialCount: number;
        deputyRoleCount: number;
        lastPublishedAt?: string;
    };
    createdAt: string;
}
export declare function isBoardView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.listBoards", "boardView">;
export declare function validateBoardView<V>(v: V): ValidationResult<BoardView & V>;
export interface Output {
    $type?: 'com.para.community.listBoards#output';
    boards: BoardView[];
    cursor?: string;
    canCreateCommunity: boolean;
}
export declare function isOutput<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.listBoards", "output">;
export declare function validateOutput<V>(v: V): ValidationResult<Output & V>;
//# sourceMappingURL=listBoards.d.ts.map