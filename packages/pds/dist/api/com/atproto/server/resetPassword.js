"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const scrypt_1 = require("../../../../account-manager/helpers/scrypt");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    const rateLimit = [
        {
            durationMs: 5 * common_1.MINUTE,
            points: 50,
        },
    ];
    if (entrywayClient) {
        server.add(index_js_1.com.atproto.server.resetPassword, {
            rateLimit,
            handler: async ({ input: { body }, req }) => {
                const { headers } = ctx.entrywayPassthruHeaders(req);
                await entrywayClient.xrpc(index_js_1.com.atproto.server.resetPassword, {
                    headers,
                    body,
                });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.resetPassword, {
            rateLimit,
            handler: async ({ input: { body } }) => {
                const { token, password } = body;
                if (password.length > scrypt_1.NEW_PASSWORD_MAX_LENGTH) {
                    throw new xrpc_server_1.InvalidRequestError('Invalid password length.');
                }
                await ctx.accountManager.resetPassword({ token, password });
            },
        });
    }
}
//# sourceMappingURL=resetPassword.js.map