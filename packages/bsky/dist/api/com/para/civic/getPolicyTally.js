"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.civic.getPolicyTally({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const res = await ctx.dataplane.getParaPolicyTally({
                postUri: params.post,
            });
            if (!res.tally) {
                throw new xrpc_server_1.InvalidRequestError('Policy tally not found', 'NotFound');
            }
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: {
                    tally: {
                        subject: res.tally.subject,
                        subjectType: (0, util_1.parseString)(res.tally.subjectType) || 'policy',
                        community: (0, util_1.parseString)(res.tally.community) || '',
                        voteCount: res.tally.voteCount,
                        directVoteCount: res.tally.directVoteCount,
                        delegatedVoteCount: res.tally.delegatedVoteCount,
                        signalSum: res.tally.signalSum,
                        signalAverage: formatSignalAverage(res.tally.signalAverage),
                        eligibleVoterCount: res.tally.eligibleVoterCount,
                        quorumTarget: res.tally.quorumTarget,
                        quorumMet: res.tally.quorumMet,
                        official: res.tally.official,
                        certified: res.tally.certified,
                        outcome: (0, util_1.parseString)(res.tally.outcome) || 'insufficient_quorum',
                        state: (0, util_1.parseString)(res.tally.state) || 'draft',
                        breakdown: res.tally.breakdown.map((bucket) => ({
                            signal: bucket.signal,
                            count: bucket.count,
                        })),
                        computedAt: (0, util_1.parseString)(res.tally.computedAt),
                    },
                },
                headers: (0, util_2.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const formatSignalAverage = (value) => {
    if (typeof value !== 'number' || Number.isNaN(value)) {
        return '0';
    }
    const fixed = value.toFixed(4);
    return fixed.replace(/\.?0+$/, '');
};
//# sourceMappingURL=getPolicyTally.js.map