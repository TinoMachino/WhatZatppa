"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../util");
function default_1(server, ctx) {
    server.tools.ozone.safelink.removeRule({
        auth: ctx.authVerifier.modOrAdminToken,
        handler: async ({ input, auth }) => {
            const access = auth.credentials;
            const db = ctx.db;
            const { url, pattern, comment, createdBy } = input.body;
            if (!access.isModerator) {
                throw new xrpc_server_1.AuthRequiredError('Must be a moderator to remove URL rules');
            }
            if (access.type === 'admin_token' && !createdBy) {
                throw new xrpc_server_1.AuthRequiredError('Must specify createdBy when using admin auth');
            }
            const safelinkRuleService = ctx.safelinkRuleService(db);
            const event = await safelinkRuleService.removeRule({
                url,
                pattern: (0, util_1.getSafelinkPattern)(pattern),
                createdBy: access.type === 'admin_token'
                    ? createdBy || ctx.cfg.service.did
                    : access.iss,
                comment,
            });
            return {
                encoding: 'application/json',
                body: safelinkRuleService.formatEvent(event),
            };
        },
    });
}
//# sourceMappingURL=removeRule.js.map