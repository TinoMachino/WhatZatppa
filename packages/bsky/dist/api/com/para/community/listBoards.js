"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.community.listBoards({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await listBoards({
                ctx,
                params,
                viewer: viewer ?? undefined,
            });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const listBoards = async ({ ctx, params, viewer, }) => {
    const res = await ctx.dataplane.getParaCommunityBoards({
        viewerDid: viewer ?? '',
        limit: normalizeLimit(params.limit),
        cursor: params.cursor ?? '',
        query: params.query ?? '',
        state: params.state ?? '',
        participationKind: params.participationKind ?? '',
        flairId: params.flairId ?? '',
        sort: params.sort ?? '',
        quadrant: params.quadrant,
    });
    return {
        boards: res.boards.map((board) => ({
            uri: board.uri,
            cid: board.cid,
            creatorDid: board.creatorDid,
            creatorHandle: (0, util_1.parseString)(board.creatorHandle),
            creatorDisplayName: (0, util_1.parseString)(board.creatorDisplayName),
            communityId: board.communityId,
            slug: board.slug,
            name: board.name,
            description: (0, util_1.parseString)(board.description),
            quadrant: board.quadrant,
            delegatesChatId: board.delegatesChatId,
            subdelegatesChatId: board.subdelegatesChatId,
            memberCount: board.memberCount,
            viewerMembershipState: ((0, util_1.parseString)(board.viewerMembershipState) ??
                'none'),
            viewerRoles: board.viewerRoles.length ? board.viewerRoles : undefined,
            status: (0, util_1.parseString)(board.status),
            founderStarterPackUri: (0, util_1.parseString)(board.founderStarterPackUri),
            createdAt: board.createdAt,
            governanceSummary: board.governanceSummary
                ? {
                    moderatorCount: board.governanceSummary.moderatorCount,
                    officialCount: board.governanceSummary.officialCount,
                    deputyRoleCount: board.governanceSummary.deputyRoleCount,
                    lastPublishedAt: (0, util_1.parseString)(board.governanceSummary.lastPublishedAt),
                }
                : undefined,
        })),
        canCreateCommunity: true,
        cursor: (0, util_1.parseString)(res.cursor),
    };
};
const normalizeLimit = (limit) => {
    if (!limit || Number.isNaN(limit))
        return 50;
    return Math.max(1, Math.min(limit, 100));
};
//# sourceMappingURL=listBoards.js.map