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
    server.add(index_js_1.com.atproto.repo.putRecord, {
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
                calcPoints: () => 2,
            },
            {
                name: 'repo-write-day',
                calcKey: ({ auth }) => auth.credentials.did,
                calcPoints: () => 2,
            },
        ],
        handler: async ({ auth, input }) => {
            const { repo, collection, rkey, record, validate, swapCommit, swapRecord, } = input.body;
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
                    action: 'create',
                    collection,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'update',
                    collection,
                });
            }
            const uri = syntax_1.AtUri.make(did, collection, rkey);
            const swapCommitCid = swapCommit ? (0, lex_data_1.parseCid)(swapCommit) : undefined;
            const swapRecordCid = typeof swapRecord === 'string' ? (0, lex_data_1.parseCid)(swapRecord) : swapRecord;
            const { commit, write } = await ctx.actorStore.transact(did, async (actorTxn) => {
                const current = await actorTxn.record.getRecord(uri, null, true);
                const isUpdate = current !== null;
                // @TODO temporaray hack for legacy blob refs in profiles - remove after migrating legacy blobs
                if (isUpdate && collection === index_js_1.app.bsky.actor.profile.$type) {
                    await updateProfileLegacyBlobRef(actorTxn, record);
                }
                const writeInfo = {
                    did,
                    collection,
                    rkey,
                    record,
                    swapCid: swapRecordCid,
                    validate,
                };
                let write;
                try {
                    write = isUpdate
                        ? await (0, repo_1.prepareUpdate)(writeInfo)
                        : await (0, repo_1.prepareCreate)(writeInfo);
                }
                catch (err) {
                    if (err instanceof repo_1.InvalidRecordError) {
                        throw new xrpc_server_1.InvalidRequestError(err.message);
                    }
                    throw err;
                }
                // no-op
                if (current && current.cid === write.cid.toString()) {
                    return {
                        commit: null,
                        write,
                    };
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
                return { commit, write };
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
                    uri: write.uri.toString(),
                    cid: write.cid.toString(),
                    commit: commit
                        ? {
                            cid: commit.cid.toString(),
                            rev: commit.rev,
                        }
                        : undefined,
                    validationStatus: write.validationStatus,
                },
            };
        },
    });
}
// WARNING: mutates object
async function updateProfileLegacyBlobRef(actorStore, record) {
    if ((0, lex_data_1.isLegacyBlobRef)(record.avatar)) {
        record.avatar = await upgradeLegacyBlob(actorStore, record.avatar);
    }
    if ((0, lex_data_1.isLegacyBlobRef)(record.banner)) {
        record.banner = await upgradeLegacyBlob(actorStore, record.banner);
    }
}
async function upgradeLegacyBlob(actorStore, legacyBlob) {
    const ref = (0, lex_data_1.parseCid)(legacyBlob.cid);
    const blob = await actorStore.repo.blob.getBlobMetadata(ref);
    return {
        $type: 'blob',
        mimeType: legacyBlob.mimeType,
        ref,
        size: blob.size,
    };
}
//# sourceMappingURL=putRecord.js.map