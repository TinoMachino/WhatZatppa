import { l } from '@atproto/lex';
declare const $nsid = "com.para.actor.defs";
export { $nsid };
/** Aggregated Para profile statistics. */
type ProfileStats = {
    $type?: 'com.para.actor.defs#profileStats';
    /**
     * All-time influence score (Para equivalent of cumulative karma).
     */
    influence: number;
    /**
     * Total support received by this actor's Para posts across all time.
     */
    votesReceivedAllTime: number;
    /**
     * Total votes/interactions cast by this actor across all time.
     */
    votesCastAllTime: number;
    contributions: Contributions;
    /**
     * Top communities where this actor contributes.
     */
    activeIn: string[];
    /**
     * Timestamp of the last stats computation.
     */
    computedAt: l.DatetimeString;
};
export type { ProfileStats };
/** Aggregated Para profile statistics. */
declare const profileStats: l.TypedObjectSchema<"com.para.actor.defs#profileStats", l.Validator<ProfileStats, ProfileStats>>;
export { profileStats };
/** All-time contribution counters. */
type Contributions = {
    $type?: 'com.para.actor.defs#contributions';
    policies: number;
    matters: number;
    comments: number;
};
export type { Contributions };
/** All-time contribution counters. */
declare const contributions: l.TypedObjectSchema<"com.para.actor.defs#contributions", l.Validator<Contributions, Contributions>>;
export { contributions };
/** Resolved Para account status view. */
type StatusView = {
    $type?: 'com.para.actor.defs#statusView';
    status: string;
    party?: string;
    community?: string;
    createdAt: l.DatetimeString;
};
export type { StatusView };
/** Resolved Para account status view. */
declare const statusView: l.TypedObjectSchema<"com.para.actor.defs#statusView", l.Validator<StatusView, StatusView>>;
export { statusView };
//# sourceMappingURL=defs.defs.d.ts.map