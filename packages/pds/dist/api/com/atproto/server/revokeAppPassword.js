"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    const auth = ctx.authVerifier.authorization({
        authorize: () => {
            throw new xrpc_server_1.ForbiddenError('OAuth credentials are not supported for this endpoint');
        },
    });
    if (entrywayClient) {
        server.add(index_js_1.com.atproto.server.revokeAppPassword, {
            auth,
            handler: async ({ auth, input: { body }, req }) => {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.server.revokeAppPassword.$lxm);
                await entrywayClient.xrpc(index_js_1.com.atproto.server.revokeAppPassword, {
                    headers,
                    body,
                });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.revokeAppPassword, {
            auth,
            handler: async ({ auth, input: { body } }) => {
                const requester = auth.credentials.did;
                await ctx.accountManager.revokeAppPassword(requester, body.name);
            },
        });
    }
}
//# sourceMappingURL=revokeAppPassword.js.map