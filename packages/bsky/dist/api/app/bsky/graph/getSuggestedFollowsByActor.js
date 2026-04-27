"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const getSuggestedFollowsByActor = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocksOrMutes, presentation);
    server.add(index_js_1.app.bsky.graph.getSuggestedFollowsByActor, {
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
            if (!ctx.suggestionsClient) {
                return {
                    encoding: 'application/json',
                    body: { suggestions: [] },
                    headers: (0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
                };
            }
            const headers = (0, common_1.noUndefinedVals)({
                'accept-language': req.headers['accept-language'],
                'x-bsky-topics': Array.isArray(req.headers['x-bsky-topics'])
                    ? req.headers['x-bsky-topics'].join(',')
                    : req.headers['x-bsky-topics'],
            });
            const { contentLanguage, ...body } = await getSuggestedFollowsByActor({ ...params, hydrateCtx, headers }, ctx);
            return {
                encoding: 'application/json',
                body,
                headers: {
                    ...(contentLanguage ? { 'content-language': contentLanguage } : null),
                    ...(0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
                },
            };
        },
    });
}
const skeleton = async (input) => {
    const { params, ctx } = input;
    // handled above already, this branch should not be reached
    if (!ctx.suggestionsClient) {
        throw new xrpc_server_1.InternalServerError('Suggestions service not configured');
    }
    const [relativeToDid] = await ctx.hydrator.actor.getDids([params.actor]);
    if (!relativeToDid) {
        throw new xrpc_server_1.InvalidRequestError('Actor not found');
    }
    const res = await ctx.suggestionsClient.xrpc(index_js_1.app.bsky.unspecced.getSuggestionsSkeleton, {
        params: {
            viewer: params.hydrateCtx.viewer ?? undefined,
            relativeToDid,
        },
        headers: params.headers,
    });
    return {
        recIdStr: res.body.recIdStr,
        suggestedDids: res.body.actors.map((a) => a.did),
        contentLanguage: res.headers.get('content-language') ?? undefined,
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { suggestedDids } = skeleton;
    if (params.hydrateCtx.features.checkGate(params.hydrateCtx.features.Gate.SuggestedUsersSocialProofEnable)) {
        return ctx.hydrator.hydrateProfilesDetailed(suggestedDids, params.hydrateCtx);
    }
    else {
        return ctx.hydrator.hydrateProfiles(suggestedDids, params.hydrateCtx);
    }
};
const noBlocksOrMutes = (input) => {
    const { ctx, skeleton, hydration } = input;
    skeleton.suggestedDids = skeleton.suggestedDids.filter((did) => !ctx.views.viewerBlockExists(did, hydration) &&
        !ctx.views.viewerMuteExists(did, hydration));
    return skeleton;
};
const presentation = (input) => {
    const { ctx, hydration, skeleton } = input;
    const { suggestedDids, contentLanguage } = skeleton;
    const suggestions = (0, common_1.mapDefined)(suggestedDids, (did) => ctx.views.profileKnownFollowers(did, hydration));
    return {
        recIdStr: skeleton.recIdStr,
        contentLanguage,
        suggestions,
    };
};
//# sourceMappingURL=getSuggestedFollowsByActor.js.map