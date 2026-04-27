"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    const auth = ctx.authVerifier.authorization({
        additional: [auth_scope_1.AuthScope.Takendown],
        scopes: auth_scope_1.ACCESS_FULL,
        authorize: () => {
            throw new xrpc_server_1.ForbiddenError('OAuth credentials are not supported for this endpoint');
        },
    });
    if (entrywayClient) {
        server.add(index_js_1.com.atproto.server.deactivateAccount, {
            auth,
            // in the case of entryway, the full flow is deactivateAccount (PDS) -> deactivateAccount (Entryway) -> updateSubjectStatus(PDS)
            handler: async ({ input: { body }, req }) => {
                const { headers } = ctx.entrywayPassthruHeaders(req);
                await entrywayClient.xrpc(index_js_1.com.atproto.server.deactivateAccount, {
                    headers,
                    body,
                });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.deactivateAccount, {
            auth,
            handler: async ({ input: { body }, auth }) => {
                const requester = auth.credentials.did;
                await ctx.accountManager.deactivateAccount(requester, body.deleteAfter ?? null);
                const status = await ctx.accountManager.getAccountStatus(requester);
                await ctx.sequencer.sequenceAccountEvt(requester, status);
            },
        });
    }
}
//# sourceMappingURL=deactivateAccount.js.map