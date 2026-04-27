"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const data_plane_1 = require("../../../../data-plane");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("../../../util");
// No parents for hidden replies (it would be the anchor post).
const ABOVE = 0;
// For hidden replies we don't get more than the top-level replies.
// To get nested replies, load the thread as one of the hidden replies as anchor.
const BELOW = 1;
// It doesn't really matter since BELOW is 1, so it will not be used.
const BRANCHING_FACTOR = 0;
function default_1(server, ctx) {
    const getPostThreadOther = (0, pipeline_1.createPipeline)(skeleton, hydration, pipeline_1.noRules, // handled in presentation: 3p block-violating replies are turned to #blockedPost, viewer blocks turned to #notFoundPost.
    presentation);
    server.add(index_js_1.app.bsky.unspecced.getPostThreadOtherV2, {
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer, includeTakedowns, include3pBlocks, skipViewerBlocks } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
                include3pBlocks,
                skipViewerBlocks,
            });
            return {
                encoding: 'application/json',
                body: await getPostThreadOther({ ...params, hydrateCtx }, ctx),
                headers: (0, util_1.resHeaders)({
                    labelers: hydrateCtx.labelers,
                }),
            };
        },
    });
}
const skeleton = async (inputs) => {
    const { ctx, params } = inputs;
    const anchor = await ctx.hydrator.resolveUri(params.anchor);
    try {
        const res = await ctx.dataplane.getThread({
            postUri: anchor,
            above: ABOVE,
            below: BELOW,
        });
        return {
            anchor,
            uris: res.uris,
        };
    }
    catch (err) {
        if ((0, data_plane_1.isDataplaneError)(err, data_plane_1.Code.NotFound)) {
            return {
                anchor,
                uris: [],
            };
        }
        else {
            throw err;
        }
    }
};
const hydration = async (inputs) => {
    const { ctx, params, skeleton } = inputs;
    return ctx.hydrator.hydrateThreadPosts(skeleton.uris.map((uri) => ({ uri })), params.hydrateCtx);
};
const presentation = (inputs) => {
    const { ctx, skeleton, hydration } = inputs;
    const thread = ctx.views.threadOtherV2(skeleton, hydration, {
        below: BELOW,
        branchingFactor: BRANCHING_FACTOR,
    });
    return { thread };
};
//# sourceMappingURL=getPostThreadOtherV2.js.map