/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    cabildeo: string;
    communityId?: string;
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
export interface CandidateView {
    $type?: 'com.para.civic.listDelegationCandidates#candidateView';
    did: string;
    handle?: string;
    displayName?: string;
    avatar?: string;
    description?: string;
    roles: string[];
    activeDelegationCount: number;
    hasVoted: boolean;
    votedAt?: string;
    selectedOption?: number;
}
export declare function isCandidateView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.listDelegationCandidates", "candidateView">;
export declare function validateCandidateView<V>(v: V): ValidationResult<CandidateView & V>;
export interface Output {
    $type?: 'com.para.civic.listDelegationCandidates#output';
    candidates: CandidateView[];
    cursor?: string;
}
export declare function isOutput<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.listDelegationCandidates", "output">;
export declare function validateOutput<V>(v: V): ValidationResult<Output & V>;
//# sourceMappingURL=listDelegationCandidates.d.ts.map