"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../util");
function default_1(server, ctx) {
    server.tools.ozone.safelink.queryRules({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ input }) => {
            const db = ctx.db;
            const { cursor, limit, urls, patternType, actions, reason, createdBy, sortDirection, } = input.body;
            const safelinkRuleService = ctx.safelinkRuleService(db);
            const result = await safelinkRuleService.getActiveRules({
                cursor,
                limit,
                urls,
                patternType: patternType ? (0, util_1.getSafelinkPattern)(patternType) : undefined,
                actions: actions && actions.length > 0
                    ? actions.map(util_1.getSafelinkAction)
                    : undefined,
                reason: reason ? (0, util_1.getSafelinkReason)(reason) : undefined,
                createdBy,
                direction: sortDirection,
            });
            return {
                encoding: 'application/json',
                body: {
                    cursor: result.cursor,
                    rules: result.rules.map((rule) => ({
                        url: rule.url,
                        pattern: rule.pattern,
                        action: rule.action,
                        reason: rule.reason,
                        createdBy: rule.createdBy,
                        createdAt: new Date(rule.createdAt).toISOString(),
                        updatedAt: new Date(rule.updatedAt).toISOString(),
                        comment: rule.comment || undefined,
                    })),
                },
            };
        },
    });
}
//# sourceMappingURL=queryRules.js.map