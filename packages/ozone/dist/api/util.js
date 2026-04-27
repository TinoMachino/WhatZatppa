"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScheduledActionStatus = exports.getScheduledActionType = exports.getSafelinkEventType = exports.getSafelinkReason = exports.getSafelinkAction = exports.getSafelinkPattern = exports.isAppealReport = exports.OZONE_APPEAL_REASON_TYPE = exports.getMemberRole = exports.getReviewState = exports.getEventType = exports.addAccountInfoToRepoView = exports.addAccountInfoToRepoViewDetail = exports.getPdsAccountInfos = void 0;
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../lexicon/lexicons");
const defs_1 = require("../lexicon/types/com/atproto/moderation/defs");
const defs_2 = require("../lexicon/types/tools/ozone/moderation/defs");
const defs_3 = require("../lexicon/types/tools/ozone/team/defs");
const getPdsAccountInfos = async (ctx, dids) => {
    const results = new Map();
    const agent = ctx.pdsAgent;
    if (!agent || !dids.length)
        return results;
    const auth = await ctx.pdsAuth(lexicons_1.ids.ComAtprotoAdminGetAccountInfos);
    if (!auth)
        return results;
    try {
        const res = await agent.com.atproto.admin.getAccountInfos({ dids }, auth);
        res.data.infos.forEach((info) => {
            results.set(info.did, info);
        });
        return results;
    }
    catch {
        return results;
    }
};
exports.getPdsAccountInfos = getPdsAccountInfos;
function un$type(obj) {
    if ('$type' in obj) {
        const { $type: _, ...rest } = obj;
        return rest;
    }
    return obj;
}
const addAccountInfoToRepoViewDetail = (repoView, accountInfo, includeEmail = false) => {
    if (!accountInfo) {
        return un$type({
            ...repoView,
            moderation: un$type(repoView.moderation),
        });
    }
    const { email, deactivatedAt, emailConfirmedAt, inviteNote, invitedBy, invites, invitesDisabled, threatSignatures, 
    // pick some duplicate/unwanted details out
    $type: _accountType, did: _did, handle: _handle, indexedAt: _indexedAt, relatedRecords: _relatedRecords, ...otherAccountInfo } = accountInfo;
    return {
        ...otherAccountInfo,
        ...un$type(repoView),
        moderation: un$type(repoView.moderation),
        email: includeEmail ? email : undefined,
        invitedBy,
        invitesDisabled,
        inviteNote,
        invites,
        emailConfirmedAt,
        deactivatedAt,
        threatSignatures,
    };
};
exports.addAccountInfoToRepoViewDetail = addAccountInfoToRepoViewDetail;
const addAccountInfoToRepoView = (repoView, accountInfo, includeEmail = false) => {
    if (!accountInfo)
        return repoView;
    return {
        ...repoView,
        email: includeEmail ? accountInfo.email : undefined,
        invitedBy: accountInfo.invitedBy,
        invitesDisabled: accountInfo.invitesDisabled,
        inviteNote: accountInfo.inviteNote,
        deactivatedAt: accountInfo.deactivatedAt,
        threatSignatures: accountInfo.threatSignatures,
    };
};
exports.addAccountInfoToRepoView = addAccountInfoToRepoView;
const getEventType = (type) => {
    if (eventTypes.has(type)) {
        return type;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid event type');
};
exports.getEventType = getEventType;
const getReviewState = (reviewState) => {
    if (!reviewState)
        return undefined;
    if (reviewStates.has(reviewState)) {
        return reviewState;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid review state');
};
exports.getReviewState = getReviewState;
const reviewStates = new Set([
    defs_2.REVIEWCLOSED,
    defs_2.REVIEWESCALATED,
    defs_2.REVIEWOPEN,
    defs_2.REVIEWNONE,
]);
const eventTypes = new Set([
    'tools.ozone.moderation.defs#modEventTakedown',
    'tools.ozone.moderation.defs#modEventAcknowledge',
    'tools.ozone.moderation.defs#modEventEscalate',
    'tools.ozone.moderation.defs#modEventComment',
    'tools.ozone.moderation.defs#modEventLabel',
    'tools.ozone.moderation.defs#modEventReport',
    'tools.ozone.moderation.defs#modEventMute',
    'tools.ozone.moderation.defs#modEventUnmute',
    'tools.ozone.moderation.defs#modEventMuteReporter',
    'tools.ozone.moderation.defs#modEventUnmuteReporter',
    'tools.ozone.moderation.defs#modEventReverseTakedown',
    'tools.ozone.moderation.defs#modEventEmail',
    'tools.ozone.moderation.defs#modEventResolveAppeal',
    'tools.ozone.moderation.defs#modEventTag',
    'tools.ozone.moderation.defs#modEventDivert',
    'tools.ozone.moderation.defs#accountEvent',
    'tools.ozone.moderation.defs#identityEvent',
    'tools.ozone.moderation.defs#recordEvent',
    'tools.ozone.moderation.defs#modEventPriorityScore',
    'tools.ozone.moderation.defs#ageAssuranceEvent',
    'tools.ozone.moderation.defs#ageAssuranceOverrideEvent',
    'tools.ozone.moderation.defs#ageAssurancePurgeEvent',
    'tools.ozone.moderation.defs#revokeAccountCredentialsEvent',
    'tools.ozone.moderation.defs#scheduleTakedownEvent',
    'tools.ozone.moderation.defs#cancelScheduledTakedownEvent',
]);
const getMemberRole = (role) => {
    if (memberRoles.has(role)) {
        return role;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid member role');
};
exports.getMemberRole = getMemberRole;
const memberRoles = new Set([
    defs_3.ROLEADMIN,
    defs_3.ROLEMODERATOR,
    defs_3.ROLETRIAGE,
    defs_3.ROLEVERIFIER,
]);
exports.OZONE_APPEAL_REASON_TYPE = 'tools.ozone.report.defs#reasonAppeal';
const APPEAL_REASON_TYPES = [defs_1.REASONAPPEAL, exports.OZONE_APPEAL_REASON_TYPE];
const isAppealReport = (reasonType) => {
    return !!reasonType && APPEAL_REASON_TYPES.includes(reasonType);
};
exports.isAppealReport = isAppealReport;
const getSafelinkPattern = (pattern) => {
    if (safelinkPatterns.has(pattern)) {
        return pattern;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid safelink pattern type');
};
exports.getSafelinkPattern = getSafelinkPattern;
const getSafelinkAction = (action) => {
    if (safelinkActions.has(action)) {
        return action;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid safelink action type');
};
exports.getSafelinkAction = getSafelinkAction;
const getSafelinkReason = (reason) => {
    if (safelinkReasons.has(reason)) {
        return reason;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid safelink reason type');
};
exports.getSafelinkReason = getSafelinkReason;
const getSafelinkEventType = (eventType) => {
    if (safelinkEventTypes.has(eventType)) {
        return eventType;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid safelink event type');
};
exports.getSafelinkEventType = getSafelinkEventType;
const safelinkPatterns = new Set(['domain', 'url']);
const safelinkActions = new Set(['block', 'warn', 'whitelist']);
const safelinkReasons = new Set(['csam', 'spam', 'phishing', 'none']);
const safelinkEventTypes = new Set(['addRule', 'updateRule', 'removeRule']);
const getScheduledActionType = (action) => {
    if (scheduledActionTypes.has(action)) {
        return action;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid scheduled action type');
};
exports.getScheduledActionType = getScheduledActionType;
const getScheduledActionStatus = (status) => {
    if (scheduledActionStatuses.has(status)) {
        return status;
    }
    throw new xrpc_server_1.InvalidRequestError('Invalid scheduled action status');
};
exports.getScheduledActionStatus = getScheduledActionStatus;
const scheduledActionTypes = new Set(['takedown']);
const scheduledActionStatuses = new Set([
    'pending',
    'executed',
    'cancelled',
    'failed',
]);
//# sourceMappingURL=util.js.map