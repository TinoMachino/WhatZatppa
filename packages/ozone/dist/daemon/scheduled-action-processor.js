"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledActionProcessor = void 0;
const common_1 = require("@atproto/common");
const util_1 = require("../api/moderation/util");
const logger_1 = require("../logger");
const subject_1 = require("../mod-service/subject");
const util_2 = require("../util");
class ScheduledActionProcessor {
    constructor(db, serviceDid, settingService, modService, scheduledActionService) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "serviceDid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: serviceDid
        });
        Object.defineProperty(this, "settingService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: settingService
        });
        Object.defineProperty(this, "modService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: modService
        });
        Object.defineProperty(this, "scheduledActionService", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: scheduledActionService
        });
        Object.defineProperty(this, "destroyed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "processingPromise", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: Promise.resolve()
        });
        Object.defineProperty(this, "timer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    start() {
        this.poll();
    }
    poll() {
        if (this.destroyed)
            return;
        this.processingPromise = this.findAndExecuteScheduledActions()
            .catch((err) => logger_1.dbLogger.error({ err }, 'scheduled action processing errored'))
            .finally(() => {
            this.timer = setTimeout(() => this.poll(), getInterval());
        });
    }
    async destroy() {
        this.destroyed = true;
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = undefined;
        }
        await this.processingPromise;
    }
    async executeScheduledAction(actionId) {
        await this.db.transaction(async (dbTxn) => {
            const settingService = this.settingService(dbTxn);
            const moderationTxn = this.modService(dbTxn);
            const scheduledActionTxn = this.scheduledActionService(dbTxn);
            try {
                // maybe overfetching here to get the action again within the transaction to ensure it's still pending
                const action = await dbTxn.db
                    .selectFrom('scheduled_action')
                    .selectAll()
                    .where('id', '=', actionId)
                    .where('status', '=', 'pending')
                    .executeTakeFirst();
                if (!action) {
                    // already processed or cancelled
                    return;
                }
                let event;
                const email = {
                    subject: '',
                    content: '',
                };
                let modTool;
                // Create the appropriate moderation action based on the scheduled action type
                switch (action.action) {
                    case 'takedown':
                        {
                            const eventData = action.eventData;
                            modTool = eventData.modTool;
                            event = {
                                $type: 'tools.ozone.moderation.defs#modEventTakedown',
                                comment: `[SCHEDULED_ACTION] ${eventData.comment || 'Scheduled takedown executed'}`,
                                durationInHours: eventData.durationInHours,
                                acknowledgeAccountSubjects: eventData.acknowledgeAccountSubjects,
                                policies: eventData.policies,
                                severityLevel: eventData.severityLevel,
                                strikeCount: eventData.strikeCount,
                            };
                            if (eventData.emailSubject && eventData.emailContent) {
                                email.subject = eventData.emailSubject;
                                email.content = eventData.emailContent;
                            }
                        }
                        break;
                    default:
                        throw new Error(`Unsupported scheduled action type: ${action.action}`);
                }
                const moderationEvent = await this.performTakedown({
                    action,
                    event,
                    modTool,
                    moderationTxn,
                    settingService,
                    email,
                });
                // Mark the scheduled action as executed
                await scheduledActionTxn.markActionAsExecuted(actionId, moderationEvent.event.id);
                logger_1.dbLogger.info({
                    did: action.did,
                    scheduledActionId: actionId,
                    moderationEventId: moderationEvent.event.id,
                }, 'executed scheduled action');
            }
            catch (error) {
                const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                // mark as failed
                await scheduledActionTxn.markActionAsFailed(actionId, errorMessage);
                logger_1.dbLogger.error({
                    scheduledActionId: actionId,
                    error: errorMessage,
                }, 'failed to execute scheduled action');
            }
        });
    }
    async performTakedown({ email, action, event, modTool, moderationTxn, settingService, }) {
        const subject = new subject_1.RepoSubject(action.did);
        const status = await moderationTxn.getStatus(subject);
        if (status?.takendown) {
            throw new Error(`Account is already taken down`);
        }
        if (status?.tags?.length) {
            const protectedTags = await (0, util_1.getProtectedTags)(settingService, this.serviceDid);
            if (protectedTags) {
                (0, util_1.assertProtectedTagAction)({
                    protectedTags,
                    subjectTags: status.tags,
                    actionAuthor: action.createdBy,
                    isAdmin: true,
                    isModerator: false,
                    isTriage: false,
                });
            }
        }
        // log the event which also applies the necessary state changes to moderation subject
        const moderationEvent = await moderationTxn.logEvent({
            event,
            subject,
            modTool,
            createdBy: action.createdBy,
        });
        // register the takedown in event pusher
        await moderationTxn.takedownRepo(subject, moderationEvent.event.id, new Set(moderationEvent.event.meta?.targetServices
            ? `${moderationEvent.event.meta.targetServices}`.split(',')
            : undefined));
        if (email.content && email.subject) {
            let isDelivered = false;
            try {
                await (0, util_2.retryHttp)(() => moderationTxn.sendEmail({
                    ...email,
                    recipientDid: action.did,
                }));
                isDelivered = true;
            }
            catch (err) {
                logger_1.dbLogger.error({ err, did: action.did }, 'failed to send takedown email');
            }
            await moderationTxn.logEvent({
                event: {
                    content: email.content,
                    subjectLine: email.subject,
                    $type: 'tools.ozone.moderation.defs#modEventEmail',
                    comment: [
                        'Communication attached to scheduled action',
                        isDelivered ? '' : 'Email delivery failed',
                    ].join('.'),
                    isDelivered,
                },
                subject,
                modTool,
                createdBy: action.createdBy,
            });
        }
        return moderationEvent;
    }
    async findAndExecuteScheduledActions() {
        const scheduledActionService = this.scheduledActionService(this.db);
        const now = new Date();
        const actionsToExecute = await scheduledActionService.getPendingActionsToExecute(now);
        for (const action of actionsToExecute) {
            // For randomized execution, check if we should execute now or wait
            if (action.randomizeExecution && action.executeAfter) {
                const executeAfter = new Date(action.executeAfter);
                // Default to a 30 second window for execution
                const executeUntil = action.executeUntil
                    ? new Date(action.executeUntil)
                    : new Date(executeAfter.getTime() + 30 * common_1.SECOND);
                // Only execute if we're past the earliest time
                if (now < executeAfter) {
                    continue;
                }
                // For randomized scheduling, randomly decide whether to execute now
                // The probability increases as we get closer to the deadline
                const timeRange = executeUntil.getTime() - executeAfter.getTime();
                const timeElapsed = now.getTime() - executeAfter.getTime();
                const executeProb = Math.min(timeElapsed / timeRange, 1);
                // Execute with increasing probability as we approach the deadline
                // Always execute if we're at or past the deadline
                if (now < executeUntil && Math.random() > executeProb * 0.1) {
                    continue;
                }
            }
            await this.executeScheduledAction(action.id);
        }
    }
}
exports.ScheduledActionProcessor = ScheduledActionProcessor;
const getInterval = () => {
    // Process scheduled actions every minute
    const now = Date.now();
    const intervalMs = common_1.MINUTE;
    const nextIteration = Math.ceil(now / intervalMs);
    return nextIteration * intervalMs - now;
};
//# sourceMappingURL=scheduled-action-processor.js.map