"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const syntax_1 = require("@atproto/syntax");
function default_1(server, ctx) {
    server.xrpc.method('com.para.notification.getPostSubscription', {
        auth: ctx.authVerifier.standard,
        handler: async ({ params, auth }) => {
            const actorDid = auth.credentials.iss;
            assertPostUri(params.post);
            const res = await ctx.dataplane.getPostSubscription({
                subscriberDid: actorDid,
                postUri: params.post,
            });
            const subscription = res.subscription;
            return {
                encoding: 'application/json',
                body: {
                    post: params.post,
                    reply: subscription?.reply ?? false,
                    quote: subscription?.quote ?? false,
                    indexedAt: subscription?.indexedAt?.toDate().toISOString(),
                },
            };
        },
    });
}
const assertPostUri = (uri) => {
    let parsed;
    try {
        parsed = new syntax_1.AtUri(uri);
    }
    catch {
        throw new xrpc_server_1.InvalidRequestError('Invalid post URI');
    }
    if (parsed.collection !== 'app.bsky.feed.post' &&
        parsed.collection !== 'com.para.post') {
        throw new xrpc_server_1.InvalidRequestError('Post subscription subject must be a post URI');
    }
};
//# sourceMappingURL=getPostSubscription.js.map