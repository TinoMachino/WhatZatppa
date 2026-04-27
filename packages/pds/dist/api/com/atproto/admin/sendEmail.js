"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.sendEmail, {
        auth: ctx.authVerifier.moderator,
        handler: async ({ input: { body }, req }) => {
            const { content, recipientDid, subject = 'Message via your PDS' } = body;
            const account = await ctx.accountManager.getAccount(recipientDid, {
                includeDeactivated: true,
                includeTakenDown: true,
            });
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('Recipient not found');
            }
            if (ctx.entrywayClient) {
                const { headers } = await ctx.entrywayAuthHeaders(req, recipientDid, index_js_1.com.atproto.admin.sendEmail.$lxm);
                return ctx.entrywayClient.xrpc(index_js_1.com.atproto.admin.sendEmail, {
                    headers,
                    body,
                });
            }
            if (!account.email) {
                throw new xrpc_server_1.InvalidRequestError('account does not have an email address');
            }
            await ctx.moderationMailer.send({ content }, { subject, to: account.email });
            return {
                encoding: 'application/json',
                body: { sent: true },
            };
        },
    });
}
//# sourceMappingURL=sendEmail.js.map