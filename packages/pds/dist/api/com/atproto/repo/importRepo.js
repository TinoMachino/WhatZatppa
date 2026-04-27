"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const lex_data_1 = require("@atproto/lex-data");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.repo.importRepo, {
        opts: {
            blobLimit: ctx.cfg.service.maxImportSize,
        },
        auth: ctx.authVerifier.authorization({
            checkTakedown: true,
            scopes: auth_scope_1.ACCESS_FULL,
            authorize: (permissions) => {
                permissions.assertAccount({ attr: 'repo', action: 'manage' });
            },
        }),
        handler: async ({ input, auth }) => {
            if (!ctx.cfg.service.acceptingImports) {
                throw new xrpc_server_1.InvalidRequestError('Service is not accepting repo imports');
            }
            const { did } = auth.credentials;
            // @NOTE process as much as we can before the transaction, in particular
            // the reading of the body stream.
            const { roots, blocks } = await (0, repo_1.readCarStream)(input.body);
            if (roots.length !== 1) {
                await blocks.dump();
                throw new xrpc_server_1.InvalidRequestError('expected one root');
            }
            const blockMap = new repo_1.BlockMap();
            for await (const block of blocks) {
                blockMap.set(block.cid, block.bytes);
            }
            await ctx.actorStore.transact(did, async (store) => {
                const now = new Date().toISOString();
                const rev = common_1.TID.nextStr();
                const did = store.repo.did;
                const currRepo = await store.repo.maybeLoadRepo();
                const diff = await (0, repo_1.verifyDiff)(currRepo, blockMap, roots[0], undefined, undefined, { ensureLeaves: false });
                diff.commit.rev = rev;
                await store.repo.storage.applyCommit(diff.commit, currRepo === null);
                // @NOTE There is no point in performing the following concurrently
                // since better-sqlite3 is synchronous.
                for (const write of diff.writes) {
                    const uri = syntax_1.AtUri.make(did, write.collection, write.rkey);
                    if (write.action === repo_1.WriteOpAction.Delete) {
                        await store.record.deleteRecord(uri);
                    }
                    else {
                        let parsedRecord;
                        try {
                            // @NOTE getAndParseRecord returns a promise for historical
                            // reasons but it's internal processing is actually synchronous.
                            const parsed = await (0, repo_1.getAndParseRecord)(blockMap, write.cid);
                            parsedRecord = parsed.record;
                        }
                        catch {
                            throw new xrpc_server_1.InvalidRequestError(`Could not parse record at '${write.collection}/${write.rkey}'`);
                        }
                        await store.record.indexRecord(uri, write.cid, parsedRecord, write.action, rev, now);
                        const recordBlobs = Array.from((0, lex_data_1.enumBlobRefs)(parsedRecord, { allowLegacy: true, strict: false }));
                        await store.repo.blob.insertBlobs(uri.toString(), recordBlobs);
                    }
                }
            });
        },
    });
}
//# sourceMappingURL=importRepo.js.map