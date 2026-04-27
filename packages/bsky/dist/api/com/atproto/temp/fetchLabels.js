"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, _ctx) {
    server.add(index_js_1.com.atproto.temp.fetchLabels, async (_reqCtx) => {
        throw new xrpc_server_1.InvalidRequestError('not implemented on dataplane');
    });
}
//# sourceMappingURL=fetchLabels.js.map