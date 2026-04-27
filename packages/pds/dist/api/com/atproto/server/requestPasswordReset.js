"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    server.add(index_js_1.com.atproto.server.requestPasswordReset, {
        rateLimit: [
            {
                durationMs: common_1.DAY,
                points: 50,
            },
            {
                durationMs: common_1.HOUR,
                points: 15,
            },
        ],
        handler: async ({ input: { body }, req }) => {
            const email = body.email.toLowerCase();
            const account = await ctx.accountManager.getAccountByEmail(email, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (account?.email) {
                const token = await ctx.accountManager.createEmailToken(account.did, 'reset_password');
                await ctx.mailer.sendResetPassword({ handle: account.handle ?? account.email, token }, { to: account.email });
                return;
            }
            if (entrywayClient) {
                const { headers } = ctx.entrywayPassthruHeaders(req);
                await entrywayClient.xrpc(index_js_1.com.atproto.server.requestPasswordReset, {
                    headers,
                    body,
                });
                return;
            }
            throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
        },
    });
}
//# sourceMappingURL=requestPasswordReset.js.map