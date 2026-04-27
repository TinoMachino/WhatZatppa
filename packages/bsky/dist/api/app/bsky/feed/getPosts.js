"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const uris_1 = require("../../../../util/uris");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const getPosts = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocks, presentation);
    server.add(index_js_1.app.bsky.feed.getPosts, {
        auth: ctx.authVerifier.standardOptionalParameterized({
            lxmCheck: (method) => {
                if (!method)
                    return false;
                return (method === index_js_1.app.bsky.feed.getPosts.$lxm ||
                    method.startsWith('chat.bsky.'));
            },
        }),
        opts: {
            // @TODO remove after grace period has passed, behavior is non-standard.
            // temporarily added for compat w/ previous version of xrpc-server to avoid breakage of a few specified parties.
            paramsParseLoose: true,
        },
        handler: async ({ params, auth, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({ labelers, viewer });
            const results = await getPosts({ ...params, hydrateCtx }, ctx);
            return {
                encoding: 'application/json',
                body: results,
                headers: (0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
            };
        },
    });
}
const skeleton = async (inputs) => {
    return { posts: (0, common_1.dedupeStrs)(inputs.params.uris) };
};
const hydration = async (inputs) => {
    const { ctx, params, skeleton } = inputs;
    return ctx.hydrator.hydratePosts(skeleton.posts.map((uri) => ({ uri })), params.hydrateCtx);
};
const noBlocks = (inputs) => {
    const { ctx, skeleton, hydration } = inputs;
    skeleton.posts = skeleton.posts.filter((uri) => {
        const creator = (0, uris_1.uriToDid)(uri);
        return !ctx.views.viewerBlockExists(creator, hydration);
    });
    return skeleton;
};
const presentation = (inputs) => {
    const { ctx, skeleton, hydration } = inputs;
    const posts = (0, common_1.mapDefined)(skeleton.posts, (uri) => ctx.views.post(uri, hydration));
    return { posts };
};
//# sourceMappingURL=getPosts.js.map