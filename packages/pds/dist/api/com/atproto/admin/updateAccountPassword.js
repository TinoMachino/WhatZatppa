"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const scrypt_1 = require("../../../../account-manager/helpers/scrypt");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    if (entrywayClient) {
        server.add(index_js_1.com.atproto.admin.updateAccountPassword, {
            auth: ctx.authVerifier.adminToken,
            handler: async ({ input: { body }, req }) => {
                const { headers } = ctx.entrywayPassthruHeaders(req);
                await entrywayClient.xrpc(index_js_1.com.atproto.admin.updateAccountPassword, {
                    body,
                    headers,
                });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.admin.updateAccountPassword, {
            auth: ctx.authVerifier.adminToken,
            handler: async ({ input: { body } }) => {
                const { did, password } = body;
                if (password.length > scrypt_1.NEW_PASSWORD_MAX_LENGTH) {
                    throw new xrpc_server_1.InvalidRequestError('Invalid password length.');
                }
                await ctx.accountManager.updateAccountPassword({ did, password });
            },
        });
    }
}
//# sourceMappingURL=updateAccountPassword.js.map