"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const getBookmarks = (0, pipeline_1.createPipeline)(skeleton, hydration, pipeline_1.noRules, // Blocks are included and handled on views. Mutes are included.
    presentation);
    server.add(index_js_1.app.bsky.bookmark.getBookmarks, {
        auth: ctx.authVerifier.standard,
        handler: async ({ params, auth, req }) => {
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
            });
            const result = await getBookmarks({ ...params, hydrateCtx }, ctx);
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
    const { bookmarks, cursor } = await ctx.hydrator.dataplane.getActorBookmarks({
        actorDid: params.hydrateCtx.viewer,
        limit: params.limit,
        cursor: params.cursor,
    });
    return {
        actorDid,
        bookmarkInfos: bookmarks,
        cursor: cursor || undefined,
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { bookmarkInfos } = skeleton;
    return ctx.hydrator.hydrateBookmarks(bookmarkInfos, params.hydrateCtx);
};
const presentation = (input) => {
    const { ctx, hydration, skeleton } = input;
    const { bookmarkInfos, cursor } = skeleton;
    const bookmarkViews = (0, common_1.mapDefined)(bookmarkInfos, (bookmarkInfo) => ctx.views.bookmark(bookmarkInfo.key, hydration));
    return { bookmarks: bookmarkViews, cursor };
};
//# sourceMappingURL=getBookmarks.js.map