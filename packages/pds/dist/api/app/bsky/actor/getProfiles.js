"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.add(index_js_1.app.bsky.actor.getProfiles, {
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = index_js_1.app.bsky.actor.getProfiles.$lxm;
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
            return (0, read_after_write_1.pipethroughReadAfterWrite)(ctx, reqCtx, index_js_1.app.bsky.actor.getProfiles, getProfilesMunge);
        },
    });
}
const getProfilesMunge = async (localViewer, original, local, requester) => {
    const localProf = local.profile;
    if (!localProf)
        return original;
    const profiles = original.profiles.map((prof) => {
        if (prof.did !== requester)
            return prof;
        return localViewer.updateProfileDetailed(prof, localProf.record);
    });
    return {
        ...original,
        profiles,
    };
};
//# sourceMappingURL=getProfiles.js.map