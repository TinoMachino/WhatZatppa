"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.confirmEmail, {
        auth: ctx.authVerifier.authorization({
            checkTakedown: true,
            authorize: (permissions) => {
                permissions.assertAccount({ attr: 'email', action: 'manage' });
            },
        }),
        handler: async ({ auth, input: { body }, req }) => {
            const { did } = auth.credentials;
            const user = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
            });
            if (!user) {
                throw new xrpc_server_1.InvalidRequestError('user not found', 'AccountNotFound');
            }
            if (ctx.entrywayClient) {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.server.confirmEmail.$lxm);
                await ctx.entrywayClient.xrpc(index_js_1.com.atproto.server.confirmEmail, {
                    headers,
                    body,
                });
                return;
            }
            const { token, email } = body;
            if (user.email !== email.toLowerCase()) {
                throw new xrpc_server_1.InvalidRequestError('invalid email', 'InvalidEmail');
            }
            await ctx.accountManager.confirmEmail({ did, token });
        },
    });
}
//# sourceMappingURL=confirmEmail.js.map