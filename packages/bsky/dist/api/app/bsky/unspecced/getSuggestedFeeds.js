"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
function default_1(server, ctx) {
    const getFeeds = (0, pipeline_1.createPipeline)(skeleton, hydration, pipeline_1.noRules, presentation);
    server.add(index_js_1.app.bsky.unspecced.getSuggestedFeeds, {
        auth: ctx.authVerifier.standardOptional,
        handler: async ({ auth, params, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({ labelers, viewer });
            const headers = (0, common_1.noUndefinedVals)({
                'accept-language': req.headers['accept-language'],
                'x-bsky-topics': Array.isArray(req.headers['x-bsky-topics'])
                    ? req.headers['x-bsky-topics'].join(',')
                    : req.headers['x-bsky-topics'],
            });
            const result = await getFeeds({
                ...params,
                hydrateCtx,
                headers,
            }, ctx);
            return {
                encoding: 'application/json',
                body: result,
            };
        },
    });
}
const skeleton = async (input) => {
    const { params, ctx } = input;
    if (!ctx.topicsClient) {
        // Use 501 instead of 500 as these are not considered retry-able by clients
        throw new xrpc_server_1.MethodNotImplementedError('Topics agent not available');
    }
    return ctx.topicsClient.call(index_js_1.app.bsky.unspecced.getSuggestedFeedsSkeleton, {
        limit: params.limit,
        viewer: params.hydrateCtx.viewer ?? undefined,
    }, {
        headers: params.headers,
    });
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    return await ctx.hydrator.hydrateFeedGens(skeleton.feeds, params.hydrateCtx);
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    return {
        feeds: (0, common_1.mapDefined)(skeleton.feeds, (uri) => ctx.views.feedGenerator(uri, hydration)),
    };
};
//# sourceMappingURL=getSuggestedFeeds.js.map