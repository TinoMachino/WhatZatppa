"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.identity.resolveHandle, async ({ params }) => {
        const [did] = await ctx.hydrator.actor.getDids([params.handle], {
            lookupUnidirectional: true,
        });
        if (!did) {
            throw new xrpc_server_1.InvalidRequestError('Unable to resolve handle');
        }
        return {
            encoding: 'application/json',
            body: { did },
        };
    });
}
//# sourceMappingURL=resolveHandle.js.map