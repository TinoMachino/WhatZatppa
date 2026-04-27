/**
 * Enum of all gates in the system. This should be the single source of truth
 * for all gates, and should be used in all places where gates are checked or
 * defined.
 */
export declare enum Gate {
    SuggestedUsersDiscoverEnable = "suggested_users:discover_agent:enable",
    SuggestedUsersSocialProofEnable = "suggested_users:social_proof:enable",
    ThreadsReplyRankingExplorationEnable = "threads:reply_ranking_exploration:enable",
    SearchFilteringExplorationEnable = "search:filtering_exploration:enable",
    SuggestedUsersForExploreEnable = "suggested_users:for_explore:enable",
    SuggestedUsersForDiscoverEnable = "suggested_users:for_discover:enable",
    SuggestedUsersForSeeMoreEnable = "suggested_users:for_see_more:enable",
    AATest = "aa-test-appview"
}
/**
 * Set of gates that should be ignored when tracking gate evaluations for
 * analytics purposes. This is useful for gates that are not user-facing or are
 * overly noisy.
 */
export declare const IGNORE_METRICS_FOR_GATES: Set<Gate>;
//# sourceMappingURL=gates.d.ts.map