"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const address_1 = require("@hapi/address");
const disposable_email_domains_js_1 = require("disposable-email-domains-js");
const xrpc_server_1 = require("@atproto/xrpc-server");
const account_1 = require("../../../../account-manager/helpers/account");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.updateEmail, {
        auth: ctx.authVerifier.authorization({
            checkTakedown: true,
            scopes: auth_scope_1.ACCESS_FULL,
            authorize: () => {
                throw new xrpc_server_1.ForbiddenError('OAuth credentials are not supported for this endpoint');
            },
        }),
        handler: async ({ auth, input: { body }, req }) => {
            const did = auth.credentials.did;
            const { token, email } = body;
            if (!(0, address_1.isEmailValid)(email) || (0, disposable_email_domains_js_1.isDisposableEmail)(email)) {
                throw new xrpc_server_1.InvalidRequestError('This email address is not supported, please use a different email.');
            }
            const account = await ctx.accountManager.getAccount(did, {
                includeDeactivated: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('account not found');
            }
            if (ctx.entrywayClient) {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.server.updateEmail.$lxm);
                await ctx.entrywayClient.xrpc(index_js_1.com.atproto.server.updateEmail, {
                    headers,
                    body,
                });
                return;
            }
            // require valid token if account email is confirmed
            if (account.emailConfirmedAt) {
                if (!token) {
                    throw new xrpc_server_1.InvalidRequestError('confirmation token required', 'TokenRequired');
                }
                await ctx.accountManager.assertValidEmailToken(did, 'update_email', token);
            }
            try {
                await ctx.accountManager.updateEmail({ did, email });
            }
            catch (err) {
                if (err instanceof account_1.UserAlreadyExistsError) {
                    throw new xrpc_server_1.InvalidRequestError('This email address is already in use, please use a different email.');
                }
                else {
                    throw err;
                }
            }
        },
    });
}
//# sourceMappingURL=updateEmail.js.map