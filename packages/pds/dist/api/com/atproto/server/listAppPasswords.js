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
        server.add(index_js_1.com.atproto.server.listAppPasswords, {
            auth,
            handler: async ({ auth, req }) => {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.server.listAppPasswords.$lxm);
                return entrywayClient.xrpc(index_js_1.com.atproto.server.listAppPasswords, {
                    headers,
                });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.listAppPasswords, {
            auth,
            handler: async ({ auth }) => {
                const passwords = await ctx.accountManager.listAppPasswords(auth.credentials.did);
                return {
                    encoding: 'application/json',
                    body: { passwords },
                };
            },
        });
    }
}
//# sourceMappingURL=listAppPasswords.js.map