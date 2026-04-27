"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    if (entrywayClient) {
        server.add(index_js_1.com.atproto.server.deleteSession, async ({ req }) => {
            const { headers } = ctx.entrywayPassthruHeaders(req);
            await entrywayClient.xrpc(index_js_1.com.atproto.server.deleteSession, {
                headers,
            });
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.deleteSession, {
            auth: ctx.authVerifier.refresh({ allowExpired: true }),
            handler: async ({ auth }) => {
                await ctx.accountManager.revokeRefreshToken(auth.credentials.tokenId);
            },
        });
    }
}
//# sourceMappingURL=deleteSession.js.map