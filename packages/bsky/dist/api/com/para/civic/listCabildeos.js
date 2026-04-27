"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../../hydration/util");
const util_2 = require("./util");
const util_3 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.civic.listCabildeos({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await listCabildeos({
                ctx,
                params,
                viewer: viewer ?? undefined,
                labelers,
            });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_3.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const listCabildeos = async (inputs) => {
    const { ctx, params, viewer, labelers } = inputs;
    if ((0, util_3.clearlyBadCursor)(params.cursor)) {
        return { cabildeos: [] };
    }
    const res = await ctx.dataplane.getParaCabildeos({
        community: params.community ?? '',
        phase: params.phase ?? '',
        limit: params.limit,
        cursor: params.cursor ?? '',
        viewerDid: viewer ?? '',
    });
    const cabildeos = res.items.map(mapCabildeoView);
    const previewDids = [...new Set(cabildeos.flatMap((item) => item.liveSession?.participantPreviewDids ?? []))];
    const visiblePreviewDids = await (0, util_2.getVisibleParticipantDids)({
        ctx,
        dids: previewDids,
        viewer,
        labelers,
    });
    return {
        cabildeos: cabildeos.map((item) => ({
            ...item,
            liveSession: item.liveSession
                ? {
                    ...item.liveSession,
                    participantPreviewDids: item.liveSession.participantPreviewDids.filter((did) => visiblePreviewDids.has(did)),
                }
                : undefined,
        })),
        cursor: (0, util_1.parseString)(res.cursor),
    };
};
const mapCabildeoView = (view) => ({
    uri: view.uri,
    cid: parseCidOrThrow(view.cid),
    creator: view.creator,
    indexedAt: view.indexedAt,
    title: view.title,
    description: view.description,
    community: view.community,
    communities: view.communities.length ? view.communities : undefined,
    flairs: view.flairs.length ? view.flairs : undefined,
    region: (0, util_1.parseString)(view.region),
    geoRestricted: view.geoRestricted,
    options: view.options.map((option) => ({
        label: option.label,
        description: (0, util_1.parseString)(option.description),
        isConsensus: option.isConsensus,
    })),
    minQuorum: view.minQuorum,
    phase: view.phase,
    phaseDeadline: (0, util_1.parseString)(view.phaseDeadline),
    createdAt: view.createdAt,
    optionSummary: view.optionSummary,
    positionCounts: {
        total: view.positionCounts?.total ?? 0,
        for: view.positionCounts?.forCount ?? 0,
        against: view.positionCounts?.againstCount ?? 0,
        amendment: view.positionCounts?.amendmentCount ?? 0,
        byOption: view.positionCounts?.byOption ?? [],
    },
    voteTotals: {
        total: view.voteTotals?.total ?? 0,
        direct: view.voteTotals?.direct ?? 0,
        delegated: view.voteTotals?.delegated ?? 0,
    },
    outcomeSummary: view.outcomeSummary
        ? {
            winningOption: view.outcomeSummary.winningOption,
            totalParticipants: view.outcomeSummary.totalParticipants,
            effectiveTotalPower: view.outcomeSummary.effectiveTotalPower,
            tie: view.outcomeSummary.tie,
            breakdown: view.outcomeSummary.breakdown,
        }
        : undefined,
    viewerContext: view.viewerContext
        ? {
            currentVoteOption: view.viewerContext.currentVoteOption,
            currentVoteIsDirect: view.viewerContext.currentVoteIsDirect,
            activeDelegation: (0, util_1.parseString)(view.viewerContext.activeDelegation),
            delegateHasVoted: view.viewerContext.delegateHasVoted,
            delegatedVoteOption: view.viewerContext.delegatedVoteOption,
            delegatedVotedAt: (0, util_1.parseString)(view.viewerContext.delegatedVotedAt),
            gracePeriodEndsAt: (0, util_1.parseString)(view.viewerContext.gracePeriodEndsAt),
            delegateVoteDismissed: view.viewerContext.delegateVoteDismissed,
        }
        : undefined,
    liveSession: view.liveSession
        ? {
            isLive: view.liveSession.isLive,
            hostDid: view.liveSession.hostDid,
            activeParticipantCount: view.liveSession.activeParticipantCount,
            startedAt: view.liveSession.startedAt,
            participantPreviewDids: view.liveSession.participantPreviewDids,
        }
        : undefined,
});
const parseCidOrThrow = (cidStr) => {
    const cid = (0, util_1.parseCid)(cidStr);
    if (!cid) {
        throw new Error(`Invalid CID in cabildeo view: ${cidStr}`);
    }
    return cid;
};
//# sourceMappingURL=listCabildeos.js.map