"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const listActivitySubscriptions = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocks, presentation);
    server.add(index_js_1.app.bsky.notification.listActivitySubscriptions, {
        auth: ctx.authVerifier.standard,
        handler: async ({ params, auth, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
            });
            const result = await listActivitySubscriptions({ ...params, hydrateCtx }, ctx);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
            };
        },
    });
}
const skeleton = async (input) => {
    const { params, ctx } = input;
    const actorDid = params.hydrateCtx.viewer;
    if ((0, util_1.clearlyBadCursor)(params.cursor)) {
        return { actorDid, dids: [] };
    }
    const { dids, cursor } = await ctx.hydrator.dataplane.getActivitySubscriptionDids({
        actorDid: params.hydrateCtx.viewer,
        limit: params.limit,
        cursor: params.cursor,
    });
    return {
        actorDid,
        dids: dids,
        cursor: cursor || undefined,
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { dids } = skeleton;
    const state = await ctx.hydrator.hydrateProfilesDetailed(dids, params.hydrateCtx);
    return state;
};
const noBlocks = (input) => {
    const { skeleton, hydration, ctx } = input;
    skeleton.dids = skeleton.dids.filter((did) => !ctx.views.viewerBlockExists(did, hydration));
    return skeleton;
};
const presentation = (input) => {
    const { ctx, hydration, skeleton } = input;
    const { dids, cursor } = skeleton;
    const subscriptions = (0, common_1.mapDefined)(dids, (did) => {
        return ctx.views.profile(did, hydration);
    });
    return { subscriptions, cursor };
};
//# sourceMappingURL=listActivitySubscriptions.js.map