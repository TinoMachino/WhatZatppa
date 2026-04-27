"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../util");
function default_1(server, ctx) {
    server.tools.ozone.safelink.queryEvents({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ input }) => {
            const db = ctx.db;
            const { cursor, limit, urls, patternType, sortDirection } = input.body;
            const safelinkRuleService = ctx.safelinkRuleService(db);
            const result = await safelinkRuleService.queryEvents({
                cursor,
                limit,
                urls,
                patternType: patternType ? (0, util_1.getSafelinkPattern)(patternType) : undefined,
                direction: sortDirection,
            });
            return {
                encoding: 'application/json',
                body: {
                    cursor: result.cursor,
                    events: result.events.map((event) => safelinkRuleService.formatEvent(event)),
                },
            };
        },
    });
}
//# sourceMappingURL=queryEvents.js.map