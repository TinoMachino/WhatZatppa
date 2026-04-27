/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
/** Aggregated Para profile statistics. */
export interface ProfileStats {
    $type?: 'com.para.actor.defs#profileStats';
    /** All-time influence score (Para equivalent of cumulative karma). */
    influence: number;
    /** Total support received by this actor's Para posts across all time. */
    votesReceivedAllTime: number;
    /** Total votes/interactions cast by this actor across all time. */
    votesCastAllTime: number;
    contributions: Contributions;
    /** Top communities where this actor contributes. */
    activeIn: string[];
    /** Timestamp of the last stats computation. */
    computedAt: string;
}
export declare function isProfileStats<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.actor.defs", "profileStats">;
export declare function validateProfileStats<V>(v: V): ValidationResult<ProfileStats & V>;
/** All-time contribution counters. */
export interface Contributions {
    $type?: 'com.para.actor.defs#contributions';
    policies: number;
    matters: number;
    comments: number;
}
export declare function isContributions<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.actor.defs", "contributions">;
export declare function validateContributions<V>(v: V): ValidationResult<Contributions & V>;
/** Resolved Para account status view. */
export interface StatusView {
    $type?: 'com.para.actor.defs#statusView';
    status: string;
    party?: string;
    community?: string;
    createdAt: string;
}
export declare function isStatusView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.actor.defs", "statusView">;
export declare function validateStatusView<V>(v: V): ValidationResult<StatusView & V>;
//# sourceMappingURL=defs.d.ts.map