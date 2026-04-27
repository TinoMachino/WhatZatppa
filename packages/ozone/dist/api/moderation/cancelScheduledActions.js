"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const subject_1 = require("../../mod-service/subject");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.tools.ozone.moderation.cancelScheduledActions({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ input, auth }) => {
            const access = auth.credentials;
            const db = ctx.db;
            const { subjects, comment } = input.body;
            if (!access.isModerator) {
                throw new xrpc_server_1.AuthRequiredError('Must be a moderator to cancel scheduled actions');
            }
            const createdBy = access.type === 'admin_token' ? ctx.cfg.service.did : access.iss;
            const now = new Date();
            const result = await db.transaction(async (tx) => {
                const scheduledActionService = ctx.scheduledActionService(tx);
                const modService = ctx.modService(tx);
                const cancellations = await scheduledActionService.cancelScheduledActions(subjects);
                for (const subject of cancellations.succeeded) {
                    await modService.logEvent({
                        event: {
                            $type: 'tools.ozone.moderation.defs#cancelScheduledTakedownEvent',
                            comment,
                        },
                        subject: (0, subject_1.subjectFromInput)({
                            did: subject,
                            $type: 'com.atproto.admin.defs#repoRef',
                        }),
                        createdBy,
                        createdAt: now,
                    });
                    await modService.logEvent({
                        event: {
                            $type: 'tools.ozone.moderation.defs#modEventTag',
                            remove: [util_1.ScheduledTakedownTag],
                            add: [],
                        },
                        subject: (0, subject_1.subjectFromInput)({
                            did: subject,
                            $type: 'com.atproto.admin.defs#repoRef',
                        }),
                        createdBy,
                        createdAt: now,
                    });
                }
                return cancellations;
            });
            return {
                encoding: 'application/json',
                body: {
                    succeeded: result.succeeded,
                    failed: result.failed,
                },
            };
        },
    });
}
//# sourceMappingURL=cancelScheduledActions.js.map