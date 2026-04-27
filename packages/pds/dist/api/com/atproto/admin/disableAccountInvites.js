"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.disableAccountInvites, {
        auth: ctx.authVerifier.moderator,
        handler: async ({ input }) => {
            if (ctx.cfg.entryway) {
                throw new xrpc_server_1.InvalidRequestError('Account invites are managed by the entryway service');
            }
            const { account } = input.body;
            await ctx.accountManager.setAccountInvitesDisabled(account, true);
        },
    });
}
//# sourceMappingURL=disableAccountInvites.js.map