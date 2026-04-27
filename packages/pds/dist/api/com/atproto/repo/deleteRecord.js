"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_data_1 = require("@atproto/lex-data");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const logger_1 = require("../../../../logger");
const repo_1 = require("../../../../repo");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.repo.deleteRecord, {
        auth: ctx.authVerifier.authorization({
            // @NOTE the "checkTakedown" and "checkDeactivated" checks are typically
            // performed during auth. However, since this method's "repo" parameter
            // can be a handle, we will need to fetch the account again to ensure that
            // the handle matches the DID from the request's credentials. In order to
            // avoid fetching the account twice (during auth, and then again in the
            // controller), the checks are disabled here:
            // checkTakedown: true,
            // checkDeactivated: true,
            authorize: () => {
                // Performed in the handler as it requires the request body
            },
        }),
        rateLimit: [
            {
                name: 'repo-write-hour',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: () => 1,
            },
            {
                name: 'repo-write-day',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: () => 1,
            },
        ],
        handler: async ({ input: { body }, auth }) => {
            const { repo, collection, rkey, swapCommit, swapRecord } = body;
            const account = await ctx.authVerifier.findAccount(repo, {
                checkDeactivated: true,
                checkTakedown: true,
            });
            const did = account.did;
            if (did !== auth.credentials.did) {
                throw new xrpc_server_1.AuthRequiredError();
            }
            // We can't compute permissions based on the request payload ("input") in
            // the 'auth' phase, so we do it here.
            if (auth.credentials.type === 'oauth') {
                auth.credentials.permissions.assertRepo({
                    action: 'delete',
                    collection,
                });
            }
            const swapCommitCid = swapCommit ? (0, lex_data_1.parseCid)(swapCommit) : undefined;
            const swapRecordCid = swapRecord ? (0, lex_data_1.parseCid)(swapRecord) : undefined;
            const write = (0, repo_1.prepareDelete)({
                did,
                collection,
                rkey,
                swapCid: swapRecordCid,
            });
            const commit = await ctx.actorStore.transact(did, async (actorTxn) => {
                const record = await actorTxn.record.getRecord(write.uri, null, true);
                if (!record) {
                    return null; // No-op if record already doesn't exist
                }
                const commit = await actorTxn.repo
                    .processWrites([write], swapCommitCid)
                    .catch((err) => {
                    if (err instanceof repo_1.BadCommitSwapError ||
                        err instanceof repo_1.BadRecordSwapError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidSwap');
                    }
                    else {
                        throw err;
                    }
                });
                await ctx.sequencer.sequenceCommit(did, commit);
                return commit;
            });
            if (commit !== null) {
                await ctx.accountManager
                    .updateRepoRoot(did, commit.cid, commit.rev)
                    .catch((err) => {
                    logger_1.dbLogger.error({ err, did, cid: commit.cid, rev: commit.rev }, 'failed to update account root');
                });
            }
            return {
                encoding: 'application/json',
                body: {
                    commit: commit
                        ? {
                            cid: commit.cid.toString(),
                            rev: commit.rev,
                        }
                        : undefined,
                },
            };
        },
    });
}
//# sourceMappingURL=deleteRecord.js.map