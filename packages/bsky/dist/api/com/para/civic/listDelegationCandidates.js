"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const data_plane_1 = require("../../../../data-plane");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.civic.listDelegationCandidates({
        auth: ctx.authVerifier.standardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await listDelegationCandidates({
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
const listDelegationCandidates = async ({ ctx, params, viewer, viewerIsAdmin, }) => {
    const res = await ctx.dataplane
        .getParaDelegationCandidates({
        cabildeoUri: params.cabildeo,
        communityId: params.communityId ?? '',
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
        candidates: res.candidates.map((candidate) => ({
            did: candidate.did,
            handle: (0, util_1.parseString)(candidate.handle),
            displayName: (0, util_1.parseString)(candidate.displayName),
            avatar: (0, util_1.parseString)(candidate.avatar),
            description: (0, util_1.parseString)(candidate.description),
            roles: candidate.roles.length ? candidate.roles : undefined,
            activeDelegationCount: candidate.activeDelegationCount,
            hasVoted: candidate.hasVoted,
            votedAt: (0, util_1.parseString)(candidate.votedAt),
            selectedOption: candidate.selectedOption,
        })),
        cursor: (0, util_1.parseString)(res.cursor),
    };
};
const normalizeLimit = (limit) => {
    if (!limit || Number.isNaN(limit))
        return 50;
    return Math.max(1, Math.min(limit, 100));
};
//# sourceMappingURL=listDelegationCandidates.js.map