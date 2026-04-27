"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const hydrator_1 = require("../../../../hydration/hydrator");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
function default_1(server, ctx) {
    const getSuggestedUsers = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocksOrFollows, presentation);
    server.add(index_js_1.app.bsky.unspecced.getSuggestedUsers, {
        auth: ctx.authVerifier.standardOptional,
        handler: async ({ auth, params, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                features: ctx.featureGatesClient.scope(ctx.featureGatesClient.parseUserContextFromHandler({
                    viewer,
                    req,
                })),
            });
            const headers = (0, common_1.noUndefinedVals)({
                'accept-language': req.headers['accept-language'],
                'x-bsky-topics': Array.isArray(req.headers['x-bsky-topics'])
                    ? req.headers['x-bsky-topics'].join(',')
                    : req.headers['x-bsky-topics'],
            });
            const result = await getSuggestedUsers({
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
// TODO: rename to `skeleton` once we can fully migrate to Discover
const skeletonFromDiscover = async (input) => {
    const { params, ctx } = input;
    if (!ctx.suggestionsClient) {
        throw new xrpc_server_1.MethodNotImplementedError('Suggestions agent not available');
    }
    return ctx.suggestionsClient.call(index_js_1.app.bsky.unspecced.getSuggestedUsersSkeleton, {
        limit: params.limit,
        category: params.category,
        viewer: params.hydrateCtx.viewer ?? undefined,
    }, {
        headers: params.headers,
    });
};
const skeletonFromTopics = async (input) => {
    const { params, ctx } = input;
    if (!ctx.topicsClient) {
        // Use 501 instead of 500 as these are not considered retry-able by clients
        throw new xrpc_server_1.MethodNotImplementedError('Topics agent not available');
    }
    return ctx.topicsClient.call(index_js_1.app.bsky.unspecced.getSuggestedUsersSkeleton, {
        limit: params.limit,
        category: params.category,
        viewer: params.hydrateCtx.viewer ?? undefined,
    }, {
        headers: params.headers,
    });
};
const skeleton = async (input) => {
    const useDiscover = input.params.hydrateCtx.features.checkGate(input.params.hydrateCtx.features.Gate.SuggestedUsersDiscoverEnable);
    const skeletonFn = useDiscover ? skeletonFromDiscover : skeletonFromTopics;
    return skeletonFn(input);
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const dids = (0, common_1.dedupeStrs)(skeleton.dids);
    const pairs = new Map();
    const viewer = params.hydrateCtx.viewer;
    if (viewer) {
        pairs.set(viewer, dids);
    }
    const [profilesState, bidirectionalBlocks] = await Promise.all([
        ctx.hydrator.hydrateProfiles(dids, params.hydrateCtx),
        ctx.hydrator.hydrateBidirectionalBlocks(pairs, params.hydrateCtx),
    ]);
    return (0, hydrator_1.mergeManyStates)(profilesState, { bidirectionalBlocks });
};
const noBlocksOrFollows = (input) => {
    const { ctx, skeleton, params, hydration } = input;
    const viewer = params.hydrateCtx.viewer;
    if (!viewer) {
        return skeleton;
    }
    const blocks = hydration.bidirectionalBlocks?.get(viewer);
    return {
        ...skeleton,
        dids: skeleton.dids.filter((did) => {
            const viewer = ctx.views.profileViewer(did, hydration);
            return !blocks?.get(did) && !viewer?.following;
        }),
    };
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    return {
        recId: skeleton.recId,
        recIdStr: skeleton.recIdStr,
        actors: (0, common_1.mapDefined)(skeleton.dids, (did) => ctx.views.profile(did, hydration)),
    };
};
//# sourceMappingURL=getSuggestedUsers.js.map