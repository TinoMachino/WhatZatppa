"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.IndexingService = void 0;
const kysely_1 = require("kysely");
const common_1 = require("@atproto/common");
const identity_1 = require("@atproto/identity");
const lex_1 = require("@atproto/lex");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../lexicons");
const logger_1 = require("../../../logger");
const retry_1 = require("../../../util/retry");
const Block = __importStar(require("./plugins/block"));
const Cabildeo = __importStar(require("./plugins/cabildeo"));
const CabildeoDelegation = __importStar(require("./plugins/cabildeo-delegation"));
const CabildeoPosition = __importStar(require("./plugins/cabildeo-position"));
const CabildeoVote = __importStar(require("./plugins/cabildeo-vote"));
const ChatDeclaration = __importStar(require("./plugins/chat-declaration"));
const FeedGenerator = __importStar(require("./plugins/feed-generator"));
const Follow = __importStar(require("./plugins/follow"));
const GermDeclaration = __importStar(require("./plugins/germ-declaration"));
const Highlight = __importStar(require("./plugins/highlight"));
const Labeler = __importStar(require("./plugins/labeler"));
const Like = __importStar(require("./plugins/like"));
const List = __importStar(require("./plugins/list"));
const ListBlock = __importStar(require("./plugins/list-block"));
const ListItem = __importStar(require("./plugins/list-item"));
const NotifDeclaration = __importStar(require("./plugins/notif-declaration"));
const ParaCommunityBoard = __importStar(require("./plugins/para-community-board"));
const ParaCommunityGovernance = __importStar(require("./plugins/para-community-governance"));
const ParaCommunityMembership = __importStar(require("./plugins/para-community-membership"));
const ParaPost = __importStar(require("./plugins/para-post"));
const ParaPostMeta = __importStar(require("./plugins/para-post-meta"));
const ParaStatus = __importStar(require("./plugins/para-status"));
const Post = __importStar(require("./plugins/post"));
const Postgate = __importStar(require("./plugins/post-gate"));
const Profile = __importStar(require("./plugins/profile"));
const Repost = __importStar(require("./plugins/repost"));
const StarterPack = __importStar(require("./plugins/starter-pack"));
const Status = __importStar(require("./plugins/status"));
const Threadgate = __importStar(require("./plugins/thread-gate"));
const Verification = __importStar(require("./plugins/verification"));
class IndexingService {
    constructor(db, idResolver, background) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "idResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: idResolver
        });
        Object.defineProperty(this, "background", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: background
        });
        Object.defineProperty(this, "records", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.records = {
            post: Post.makePlugin(this.db, this.background),
            threadGate: Threadgate.makePlugin(this.db, this.background),
            postGate: Postgate.makePlugin(this.db, this.background),
            like: Like.makePlugin(this.db, this.background),
            repost: Repost.makePlugin(this.db, this.background),
            follow: Follow.makePlugin(this.db, this.background),
            profile: Profile.makePlugin(this.db, this.background),
            list: List.makePlugin(this.db, this.background),
            listItem: ListItem.makePlugin(this.db, this.background),
            listBlock: ListBlock.makePlugin(this.db, this.background),
            block: Block.makePlugin(this.db, this.background),
            feedGenerator: FeedGenerator.makePlugin(this.db, this.background),
            starterPack: StarterPack.makePlugin(this.db, this.background),
            labeler: Labeler.makePlugin(this.db, this.background),
            notifDeclaration: NotifDeclaration.makePlugin(this.db, this.background),
            chatDeclaration: ChatDeclaration.makePlugin(this.db, this.background),
            germDeclaration: GermDeclaration.makePlugin(this.db, this.background),
            verification: Verification.makePlugin(this.db, this.background),
            status: Status.makePlugin(this.db, this.background),
            paraPost: ParaPost.makePlugin(this.db, this.background),
            paraCommunityBoard: ParaCommunityBoard.makePlugin(this.db, this.background),
            paraCommunityGovernance: ParaCommunityGovernance.makePlugin(this.db, this.background),
            paraCommunityMembership: ParaCommunityMembership.makePlugin(this.db, this.background),
            paraPostMeta: ParaPostMeta.makePlugin(this.db, this.background),
            paraStatus: ParaStatus.makePlugin(this.db, this.background),
            cabildeo: Cabildeo.makePlugin(this.db, this.background),
            cabildeoPosition: CabildeoPosition.makePlugin(this.db, this.background),
            cabildeoDelegation: CabildeoDelegation.makePlugin(this.db, this.background),
            cabildeoVote: CabildeoVote.makePlugin(this.db, this.background),
            highlight: Highlight.makePlugin(this.db, this.background),
        };
    }
    transact(txn) {
        txn.assertTransaction();
        return new IndexingService(txn, this.idResolver, this.background);
    }
    async indexRecord(uri, cid, obj, action, timestamp, opts) {
        this.db.assertNotTransaction();
        return this.db.transaction(async (txn) => {
            const indexingTx = this.transact(txn);
            const indexer = indexingTx.findIndexerForCollection(uri.collection);
            if (!indexer)
                return;
            if (action === repo_1.WriteOpAction.Create) {
                await indexer.insertRecord(uri, cid, obj, timestamp, opts);
            }
            else {
                await indexer.updateRecord(uri, cid, obj, timestamp);
            }
        });
    }
    async deleteRecord(uri, cascading = false) {
        this.db.assertNotTransaction();
        await this.db.transaction(async (txn) => {
            const indexingTx = this.transact(txn);
            const indexer = indexingTx.findIndexerForCollection(uri.collection);
            if (!indexer)
                return;
            await indexer.deleteRecord(uri, cascading);
        });
    }
    async indexHandle(did, timestamp, force = false) {
        this.db.assertNotTransaction();
        const actor = await this.db.db
            .selectFrom('actor')
            .where('did', '=', did)
            .selectAll()
            .executeTakeFirst();
        if (!force && !needsHandleReindex(actor, timestamp)) {
            return;
        }
        const atpData = await this.idResolver.did.resolveAtprotoData(did, true);
        const handleToDid = await this.idResolver.handle.resolve(atpData.handle);
        const handle = did === handleToDid ? atpData.handle.toLowerCase() : null;
        const actorWithHandle = handle !== null
            ? await this.db.db
                .selectFrom('actor')
                .where('handle', '=', handle)
                .selectAll()
                .executeTakeFirst()
            : null;
        // handle contention
        if (handle && actorWithHandle && did !== actorWithHandle.did) {
            await this.db.db
                .updateTable('actor')
                .where('actor.did', '=', actorWithHandle.did)
                .set({ handle: null })
                .execute();
        }
        const actorInfo = { handle, indexedAt: timestamp };
        await this.db.db
            .insertInto('actor')
            .values({ did, ...actorInfo })
            .onConflict((oc) => oc.column('did').doUpdateSet(actorInfo))
            .returning('did')
            .executeTakeFirst();
    }
    async indexRepo(did, commit) {
        this.db.assertNotTransaction();
        const now = new Date().toISOString();
        const { pds, signingKey } = await this.idResolver.did.resolveAtprotoData(did, true);
        const { body: car } = await (0, retry_1.retryXrpc)(() => {
            return (0, lex_1.xrpc)(pds, lexicons_1.com.atproto.sync.getRepo, { params: { did } });
        });
        const { root, blocks } = await (0, repo_1.readCarWithRoot)(car);
        const verifiedRepo = await (0, repo_1.verifyRepo)(blocks, root, did, signingKey);
        const currRecords = await this.getCurrentRecords(did);
        const repoRecords = formatCheckout(did, verifiedRepo);
        const diff = findDiffFromCheckout(currRecords, repoRecords);
        await Promise.all(diff.map(async (op) => {
            const { uri, cid } = op;
            try {
                if (op.op === 'delete') {
                    await this.deleteRecord(uri);
                }
                else {
                    const parsed = await (0, repo_1.getAndParseRecord)(blocks, cid);
                    await this.indexRecord(uri, cid, parsed.record, op.op === 'create' ? repo_1.WriteOpAction.Create : repo_1.WriteOpAction.Update, now);
                }
            }
            catch (err) {
                if (err instanceof lex_1.l.LexValidationError) {
                    logger_1.subLogger.warn({ did, commit, uri: uri.toString(), cid: cid.toString() }, 'skipping indexing of invalid record');
                }
                else {
                    logger_1.subLogger.error({ err, did, commit, uri: uri.toString(), cid: cid.toString() }, 'skipping indexing due to error processing record');
                }
            }
        }));
    }
    async getCurrentRecords(did) {
        const res = await this.db.db
            .selectFrom('record')
            .where('did', '=', did)
            .select(['uri', 'cid'])
            .execute();
        return res.reduce((acc, cur) => {
            acc[cur.uri] = {
                uri: new syntax_1.AtUri(cur.uri),
                cid: (0, lex_1.parseCid)(cur.cid),
            };
            return acc;
        }, {});
    }
    async setCommitLastSeen(did, commit, rev) {
        const { ref } = this.db.db.dynamic;
        await this.db.db
            .insertInto('actor_sync')
            .values({
            did,
            commitCid: commit.toString(),
            repoRev: rev ?? null,
        })
            .onConflict((oc) => {
            const excluded = (col) => ref(`excluded.${col}`);
            return oc.column('did').doUpdateSet({
                commitCid: (0, kysely_1.sql) `${excluded('commitCid')}`,
                repoRev: (0, kysely_1.sql) `${excluded('repoRev')}`,
            });
        })
            .execute();
    }
    findIndexerForCollection(collection) {
        for (const indexer of Object.values(this.records)) {
            if (indexer.collection === collection) {
                return indexer;
            }
        }
    }
    async updateActorStatus(did, active, status = '') {
        let upstreamStatus;
        if (active) {
            upstreamStatus = null;
        }
        else if (['deactivated', 'suspended', 'takendown'].includes(status)) {
            upstreamStatus = status;
        }
        else {
            throw new Error(`Unrecognized account status: ${status}`);
        }
        await this.db.db
            .updateTable('actor')
            .set({ upstreamStatus })
            .where('did', '=', did)
            .execute();
    }
    async deleteActor(did) {
        this.db.assertNotTransaction();
        const actorIsHosted = await this.getActorIsHosted(did);
        if (actorIsHosted === false) {
            await this.db.db.deleteFrom('actor').where('did', '=', did).execute();
            await this.unindexActor(did);
            await this.db.db
                .deleteFrom('notification')
                .where('did', '=', did)
                .execute();
        }
    }
    async getActorIsHosted(did) {
        const doc = await this.idResolver.did.resolve(did, true);
        const pds = doc && (0, identity_1.getPds)(doc);
        if (!pds)
            return false;
        return (0, retry_1.retryXrpc)(async () => {
            const res = await (0, lex_1.xrpcSafe)(pds, lexicons_1.com.atproto.sync.getLatestCommit, {
                params: { did },
            });
            if (res.success)
                return true;
            if (res.error === 'RepoNotFound')
                return false;
            throw res.reason; // let retryXrpc() handle retries for transient errors
        });
    }
    async unindexActor(did) {
        this.db.assertNotTransaction();
        // per-record-type indexes
        await this.db.db.deleteFrom('profile').where('creator', '=', did).execute();
        await this.db.db.deleteFrom('follow').where('creator', '=', did).execute();
        await this.db.db.deleteFrom('repost').where('creator', '=', did).execute();
        await this.db.db.deleteFrom('like').where('creator', '=', did).execute();
        await this.db.db
            .deleteFrom('feed_generator')
            .where('creator', '=', did)
            .execute();
        await this.db.db.deleteFrom('labeler').where('creator', '=', did).execute();
        // lists
        await this.db.db
            .deleteFrom('list_item')
            .where('creator', '=', did)
            .execute();
        await this.db.db.deleteFrom('list').where('creator', '=', did).execute();
        // blocks
        await this.db.db
            .deleteFrom('actor_block')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('list_block')
            .where('creator', '=', did)
            .execute();
        // posts
        const postByUser = (qb) => qb
            .selectFrom('post')
            .where('post.creator', '=', did)
            .select('post.uri as uri');
        await this.db.db
            .deleteFrom('post_embed_image')
            .where('post_embed_image.postUri', 'in', postByUser)
            .execute();
        await this.db.db
            .deleteFrom('post_embed_external')
            .where('post_embed_external.postUri', 'in', postByUser)
            .execute();
        await this.db.db
            .deleteFrom('post_embed_record')
            .where('post_embed_record.postUri', 'in', postByUser)
            .execute();
        await this.db.db.deleteFrom('post').where('creator', '=', did).execute();
        await this.db.db
            .deleteFrom('thread_gate')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('post_gate')
            .where('creator', '=', did)
            .execute();
        // notifications
        await this.db.db
            .deleteFrom('notification')
            .where('notification.author', '=', did)
            .execute();
        // generic record indexes
        await this.db.db
            .deleteFrom('duplicate_record')
            .where('duplicate_record.duplicateOf', 'in', (qb) => qb
            .selectFrom('record')
            .where('record.did', '=', did)
            .select('record.uri as uri'))
            .execute();
        await this.db.db
            .deleteFrom('para_community_membership')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('para_community_board')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('para_post')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('para_post_meta')
            .where('creator', '=', did)
            .execute();
        await this.db.db.deleteFrom('para_status').where('did', '=', did).execute();
        await this.db.db
            .deleteFrom('para_profile_stats')
            .where('did', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('cabildeo_cabildeo')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('cabildeo_position')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('cabildeo_delegation')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('cabildeo_vote')
            .where('creator', '=', did)
            .execute();
        await this.db.db
            .deleteFrom('highlight_annotation')
            .where('creator', '=', did)
            .execute();
        await this.db.db.deleteFrom('record').where('did', '=', did).execute();
    }
}
exports.IndexingService = IndexingService;
const findDiffFromCheckout = (curr, checkout) => {
    const ops = [];
    for (const uri of Object.keys(checkout)) {
        const record = checkout[uri];
        if (!curr[uri]) {
            ops.push({ op: 'create', ...record });
        }
        else {
            if (curr[uri].cid.equals(record.cid)) {
                // no-op
                continue;
            }
            ops.push({ op: 'update', ...record });
        }
    }
    for (const uri of Object.keys(curr)) {
        const record = curr[uri];
        if (!checkout[uri]) {
            ops.push({ op: 'delete', ...record });
        }
    }
    return ops;
};
const formatCheckout = (did, verifiedRepo) => {
    const records = {};
    for (const create of verifiedRepo.creates) {
        const uri = syntax_1.AtUri.make(did, create.collection, create.rkey);
        records[uri.toString()] = {
            uri,
            cid: create.cid,
        };
    }
    return records;
};
const needsHandleReindex = (actor, timestamp) => {
    if (!actor)
        return true;
    const timeDiff = new Date(timestamp).getTime() - new Date(actor.indexedAt).getTime();
    // revalidate daily
    if (timeDiff > common_1.DAY)
        return true;
    // revalidate more aggressively for invalidated handles
    if (actor.handle === null && timeDiff > common_1.HOUR)
        return true;
    return false;
};
//# sourceMappingURL=index.js.map