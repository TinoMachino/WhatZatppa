"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const hydrator_1 = require("../../../../hydration/hydrator");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
function default_1(server, ctx) {
    const getTrends = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocks, presentation);
    server.add(index_js_1.app.bsky.unspecced.getTrends, {
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
            const result = await getTrends({
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
    const skeleton = await ctx.topicsClient.call(index_js_1.app.bsky.unspecced.getTrendsSkeleton, {
        limit: params.limit,
        viewer: params.hydrateCtx.viewer ?? undefined,
    }, {
        headers: params.headers,
    });
    // @TODO Make sure upstream always provides this
    for (const trend of skeleton.trends)
        trend.dids ?? (trend.dids = []);
    return skeleton;
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const dids = getUniqueDidsFromTrends(skeleton.trends);
    const pairs = new Map();
    const viewer = params.hydrateCtx.viewer;
    if (viewer)
        pairs.set(viewer, dids);
    const [profileState, bidirectionalBlocks] = await Promise.all([
        ctx.hydrator.hydrateProfilesBasic(dids, params.hydrateCtx),
        ctx.hydrator.hydrateBidirectionalBlocks(pairs, params.hydrateCtx),
    ]);
    return (0, hydrator_1.mergeManyStates)(profileState, { bidirectionalBlocks });
};
const noBlocks = (input) => {
    const { skeleton, params, hydration } = input;
    const viewer = params.hydrateCtx.viewer;
    if (!viewer) {
        return skeleton;
    }
    const blocks = hydration.bidirectionalBlocks?.get(viewer);
    return {
        trends: skeleton.trends.map((t) => ({
            ...t,
            dids: t.dids.filter((did) => !blocks?.get(did)),
        })),
    };
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    return {
        trends: skeleton.trends.map((t) => ({
            topic: t.topic,
            displayName: t.displayName,
            link: t.link,
            startedAt: t.startedAt,
            postCount: t.postCount,
            status: t.status,
            category: t.category,
            actors: (0, common_1.mapDefined)(t.dids, (did) => ctx.views.profileBasic(did, hydration)),
        })),
    };
};
function getUniqueDidsFromTrends(trends) {
    if (!trends)
        return [];
    const dids = new Set();
    for (const trend of trends) {
        if (trend.dids) {
            for (const did of trend.dids) {
                dids.add(did);
            }
        }
    }
    return Array.from(dids);
}
//# sourceMappingURL=getTrends.js.map