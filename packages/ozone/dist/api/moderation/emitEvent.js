"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const defs_1 = require("@atproto/api/dist/client/types/tools/ozone/moderation/defs");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../lexicon/lexicons");
const defs_2 = require("../../lexicon/types/tools/ozone/moderation/defs");
const logger_1 = require("../../logger");
const subject_1 = require("../../mod-service/subject");
const tag_service_1 = require("../../tag-service");
const util_1 = require("../../tag-service/util");
const util_2 = require("../../util");
const util_3 = require("../util");
const util_4 = require("./util");
const handleModerationEvent = async ({ ctx, input, auth, }) => {
    const access = auth.credentials;
    const createdBy = auth.credentials.type === 'moderator'
        ? auth.credentials.iss
        : input.body.createdBy;
    const db = ctx.db;
    const moderationService = ctx.modService(db);
    const settingService = ctx.settingService(db);
    const { event, externalId } = input.body;
    const isAcknowledgeEvent = (0, defs_2.isModEventAcknowledge)(event);
    const isTakedownEvent = (0, defs_2.isModEventTakedown)(event);
    const isReverseTakedownEvent = (0, defs_2.isModEventReverseTakedown)(event);
    const isLabelEvent = (0, defs_2.isModEventLabel)(event);
    const subject = (0, subject_1.subjectFromInput)(input.body.subject, input.body.subjectBlobCids);
    if ((0, defs_2.isAgeAssuranceEvent)(event) && !subject.isRepo()) {
        throw new xrpc_server_1.InvalidRequestError('Invalid subject type');
    }
    if ((0, defs_2.isAgeAssuranceOverrideEvent)(event)) {
        if (!subject.isRepo()) {
            throw new xrpc_server_1.InvalidRequestError('Invalid subject type');
        }
        if (!auth.credentials.isModerator) {
            throw new xrpc_server_1.AuthRequiredError('Must be a full moderator to override age assurance');
        }
    }
    if ((0, defs_2.isAgeAssurancePurgeEvent)(event)) {
        if (!subject.isRepo()) {
            throw new xrpc_server_1.InvalidRequestError('Invalid subject type');
        }
        if (!auth.credentials.isModerator) {
            throw new xrpc_server_1.ForbiddenError('Must be a moderator to purge age assurance events');
        }
    }
    if ((0, defs_2.isRevokeAccountCredentialsEvent)(event)) {
        if (!subject.isRepo()) {
            throw new xrpc_server_1.InvalidRequestError('Invalid subject type');
        }
        if (!auth.credentials.isAdmin) {
            throw new xrpc_server_1.AuthRequiredError('Must be an admin to revoke account credentials');
        }
        if (!ctx.pdsAgent) {
            throw new xrpc_server_1.InvalidRequestError('PDS not configured');
        }
        await ctx.pdsAgent.com.atproto.temp.revokeAccountCredentials({ account: subject.did }, await ctx.pdsAuth(lexicons_1.ids.ComAtprotoTempRevokeAccountCredentials));
    }
    // if less than moderator access then can only take ack and escalation actions
    if (isTakedownEvent || isReverseTakedownEvent) {
        if (!access.isModerator) {
            throw new xrpc_server_1.AuthRequiredError('Must be a full moderator to take this type of action');
        }
        // Non admins should not be able to take down feed generators
        if (!access.isAdmin &&
            subject.recordPath?.includes('app.bsky.feed.generator/')) {
            throw new xrpc_server_1.AuthRequiredError('Must be a full admin to take this type of action on feed generators');
        }
    }
    // if less than moderator access then can not apply labels
    if (!access.isModerator && isLabelEvent) {
        throw new xrpc_server_1.AuthRequiredError('Must be a full moderator to label content');
    }
    if (isLabelEvent) {
        validateLabels([
            ...(event.createLabelVals ?? []),
            ...(event.negateLabelVals ?? []),
        ]);
    }
    const isTakedownOrReverseTakedownEvent = isTakedownEvent || isReverseTakedownEvent;
    if (isTakedownOrReverseTakedownEvent || isLabelEvent) {
        const status = await moderationService.getStatus(subject);
        if (status?.takendown && isTakedownEvent) {
            throw new xrpc_server_1.InvalidRequestError(`Subject is already taken down`);
        }
        if (!status?.takendown && isReverseTakedownEvent) {
            throw new xrpc_server_1.InvalidRequestError(`Subject is not taken down`);
        }
        if (status?.tags?.length) {
            const protectedTags = await (0, util_4.getProtectedTags)(settingService, ctx.cfg.service.did);
            if (protectedTags) {
                (0, util_4.assertProtectedTagAction)({
                    protectedTags,
                    subjectTags: status.tags,
                    actionAuthor: createdBy,
                    isAdmin: auth.credentials.isAdmin,
                    isModerator: auth.credentials.isModerator,
                    isTriage: auth.credentials.isTriage,
                });
            }
        }
        if (status?.takendown && isReverseTakedownEvent && subject.isRecord()) {
            // due to the way blob status is modeled, we should reverse takedown on all
            // blobs for the record being restored, which aren't taken down on another record.
            subject.blobCids = status.blobCids ?? [];
        }
    }
    if ((0, defs_2.isModEventEmail)(event) && event.content) {
        // sending email prior to logging the event to avoid a long transaction below
        if (!subject.isRepo()) {
            throw new xrpc_server_1.InvalidRequestError('Email can only be sent to a repo subject');
        }
        const { content, subjectLine } = event;
        // on error, don't fail the whole event. instead, log the event data with isDelivered false
        try {
            await (0, util_2.retryHttp)(() => ctx.modService(db).sendEmail({
                subject: subjectLine,
                content,
                recipientDid: subject.did,
            }));
            event.isDelivered = true;
        }
        catch (err) {
            event.isDelivered = false;
            logger_1.httpLogger.error({ err, event }, 'failed to send mod event email');
        }
    }
    if ((0, defs_1.isModEventDivert)(event) && subject.isRecord()) {
        if (!ctx.blobDiverter) {
            throw new xrpc_server_1.InvalidRequestError('BlobDiverter not configured for this service');
        }
        await ctx.blobDiverter.uploadBlobOnService(subject.info());
    }
    if (((0, defs_2.isModEventMuteReporter)(event) || (0, defs_2.isModEventUnmuteReporter)(event)) &&
        !subject.isRepo()) {
        throw new xrpc_server_1.InvalidRequestError('Subject must be a repo when muting reporter');
    }
    if ((0, defs_2.isModEventTag)(event)) {
        await assertTagAuth(settingService, ctx.cfg.service.did, event, auth);
    }
    if ((0, defs_2.isModEventReport)(event)) {
        await ctx.moderationServiceProfile().validateReasonType(event.reportType);
    }
    const moderationEvent = await db.transaction(async (dbTxn) => {
        const moderationTxn = ctx.modService(dbTxn);
        if (externalId) {
            const existingEvent = await moderationTxn.getEventByExternalId((0, util_3.getEventType)(event.$type), externalId, subject);
            if (existingEvent) {
                throw new xrpc_server_1.InvalidRequestError(`An event with the same external ID already exists for the subject.`, 'DuplicateExternalId');
            }
        }
        const result = await moderationTxn.logEvent({
            event,
            subject,
            createdBy,
            modTool: input.body.modTool,
            externalId,
        });
        const tagService = new tag_service_1.TagService(subject, result.subjectStatus, ctx.cfg.service.did, moderationTxn);
        const initialTags = (0, defs_2.isModEventReport)(event)
            ? [(0, util_1.getTagForReport)(event.reportType)]
            : undefined;
        await tagService.evaluateForSubject(initialTags);
        if (subject.isRepo()) {
            if (isTakedownEvent) {
                const isSuspend = !!result.event.durationInHours;
                await moderationTxn.takedownRepo(subject, result.event.id, new Set(result.event.meta?.targetServices
                    ? `${result.event.meta.targetServices}`.split(',')
                    : undefined), isSuspend);
            }
            else if (isReverseTakedownEvent) {
                await moderationTxn.reverseTakedownRepo(subject);
            }
        }
        if (subject.isRecord()) {
            if (isTakedownEvent) {
                await moderationTxn.takedownRecord(subject, result.event.id, new Set(result.event.meta?.targetServices
                    ? `${result.event.meta.targetServices}`.split(',')
                    : undefined));
            }
            else if (isReverseTakedownEvent) {
                await moderationTxn.reverseTakedownRecord(subject);
            }
        }
        if ((isTakedownEvent || isAcknowledgeEvent) &&
            result.event.meta?.acknowledgeAccountSubjects) {
            await moderationTxn.resolveSubjectsForAccount(subject.did, createdBy, result.event);
        }
        if (isLabelEvent) {
            await moderationTxn.formatAndCreateLabels(result.event.subjectUri ?? result.event.subjectDid, result.event.subjectCid, {
                create: result.event.createLabelVals?.length
                    ? result.event.createLabelVals.split(' ')
                    : undefined,
                negate: result.event.negateLabelVals?.length
                    ? result.event.negateLabelVals.split(' ')
                    : undefined,
            }, result.event.durationInHours ?? undefined);
        }
        return result.event;
    });
    return moderationService.views.formatEvent(moderationEvent);
};
function default_1(server, ctx) {
    server.tools.ozone.moderation.emitEvent({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ input, auth }) => {
            try {
                const moderationEvent = await handleModerationEvent({
                    input,
                    auth,
                    ctx,
                });
                // On divert events, we need to automatically take down the blobs
                if ((0, defs_1.isModEventDivert)(input.body.event)) {
                    await handleModerationEvent({
                        auth,
                        ctx,
                        input: {
                            ...input,
                            body: {
                                ...input.body,
                                event: {
                                    ...input.body.event,
                                    $type: 'tools.ozone.moderation.defs#modEventTakedown',
                                    comment: '[DIVERT_SIDE_EFFECT]: Automatically taking down after divert event',
                                },
                                modTool: input.body.modTool,
                            },
                        },
                    });
                }
                return {
                    encoding: 'application/json',
                    body: moderationEvent,
                };
            }
            catch (err) {
                logger_1.httpLogger.error({ err, body: input.body }, 'failed to emit moderation event');
                throw err;
            }
        },
    });
}
const assertTagAuth = async (settingService, serviceDid, event, auth) => {
    // admins can add/remove any tag
    if (auth.credentials.isAdmin)
        return;
    const protectedTags = await (0, util_4.getProtectedTags)(settingService, serviceDid);
    if (!protectedTags) {
        return;
    }
    for (const tag of Object.keys(protectedTags)) {
        if (event.add.includes(tag) || event.remove.includes(tag)) {
            // if specific moderators are configured to manage this tag but the current user
            // is not one of them, then throw an error
            const configuredModerators = protectedTags[tag]?.['moderators'];
            if (configuredModerators &&
                !configuredModerators.includes(auth.credentials.iss)) {
                throw new xrpc_server_1.InvalidRequestError(`Not allowed to manage tag: ${tag}`);
            }
            const configuredRoles = protectedTags[tag]?.['roles'];
            if (configuredRoles) {
                // admins can already do everything so we only check for moderator and triage role config
                if (auth.credentials.isModerator &&
                    !configuredRoles.includes('tools.ozone.team.defs#roleModerator')) {
                    throw new xrpc_server_1.InvalidRequestError(`Can not manage tag ${tag} with moderator role`);
                }
                else if (auth.credentials.isTriage &&
                    !configuredRoles.includes('tools.ozone.team.defs#roleTriage')) {
                    throw new xrpc_server_1.InvalidRequestError(`Can not manage tag ${tag} with triage role`);
                }
            }
        }
    }
};
const validateLabels = (labels) => {
    for (const label of labels) {
        for (const char of badChars) {
            if (label.includes(char)) {
                throw new xrpc_server_1.InvalidRequestError(`Invalid label: ${label}`);
            }
        }
    }
};
const badChars = [' ', ',', ';', `'`, `"`];
//# sourceMappingURL=emitEvent.js.map