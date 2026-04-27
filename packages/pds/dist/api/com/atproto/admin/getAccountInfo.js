"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.getAccountInfo, {
        auth: ctx.authVerifier.moderator,
        handler: async ({ params }) => {
            const [account, invites, invitedBy] = await Promise.all([
                ctx.accountManager.getAccount(params.did, {
                    includeDeactivated: true,
                    includeTakenDown: true,
                }),
                ctx.accountManager.getAccountInvitesCodes(params.did),
                ctx.accountManager.getInvitedByForAccounts([params.did]),
            ]);
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('Account not found', 'NotFound');
            }
            const managesOwnInvites = !ctx.cfg.entryway;
            return {
                encoding: 'application/json',
                body: (0, util_1.formatAccountInfo)(account, {
                    managesOwnInvites,
                    invitedBy,
                    invites,
                }),
            };
        },
    });
}
//# sourceMappingURL=getAccountInfo.js.map