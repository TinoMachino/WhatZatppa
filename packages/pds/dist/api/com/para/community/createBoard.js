"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const cid_1 = require("multiformats/cid");
const common_1 = require("@atproto/common");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const logger_1 = require("../../../../logger");
const repo_1 = require("../../../../repo");
const util_1 = require("./util");
const OWNER_ROLES = ['owner', 'moderator'];
function default_1(server, ctx) {
    server.com.para.community.createBoard({
        auth: ctx.authVerifier.authorization({
            authorize: () => {
                // Repo-scope authorization is checked in the handler because this
                // mutation may create or update multiple collections in one commit.
            },
        }),
        handler: async ({ input, auth, req }) => {
            const did = auth.credentials.did;
            const idempotencyKey = req.header('x-idempotency-key') || undefined;
            if (auth.credentials.type === 'oauth') {
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection: util_1.BOARD_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection: util_1.MEMBERSHIP_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection: util_1.GOVERNANCE_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'update',
                    collection: util_1.BOARD_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'update',
                    collection: util_1.MEMBERSHIP_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'update',
                    collection: util_1.GOVERNANCE_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection: util_1.LIST_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection: util_1.STARTERPACK_COLLECTION,
                });
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection: util_1.LIST_ITEM_COLLECTION,
                });
            }
            const name = (0, util_1.normalizeCommunityName)(input.body.name);
            const quadrant = (0, util_1.normalizeQuadrant)(input.body.quadrant);
            const description = input.body.description?.trim() || undefined;
            const founderStarterPackName = input.body.founderStarterPackName?.trim() || undefined;
            if (!name) {
                throw new xrpc_server_1.InvalidRequestError('Community name is required.');
            }
            if (!quadrant) {
                throw new xrpc_server_1.InvalidRequestError('Quadrant is required.');
            }
            try {
                const existing = await ctx.actorStore.read(did, (store) => (0, util_1.findMatchingBoardByIdentity)({ store, name, quadrant }));
                const result = await ensureBoardRecords({
                    ctx,
                    did,
                    name,
                    quadrant,
                    description,
                    founderStarterPackName,
                    existingUri: existing?.uri,
                    existingCid: existing?.cid,
                    existingCreatedAt: existing?.record.createdAt,
                    existingDelegatesChatId: existing?.record.delegatesChatId,
                    existingSubdelegatesChatId: existing?.record.subdelegatesChatId,
                    idempotencyKey,
                });
                return {
                    encoding: 'application/json',
                    body: result,
                };
            }
            catch (err) {
                logger_1.dbLogger.error({ err, did, name, quadrant, idempotencyKey }, 'createBoard.failure');
                throw err;
            }
        },
    });
}
const ensureBoardRecords = async ({ ctx, did, name, quadrant, description, founderStarterPackName, existingUri, existingCid, existingCreatedAt, existingDelegatesChatId, existingSubdelegatesChatId, existingFounderStarterPackUri, idempotencyKey, }) => {
    const now = existingCreatedAt || new Date().toISOString();
    const boardUri = existingUri ? new syntax_1.AtUri(existingUri) : undefined;
    const boardRkey = boardUri?.rkey || common_1.TID.nextStr();
    const listRkey = common_1.TID.nextStr();
    const starterPackRkey = common_1.TID.nextStr();
    const listItemRkey = common_1.TID.nextStr();
    const delegatesChatId = existingDelegatesChatId || (0, util_1.buildDelegatesChatId)(boardRkey);
    const subdelegatesChatId = existingSubdelegatesChatId || (0, util_1.buildSubdelegatesChatId)(boardRkey);
    const founderStarterPackUri = existingFounderStarterPackUri || syntax_1.AtUri.make(did, util_1.STARTERPACK_COLLECTION, starterPackRkey).toString();
    const slug = (0, util_1.deriveBoardSlug)(name, boardRkey);
    const boardRecord = {
        $type: util_1.BOARD_COLLECTION,
        name,
        description,
        quadrant,
        delegatesChatId,
        subdelegatesChatId,
        status: 'draft',
        founderStarterPackUri,
        createdAt: now,
    };
    const starterName = founderStarterPackName || `Founders: ${name}`;
    const listRecord = {
        $type: util_1.LIST_COLLECTION,
        purpose: 'app.bsky.graph.defs#referencelist',
        name: starterName,
        createdAt: now,
    };
    const starterPackRecord = {
        $type: util_1.STARTERPACK_COLLECTION,
        list: syntax_1.AtUri.make(did, util_1.LIST_COLLECTION, listRkey).toString(),
        name: starterName,
        createdAt: now,
    };
    const listItemRecord = {
        $type: util_1.LIST_ITEM_COLLECTION,
        list: syntax_1.AtUri.make(did, util_1.LIST_COLLECTION, listRkey).toString(),
        subject: did,
        createdAt: now,
    };
    const membershipRecord = {
        $type: util_1.MEMBERSHIP_COLLECTION,
        community: syntax_1.AtUri.make(did, util_1.BOARD_COLLECTION, boardRkey).toString(),
        membershipState: 'active',
        roles: OWNER_ROLES,
        source: 'createBoard',
        joinedAt: now,
    };
    const governanceRecord = (0, util_1.buildSeedGovernanceRecord)({
        did,
        name,
        slug,
        createdAt: now,
    });
    const { commit, boardWrite, replayed } = await ctx.actorStore.transact(did, async (actorTxn) => {
        const boardWrite = existingUri
            ? await prepareUpsert({
                actorTxn,
                did,
                collection: util_1.BOARD_COLLECTION,
                rkey: boardRkey,
                record: boardRecord,
            })
            : await (0, repo_1.prepareCreate)({
                did,
                collection: util_1.BOARD_COLLECTION,
                rkey: boardRkey,
                record: boardRecord,
            });
        const membershipWrite = await prepareUpsert({
            actorTxn,
            did,
            collection: util_1.MEMBERSHIP_COLLECTION,
            rkey: boardRkey,
            record: membershipRecord,
        });
        const governanceWrite = await prepareUpsert({
            actorTxn,
            did,
            collection: util_1.GOVERNANCE_COLLECTION,
            rkey: slug,
            record: governanceRecord,
        });
        const listWrite = !existingUri
            ? await (0, repo_1.prepareCreate)({
                did,
                collection: util_1.LIST_COLLECTION,
                rkey: listRkey,
                record: listRecord,
            })
            : null;
        const starterPackWrite = !existingUri
            ? await (0, repo_1.prepareCreate)({
                did,
                collection: util_1.STARTERPACK_COLLECTION,
                rkey: starterPackRkey,
                record: starterPackRecord,
            })
            : null;
        const listItemWrite = !existingUri
            ? await (0, repo_1.prepareCreate)({
                did,
                collection: util_1.LIST_ITEM_COLLECTION,
                rkey: listItemRkey,
                record: listItemRecord,
            })
            : null;
        const writes = [
            boardWrite,
            membershipWrite,
            governanceWrite,
            listWrite,
            starterPackWrite,
            listItemWrite,
        ].filter(Boolean);
        if (writes.length === 0) {
            return {
                commit: null,
                boardWrite: {
                    uri: syntax_1.AtUri.make(did, util_1.BOARD_COLLECTION, boardRkey),
                    cid: cid_1.CID.parse(existingCid),
                },
                replayed: true,
            };
        }
        const commit = await actorTxn.repo.processWrites(writes).catch((err) => {
            if (err instanceof repo_1.BadCommitSwapError || err instanceof repo_1.BadRecordSwapError) {
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
            boardWrite: boardWrite ??
                {
                    uri: syntax_1.AtUri.make(did, util_1.BOARD_COLLECTION, boardRkey),
                    cid: cid_1.CID.parse(existingCid),
                },
            replayed: Boolean(existingUri),
        };
    });
    if (commit) {
        await ctx.accountManager
            .updateRepoRoot(did, commit.cid, commit.rev)
            .catch((err) => {
            logger_1.dbLogger.error({ err, did, cid: commit.cid, rev: commit.rev }, 'failed to update account root after createBoard');
        });
    }
    logger_1.dbLogger.info({
        did,
        boardUri: boardWrite.uri.toString(),
        cid: boardWrite.cid.toString(),
        delegatesChatId,
        subdelegatesChatId,
        idempotencyKey,
        replayed,
    }, replayed ? 'createBoard.replay' : 'createBoard.success');
    return {
        uri: boardWrite.uri.toString(),
        cid: boardWrite.cid.toString(),
        delegatesChatId,
        subdelegatesChatId,
        founderStarterPackUri,
    };
};
const prepareUpsert = async ({ actorTxn, did, collection, rkey, record, }) => {
    const uri = syntax_1.AtUri.make(did, collection, rkey);
    const current = await actorTxn.record.getRecord(uri, null, true);
    if (!current) {
        return (0, repo_1.prepareCreate)({ did, collection, rkey, record });
    }
    const write = await (0, repo_1.prepareUpdate)({
        did,
        collection,
        rkey,
        record,
        swapCid: cid_1.CID.parse(current.cid),
    });
    if (write.cid.toString() === current.cid) {
        return null;
    }
    return write;
};
//# sourceMappingURL=createBoard.js.map