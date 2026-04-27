"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../util");
function default_1(server, ctx) {
    server.tools.ozone.moderation.queryEvents({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ params }) => {
            const { subject, limit = 50, cursor, sortDirection = 'desc', types, includeAllUserRecords = false, hasComment, comment, createdBy, createdAfter, createdBefore, addedLabels = [], removedLabels = [], addedTags = [], removedTags = [], reportTypes, collections = [], subjectType, policies, modTool, ageAssuranceState, batchId, withStrike, } = params;
            const db = ctx.db;
            const modService = ctx.modService(db);
            const results = await modService.getEvents({
                types: types?.length ? types.map(util_1.getEventType) : [],
                subject,
                createdBy,
                limit,
                cursor,
                sortDirection,
                includeAllUserRecords,
                hasComment,
                comment,
                createdAfter,
                createdBefore,
                addedLabels,
                addedTags,
                removedLabels,
                removedTags,
                reportTypes,
                collections,
                subjectType,
                policies,
                modTool,
                ageAssuranceState,
                batchId,
                withStrike,
            });
            return {
                encoding: 'application/json',
                body: {
                    cursor: results.cursor,
                    events: results.events.map((evt) => modService.views.formatEvent(evt)),
                },
            };
        },
    });
}
//# sourceMappingURL=queryEvents.js.map