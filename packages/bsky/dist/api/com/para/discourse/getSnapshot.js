"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.discourse.getSnapshot({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await getDiscourseSnapshot({
                ctx,
                params,
            });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_1.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const getDiscourseSnapshot = async (inputs) => {
    const { ctx, params } = inputs;
    const res = await ctx.dataplane.getParaDiscourseSnapshot({
        community: params.community ?? '',
        timeframe: params.timeframe,
    });
    return {
        snapshots: res.snapshots.map((s) => ({
            community: s.community,
            bucket: s.bucket,
            postCount: s.postCount,
            uniqueAuthors: s.uniqueAuthors,
            avgConstructiveness: Math.round(s.avgConstructiveness * 100),
            semanticVolatility: Math.round(s.semanticVolatility * 100),
            lexicalDiversity: Math.round(s.lexicalDiversity * 100),
            polarizationDelta: Math.round(s.polarizationDelta * 100),
            echoChamberIndex: Math.round(s.echoChamberIndex * 100),
            topKeywords: s.topKeywords,
            sentimentDistribution: s.sentimentDistribution,
        })),
    };
};
//# sourceMappingURL=getSnapshot.js.map