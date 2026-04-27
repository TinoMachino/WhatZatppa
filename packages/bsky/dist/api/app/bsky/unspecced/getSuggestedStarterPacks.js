"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const hydrator_1 = require("../../../../hydration/hydrator");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
function default_1(server, ctx) {
    const getSuggestedStarterPacks = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocks, presentation);
    server.add(index_js_1.app.bsky.unspecced.getSuggestedStarterPacks, {
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
            const result = await getSuggestedStarterPacks({
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
    const skeleton = await ctx.topicsClient.call(index_js_1.app.bsky.unspecced.getSuggestedStarterPacksSkeleton, {
        limit: params.limit,
        viewer: params.hydrateCtx.viewer ?? undefined,
    }, {
        headers: params.headers,
    });
    // @TODO Make sure upstream always provides this
    skeleton.starterPacks ?? (skeleton.starterPacks = []);
    return skeleton;
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const pairs = new Map();
    const viewer = params.hydrateCtx.viewer;
    if (viewer) {
        pairs.set(viewer, getUniqueDidsFromStarterPacks(skeleton.starterPacks));
    }
    const [starterPacksState, bidirectionalBlocks] = await Promise.all([
        ctx.hydrator.hydrateStarterPacks(skeleton.starterPacks, params.hydrateCtx),
        ctx.hydrator.hydrateBidirectionalBlocks(pairs, params.hydrateCtx),
    ]);
    return (0, hydrator_1.mergeManyStates)(starterPacksState, { bidirectionalBlocks });
};
const noBlocks = (input) => {
    const { skeleton, params, hydration } = input;
    const viewer = params.hydrateCtx.viewer;
    if (!viewer) {
        return skeleton;
    }
    const blocks = hydration.bidirectionalBlocks?.get(viewer);
    const filteredSkeleton = {
        starterPacks: skeleton.starterPacks.filter((uri) => {
            try {
                return !blocks?.get(new syntax_1.AtUri(uri).did);
            }
            catch {
                return false;
            }
        }),
    };
    return filteredSkeleton;
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    return {
        starterPacks: (0, common_1.mapDefined)(skeleton.starterPacks, (uri) => ctx.views.starterPack(uri, hydration)),
    };
};
function getUniqueDidsFromStarterPacks(starterPacks) {
    if (!starterPacks)
        return [];
    const dids = new Set();
    for (const uri of starterPacks) {
        try {
            dids.add(new syntax_1.AtUri(uri).did);
        }
        catch {
            continue;
        }
    }
    return Array.from(dids);
}
//# sourceMappingURL=getSuggestedStarterPacks.js.map