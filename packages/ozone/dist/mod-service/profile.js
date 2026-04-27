"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModerationServiceProfile = exports.NEW_TO_OLD_REASON_MAPPING = void 0;
const api_1 = require("@atproto/api");
const xrpc_server_1 = require("@atproto/xrpc-server");
const defs_1 = require("../lexicon/types/com/atproto/moderation/defs");
const logger_1 = require("../logger");
// Reverse mapping from new ozone namespaced reason types to old com.atproto namespaced reason types
exports.NEW_TO_OLD_REASON_MAPPING = {
    'tools.ozone.report.defs#reasonAppeal': defs_1.REASONAPPEAL,
    'tools.ozone.report.defs#reasonOther': defs_1.REASONOTHER,
    'tools.ozone.report.defs#reasonViolenceAnimal': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonViolenceThreats': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonViolenceGraphicContent': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonViolenceGlorification': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonViolenceExtremistContent': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonViolenceTrafficking': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonViolenceOther': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonSexualAbuseContent': defs_1.REASONSEXUAL,
    'tools.ozone.report.defs#reasonSexualNCII': defs_1.REASONSEXUAL,
    'tools.ozone.report.defs#reasonSexualDeepfake': defs_1.REASONSEXUAL,
    'tools.ozone.report.defs#reasonSexualAnimal': defs_1.REASONSEXUAL,
    'tools.ozone.report.defs#reasonSexualUnlabeled': defs_1.REASONSEXUAL,
    'tools.ozone.report.defs#reasonSexualOther': defs_1.REASONSEXUAL,
    'tools.ozone.report.defs#reasonChildSafetyCSAM': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonChildSafetyGroom': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonChildSafetyPrivacy': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonChildSafetyHarassment': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonChildSafetyOther': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonHarassmentTroll': defs_1.REASONRUDE,
    'tools.ozone.report.defs#reasonHarassmentTargeted': defs_1.REASONRUDE,
    'tools.ozone.report.defs#reasonHarassmentHateSpeech': defs_1.REASONRUDE,
    'tools.ozone.report.defs#reasonHarassmentDoxxing': defs_1.REASONRUDE,
    'tools.ozone.report.defs#reasonHarassmentOther': defs_1.REASONRUDE,
    'tools.ozone.report.defs#reasonMisleadingBot': defs_1.REASONMISLEADING,
    'tools.ozone.report.defs#reasonMisleadingImpersonation': defs_1.REASONMISLEADING,
    'tools.ozone.report.defs#reasonMisleadingSpam': defs_1.REASONSPAM,
    'tools.ozone.report.defs#reasonMisleadingScam': defs_1.REASONMISLEADING,
    'tools.ozone.report.defs#reasonMisleadingElections': defs_1.REASONMISLEADING,
    'tools.ozone.report.defs#reasonMisleadingOther': defs_1.REASONMISLEADING,
    'tools.ozone.report.defs#reasonRuleSiteSecurity': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonRuleProhibitedSales': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonRuleBanEvasion': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonRuleOther': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonSelfHarmContent': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonSelfHarmED': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonSelfHarmStunts': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonSelfHarmSubstances': defs_1.REASONVIOLATION,
    'tools.ozone.report.defs#reasonSelfHarmOther': defs_1.REASONVIOLATION,
};
class ModerationServiceProfile {
    constructor(cfg, appviewAgent, cacheTTL) {
        Object.defineProperty(this, "cfg", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cfg
        });
        Object.defineProperty(this, "appviewAgent", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: appviewAgent
        });
        Object.defineProperty(this, "cache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "CACHE_TTL", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.CACHE_TTL = cacheTTL || cfg.service.serviceRecordCacheTTL;
    }
    static creator(cfg, appviewAgent) {
        return () => new ModerationServiceProfile(cfg, appviewAgent);
    }
    async getProfile() {
        const now = Date.now();
        if (!this.cache || now - this.cache.timestamp > this.CACHE_TTL) {
            try {
                const { data } = await this.appviewAgent.app.bsky.labeler.getServices({
                    dids: [this.cfg.service.did],
                    detailed: true,
                });
                if (api_1.AppBskyLabelerDefs.isLabelerViewDetailed(data.views?.[0])) {
                    this.cache = {
                        profile: data.views[0],
                        timestamp: now,
                    };
                }
            }
            catch (e) {
                // On error, fail open
                logger_1.httpLogger.error(`Failed to fetch labeler profile: ${e?.['message']}`);
            }
        }
        return this.cache?.profile || null;
    }
    async validateReasonType(reasonType) {
        const profile = await this.getProfile();
        if (!Array.isArray(profile?.reasonTypes)) {
            return reasonType;
        }
        const supportedReasonTypes = profile.reasonTypes;
        // Check if the reason type is directly supported
        if (supportedReasonTypes.includes(reasonType)) {
            return reasonType;
        }
        // Allow new reason types only if they map to a supported old reason type
        const mappedOldReason = exports.NEW_TO_OLD_REASON_MAPPING[reasonType];
        if (mappedOldReason && supportedReasonTypes.includes(mappedOldReason)) {
            return reasonType;
        }
        throw new xrpc_server_1.InvalidRequestError(`Invalid reason type: ${reasonType}`);
    }
}
exports.ModerationServiceProfile = ModerationServiceProfile;
//# sourceMappingURL=profile.js.map