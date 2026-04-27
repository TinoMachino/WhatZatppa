"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicon/lexicons");
const lexicons_2 = require("../../../../lexicons");
const repo_1 = require("../../../../repo");
const VOTE_COLLECTION = 'com.para.civic.vote';
const VOTING_PHASE = 'voting';
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.com.para.civic.castVote({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions) => {
                permissions.assertRepo({
                    action: 'create',
                    collection: VOTE_COLLECTION,
                });
            },
        }),
        handler: async ({ input, auth }) => {
            const did = auth.credentials.did;
            const cabildeoUri = input.body.cabildeo;
            const selectedOption = input.body.selectedOption;
            const now = new Date();
            const createdAt = now.toISOString();
            const cabildeo = await getCabildeoForVote(ctx, did, cabildeoUri);
            assertVoteAllowed(cabildeo, selectedOption, now);
            await assertActiveCommunityMember(ctx, did, cabildeo.community);
            const record = {
                $type: VOTE_COLLECTION,
                subject: cabildeoUri,
                subjectType: 'cabildeo',
                cabildeo: cabildeoUri,
                selectedOption,
                isDirect: true,
                createdAt,
            };
            const write = await (0, repo_1.prepareCreate)({
                did,
                collection: VOTE_COLLECTION,
                rkey: common_1.TID.nextStr(),
                record,
            });
            const commit = await ctx.actorStore.transact(did, async (actorTxn) => {
                const commit = await actorTxn.repo.processWrites([write]).catch((err) => {
                    if (err instanceof repo_1.BadCommitSwapError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidSwap');
                    }
                    if (err instanceof repo_1.InvalidRecordError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message);
                    }
                    throw err;
                });
                await ctx.sequencer.sequenceCommit(did, commit);
                return commit;
            });
            await ctx.accountManager
                .updateRepoRoot(did, commit.cid, commit.rev)
                .catch(() => { });
            return {
                encoding: 'application/json',
                body: {
                    uri: write.uri.toString(),
                    cid: write.cid.toString(),
                    commit: {
                        cid: commit.cid.toString(),
                        rev: commit.rev,
                    },
                },
            };
        },
    });
}
const getCabildeoForVote = async (ctx, did, cabildeoUri) => {
    const { headers } = await ctx.appviewAuthHeaders(did, lexicons_1.ids.ComParaCivicGetCabildeo);
    const res = await ctx.bskyAppView.client
        .call(lexicons_2.com.para.civic.getCabildeo.main, { cabildeo: cabildeoUri }, { headers })
        .catch((err) => {
        throw new xrpc_server_1.InvalidRequestError(err?.message || 'Cabildeo not found', 'NotFound');
    });
    if (!res?.cabildeo) {
        throw new xrpc_server_1.InvalidRequestError('Cabildeo not found', 'NotFound');
    }
    return res.cabildeo;
};
const assertVoteAllowed = (cabildeo, selectedOption, now) => {
    if (cabildeo.phase !== VOTING_PHASE) {
        throw new xrpc_server_1.InvalidRequestError('Cabildeo is not in voting phase', 'InvalidPhase');
    }
    if (cabildeo.phaseDeadline && new Date(cabildeo.phaseDeadline) <= now) {
        throw new xrpc_server_1.InvalidRequestError('Voting deadline has passed', 'DeadlineExpired');
    }
    if (!Number.isInteger(selectedOption) ||
        selectedOption < 0 ||
        !Array.isArray(cabildeo.options) ||
        selectedOption >= cabildeo.options.length) {
        throw new xrpc_server_1.InvalidRequestError('Invalid vote option', 'InvalidOption');
    }
};
const assertActiveCommunityMember = async (ctx, did, community) => {
    const communityId = normalizeCommunitySlug(community);
    const { headers } = await ctx.appviewAuthHeaders(did, lexicons_1.ids.ComParaCommunityGetBoard);
    const res = await ctx.bskyAppView.client
        .call(lexicons_2.com.para.community.getBoard.main, { communityId }, { headers })
        .catch(() => null);
    if (res?.board?.viewerMembershipState !== 'active') {
        throw new xrpc_server_1.InvalidRequestError('Active community membership is required', 'CommunityMembershipRequired');
    }
};
const normalizeCommunitySlug = (value) => value
    .replace(/^p\//, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
//# sourceMappingURL=castVote.js.map