"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.add(index_js_1.app.bsky.actor.getProfile, {
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.actor.getProfile.$lxm;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async (reqCtx) => {
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.app.bsky.actor.getProfile, getProfileMunge);
        },
    });
}
const getProfileMunge = async (localViewer, original, local, requester) => {
    if (!local.profile)
        return original;
    if (original.did !== requester)
        return original;
    return localViewer.updateProfileDetailed(original, local.profile.record);
};
//# sourceMappingURL=getProfile.js.map