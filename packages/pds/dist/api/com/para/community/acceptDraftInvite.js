"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const cid_1 = require("multiformats/cid");
const common_1 = require("@atproto/common");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const repo_1 = require("../../../../repo");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.com.para.community.acceptDraftInvite({
        auth: ctx.authVerifier.authorization({
            authorize: () => { },
        }),
        handler: async ({ input, auth }) => {
            const did = auth.credentials.did;
            const communityUri = new syntax_1.AtUri(input.body.communityUri);
            if (auth.credentials.type === 'oauth') {
                auth.credentials.permissions.assertRepo({
                    action: 'create',
                    collection: util_1.MEMBERSHIP_COLLECTION,
                });
            }
            const boardCreatorDid = communityUri.host;
            const { board, starterPackRecord, listItems } = await ctx.actorStore.read(boardCreatorDid, async (creatorStore) => {
                const board = await (0, util_1.findLocalBoard)({ store: creatorStore, uri: communityUri.toString() });
                if (!board || board.record.status !== 'draft') {
                    return { board, starterPackRecord: null, listItems: [] };
                }
                const spUri = board.record.founderStarterPackUri;
                if (!spUri)
                    return { board, starterPackRecord: null, listItems: [] };
                const parsedSp = new syntax_1.AtUri(spUri);
                const starterPackRecord = await creatorStore.record.getRecord(parsedSp, null, true);
                const listItems = await creatorStore.record.listRecordsForCollection({
                    collection: util_1.LIST_ITEM_COLLECTION,
                    limit: 100,
                    reverse: false
                });
                return { board, starterPackRecord, listItems };
            });
            if (!board) {
                throw new xrpc_server_1.InvalidRequestError('Community not found');
            }
            if (board.record.status !== 'draft') {
                throw new xrpc_server_1.InvalidRequestError('Community is no longer in draft mode');
            }
            if (!starterPackRecord)
                throw new xrpc_server_1.InvalidRequestError('Starter pack missing');
            const listUriStr = starterPackRecord.value.list;
            const itemsInList = listItems.filter(item => item.value.list === listUriStr);
            const alreadyMember = itemsInList.some(item => item.value.subject === did);
            if (alreadyMember) {
                throw new xrpc_server_1.InvalidRequestError('Already accepted');
            }
            const newSize = itemsInList.length + 1;
            let updatedCreatorRootCid;
            let updatedCreatorRootRev;
            // 1. Transactionally write listitem and update board if needed in the creator's repo.
            await ctx.actorStore.transact(boardCreatorDid, async (creatorTxn) => {
                const listItemRkey = common_1.TID.nextStr();
                const listItemRecord = {
                    $type: util_1.LIST_ITEM_COLLECTION,
                    list: listUriStr,
                    subject: did,
                    createdAt: new Date().toISOString()
                };
                const listItemWrite = await (0, repo_1.prepareCreate)({
                    did: boardCreatorDid,
                    collection: util_1.LIST_ITEM_COLLECTION,
                    rkey: listItemRkey,
                    record: listItemRecord,
                });
                const writes = [listItemWrite];
                if (newSize >= 9) {
                    const boardWrite = await (0, repo_1.prepareUpdate)({
                        did: boardCreatorDid,
                        collection: util_1.BOARD_COLLECTION,
                        rkey: communityUri.rkey,
                        record: { ...board.record, status: 'active' },
                        swapCid: cid_1.CID.parse(board.cid)
                    });
                    writes.push(boardWrite);
                }
                const commit = await creatorTxn.repo.processWrites(writes);
                await ctx.sequencer.sequenceCommit(boardCreatorDid, commit);
                updatedCreatorRootCid = commit.cid;
                updatedCreatorRootRev = commit.rev;
            });
            let updatedCallerRootCid;
            let updatedCallerRootRev;
            // 2. Transactionally write membership in the caller's repo
            await ctx.actorStore.transact(did, async (actorTxn) => {
                const memWrite = await (0, repo_1.prepareCreate)({
                    did,
                    collection: util_1.MEMBERSHIP_COLLECTION,
                    rkey: common_1.TID.nextStr(),
                    record: {
                        $type: util_1.MEMBERSHIP_COLLECTION,
                        community: communityUri.toString(),
                        membershipState: 'active',
                        roles: ['founder'],
                        source: 'acceptDraftInvite',
                        joinedAt: new Date().toISOString()
                    }
                });
                const commit = await actorTxn.repo.processWrites([memWrite]);
                await ctx.sequencer.sequenceCommit(did, commit);
                updatedCallerRootCid = commit.cid;
                updatedCallerRootRev = commit.rev;
            });
            if (updatedCreatorRootCid && updatedCreatorRootRev) {
                await ctx.accountManager.updateRepoRoot(boardCreatorDid, updatedCreatorRootCid, updatedCreatorRootRev).catch(() => { });
            }
            if (updatedCallerRootCid && updatedCallerRootRev) {
                await ctx.accountManager.updateRepoRoot(did, updatedCallerRootCid, updatedCallerRootRev).catch(() => { });
            }
            return {
                encoding: 'application/json',
                body: {
                    status: newSize >= 9 ? 'active' : 'draft',
                    memberCount: newSize
                }
            };
        }
    });
}
//# sourceMappingURL=acceptDraftInvite.js.map