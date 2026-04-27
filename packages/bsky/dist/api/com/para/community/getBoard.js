"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
const CREATE_COMMUNITY_CAPABILITY = 'create_community';
const JOIN_COMMUNITY_CAPABILITY = 'join_community';
const LEAVE_COMMUNITY_CAPABILITY = 'leave_community';
const MANAGE_GOVERNANCE_CAPABILITY = 'manage_governance';
function default_1(server, ctx) {
    server.com.para.community.getBoard({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await getBoard({ ctx, params, viewer: viewer ?? undefined });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const getBoard = async ({ ctx, params, viewer, }) => {
    const res = await ctx.dataplane.getParaCommunityBoard({
        communityId: params.communityId ?? '',
        uri: params.uri ?? '',
        viewerDid: viewer ?? '',
    });
    if (!res.board) {
        throw new xrpc_server_1.InvalidRequestError('Community not found', 'NotFound');
    }
    const board = mapBoardView(res.board, res.governanceSummary);
    return {
        board,
        viewerCapabilities: getViewerCapabilities({
            viewer,
            creatorDid: res.board.creatorDid,
            viewerRoles: res.board.viewerRoles,
            viewerMembershipState: res.board.viewerMembershipState || 'none',
            canCreateCommunity: true,
        }),
    };
};
const mapBoardView = (board, governanceSummary) => ({
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
    governanceSummary: governanceSummary
        ? {
            moderatorCount: governanceSummary.moderatorCount,
            officialCount: governanceSummary.officialCount,
            deputyRoleCount: governanceSummary.deputyRoleCount,
            lastPublishedAt: (0, util_1.parseString)(governanceSummary.lastPublishedAt),
        }
        : undefined,
});
const getViewerCapabilities = ({ viewer, creatorDid, viewerRoles, viewerMembershipState, canCreateCommunity, }) => {
    const capabilities = [];
    if (canCreateCommunity) {
        capabilities.push(CREATE_COMMUNITY_CAPABILITY);
    }
    if (viewer &&
        (viewerMembershipState === 'none' || viewerMembershipState === 'left')) {
        capabilities.push(JOIN_COMMUNITY_CAPABILITY);
    }
    if (viewer && viewerMembershipState === 'active') {
        capabilities.push(LEAVE_COMMUNITY_CAPABILITY);
    }
    if (viewer &&
        (viewer === creatorDid ||
            viewerRoles.includes('owner') ||
            viewerRoles.includes('moderator'))) {
        capabilities.push(MANAGE_GOVERNANCE_CAPABILITY);
    }
    return capabilities;
};
//# sourceMappingURL=getBoard.js.map