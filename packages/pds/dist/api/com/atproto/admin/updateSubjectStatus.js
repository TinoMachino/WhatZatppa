"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_data_1 = require("@atproto/lex-data");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.admin.updateSubjectStatus, {
        auth: ctx.authVerifier.moderator,
        handler: async ({ input }) => {
            const { subject, takedown, deactivated } = input.body;
            if (takedown) {
                if (index_js_1.com.atproto.admin.defs.repoRef.$isTypeOf(subject)) {
                    await ctx.accountManager.takedownAccount(subject.did, takedown);
                }
                else if (index_js_1.com.atproto.repo.strongRef.$isTypeOf(subject)) {
                    const uri = new syntax_1.AtUri(subject.uri);
                    await ctx.actorStore.transact(uri.hostname, async (store) => {
                        await store.record.updateRecordTakedownStatus(uri, takedown);
                    });
                }
                else if (index_js_1.com.atproto.admin.defs.repoBlobRef.$isTypeOf(subject)) {
                    await ctx.actorStore.transact(subject.did, async (store) => {
                        await store.repo.blob.updateBlobTakedownStatus((0, lex_data_1.parseCid)(subject.cid), takedown);
                    });
                }
                else {
                    throw new xrpc_server_1.InvalidRequestError(`Invalid subject (${subject.$type})`);
                }
            }
            if (deactivated) {
                if (index_js_1.com.atproto.admin.defs.repoRef.$isTypeOf(subject)) {
                    if (deactivated.applied) {
                        await ctx.accountManager.deactivateAccount(subject.did, null);
                    }
                    else {
                        await ctx.accountManager.activateAccount(subject.did);
                    }
                }
            }
            if (index_js_1.com.atproto.admin.defs.repoRef.$isTypeOf(subject)) {
                const status = await ctx.accountManager.getAccountStatus(subject.did);
                await ctx.sequencer.sequenceAccountEvt(subject.did, status);
            }
            return {
                encoding: 'application/json',
                body: {
                    subject,
                    takedown,
                },
            };
        },
    });
}
//# sourceMappingURL=updateSubjectStatus.js.map