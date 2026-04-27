"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const data_plane_1 = require("../../../../data-plane");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const uris_1 = require("../../../../util/uris");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const getPostThread = (0, pipeline_1.createPipeline)(skeleton, hydration, pipeline_1.noRules, // handled in presentation: 3p block-violating replies are turned to #blockedPost, viewer blocks turned to #notFoundPost.
    presentation);
    server.add(index_js_1.app.bsky.unspecced.getPostThreadV2, {
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer, includeTakedowns, include3pBlocks, skipViewerBlocks } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const features = ctx.featureGatesClient.scope(ctx.featureGatesClient.parseUserContextFromHandler({
                viewer,
                req,
            }));
            // temp
            void features.checkGate(features.Gate.AATest);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
                include3pBlocks,
                skipViewerBlocks,
                features,
            });
            return {
                encoding: 'application/json',
                body: await getPostThread({ ...params, hydrateCtx }, ctx),
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
            above: calculateAbove(ctx, params),
            below: calculateBelow(ctx, anchor, params),
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
    const { ctx, params, skeleton, hydration } = inputs;
    const { hasOtherReplies, thread } = ctx.views.threadV2(skeleton, hydration, {
        above: calculateAbove(ctx, params),
        below: calculateBelow(ctx, skeleton.anchor, params),
        branchingFactor: params.branchingFactor,
        sort: params.sort,
    });
    const rootUri = hydration.posts?.get(skeleton.anchor)?.record.reply?.root.uri ??
        skeleton.anchor;
    const threadgate = ctx.views.threadgate((0, uris_1.postUriToThreadgateUri)(rootUri), hydration);
    return { hasOtherReplies, thread, threadgate };
};
const calculateAbove = (ctx, params) => {
    return params.above ? ctx.cfg.maxThreadParents : 0;
};
const calculateBelow = (ctx, anchor, params) => {
    let maxDepth = ctx.cfg.maxThreadDepth;
    if (ctx.cfg.bigThreadUris.has(anchor) && ctx.cfg.bigThreadDepth) {
        maxDepth = ctx.cfg.bigThreadDepth;
    }
    return maxDepth ? Math.min(maxDepth, params.below) : params.below;
};
//# sourceMappingURL=getPostThreadV2.js.map