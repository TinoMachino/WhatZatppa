"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUri = void 0;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const validateUri = (uri) => {
    const atUri = new syntax_1.AtUri(uri);
    if (atUri.collection !== index_js_1.app.bsky.feed.post.$type) {
        throw new xrpc_server_1.InvalidRequestError(`Only '${index_js_1.app.bsky.feed.post.$type}' records can be bookmarked`, 'UnsupportedCollection');
    }
};
exports.validateUri = validateUri;
//# sourceMappingURL=util.js.map