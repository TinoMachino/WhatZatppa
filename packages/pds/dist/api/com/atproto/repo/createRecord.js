"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_data_1 = require("@atproto/lex-data");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const logger_1 = require("../../../../logger");
const repo_1 = require("../../../../repo");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.repo.createRecord, {
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
                calcPoints: () => 3,
            },
            {
                name: 'repo-write-day',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: () => 3,
            },
        ],
        opts: {
            inputProcessingOptions: {
                strict: true,
                // @NOTE We add 1 here because the top-level body counts as a level.
                maxNestedLevels: lex_data_1.MAX_CBOR_NESTED_LEVELS + 1,
                // Other limits will be derived from strict mode.
            },
        },
        handler: async ({ input, auth }) => {
            const { repo, collection, rkey, record, swapCommit, validate } = input.body;
            const account = await ctx.authVerifier.findAccount(repo, {
                checkDeactivated: true,
                checkTakedown: true,
            });
            const did = account.did;
            if (did !== auth.credentials.did) {
                throw new xrpc_server_1.AuthRequiredError();
            }
            if (auth.credentials.type === 'oauth') {
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection,
                });
            }
            const swapCommitCid = swapCommit ? (0, lex_data_1.parseCid)(swapCommit) : undefined;
            let write;
            try {
                write = await (0, repo_1.prepareCreate)({
                    did,
                    collection,
                    record,
                    rkey,
                    validate,
                });
            }
            catch (err) {
                if (err instanceof repo_1.InvalidRecordError) {
                    throw new xrpc_server_1.InvalidRequestError(err.message);
                }
                if (err instanceof syntax_1.InvalidRecordKeyError) {
                    throw new xrpc_server_1.InvalidRequestError(err.message);
                }
                throw err;
            }
            const commit = await ctx.actorStore.transact(did, async (actorTxn) => {
                const backlinkConflicts = validate !== false
                    ? await actorTxn.record.getBacklinkConflicts(write.uri, write.record)
                    : [];
                const backlinkDeletions = backlinkConflicts.map((uri) => (0, repo_1.prepareDelete)({
                    did: uri.did,
                    collection: uri.collectionSafe,
                    rkey: uri.rkeySafe,
                }));
                const writes = [...backlinkDeletions, write];
                const commit = await actorTxn.repo
                    .processWrites(writes, swapCommitCid)
                    .catch((err) => {
                    if (err instanceof repo_1.BadCommitSwapError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message, 'InvalidSwap');
                    }
                    throw err;
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
                    uri: write.uri.toString(),
                    cid: write.cid.toString(),
                    commit: {
                        cid: commit.cid.toString(),
                        rev: commit.rev,
                    },
                    validationStatus: write.validationStatus,
                },
            };
        },
    });
}
//# sourceMappingURL=createRecord.js.map