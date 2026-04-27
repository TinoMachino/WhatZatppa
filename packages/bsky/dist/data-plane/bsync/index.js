"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockBsync = void 0;
const node_assert_1 = __importDefault(require("node:assert"));
const node_events_1 = __importDefault(require("node:events"));
const connect_express_1 = require("@connectrpc/connect-express");
const express_1 = __importDefault(require("express"));
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const index_js_1 = require("../../lexicons/index.js");
const logger_1 = require("../../logger");
const bsync_connect_1 = require("../../proto/bsync_connect");
const bsync_pb_1 = require("../../proto/bsync_pb");
const stash_1 = require("../../stash");
const util_1 = require("../server/db/util");
class MockBsync {
    constructor(server) {
        Object.defineProperty(this, "server", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: server
        });
    }
    static async create(db, port) {
        const app = (0, express_1.default)();
        const routes = createRoutes(db);
        app.use((0, connect_express_1.expressConnectMiddleware)({ routes }));
        const server = app.listen(port);
        await node_events_1.default.once(server, 'listening');
        return new MockBsync(server);
    }
    async destroy() {
        return new Promise((resolve, reject) => {
            this.server.close((err) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }
}
exports.MockBsync = MockBsync;
const createRoutes = (db) => (router) => router.service(bsync_connect_1.Service, {
    async addMuteOperation(req) {
        const { type, actorDid, subject } = req;
        if (type === bsync_pb_1.MuteOperation_Type.ADD) {
            if (subject.startsWith('did:')) {
                (0, node_assert_1.default)(actorDid !== subject, 'cannot mute yourself'); // @TODO pass message through in http error
                await db.db
                    .insertInto('mute')
                    .values({
                    mutedByDid: actorDid,
                    subjectDid: subject,
                    createdAt: new Date().toISOString(),
                })
                    .onConflict((oc) => oc.doNothing())
                    .execute();
            }
            else {
                const uri = new syntax_1.AtUri(subject);
                if (uri.collection === index_js_1.app.bsky.graph.list.$type) {
                    await db.db
                        .insertInto('list_mute')
                        .values({
                        mutedByDid: actorDid,
                        listUri: subject,
                        createdAt: new Date().toISOString(),
                    })
                        .onConflict((oc) => oc.doNothing())
                        .execute();
                }
                else {
                    await db.db
                        .insertInto('thread_mute')
                        .values({
                        mutedByDid: actorDid,
                        rootUri: subject,
                        createdAt: new Date().toISOString(),
                    })
                        .onConflict((oc) => oc.doNothing())
                        .execute();
                }
            }
        }
        else if (type === bsync_pb_1.MuteOperation_Type.REMOVE) {
            if (subject.startsWith('did:')) {
                await db.db
                    .deleteFrom('mute')
                    .where('mutedByDid', '=', actorDid)
                    .where('subjectDid', '=', subject)
                    .execute();
            }
            else {
                const uri = new syntax_1.AtUri(subject);
                if (uri.collection === index_js_1.app.bsky.graph.list.$type) {
                    await db.db
                        .deleteFrom('list_mute')
                        .where('mutedByDid', '=', actorDid)
                        .where('listUri', '=', subject)
                        .execute();
                }
                else {
                    await db.db
                        .deleteFrom('thread_mute')
                        .where('mutedByDid', '=', actorDid)
                        .where('rootUri', '=', subject)
                        .execute();
                }
            }
        }
        else if (type === bsync_pb_1.MuteOperation_Type.CLEAR) {
            await db.db
                .deleteFrom('mute')
                .where('mutedByDid', '=', actorDid)
                .execute();
            await db.db
                .deleteFrom('list_mute')
                .where('mutedByDid', '=', actorDid)
                .execute();
        }
        return {};
    },
    async scanMuteOperations() {
        throw new Error('not implemented');
    },
    async addNotifOperation(req) {
        const { actorDid, priority } = req;
        if (priority !== undefined) {
            await db.db
                .insertInto('actor_state')
                .values({
                did: actorDid,
                priorityNotifs: priority,
                lastSeenNotifs: new Date().toISOString(),
            })
                .onConflict((oc) => oc.column('did').doUpdateSet({ priorityNotifs: priority }))
                .execute();
        }
        return {};
    },
    async scanNotifOperations() {
        throw new Error('not implemented');
    },
    async putOperation(req) {
        const { actorDid, namespace, key, method, payload } = req;
        (0, node_assert_1.default)(method === bsync_pb_1.Method.CREATE ||
            method === bsync_pb_1.Method.UPDATE ||
            method === bsync_pb_1.Method.DELETE, `Unsupported method: ${method}`);
        const now = new Date().toISOString();
        // Index all items into private_data.
        await handleGenericOperation(db, req, now);
        // Maintain bespoke indexes for certain namespaces.
        try {
            if (namespace ===
                stash_1.Namespaces.AppBskyNotificationDefsSubjectActivitySubscription.$type) {
                await handleSubjectActivitySubscriptionOperation(db, req, now);
            }
            else if (namespace === stash_1.Namespaces.AppBskyUnspeccedDefsAgeAssuranceEvent.$type) {
                await handleAgeAssuranceEventOperation(db, req, now);
            }
            else if (namespace === stash_1.Namespaces.AppBskyAgeassuranceDefsEvent.$type) {
                await handleAgeAssuranceV2EventOperation(db, req, now);
            }
            else if (namespace === stash_1.Namespaces.AppBskyBookmarkDefsBookmark.$type) {
                await handleBookmarkOperation(db, req, now);
            }
            else if (namespace === stash_1.Namespaces.AppBskyDraftDefsDraftWithId.$type) {
                await handleDraftOperation(db, req, now);
            }
        }
        catch (err) {
            logger_1.httpLogger.warn({ err, namespace }, 'mock bsync put operation failed');
        }
        return {
            operation: {
                id: common_1.TID.nextStr(),
                actorDid,
                namespace,
                key,
                method,
                payload,
            },
        };
    },
    async scanOperations() {
        throw new Error('not implemented');
    },
    async ping() {
        return {};
    },
});
// upsert into or remove from private_data
const handleGenericOperation = async (db, req, now) => {
    const { actorDid, namespace, key, method, payload } = req;
    if (method === bsync_pb_1.Method.CREATE || method === bsync_pb_1.Method.UPDATE) {
        await db.db
            .insertInto('private_data')
            .values({
            actorDid,
            namespace,
            key,
            payload: Buffer.from(payload).toString('utf8'),
            indexedAt: now,
            updatedAt: now,
        })
            .onConflict((oc) => oc.columns(['actorDid', 'namespace', 'key']).doUpdateSet({
            payload: (0, util_1.excluded)(db.db, 'payload'),
            updatedAt: (0, util_1.excluded)(db.db, 'updatedAt'),
        }))
            .execute();
    }
    else if (method === bsync_pb_1.Method.DELETE) {
        await db.db
            .deleteFrom('private_data')
            .where('actorDid', '=', actorDid)
            .where('namespace', '=', namespace)
            .where('key', '=', key)
            .execute();
    }
    else {
        node_assert_1.default.fail(`unexpected method ${method}`);
    }
};
const handleSubjectActivitySubscriptionOperation = async (db, req, now) => {
    const { actorDid, key, method, payload } = req;
    if (method === bsync_pb_1.Method.DELETE) {
        return db.db
            .deleteFrom('activity_subscription')
            .where('creator', '=', actorDid)
            .where('key', '=', key)
            .execute();
    }
    const parsed = (0, lex_1.lexParseJsonBytes)(payload);
    const { subject, activitySubscription: { post, reply }, } = parsed;
    if (method === bsync_pb_1.Method.CREATE) {
        return db.db
            .insertInto('activity_subscription')
            .values({
            creator: actorDid,
            subjectDid: subject,
            key,
            indexedAt: now,
            post,
            reply,
        })
            .execute();
    }
    return db.db
        .updateTable('activity_subscription')
        .where('creator', '=', actorDid)
        .where('key', '=', key)
        .set({
        indexedAt: now,
        post,
        reply,
    })
        .execute();
};
const handleAgeAssuranceEventOperation = async (db, req, _now) => {
    const { actorDid, method, payload } = req;
    if (method !== bsync_pb_1.Method.CREATE)
        return;
    const parsed = (0, lex_1.lexParseJsonBytes)(payload);
    const { status, createdAt } = parsed;
    const update = {
        ageAssuranceStatus: status,
        ageAssuranceLastInitiatedAt: status === 'pending' ? createdAt : undefined,
    };
    return db.db
        .updateTable('actor')
        .set(update)
        .where('did', '=', actorDid)
        .execute();
};
const handleAgeAssuranceV2EventOperation = async (db, req, _now) => {
    const { actorDid, method, payload } = req;
    if (method !== bsync_pb_1.Method.CREATE)
        return;
    const parsed = (0, lex_1.lexParseJsonBytes)(payload);
    const { status, createdAt, access, countryCode, regionCode } = parsed;
    const update = {
        ageAssuranceStatus: status,
        ageAssuranceLastInitiatedAt: status === 'pending' ? createdAt : undefined,
        ageAssuranceAccess: access,
        ageAssuranceCountryCode: countryCode,
        ageAssuranceRegionCode: regionCode,
    };
    return db.db
        .updateTable('actor')
        .set(update)
        .where('did', '=', actorDid)
        .execute();
};
const handleBookmarkOperation = async (db, req, now) => {
    const { actorDid, key, method, payload } = req;
    const updateAgg = (uri, dbTxn) => {
        return dbTxn.db
            .insertInto('post_agg')
            .values({
            uri,
            bookmarkCount: dbTxn.db
                .selectFrom('bookmark')
                .where('bookmark.subjectUri', '=', uri)
                .select(util_1.countAll.as('count')),
        })
            .onConflict((oc) => oc
            .column('uri')
            .doUpdateSet({ bookmarkCount: (0, util_1.excluded)(dbTxn.db, 'bookmarkCount') }))
            .execute();
    };
    if (method === bsync_pb_1.Method.CREATE) {
        const parsed = (0, lex_1.lexParseJsonBytes)(payload);
        const { subject: { uri, cid }, } = parsed;
        await db.transaction(async (dbTxn) => {
            await dbTxn.db
                .insertInto('bookmark')
                .values({
                creator: actorDid,
                key,
                indexedAt: now,
                subjectUri: uri,
                subjectCid: cid,
            })
                .execute();
            await updateAgg(uri, dbTxn);
        });
    }
    if (method === bsync_pb_1.Method.DELETE) {
        await db.transaction(async (dbTxn) => {
            const bookmark = await dbTxn.db
                .selectFrom('bookmark')
                .selectAll()
                .where('creator', '=', actorDid)
                .where('key', '=', key)
                .executeTakeFirst();
            if (bookmark) {
                await dbTxn.db
                    .deleteFrom('bookmark')
                    .where('creator', '=', actorDid)
                    .where('key', '=', key)
                    .execute();
                await updateAgg(bookmark.subjectUri, dbTxn);
            }
        });
    }
};
const handleDraftOperation = async (db, req, now) => {
    const { actorDid, key, method, payload } = req;
    if (method === bsync_pb_1.Method.CREATE) {
        const payloadString = Buffer.from(payload).toString('utf8');
        await db.db
            .insertInto('draft')
            .values({
            creator: actorDid,
            key,
            createdAt: now,
            updatedAt: now,
            payload: payloadString,
        })
            .execute();
    }
    if (method === bsync_pb_1.Method.UPDATE) {
        const payloadString = Buffer.from(payload).toString('utf8');
        await db.db
            .updateTable('draft')
            .where('creator', '=', actorDid)
            .where('key', '=', key)
            .set({
            updatedAt: now,
            payload: payloadString,
        })
            .execute();
    }
    if (method === bsync_pb_1.Method.DELETE) {
        await db.db
            .deleteFrom('draft')
            .where('creator', '=', actorDid)
            .where('key', '=', key)
            .execute();
    }
};
//# sourceMappingURL=index.js.map