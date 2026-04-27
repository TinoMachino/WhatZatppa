"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const cid_1 = require("multiformats/cid");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const logger_1 = require("../../../../logger");
const repo_1 = require("../../../../repo");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.para.community.leave({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions) => {
                permissions.assertRepo({
                    action: 'update',
                    collection: util_1.MEMBERSHIP_COLLECTION,
                });
            },
        }),
        handler: async ({ input, auth }) => {
            const did = auth.credentials.did;
            const communityUri = assertCommunityBoardUri(input.body.communityUri);
            const now = new Date().toISOString();
            try {
                const result = await ctx.actorStore.transact(did, async (actorTxn) => {
                    const membershipUri = (0, util_1.getMembershipUriForBoard)({
                        viewerDid: did,
                        boardUri: communityUri.toString(),
                    });
                    const current = await actorTxn.record.getRecord(membershipUri, null, true);
                    if (!current) {
                        throw new xrpc_server_1.InvalidRequestError('No membership exists for this community.', 'CommunityMembershipNotFound');
                    }
                    const previous = current.value;
                    if (previous.roles?.includes('owner')) {
                        throw new xrpc_server_1.InvalidRequestError('Community owners cannot leave their own community.', 'CommunityOwnerCannotLeave');
                    }
                    if (previous.membershipState === 'blocked') {
                        throw new xrpc_server_1.InvalidRequestError('Blocked memberships cannot be changed by the viewer.', 'CommunityMembershipLocked');
                    }
                    const record = {
                        $type: util_1.MEMBERSHIP_COLLECTION,
                        community: communityUri.toString(),
                        membershipState: 'left',
                        roles: previous.roles ?? [],
                        source: previous.source ?? 'join',
                        joinedAt: previous.joinedAt || now,
                        leftAt: now,
                    };
                    const write = await (0, repo_1.prepareUpdate)({
                        did,
                        collection: util_1.MEMBERSHIP_COLLECTION,
                        rkey: membershipUri.rkey,
                        record,
                        swapCid: cid_1.CID.parse(current.cid),
                    });
                    const commit = await actorTxn.repo.processWrites([write]).catch((err) => {
                        if (err instanceof repo_1.BadCommitSwapError ||
                            err instanceof repo_1.BadRecordSwapError) {
                            throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidSwap');
                        }
                        if (err instanceof repo_1.InvalidRecordError) {
                            throw new xrpc_server_1.InvalidRequestError(err.message);
                        }
                        throw err;
                    });
                    await ctx.sequencer.sequenceCommit(did, commit);
                    return {
                        commit,
                        uri: write.uri.toString(),
                        cid: write.cid.toString(),
                        record,
                    };
                });
                await ctx.accountManager
                    .updateRepoRoot(did, result.commit.cid, result.commit.rev)
                    .catch((err) => {
                    logger_1.dbLogger.error({ err, did, cid: result.commit.cid, rev: result.commit.rev }, 'failed to update account root after community leave');
                });
                logger_1.dbLogger.info({ did, communityUri: communityUri.toString(), membershipUri: result.uri }, 'community.leave.success');
                return {
                    encoding: 'application/json',
                    body: {
                        uri: result.uri,
                        cid: result.cid,
                        communityUri: communityUri.toString(),
                        membershipState: result.record.membershipState,
                        viewerCapabilities: (0, util_1.getViewerCapabilities)(result.record),
                    },
                };
            }
            catch (err) {
                logger_1.dbLogger.error({ err, did, communityUri: communityUri.toString() }, 'community.leave.failure');
                throw err;
            }
        },
    });
}
const assertCommunityBoardUri = (value) => {
    let uri;
    try {
        uri = new syntax_1.AtUri(value);
    }
    catch {
        throw new xrpc_server_1.InvalidRequestError('communityUri must be a valid AT URI.');
    }
    if (uri.collection !== util_1.BOARD_COLLECTION || !uri.rkey) {
        throw new xrpc_server_1.InvalidRequestError(`communityUri must reference a ${util_1.BOARD_COLLECTION} record.`);
    }
    return uri;
};
//# sourceMappingURL=leave.js.map