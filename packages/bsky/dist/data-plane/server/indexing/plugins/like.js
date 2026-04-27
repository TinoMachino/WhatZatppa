"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../db/util");
const processor_1 = require("../processor");
const para_profile_stats_1 = require("./para-profile-stats");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const inserted = await db
        .insertInto('like')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        subject: obj.subject.uri,
        subjectCid: obj.subject.cid,
        via: obj.via?.uri,
        viaCid: obj.via?.cid,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    return inserted || null;
};
const findDuplicate = async (db, uri, obj) => {
    const found = await db
        .selectFrom('like')
        .where('creator', '=', uri.host)
        .where('subject', '=', obj.subject.uri)
        .selectAll()
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = (obj) => {
    const subjectUri = new syntax_1.AtUri(obj.subject);
    // prevent self-notifications
    const isLikeFromSubjectUser = subjectUri.host === obj.creator;
    if (isLikeFromSubjectUser) {
        return [];
    }
    const notifs = [
        // Notification to the author of the liked record.
        {
            did: subjectUri.host,
            author: obj.creator,
            recordUri: obj.uri,
            recordCid: obj.cid,
            reason: 'like',
            reasonSubject: subjectUri.toString(),
            sortAt: obj.sortAt,
        },
    ];
    if (obj.via) {
        const viaUri = new syntax_1.AtUri(obj.via);
        const isLikeFromViaSubjectUser = viaUri.host === obj.creator;
        // prevent self-notifications
        if (!isLikeFromViaSubjectUser) {
            notifs.push(
            // Notification to the reposter via whose repost the like was made.
            {
                did: viaUri.host,
                author: obj.creator,
                recordUri: obj.uri,
                recordCid: obj.cid,
                reason: 'like-via-repost',
                reasonSubject: viaUri.toString(),
                sortAt: obj.sortAt,
            });
        }
    }
    return notifs;
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('like')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted || null;
};
const notifsForDelete = (deleted, replacedBy) => {
    const toDelete = replacedBy ? [] : [deleted.uri];
    return { notifs: [], toDelete };
};
const updateAggregates = async (db, like) => {
    const likeCountQb = db
        .insertInto('post_agg')
        .values({
        uri: like.subject,
        likeCount: db
            .selectFrom('like')
            .where('like.subject', '=', like.subject)
            .select(util_1.countAll.as('count')),
    })
        .onConflict((oc) => oc.column('uri').doUpdateSet({ likeCount: (0, util_1.excluded)(db, 'likeCount') }));
    await likeCountQb.execute();
    const subjectUri = new syntax_1.AtUri(like.subject);
    if (subjectUri.collection === 'com.para.post') {
        await Promise.all([
            (0, para_profile_stats_1.recomputeParaProfileStats)(db, subjectUri.host),
            (0, para_profile_stats_1.recomputeParaProfileStats)(db, like.creator),
        ]);
    }
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        schema: lexicons_1.app.bsky.feed.like.main,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
        updateAggregates,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=like.js.map