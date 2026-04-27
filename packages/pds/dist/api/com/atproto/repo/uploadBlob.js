"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.repo.uploadBlob, {
        auth: ctx.authVerifier.authorizationOrUserServiceAuth({
            checkTakedown: true,
            authorize: (permissions, { req }) => {
                const encoding = (0, xrpc_server_1.parseReqEncoding)(req);
                permissions.assertBlob({ mime: encoding });
            },
        }),
        rateLimit: {
            durationMs: common_1.DAY,
            points: 1000,
        },
        handler: async ({ auth, input }) => {
            const requester = auth.credentials.did;
            const blob = await ctx.actorStore.writeNoTransaction(requester, async (store) => {
                const metadata = await store.repo.blob
                    .uploadBlobAndGetMetadata(input.encoding, input.body)
                    .catch(throwAbortAsUpstreamError);
                return store.transact(async (actorTxn) => {
                    const blobRef = await actorTxn.repo.blob.trackUntetheredBlob(metadata);
                    // make the blob permanent if an associated record is already indexed
                    if (await actorTxn.repo.blob.hasRecordsForBlob(blobRef.ref)) {
                        await actorTxn.repo.blob.verifyBlobAndMakePermanent(blobRef);
                    }
                    return blobRef;
                });
            });
            return {
                encoding: 'application/json',
                body: { blob },
            };
        },
    });
}
function throwAbortAsUpstreamError(err) {
    if (err?.['name'] === 'AbortError') {
        throw new xrpc_server_1.UpstreamTimeoutError('Operation timed out, please try again.');
    }
    throw err;
}
//# sourceMappingURL=uploadBlob.js.map