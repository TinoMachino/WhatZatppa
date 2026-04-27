"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const lex_data_1 = require("@atproto/lex-data");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_verifier_1 = require("../../../../auth-verifier");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.sync.getBlocks, {
        auth: ctx.authVerifier.authorizationOrAdminTokenOptional({
            authorize: () => {
                // always allow
            },
        }),
        handler: async ({ params, auth }) => {
            const { did } = params;
            await (0, util_1.assertRepoAvailability)(ctx, did, (0, auth_verifier_1.isUserOrAdmin)(auth, did));
            const cids = params.cids.map(lex_data_1.parseCid);
            const got = await ctx.actorStore.read(did, (store) => store.repo.storage.getBlocks(cids));
            if (got.missing.length > 0) {
                const missingStr = got.missing.map((c) => c.toString());
                throw new xrpc_server_1.InvalidRequestError(`Could not find cids: ${missingStr}`);
            }
            const car = (0, repo_1.blocksToCarStream)(null, got.blocks);
            return {
                encoding: 'application/vnd.ipld.car',
                body: (0, common_1.byteIterableToStream)(car),
            };
        },
    });
}
//# sourceMappingURL=getBlocks.js.map