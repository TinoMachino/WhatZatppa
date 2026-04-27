"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.updateAccountEmail, {
        auth: ctx.authVerifier.adminToken,
        handler: async ({ input: { body }, req }) => {
            const account = await ctx.accountManager.getAccount(body.account, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError(`Account does not exist: ${body.account}`);
            }
            if (ctx.entrywayClient) {
                const { headers } = ctx.entrywayPassthruHeaders(req);
                await ctx.entrywayClient.xrpc(index_js_1.com.atproto.admin.updateAccountEmail, {
                    headers,
                    body,
                });
                return;
            }
            await ctx.accountManager.updateEmail({
                did: account.did,
                email: body.email,
            });
        },
    });
}
//# sourceMappingURL=updateAccountEmail.js.map