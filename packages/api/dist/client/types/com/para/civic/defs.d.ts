/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { CID } from 'multiformats/cid';
export interface CabildeoOption {
    $type?: 'com.para.civic.defs#cabildeoOption';
    label: string;
    description?: string;
    isConsensus?: boolean;
}
export declare function isCabildeoOption<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "cabildeoOption">;
export declare function validateCabildeoOption<V>(v: V): ValidationResult<CabildeoOption & V>;
export interface OptionSummary {
    $type?: 'com.para.civic.defs#optionSummary';
    optionIndex: number;
    label: string;
    votes: number;
    positions: number;
}
export declare function isOptionSummary<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "optionSummary">;
export declare function validateOptionSummary<V>(v: V): ValidationResult<OptionSummary & V>;
export interface PositionCounts {
    $type?: 'com.para.civic.defs#positionCounts';
    total: number;
    for: number;
    against: number;
    amendment: number;
    byOption: OptionSummary[];
}
export declare function isPositionCounts<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "positionCounts">;
export declare function validatePositionCounts<V>(v: V): ValidationResult<PositionCounts & V>;
export interface VoteTotals {
    $type?: 'com.para.civic.defs#voteTotals';
    total: number;
    direct: number;
    delegated: number;
}
export declare function isVoteTotals<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "voteTotals">;
export declare function validateVoteTotals<V>(v: V): ValidationResult<VoteTotals & V>;
export interface OutcomeSummary {
    $type?: 'com.para.civic.defs#outcomeSummary';
    winningOption?: number;
    totalParticipants: number;
    effectiveTotalPower: number;
    tie: boolean;
    breakdown: OptionSummary[];
}
export declare function isOutcomeSummary<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "outcomeSummary">;
export declare function validateOutcomeSummary<V>(v: V): ValidationResult<OutcomeSummary & V>;
export interface ViewerContext {
    $type?: 'com.para.civic.defs#viewerContext';
    currentVoteOption?: number;
    currentVoteIsDirect?: boolean;
    activeDelegation?: string;
    delegateHasVoted?: boolean;
    delegatedVoteOption?: number;
    delegatedVotedAt?: string;
    gracePeriodEndsAt?: string;
    delegateVoteDismissed?: boolean;
}
export declare function isViewerContext<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "viewerContext">;
export declare function validateViewerContext<V>(v: V): ValidationResult<ViewerContext & V>;
export interface LiveSessionView {
    $type?: 'com.para.civic.defs#liveSessionView';
    isLive: boolean;
    hostDid: string;
    activeParticipantCount: number;
    startedAt: string;
    participantPreviewDids: string[];
}
export declare function isLiveSessionView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "liveSessionView">;
export declare function validateLiveSessionView<V>(v: V): ValidationResult<LiveSessionView & V>;
export interface CabildeoLive {
    $type?: 'com.para.civic.defs#cabildeoLive';
    cabildeoUri: string;
    community: string;
    phase: 'draft' | 'open' | 'deliberating' | 'voting' | 'resolved' | (string & {});
    expiresAt: string;
}
export declare function isCabildeoLive<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "cabildeoLive">;
export declare function validateCabildeoLive<V>(v: V): ValidationResult<CabildeoLive & V>;
export interface CabildeoView {
    $type?: 'com.para.civic.defs#cabildeoView';
    uri: string;
    cid: CID;
    creator: string;
    indexedAt: string;
    title: string;
    description: string;
    community: string;
    communities?: string[];
    flairs?: string[];
    region?: string;
    geoRestricted?: boolean;
    options: CabildeoOption[];
    minQuorum?: number;
    phase: 'draft' | 'open' | 'deliberating' | 'voting' | 'resolved' | (string & {});
    phaseDeadline?: string;
    createdAt: string;
    optionSummary: OptionSummary[];
    positionCounts: PositionCounts;
    voteTotals: VoteTotals;
    outcomeSummary?: OutcomeSummary;
    viewerContext?: ViewerContext;
    liveSession?: LiveSessionView;
}
export declare function isCabildeoView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "cabildeoView">;
export declare function validateCabildeoView<V>(v: V): ValidationResult<CabildeoView & V>;
export interface PositionView {
    $type?: 'com.para.civic.defs#positionView';
    uri: string;
    cid: CID;
    creator: string;
    indexedAt: string;
    cabildeo: string;
    stance: 'for' | 'against' | 'amendment' | (string & {});
    optionIndex?: number;
    text: string;
    compassQuadrant?: string;
    createdAt: string;
}
export declare function isPositionView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "positionView">;
export declare function validatePositionView<V>(v: V): ValidationResult<PositionView & V>;
export interface PolicySignalBucket {
    $type?: 'com.para.civic.defs#policySignalBucket';
    signal: number;
    count: number;
}
export declare function isPolicySignalBucket<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "policySignalBucket">;
export declare function validatePolicySignalBucket<V>(v: V): ValidationResult<PolicySignalBucket & V>;
export interface PolicyTally {
    $type?: 'com.para.civic.defs#policyTally';
    subject: string;
    subjectType: 'policy' | (string & {});
    community: string;
    voteCount: number;
    directVoteCount: number;
    delegatedVoteCount: number;
    signalSum: number;
    signalAverage: string;
    eligibleVoterCount: number;
    quorumTarget: number;
    quorumMet: boolean;
    official: boolean;
    certified: boolean;
    outcome: 'insufficient_quorum' | 'contested' | 'passed' | 'strong_passed' | 'failed' | (string & {});
    state: 'draft' | 'deliberation' | 'voting' | 'passed' | 'failed' | 'official' | (string & {});
    breakdown: PolicySignalBucket[];
    computedAt: string;
}
export declare function isPolicyTally<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.defs", "policyTally">;
export declare function validatePolicyTally<V>(v: V): ValidationResult<PolicyTally & V>;
//# sourceMappingURL=defs.d.ts.map