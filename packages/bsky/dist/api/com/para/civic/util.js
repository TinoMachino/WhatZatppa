"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVisibleParticipantDids = void 0;
const getVisibleParticipantDids = async (opts) => {
    const { ctx, dids, viewer, labelers } = opts;
    if (!dids.length)
        return new Set();
    const hydrateCtx = await ctx.hydrator.createContext({
        viewer: viewer ?? null,
        labelers,
    });
    const hydration = await ctx.hydrator.hydrateProfilesBasic(dids, hydrateCtx);
    return dids.reduce((acc, did) => {
        if (!ctx.views.profileBasic(did, hydration)) {
            return acc;
        }
        if (ctx.views.viewerBlockExists(did, hydration)) {
            return acc;
        }
        if (ctx.views.actorIsNoHosted(did, hydration)) {
            return acc;
        }
        acc.add(did);
        return acc;
    }, new Set());
};
exports.getVisibleParticipantDids = getVisibleParticipantDids;
//# sourceMappingURL=util.js.map