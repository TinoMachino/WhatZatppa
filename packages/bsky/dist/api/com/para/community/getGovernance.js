"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.community.getGovernance({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await getGovernance({ ctx, params });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const getGovernance = async (inputs) => {
    const { ctx, params } = inputs;
    const res = await ctx.dataplane.getParaCommunityGovernance({
        community: params.community,
        limit: params.limit ?? 50,
    });
    const computedAt = (0, util_1.parseString)(res.computedAt) ?? new Date().toISOString();
    return {
        source: 'network',
        community: res.community,
        communityId: (0, util_1.parseString)(params.communityId) ||
            normalizeCommunitySlug(res.community || params.community),
        slug: normalizeCommunitySlug(res.community || params.community),
        createdAt: computedAt,
        updatedAt: computedAt,
        moderators: res.moderators.map((moderator) => ({
            did: moderator.member?.did ?? '',
            handle: (0, util_1.parseString)(moderator.member?.handle),
            displayName: (0, util_1.parseString)(moderator.member?.displayName),
            avatar: (0, util_1.parseString)(moderator.member?.avatar),
            role: moderator.role,
            badge: moderator.badge,
            capabilities: [],
        })),
        officials: res.officials.map((official) => ({
            did: official.member?.did ?? '',
            handle: (0, util_1.parseString)(official.member?.handle),
            displayName: (0, util_1.parseString)(official.member?.displayName),
            avatar: (0, util_1.parseString)(official.member?.avatar),
            office: official.office,
            mandate: official.mandate,
        })),
        deputies: res.deputies.map((deputy) => ({
            key: normalizeCommunitySlug(deputy.role || 'deputy-role'),
            tier: deputy.tier,
            role: deputy.role,
            description: 'No public role description yet.',
            capabilities: [],
            activeHolder: {
                did: deputy.activeHolder?.did ?? '',
                handle: (0, util_1.parseString)(deputy.activeHolder?.handle),
                displayName: (0, util_1.parseString)(deputy.activeHolder?.displayName),
                avatar: (0, util_1.parseString)(deputy.activeHolder?.avatar),
            },
            activeSince: undefined,
            votes: deputy.votesBackingRole,
            applicants: deputy.applicants.map((applicant) => ({
                displayName: applicant,
                appliedAt: computedAt,
                status: 'applied',
            })),
        })),
        metadata: res.metadata
            ? {
                termLengthDays: res.metadata.termLengthDays || undefined,
                reviewCadence: (0, util_1.parseString)(res.metadata.reviewCadence),
                escalationPath: (0, util_1.parseString)(res.metadata.escalationPath),
                publicContact: (0, util_1.parseString)(res.metadata.publicContact),
                lastPublishedAt: (0, util_1.parseString)(res.metadata.lastPublishedAt),
                state: (0, util_1.parseString)(res.metadata.state),
                matterFlairIds: res.metadata.matterFlairIds.length
                    ? res.metadata.matterFlairIds
                    : undefined,
                policyFlairIds: res.metadata.policyFlairIds.length
                    ? res.metadata.policyFlairIds
                    : undefined,
            }
            : undefined,
        editHistory: res.editHistory.map((entry) => ({
            id: entry.id,
            action: entry.action,
            actorDid: (0, util_1.parseString)(entry.actorDid),
            actorHandle: (0, util_1.parseString)(entry.actorHandle),
            createdAt: (0, util_1.parseString)(entry.createdAt) || computedAt,
            summary: entry.summary,
        })),
        counters: {
            members: res.summary?.members ?? 0,
            visiblePosters: res.summary?.visiblePosters ?? 0,
            policyPosts: res.summary?.policyPosts ?? 0,
            matterPosts: res.summary?.matterPosts ?? 0,
            badgeHolders: res.summary?.badgeHolders ?? 0,
        },
        summary: {
            members: res.summary?.members ?? 0,
            visiblePosters: res.summary?.visiblePosters ?? 0,
            policyPosts: res.summary?.policyPosts ?? 0,
            matterPosts: res.summary?.matterPosts ?? 0,
            badgeHolders: res.summary?.badgeHolders ?? 0,
        },
        computedAt,
    };
};
const normalizeCommunitySlug = (community) => community
    .trim()
    .replace(/^p\//i, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
//# sourceMappingURL=getGovernance.js.map