"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const data_plane_1 = require("../../../../data-plane");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.community.listMembers({
        auth: ctx.authVerifier.standardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await listMembers({
                ctx,
                params,
                viewer: viewer ?? '',
                viewerIsAdmin: auth.credentials.type === 'role' && auth.credentials.admin,
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
const listMembers = async ({ ctx, params, viewer, viewerIsAdmin, }) => {
    const res = await ctx.dataplane
        .getParaCommunityMembers({
        communityId: params.communityId,
        membershipState: params.membershipState ?? '',
        role: params.role ?? '',
        sort: params.sort ?? '',
        limit: normalizeLimit(params.limit),
        cursor: params.cursor ?? '',
        viewerDid: viewer,
        viewerIsAdmin,
    })
        .catch((err) => {
        if ((0, data_plane_1.isDataplaneError)(err, data_plane_1.Code.PermissionDenied)) {
            throw new xrpc_server_1.InvalidRequestError('Active community membership is required', 'CommunityMembershipRequired');
        }
        throw err;
    });
    return {
        members: res.members.map((member) => ({
            did: member.did,
            handle: (0, util_1.parseString)(member.handle),
            displayName: (0, util_1.parseString)(member.displayName),
            avatar: (0, util_1.parseString)(member.avatar),
            membershipState: member.membershipState,
            roles: member.roles.length ? member.roles : undefined,
            joinedAt: member.joinedAt,
            votesCast: member.votesCast,
            delegationsReceived: member.delegationsReceived,
            policyPosts: member.policyPosts,
            matterPosts: member.matterPosts,
        })),
        cursor: (0, util_1.parseString)(res.cursor),
    };
};
const normalizeLimit = (limit) => {
    if (!limit || Number.isNaN(limit))
        return 50;
    return Math.max(1, Math.min(limit, 100));
};
//# sourceMappingURL=listMembers.js.map