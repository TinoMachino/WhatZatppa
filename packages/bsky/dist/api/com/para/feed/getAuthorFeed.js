"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.feed.getAuthorFeed({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer, includeTakedowns } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
            });
            const result = await getAuthorFeed({
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
const getAuthorFeed = async (inputs) => {
    const { ctx, params } = inputs;
    const [did] = await ctx.hydrator.actor.getDids([params.actor]);
    if (!did) {
        throw new xrpc_server_1.InvalidRequestError('Profile not found');
    }
    const actors = await ctx.hydrator.actor.getActors([did], {
        includeTakedowns: params.hydrateCtx.includeTakedowns,
        skipCacheForDids: params.hydrateCtx.skipCacheForViewer,
    });
    const actor = actors.get(did);
    if (!actor) {
        throw new xrpc_server_1.InvalidRequestError('Profile not found');
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
    if ((0, util_2.clearlyBadCursor)(params.cursor)) {
        return { feed: [] };
    }
    const res = await ctx.dataplane.getParaAuthorFeed({
        actorDid: did,
        limit: params.limit,
        cursor: params.cursor,
    });
    return {
        feed: res.items.map((item) => ({
            uri: item.uri,
            cid: item.cid,
            author: item.author,
            text: item.text,
            createdAt: item.createdAt,
            replyRoot: (0, util_1.parseString)(item.replyRoot),
            replyParent: (0, util_1.parseString)(item.replyParent),
            langs: item.langs.length ? item.langs : undefined,
            tags: item.tags.length ? item.tags : undefined,
            flairs: item.flairs.length ? item.flairs : undefined,
            postType: (0, util_1.parseString)(item.postType),
        })),
        cursor: (0, util_1.parseString)(res.cursor),
    };
};
//# sourceMappingURL=getAuthorFeed.js.map