"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_1 = require("@atproto/lex");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.label.queryLabels, async ({ params }) => {
        const { uriPatterns, sources } = params;
        if (!sources?.length) {
            throw new xrpc_server_1.InvalidRequestError('source dids are required');
        }
        if (uriPatterns.some(includesWildcard)) {
            throw new xrpc_server_1.InvalidRequestError('wildcards not supported');
        }
        // @TODO Should this be enforced at the schema level?
        if (!uriPatterns.every(lex_1.isUriString)) {
            throw new xrpc_server_1.InvalidRequestError('invalid uri pattern');
        }
        const labelMap = await ctx.hydrator.label.getLabelsForSubjects(uriPatterns, 
        // If sources are provided, use them. Otherwise, use the labelers from the request header
        {
            dids: sources,
            redact: new Set(),
        });
        const labels = uriPatterns.flatMap((sub) => labelMap.getBySubject(sub));
        return {
            encoding: 'application/json',
            body: { labels },
        };
    });
}
function includesWildcard(str) {
    return str.includes('*');
}
//# sourceMappingURL=queryLabels.js.map