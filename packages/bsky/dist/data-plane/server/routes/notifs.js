"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationPreferencesLexToProtobuf = void 0;
const protobuf_1 = require("@bufbuild/protobuf");
const kysely_1 = require("kysely");
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const bsky_pb_1 = require("../../../proto/bsky_pb");
const stash_1 = require("../../../stash");
const pagination_1 = require("../db/pagination");
const util_1 = require("../db/util");
exports.default = (db) => ({
    async getNotifications(req) {
        const { actorDid, limit, cursor, priority } = req;
        const { ref } = db.db.dynamic;
        const priorityFollowQb = db.db
            .selectFrom('follow')
            .select((0, kysely_1.sql) `${true}`.as('val'))
            .where('creator', '=', actorDid)
            .whereRef('subjectDid', '=', ref('notif.author'))
            .limit(1);
        let builder = db.db
            .selectFrom('notification as notif')
            .where('notif.did', '=', actorDid)
            .where((clause) => clause
            .where('reasonSubject', 'is', null)
            .orWhereExists(db.db
            .selectFrom('record as subject')
            .selectAll()
            .whereRef('subject.uri', '=', ref('notif.reasonSubject'))))
            .if(priority, (qb) => qb.whereExists(priorityFollowQb))
            .select([
            'notif.author as authorDid',
            'notif.recordUri as uri',
            'notif.recordCid as cid',
            'notif.reason as reason',
            'notif.reasonSubject as reasonSubject',
            'notif.sortAt as sortAt',
        ])
            .select(priorityFollowQb.as('priority'));
        const key = new pagination_1.IsoSortAtKey(ref('notif.sortAt'));
        builder = key.paginate(builder, {
            cursor,
            limit,
        });
        const notifsRes = await builder.execute();
        const notifications = notifsRes.map((notif) => ({
            recipientDid: actorDid,
            uri: notif.uri,
            reason: notif.reason,
            reasonSubject: notif.reasonSubject ?? undefined,
            timestamp: protobuf_1.Timestamp.fromDate(new Date(notif.sortAt)),
            priority: notif.priority ?? false,
        }));
        return {
            notifications,
            cursor: key.packFromResult(notifsRes),
        };
    },
    async getNotificationSeen(req) {
        const { actorDid, priority } = req;
        const res = await db.db
            .selectFrom('actor_state')
            .where('did', '=', actorDid)
            .selectAll()
            .executeTakeFirst();
        if (!res) {
            return {};
        }
        const lastSeen = priority && res.lastSeenPriorityNotifs
            ? res.lastSeenPriorityNotifs
            : res.lastSeenNotifs;
        return {
            timestamp: protobuf_1.Timestamp.fromDate(new Date(lastSeen)),
        };
    },
    async getUnreadNotificationCount(req) {
        const { actorDid, priority } = req;
        const { ref } = db.db.dynamic;
        const lastSeenRes = await db.db
            .selectFrom('actor_state')
            .where('did', '=', actorDid)
            .selectAll()
            .executeTakeFirst();
        const lastSeen = priority && lastSeenRes?.lastSeenPriorityNotifs
            ? lastSeenRes.lastSeenPriorityNotifs
            : lastSeenRes?.lastSeenNotifs;
        const result = await db.db
            .selectFrom('notification')
            .select(util_1.countAll.as('count'))
            .innerJoin('actor', 'actor.did', 'notification.did')
            .leftJoin('actor_state', 'actor_state.did', 'actor.did')
            .innerJoin('record', 'record.uri', 'notification.recordUri')
            .where((0, util_1.notSoftDeletedClause)(ref('record')))
            .where((0, util_1.notSoftDeletedClause)(ref('actor')))
            // Ensure to hit notification_did_sortat_idx, handling case where lastSeenNotifs is null.
            .where('notification.did', '=', actorDid)
            .where('notification.sortAt', '>', lastSeen ?? '')
            .if(priority, (qb) => qb.whereExists(db.db
            .selectFrom('follow')
            .select((0, kysely_1.sql) `${true}`.as('val'))
            .where('creator', '=', actorDid)
            .whereRef('subjectDid', '=', ref('notification.author'))))
            .executeTakeFirst();
        return {
            count: result?.count,
        };
    },
    async updateNotificationSeen(req) {
        const { actorDid, timestamp, priority } = req;
        if (!timestamp) {
            return;
        }
        const timestampIso = timestamp.toDate().toISOString();
        let builder = db.db
            .updateTable('actor_state')
            .where('did', '=', actorDid)
            .returningAll();
        if (priority) {
            builder = builder.set({ lastSeenPriorityNotifs: timestampIso });
        }
        else {
            builder = builder.set({ lastSeenNotifs: timestampIso });
        }
        const updateRes = await builder.executeTakeFirst();
        if (updateRes) {
            return;
        }
        await db.db
            .insertInto('actor_state')
            .values({
            did: actorDid,
            lastSeenNotifs: timestampIso,
            priorityNotifs: priority,
            lastSeenPriorityNotifs: priority ? timestampIso : undefined,
        })
            .onConflict((oc) => oc.doNothing())
            .executeTakeFirst();
    },
    async getNotificationPreferences(req) {
        const { dids } = req;
        if (dids.length === 0) {
            return { preferences: [] };
        }
        const res = await db.db
            .selectFrom('private_data')
            .selectAll()
            .where('actorDid', 'in', dids)
            .where('namespace', '=', stash_1.Namespaces.AppBskyNotificationDefsPreferences.$type)
            .where('key', '=', 'self')
            .execute();
        const byDid = (0, common_1.keyBy)(res, 'actorDid');
        const preferences = dids.map((did) => {
            const row = byDid.get(did);
            if (!row) {
                return {};
            }
            const p = (0, lex_1.lexParse)(row.payload);
            return (0, exports.notificationPreferencesLexToProtobuf)(p, row.payload);
        });
        return { preferences };
    },
});
const notificationPreferencesLexToProtobuf = (p, json) => {
    const lexChatPreferenceToProtobuf = (p) => new bsky_pb_1.ChatNotificationPreference({
        include: p.include === 'accepted'
            ? bsky_pb_1.ChatNotificationInclude.ACCEPTED
            : bsky_pb_1.ChatNotificationInclude.ALL,
        push: { enabled: p.push ?? true },
    });
    const lexFilterablePreferenceToProtobuf = (p) => new bsky_pb_1.FilterableNotificationPreference({
        include: p.include === 'follows'
            ? bsky_pb_1.NotificationInclude.FOLLOWS
            : bsky_pb_1.NotificationInclude.ALL,
        list: { enabled: p.list ?? true },
        push: { enabled: p.push ?? true },
    });
    const lexPreferenceToProtobuf = (p) => new bsky_pb_1.NotificationPreference({
        list: { enabled: p.list ?? true },
        push: { enabled: p.push ?? true },
    });
    return new bsky_pb_1.NotificationPreferences({
        entry: Buffer.from(json),
        chat: lexChatPreferenceToProtobuf(p.chat),
        follow: lexFilterablePreferenceToProtobuf(p.follow),
        like: lexFilterablePreferenceToProtobuf(p.like),
        likeViaRepost: lexFilterablePreferenceToProtobuf(p.likeViaRepost),
        mention: lexFilterablePreferenceToProtobuf(p.mention),
        quote: lexFilterablePreferenceToProtobuf(p.quote),
        reply: lexFilterablePreferenceToProtobuf(p.reply),
        repost: lexFilterablePreferenceToProtobuf(p.repost),
        repostViaRepost: lexFilterablePreferenceToProtobuf(p.repostViaRepost),
        starterpackJoined: lexPreferenceToProtobuf(p.starterpackJoined),
        subscribedPost: lexPreferenceToProtobuf(p.subscribedPost),
        unverified: lexPreferenceToProtobuf(p.unverified),
        verified: lexPreferenceToProtobuf(p.verified),
    });
};
exports.notificationPreferencesLexToProtobuf = notificationPreferencesLexToProtobuf;
//# sourceMappingURL=notifs.js.map