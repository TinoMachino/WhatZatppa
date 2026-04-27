/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    communityId: string;
    membershipState?: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | (string & {});
    role?: string;
    sort: 'joined' | 'participation' | (string & {});
    limit: number;
    cursor?: string;
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
export interface MemberView {
    $type?: 'com.para.community.listMembers#memberView';
    did: string;
    handle?: string;
    displayName?: string;
    avatar?: string;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | (string & {});
    roles: string[];
    joinedAt: string;
    votesCast: number;
    delegationsReceived: number;
    policyPosts: number;
    matterPosts: number;
}
export declare function isMemberView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.listMembers", "memberView">;
export declare function validateMemberView<V>(v: V): ValidationResult<MemberView & V>;
export interface Output {
    $type?: 'com.para.community.listMembers#output';
    members: MemberView[];
    cursor?: string;
}
export declare function isOutput<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.listMembers", "output">;
export declare function validateOutput<V>(v: V): ValidationResult<Output & V>;
//# sourceMappingURL=listMembers.d.ts.map