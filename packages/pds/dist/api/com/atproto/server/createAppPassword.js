"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    const auth = ctx.authVerifier.authorization({
        checkTakedown: true,
        scopes: auth_scope_1.ACCESS_FULL,
        authorize: () => {
            throw new xrpc_server_1.ForbiddenError('OAuth credentials are not supported for this endpoint');
        },
    });
    if (entrywayClient) {
        server.add(index_js_1.com.atproto.server.createAppPassword, {
            auth,
            handler: async ({ input: { body }, auth, req }) => {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.server.createAppPassword.$lxm);
                return entrywayClient.xrpc(index_js_1.com.atproto.server.createAppPassword, {
                    headers,
                    body,
                });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.createAppPassword, {
            auth,
            handler: async ({ input: { body }, auth }) => {
                const { name } = body;
                const appPassword = await ctx.accountManager.createAppPassword(auth.credentials.did, name, body.privileged ?? false);
                return {
                    encoding: 'application/json',
                    body: appPassword,
                };
            },
        });
    }
}
//# sourceMappingURL=createAppPassword.js.map