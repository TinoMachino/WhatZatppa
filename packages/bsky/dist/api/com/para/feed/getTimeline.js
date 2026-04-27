"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.feed.getTimeline({
        auth: ctx.authVerifier.standard,
        handler: async ({ params, auth, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({ labelers, viewer });
            const result = await getTimeline({
                ctx,
                params: { ...params, hydrateCtx: hydrateCtx.copy({ viewer }) },
            });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({ labelers: hydrateCtx.labelers, repoRev }),
            };
        },
    });
}
const getTimeline = async (inputs) => {
    const { ctx, params } = inputs;
    if ((0, util_2.clearlyBadCursor)(params.cursor)) {
        return { feed: [] };
    }
    const res = await ctx.dataplane.getParaTimeline({
        actorDid: params.hydrateCtx.viewer,
        limit: params.limit,
        cursor: params.cursor,
    });
    const authors = [...new Set(res.items.map((item) => item.author))];
    const hydration = await ctx.hydrator.hydrateProfileViewers(authors, params.hydrateCtx);
    return {
        feed: res.items
            .filter((item) => !shouldHide(item.author, ctx.views, hydration))
            .map((item) => ({
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
const shouldHide = (authorDid, views, hydration) => {
    return (views.viewerBlockExists(authorDid, hydration) ||
        views.viewerMuteExists(authorDid, hydration));
};
//# sourceMappingURL=getTimeline.js.map