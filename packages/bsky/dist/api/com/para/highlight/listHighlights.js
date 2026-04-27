"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.highlight.listHighlights({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await listHighlights({ ctx, params });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const listHighlights = async (inputs) => {
    const { ctx, params } = inputs;
    if ((0, util_2.clearlyBadCursor)(params.cursor)) {
        return { highlights: [] };
    }
    const res = await ctx.dataplane.getParaHighlights({
        community: params.community ?? '',
        state: params.state ?? '',
        subjectUri: params.subject ?? '',
        creator: params.creator ?? '',
        limit: params.limit,
        cursor: params.cursor ?? '',
    });
    return {
        highlights: res.items.map(mapHighlightView),
        cursor: (0, util_1.parseString)(res.cursor),
    };
};
const mapHighlightView = (view) => ({
    uri: view.uri,
    cid: parseCidOrThrow(view.cid),
    creator: view.creator,
    indexedAt: view.indexedAt,
    subjectUri: view.subjectUri,
    subjectCid: (0, util_1.parseString)(view.subjectCid),
    text: view.text,
    start: view.start,
    end: view.end,
    color: view.color,
    tag: (0, util_1.parseString)(view.tag),
    community: (0, util_1.parseString)(view.community),
    state: (0, util_1.parseString)(view.state),
    party: (0, util_1.parseString)(view.party),
    visibility: view.visibility,
    createdAt: view.createdAt,
});
const parseCidOrThrow = (cidStr) => {
    const cid = (0, util_1.parseCid)(cidStr);
    if (!cid) {
        throw new Error(`Invalid CID in highlight view: ${cidStr}`);
    }
    return cid;
};
//# sourceMappingURL=listHighlights.js.map