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
    server.com.para.feed.getTimeline({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = lexicons_1.ids.ComParaFeedGetTimeline;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.com.para.feed.getTimeline.main, getTimelineMunge);
        },
    });
}
const getTimelineMunge = async (_localViewer, original, local) => {
    const feed = (0, util_1.insertLocalPostsInFeed)([...original.feed], local.paraPosts);
    return {
        ...original,
        feed,
    };
};
//# sourceMappingURL=getTimeline.js.map