"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const oauth_provider_1 = require("@atproto/oauth-provider");
const syntax_1 = require("@atproto/syntax");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
function default_1(server, ctx) {
    const { bskyAppView } = ctx;
    if (!bskyAppView)
        return;
    server.add(index_js_1.app.bsky.feed.getFeed, {
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.feed.getFeed.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
                permissions.assertRpc({ aud, lxm: index_js_1.app.bsky.feed.getFeedSkeleton.$lxm });
            },
        }),
        handler: async ({ params, auth, req }) => {
            const requester = auth.credentials.did;
            const feedUrl = new syntax_1.AtUri(params.feed);
            const data = await bskyAppView.client.call(index_js_1.com.atproto.repo.getRecord, {
                repo: feedUrl.host,
                collection: feedUrl.collectionSafe,
                rkey: feedUrl.rkeySafe,
            });
            const feedDid = data.value['did'];
            if (typeof feedDid !== 'string') {
                throw new oauth_provider_1.InvalidRequestError('could not resolve feed did', 'UnknownFeed');
            }
            return (0, pipethrough_1.pipethrough)(ctx, req, {
                iss: requester,
                aud: feedDid,
                lxm: index_js_1.app.bsky.feed.getFeedSkeleton.$lxm,
            });
        },
    });
}
//# sourceMappingURL=getFeed.js.map