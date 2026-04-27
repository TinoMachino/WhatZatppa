"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.requestEmailConfirmation, {
        rateLimit: [
            {
                durationMs: common_1.DAY,
                points: 15,
                calcKey: ({ auth }) => auth.credentials.did,
            },
            {
                durationMs: common_1.HOUR,
                points: 5,
                calcKey: ({ auth }) => auth.credentials.did,
            },
        ],
        auth: ctx.authVerifier.authorization({
            checkTakedown: true,
            authorize: (permissions) => {
                permissions.assertAccount({ attr: 'email', action: 'manage' });
            },
        }),
        handler: async ({ auth, req }) => {
            const did = auth.credentials.did;
            const account = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('account not found');
            }
            if (ctx.entrywayClient) {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.server.requestEmailConfirmation.$lxm);
                await ctx.entrywayClient.xrpc(index_js_1.com.atproto.server.requestEmailConfirmation, { headers });
                return;
            }
            if (!account.email) {
                throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
            }
            const token = await ctx.accountManager.createEmailToken(did, 'confirm_email');
            await ctx.mailer.sendConfirmEmail({ token }, { to: account.email });
        },
    });
}
//# sourceMappingURL=requestEmailConfirmation.js.map