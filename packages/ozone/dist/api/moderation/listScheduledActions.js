"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../util");
function default_1(server, ctx) {
    server.tools.ozone.moderation.listScheduledActions({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ input }) => {
            const db = ctx.db;
            const { startsAfter, endsBefore, subjects, statuses, limit = 50, cursor, } = input.body;
            const scheduledActionService = ctx.scheduledActionService(db);
            const parsedStatuses = statuses.map((status) => (0, util_1.getScheduledActionStatus)(status));
            const result = await scheduledActionService.listScheduledActions({
                cursor,
                limit,
                startTime: startsAfter ? new Date(startsAfter) : undefined,
                endTime: endsBefore ? new Date(endsBefore) : undefined,
                subjects,
                statuses: parsedStatuses,
            });
            return {
                encoding: 'application/json',
                body: {
                    actions: result.actions.map((action) => scheduledActionService.formatScheduledAction(action)),
                    cursor: result.cursor,
                },
            };
        },
    });
}
//# sourceMappingURL=listScheduledActions.js.map