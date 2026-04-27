"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.repo.listMissingBlobs, {
        auth: ctx.authVerifier.authorization({
            authorize: () => {
                // always allow
            },
        }),
        handler: async ({ auth, params }) => {
            const { did } = auth.credentials;
            const { limit, cursor } = params;
            const blobs = await ctx.actorStore.read(did, (store) => store.repo.blob.listMissingBlobs({ limit, cursor }));
            return {
                encoding: 'application/json',
                body: {
                    blobs,
                    cursor: blobs.at(-1)?.cid,
                },
            };
        },
    });
}
//# sourceMappingURL=listMissingBlobs.js.map