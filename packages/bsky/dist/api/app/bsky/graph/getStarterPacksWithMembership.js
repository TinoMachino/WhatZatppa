"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const hydrator_1 = require("../../../../hydration/hydrator");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const getStarterPacksWithMembership = (0, pipeline_1.createPipeline)(skeleton, hydration, pipeline_1.noRules, presentation);
    server.add(index_js_1.app.bsky.graph.getStarterPacksWithMembership, {
        auth: ctx.authVerifier.standard,
        handler: async ({ params, auth, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
            });
            const result = await getStarterPacksWithMembership({ ...params, hydrateCtx }, ctx);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
            };
        },
    });
}
const skeleton = async (input) => {
    const { ctx, params } = input;
    const [actorDid] = await ctx.hydrator.actor.getDids([params.actor]);
    if (!actorDid)
        throw new xrpc_server_1.InvalidRequestError('Profile not found');
    if ((0, util_1.clearlyBadCursor)(params.cursor)) {
        return { actorDid, starterPackUris: [] };
    }
    const { uris: starterPackUris, cursor } = await ctx.hydrator.dataplane.getActorStarterPacks({
        actorDid: params.hydrateCtx.viewer,
        cursor: params.cursor,
        limit: params.limit,
    });
    return {
        actorDid,
        starterPackUris: starterPackUris,
        cursor: cursor || undefined,
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { actorDid, starterPackUris } = skeleton;
    const spHydrationState = await ctx.hydrator.hydrateStarterPacks(starterPackUris, params.hydrateCtx);
    const listUris = (0, common_1.mapDefined)(starterPackUris, (uri) => spHydrationState.starterPacks?.get(uri)?.record.list);
    const listMembershipHydrationState = await ctx.hydrator.hydrateListsMembership(listUris, actorDid, params.hydrateCtx);
    return (0, hydrator_1.mergeManyStates)(spHydrationState, listMembershipHydrationState);
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    const { actorDid, starterPackUris, cursor } = skeleton;
    const starterPacksWithMembership = (0, common_1.mapDefined)(starterPackUris, (spUri) => {
        const listUri = hydration.starterPacks?.get(spUri)?.record.list;
        const starterPack = ctx.views.starterPack(spUri, hydration);
        if (!listUri || !starterPack)
            return;
        const listItemUri = hydration.listMemberships
            ?.get(listUri)
            ?.get(actorDid)?.actorListItemUri;
        return {
            starterPack,
            listItem: listItemUri
                ? ctx.views.listItemView(listItemUri, actorDid, hydration)
                : undefined,
        };
    });
    return { starterPacksWithMembership, cursor };
};
//# sourceMappingURL=getStarterPacksWithMembership.js.map