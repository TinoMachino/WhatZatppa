"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.discourse.getTopics({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await getDiscourseTopics({
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
const getDiscourseTopics = async (inputs) => {
    const { ctx, params } = inputs;
    const res = await ctx.dataplane.getParaDiscourseTopics({
        community: params.community ?? '',
        timeframe: params.timeframe,
    });
    return {
        topics: res.topics.map((t) => ({
            clusterLabel: t.clusterLabel,
            keywords: t.keywords,
            postCount: t.postCount,
            authorCount: t.authorCount,
            avgSentiment: Math.round(t.avgSentiment * 100),
        })),
    };
};
//# sourceMappingURL=getTopics.js.map