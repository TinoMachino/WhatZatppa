"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    const { entryway } = ctx.cfg;
    if (entryway) {
        server.add(index_js_1.com.atproto.server.createInviteCodes, {
            auth: ctx.authVerifier.adminToken,
            handler: () => {
                throw new xrpc_server_1.InvalidRequestError('Account invites are managed by the entryway service');
            },
        });
    }
    else {
        server.add(index_js_1.com.atproto.server.createInviteCodes, {
            auth: ctx.authVerifier.adminToken,
            handler: async ({ input }) => {
                const { codeCount, useCount } = input.body;
                const forAccounts = input.body.forAccounts ?? ['admin'];
                const accountCodes = [];
                for (const account of forAccounts) {
                    const codes = (0, util_1.genInvCodes)(ctx.cfg, codeCount);
                    accountCodes.push({ account, codes });
                }
                await ctx.accountManager.createInviteCodes(accountCodes, useCount);
                return {
                    encoding: 'application/json',
                    body: { codes: accountCodes },
                };
            },
        });
    }
}
//# sourceMappingURL=createInviteCodes.js.map