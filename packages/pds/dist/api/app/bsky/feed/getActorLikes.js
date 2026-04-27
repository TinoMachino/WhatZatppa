"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.add(index_js_1.app.bsky.feed.getActorLikes, {
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.feed.getActorLikes.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.app.bsky.feed.getActorLikes, getAuthorMunge);
        },
    });
}
const getAuthorMunge = async (localViewer, original, local, requester) => {
    const localProf = local.profile;
    let feed = original.feed;
    // first update any out of date profile pictures in feed
    if (localProf) {
        feed = feed.map((item) => {
            if (item.post.author.did === requester) {
                return {
                    ...item,
                    post: {
                        ...item.post,
                        author: localViewer.updateProfileViewBasic(item.post.author, localProf.record),
                    },
                };
            }
            else {
                return item;
            }
        });
    }
    return {
        ...original,
        feed,
    };
};
//# sourceMappingURL=getActorLikes.js.map