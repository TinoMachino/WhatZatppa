"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.actor.getProfileStats({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer, includeTakedowns } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
            });
            const result = await getProfileStats({
                ctx,
                params: { ...params, hydrateCtx },
            });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({
                    repoRev,
                    labelers: hydrateCtx.labelers,
                }),
            };
        },
    });
}
const getProfileStats = async (inputs) => {
    const { ctx, params } = inputs;
    const [did] = await ctx.hydrator.actor.getDids([params.actor]);
    if (!did) {
        throw new xrpc_server_1.InvalidRequestError('Profile not found', 'NotFound');
    }
    const actors = await ctx.hydrator.actor.getActors([did], {
        includeTakedowns: params.hydrateCtx.includeTakedowns,
        skipCacheForDids: params.hydrateCtx.skipCacheForViewer,
    });
    const actor = actors.get(did);
    if (!actor) {
        throw new xrpc_server_1.InvalidRequestError('Profile not found', 'NotFound');
    }
    const profileViewerState = await ctx.hydrator.hydrateProfileViewers([actor.did], params.hydrateCtx);
    const relationship = profileViewerState.profileViewers?.get(actor.did);
    if (relationship &&
        (relationship.blocking ||
            ctx.views.blockingByList(relationship, profileViewerState))) {
        throw new xrpc_server_1.InvalidRequestError(`Requester has blocked actor: ${actor.did}`, 'BlockedActor');
    }
    if (relationship &&
        (relationship.blockedBy ||
            ctx.views.blockedByList(relationship, profileViewerState))) {
        throw new xrpc_server_1.InvalidRequestError(`Requester is blocked by actor: ${actor.did}`, 'BlockedByActor');
    }
    const res = await ctx.dataplane.getParaProfileStats({ actorDid: did });
    const computedAt = (0, util_1.parseString)(res.stats?.computedAt) ?? new Date().toISOString();
    return {
        actor: did,
        stats: {
            influence: res.stats?.influence ?? 0,
            votesReceivedAllTime: res.stats?.votesReceivedAllTime ?? 0,
            votesCastAllTime: res.stats?.votesCastAllTime ?? 0,
            contributions: {
                policies: res.stats?.contributions?.policies ?? 0,
                matters: res.stats?.contributions?.matters ?? 0,
                comments: res.stats?.contributions?.comments ?? 0,
            },
            activeIn: res.stats?.activeIn ?? [],
            computedAt,
        },
        status: res.status
            ? {
                status: res.status.status,
                party: (0, util_1.parseString)(res.status.party),
                community: (0, util_1.parseString)(res.status.community),
                createdAt: res.status.createdAt,
            }
            : undefined,
    };
};
//# sourceMappingURL=getProfileStats.js.map