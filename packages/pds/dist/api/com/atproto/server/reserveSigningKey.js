"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.reserveSigningKey, {
        handler: async ({ input }) => {
            const signingKey = await ctx.actorStore.reserveKeypair(input.body.did);
            return {
                encoding: 'application/json',
                body: { signingKey },
            };
        },
    });
}
//# sourceMappingURL=reserveSigningKey.js.map