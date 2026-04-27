"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const api_1 = require("@atproto/api");
const xrpc_server_1 = require("@atproto/xrpc-server");
const subject_1 = require("../../mod-service/subject");
const util_1 = require("../util");
const util_2 = require("./util");
function default_1(server, ctx) {
    server.tools.ozone.moderation.scheduleAction({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ input, auth }) => {
            const access = auth.credentials;
            const db = ctx.db;
            const { action, subjects, createdBy, scheduling, modTool } = input.body;
            if (!access.isModerator) {
                throw new xrpc_server_1.AuthRequiredError('Must be a moderator to schedule actions');
            }
            if (access.type === 'admin_token' && !createdBy) {
                throw new xrpc_server_1.AuthRequiredError('Must specify createdBy when using admin auth');
            }
            const actionType = (0, util_1.getScheduledActionType)(action.$type?.split('#')[1] || '');
            const succeeded = [];
            const failed = [];
            // Defining alternatively required fields is not supported by lexicons so we need to manually validate here
            if (!scheduling.executeAt && !scheduling.executeAfter) {
                throw new xrpc_server_1.InvalidRequestError('Must specify an execution schedule');
            }
            const executionSchedule = scheduling.executeAt
                ? { executeAt: new Date(scheduling.executeAt) }
                : {
                    executeAfter: new Date(scheduling.executeAfter),
                    executeUntil: scheduling.executeUntil
                        ? new Date(scheduling.executeUntil)
                        : undefined,
                };
            const eventData = { ...action, modTool };
            const actualCreatedBy = access.type === 'admin_token' ? createdBy : access.iss;
            const now = new Date();
            for (const subject of subjects) {
                try {
                    await db.transaction(async (tx) => {
                        const modService = ctx.modService(tx);
                        const scheduledActionService = ctx.scheduledActionService(tx);
                        // register the action in database
                        await scheduledActionService.scheduleAction({
                            action: actionType,
                            eventData,
                            did: subject,
                            createdBy: actualCreatedBy,
                            ...executionSchedule,
                        });
                        // log an event in the mod event stream
                        if (api_1.ToolsOzoneModerationScheduleAction.isTakedown(action)) {
                            await modService.logEvent({
                                event: {
                                    $type: 'tools.ozone.moderation.defs#scheduleTakedownEvent',
                                    executeAfter: scheduling.executeAfter,
                                    executeUntil: scheduling.executeUntil,
                                    executeAt: scheduling.executeAt,
                                    comment: action.comment,
                                },
                                subject: (0, subject_1.subjectFromInput)({
                                    did: subject,
                                    $type: 'com.atproto.admin.defs#repoRef',
                                }),
                                createdBy: actualCreatedBy,
                                createdAt: now,
                                modTool,
                            });
                            await modService.logEvent({
                                event: {
                                    $type: 'tools.ozone.moderation.defs#modEventTag',
                                    add: [util_2.ScheduledTakedownTag],
                                    remove: [],
                                },
                                subject: (0, subject_1.subjectFromInput)({
                                    did: subject,
                                    $type: 'com.atproto.admin.defs#repoRef',
                                }),
                                createdBy,
                                createdAt: now,
                            });
                        }
                        succeeded.push(subject);
                    });
                }
                catch (error) {
                    let errorMessage = 'Unknown error';
                    let errorCode;
                    if (error instanceof xrpc_server_1.InvalidRequestError) {
                        errorMessage = error.message;
                        errorCode = 'InvalidRequest';
                    }
                    else if (error instanceof Error) {
                        errorMessage = error.message;
                    }
                    failed.push({
                        subject,
                        error: errorMessage,
                        errorCode,
                    });
                }
            }
            return {
                encoding: 'application/json',
                body: {
                    succeeded,
                    failed,
                },
            };
        },
    });
}
//# sourceMappingURL=scheduleAction.js.map