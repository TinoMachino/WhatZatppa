"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    const { entrywayClient } = ctx;
    const auth = ctx.authVerifier.authorization({
        // @NOTE Reflect any change in signPlcOperation
        scopes: auth_scope_1.ACCESS_FULL,
        additional: [auth_scope_1.AuthScope.Takendown],
        authorize: (permissions) => {
            permissions.assertIdentity({ attr: '*' });
        },
    });
    if (entrywayClient) {
        // @TODO we should have a higher level way of defining these "passthrough"
        // handlers
        server.add(index_js_1.com.atproto.identity.requestPlcOperationSignature, {
            auth,
            handler: async ({ auth, req }) => {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.identity.requestPlcOperationSignature.$lxm);
                await entrywayClient.xrpc(index_js_1.com.atproto.identity.requestPlcOperationSignature, { headers });
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.identity.requestPlcOperationSignature, {
            auth,
            handler: async ({ auth }) => {
                const did = auth.credentials.did;
                const account = await ctx.accountManager.getAccount(did, {
                    includeDeactivated: true,
                    includeTakenDown: true,
                });
                if (!account) {
                    throw new xrpc_server_1.InvalidRequestError('account not found');
                }
                else if (!account.email) {
                    throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
                }
                const token = await ctx.accountManager.createEmailToken(did, 'plc_operation');
                await ctx.mailer.sendPlcOperation({ token }, { to: account.email });
            },
        });
    }
}
//# sourceMappingURL=requestPlcOperationSignature.js.map