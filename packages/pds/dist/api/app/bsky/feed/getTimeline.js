"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.add(index_js_1.app.bsky.feed.getTimeline, {
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.feed.getTimeline.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        opts: {
            // @TODO remove after grace period has passed, behavior is non-standard.
            // temporarily added for compat w/ previous version of xrpc-server to avoid breakage of a few specified parties.
            paramsParseLoose: true,
        },
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.app.bsky.feed.getTimeline, getTimelineMunge);
        },
    });
}
const getTimelineMunge = async (localViewer, original, local) => {
    const feed = await localViewer.formatAndInsertPostsInFeed([...original.feed], local.posts);
    return {
        ...original,
        feed,
    };
};
//# sourceMappingURL=getTimeline.js.map