"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_verifier_1 = require("../../../../auth-verifier");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.sync.getLatestCommit, {
        auth: ctx.authVerifier.authorizationOrAdminTokenOptional({
            authorize: () => {
                // always allow
            },
        }),
        handler: async ({ params, auth }) => {
            const { did } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, (0, auth_verifier_1.isUserOrAdmin)(auth, did));
            const root = await ctx.actorStore.read(did, (store) => store.repo.storage.getRootDetailed());
            if (root === null) {
                throw new xrpc_server_1.InvalidRequestError(`Could not find root for DID: ${did}`, 'RepoNotFound');
            }
            return {
                encoding: 'application/json',
                body: { cid: root.cid.toString(), rev: root.rev },
            };
        },
    });
}
//# sourceMappingURL=getLatestCommit.js.map