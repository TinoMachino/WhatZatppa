"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
// THIS IS A TEMPORARY UNSPECCED ROUTE
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.temp.checkSignupQueue, {
        auth: ctx.authVerifier.authorization({
            additional: [auth_scope_1.AuthScope.SignupQueued],
            authorize: () => {
                throw new xrpc_server_1.ForbiddenError('OAuth credentials are not supported for this endpoint');
            },
        }),
        handler: async ({ req }) => {
            if (!ctx.entrywayClient) {
                return {
                    encoding: 'application/json',
                    body: {
                        activated: true,
                    },
                };
            }
            const { headers } = ctx.entrywayPassthruHeaders(req);
            return ctx.entrywayClient.xrpc(index_js_1.com.atproto.temp.checkSignupQueue, {
                headers,
            });
        },
    });
}
//# sourceMappingURL=checkSignupQueue.js.map