"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_data_1 = require("@atproto/lex-data");
const repo_1 = require("@atproto/repo");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const logger_1 = require("../../../../logger");
const repo_2 = require("../../../../repo");
const ratelimitPoints = ({ input, }) => {
    let points = 0;
    for (const op of input.body.writes) {
        if (index_js_1.com.atproto.repo.applyWrites.create.$isTypeOf(op)) {
            points += 3;
        }
        else if (index_js_1.com.atproto.repo.applyWrites.update.$isTypeOf(op)) {
            points += 2;
        }
        else {
            points += 1;
        }
    }
    return points;
};
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.repo.applyWrites, {
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
                // Performed in the handler as it is based on the request body
            },
        }),
        rateLimit: [
            {
                name: 'repo-write-hour',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: ratelimitPoints,
            },
            {
                name: 'repo-write-day',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: ratelimitPoints,
            },
        ],
        handler: async ({ input, auth }) => {
            const { repo, validate, swapCommit, writes } = input.body;
            const account = await ctx.authVerifier.findAccount(repo, {
                checkDeactivated: true,
                checkTakedown: true,
            });
            const did = account.did;
            if (did !== auth.credentials.did) {
                throw new xrpc_server_1.AuthRequiredError();
            }
            if (writes.length > 200) {
                throw new xrpc_server_1.InvalidRequestError('Too many writes. Max: 200');
            }
            // Verify permission of every unique "action" / "collection" pair
            if (auth.credentials.type === 'oauth') {
                // @NOTE Unlike "importRepo", we do not require "action" = "*" here.
                for (const [action, collections] of [
                    [
                        'create',
                        new Set(writes
                            .filter((v) => index_js_1.com.atproto.repo.applyWrites.create.$isTypeOf(v))
                            .map((w) => w.collection)),
                    ],
                    [
                        'update',
                        new Set(writes
                            .filter((v) => index_js_1.com.atproto.repo.applyWrites.update.$isTypeOf(v))
                            .map((w) => w.collection)),
                    ],
                    [
                        'delete',
                        new Set(writes
                            .filter((v) => index_js_1.com.atproto.repo.applyWrites.delete.$isTypeOf(v))
                            .map((w) => w.collection)),
                    ],
                ]) {
                    for (const collection of collections) {
                        auth.credentials.permissions.assertRepo({ action, collection });
                    }
                }
            }
            // @NOTE should preserve order of ts.writes for final use in response
            let preparedWrites;
            try {
                preparedWrites = await Promise.all(writes.map(async (write, i) => {
                    if (index_js_1.com.atproto.repo.applyWrites.create.$isTypeOf(write)) {
                        return (0, repo_2.prepareCreate)({
                            did,
                            collection: write.collection,
                            record: write.value,
                            rkey: write.rkey,
                            validate,
                            validationPath: ['writes', i, 'record'],
                        });
                    }
                    else if (index_js_1.com.atproto.repo.applyWrites.update.$isTypeOf(write)) {
                        return (0, repo_2.prepareUpdate)({
                            did,
                            collection: write.collection,
                            record: write.value,
                            rkey: write.rkey,
                            validate,
                            validationPath: ['writes', i, 'record'],
                        });
                    }
                    else if (index_js_1.com.atproto.repo.applyWrites.delete.$isTypeOf(write)) {
                        return (0, repo_2.prepareDelete)({
                            did,
                            collection: write.collection,
                            rkey: write.rkey,
                        });
                    }
                    else {
                        throw new xrpc_server_1.InvalidRequestError(`Action not supported: ${write['$type']}`);
                    }
                }));
            }
            catch (err) {
                if (err instanceof repo_2.InvalidRecordError) {
                    throw new xrpc_server_1.InvalidRequestError(err.message);
                }
                throw err;
            }
            const swapCommitCid = swapCommit ? (0, lex_data_1.parseCid)(swapCommit) : undefined;
            const commit = await ctx.actorStore.transact(did, async (actorTxn) => {
                const commit = await actorTxn.repo
                    .processWrites(preparedWrites, swapCommitCid)
                    .catch((err) => {
                    if (err instanceof repo_2.BadCommitSwapError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidSwap');
                    }
                    else {
                        throw err;
                    }
                });
                await ctx.sequencer.sequenceCommit(did, commit);
                return commit;
            });
            await ctx.accountManager
                .updateRepoRoot(did, commit.cid, commit.rev)
                .catch((err) => {
                logger_1.dbLogger.error({ err, did, cid: commit.cid, rev: commit.rev }, 'failed to update account root');
            });
            return {
                encoding: 'application/json',
                body: {
                    commit: {
                        cid: commit.cid.toString(),
                        rev: commit.rev,
                    },
                    results: preparedWrites.map(writeToOutputResult),
                },
            };
        },
    });
}
const writeToOutputResult = (write) => {
    switch (write.action) {
        case repo_1.WriteOpAction.Create:
            return index_js_1.com.atproto.repo.applyWrites.createResult.$build({
                cid: write.cid.toString(),
                uri: write.uri.toString(),
                validationStatus: write.validationStatus,
            });
        case repo_1.WriteOpAction.Update:
            return index_js_1.com.atproto.repo.applyWrites.updateResult.$build({
                cid: write.cid.toString(),
                uri: write.uri.toString(),
                validationStatus: write.validationStatus,
            });
        case repo_1.WriteOpAction.Delete:
            return index_js_1.com.atproto.repo.applyWrites.deleteResult.$build({});
        default:
            throw new Error(`Unrecognized action: ${write}`);
    }
};
//# sourceMappingURL=applyWrites.js.map