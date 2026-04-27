"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IGNORE_METRICS_FOR_GATES = exports.Gate = void 0;
/**
 * Enum of all gates in the system. This should be the single source of truth
 * for all gates, and should be used in all places where gates are checked or
 * defined.
 */
var Gate;
(function (Gate) {
    Gate["SuggestedUsersDiscoverEnable"] = "suggested_users:discover_agent:enable";
    Gate["SuggestedUsersSocialProofEnable"] = "suggested_users:social_proof:enable";
    Gate["ThreadsReplyRankingExplorationEnable"] = "threads:reply_ranking_exploration:enable";
    Gate["SearchFilteringExplorationEnable"] = "search:filtering_exploration:enable";
    Gate["SuggestedUsersForExploreEnable"] = "suggested_users:for_explore:enable";
    Gate["SuggestedUsersForDiscoverEnable"] = "suggested_users:for_discover:enable";
    Gate["SuggestedUsersForSeeMoreEnable"] = "suggested_users:for_see_more:enable";
    // temp
    Gate["AATest"] = "aa-test-appview";
})(Gate || (exports.Gate = Gate = {}));
/**
 * Set of gates that should be ignored when tracking gate evaluations for
 * analytics purposes. This is useful for gates that are not user-facing or are
 * overly noisy.
 */
exports.IGNORE_METRICS_FOR_GATES = new Set([]);
//# sourceMappingURL=gates.js.map