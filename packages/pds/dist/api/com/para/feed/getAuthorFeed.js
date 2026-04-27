"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lexicons_1 = require("../../../../lexicon/lexicons");
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
const util_1 = require("./util");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.com.para.feed.getAuthorFeed({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = lexicons_1.ids.ComParaFeedGetAuthorFeed;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async (reqCtx) => {
            const actorDid = await (0, util_1.resolveLocalActorDid)(ctx, reqCtx.params.actor);
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.com.para.feed.getAuthorFeed.main, (localViewer, original, local, requester) => getAuthorFeedMunge(localViewer, original, local, requester, actorDid));
        },
    });
}
const getAuthorFeedMunge = async (_localViewer, original, local, requester, actorDid) => {
    if (!actorDid || actorDid !== requester) {
        return original;
    }
    const feed = (0, util_1.insertLocalPostsInFeed)([...original.feed], local.paraPosts);
    return {
        ...original,
        feed,
    };
};
//# sourceMappingURL=getAuthorFeed.js.map