"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    const { entryway } = ctx.cfg;
    if (entryway) {
        server.add(index_js_1.com.atproto.server.createInviteCode, {
            auth: ctx.authVerifier.adminToken,
            handler: () => {
                throw new xrpc_server_1.InvalidRequestError('Account invites are managed by the entryway service');
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.createInviteCode, {
            auth: ctx.authVerifier.adminToken,
            handler: async ({ input }) => {
                const { useCount, forAccount = 'admin' } = input.body;
                const code = (0, util_1.genInvCode)(ctx.cfg);
                await ctx.accountManager.createInviteCodes([{ account: forAccount, codes: [code] }], useCount);
                return {
                    encoding: 'application/json',
                    body: { code },
                };
            },
        });
    }
}
//# sourceMappingURL=createInviteCode.js.map