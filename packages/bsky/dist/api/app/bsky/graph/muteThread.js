"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
const bsync_pb_1 = require("../../../../proto/bsync_pb");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.graph.muteThread, {
        auth: ctx.authVerifier.standard,
        handler: async ({ auth, input }) => {
            const { root } = input.body;
            const requester = auth.credentials.iss;
            await ctx.bsyncClient.addMuteOperation({
                type: bsync_pb_1.MuteOperation_Type.ADD,
                actorDid: requester,
                subject: root,
            });
        },
    });
}
//# sourceMappingURL=muteThread.js.map