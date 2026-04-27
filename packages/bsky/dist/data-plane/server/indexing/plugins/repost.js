"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../db/util");
const processor_1 = require("../processor");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const repost = {
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        subject: obj.subject.uri,
        subjectCid: obj.subject.cid,
        via: obj.via?.uri,
        viaCid: obj.via?.cid,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    };
    const [inserted] = await Promise.all([
        db
            .insertInto('repost')
            .values(repost)
            .onConflict((oc) => oc.doNothing())
            .returningAll()
            .executeTakeFirst(),
        db
            .insertInto('feed_item')
            .values({
            type: 'repost',
            uri: repost.uri,
            cid: repost.cid,
            postUri: repost.subject,
            originatorDid: repost.creator,
            sortAt: repost.indexedAt < repost.createdAt
                ? repost.indexedAt
                : repost.createdAt,
        })
            .onConflict((oc) => oc.doNothing())
            .executeTakeFirst(),
    ]);
    return inserted || null;
};
const findDuplicate = async (db, uri, obj) => {
    const found = await db
        .selectFrom('repost')
        .where('creator', '=', uri.host)
        .where('subject', '=', obj.subject.uri)
        .selectAll()
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = (obj) => {
    const subjectUri = new syntax_1.AtUri(obj.subject);
    // prevent self-notifications
    const isRepostFromSubjectUser = subjectUri.host === obj.creator;
    if (isRepostFromSubjectUser) {
        return [];
    }
    const notifs = [
        // Notification to the author of the reposted record.
        {
            did: subjectUri.host,
            author: obj.creator,
            recordUri: obj.uri,
            recordCid: obj.cid,
            reason: 'repost',
            reasonSubject: subjectUri.toString(),
            sortAt: obj.sortAt,
        },
    ];
    if (obj.via) {
        const viaUri = new syntax_1.AtUri(obj.via);
        const isRepostFromViaSubjectUser = viaUri.host === obj.creator;
        // prevent self-notifications
        if (!isRepostFromViaSubjectUser) {
            notifs.push(
            // Notification to the reposter via whose repost the repost was made.
            {
                did: viaUri.host,
                author: obj.creator,
                recordUri: obj.uri,
                recordCid: obj.cid,
                reason: 'repost-via-repost',
                reasonSubject: viaUri.toString(),
                sortAt: obj.sortAt,
            });
        }
    }
    return notifs;
};
const deleteFn = async (db, uri) => {
    const uriStr = uri.toString();
    const [deleted] = await Promise.all([
        db
            .deleteFrom('repost')
            .where('uri', '=', uriStr)
            .returningAll()
            .executeTakeFirst(),
        db.deleteFrom('feed_item').where('uri', '=', uriStr).executeTakeFirst(),
    ]);
    return deleted || null;
};
const notifsForDelete = (deleted, replacedBy) => {
    const toDelete = replacedBy ? [] : [deleted.uri];
    return { notifs: [], toDelete };
};
const updateAggregates = async (db, repost) => {
    const repostCountQb = db
        .insertInto('post_agg')
        .values({
        uri: repost.subject,
        repostCount: db
            .selectFrom('repost')
            .where('repost.subject', '=', repost.subject)
            .select(util_1.countAll.as('count')),
    })
        .onConflict((oc) => oc
        .column('uri')
        .doUpdateSet({ repostCount: (0, util_1.excluded)(db, 'repostCount') }));
    await repostCountQb.execute();
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        schema: lexicons_1.app.bsky.feed.repost.main,
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
//# sourceMappingURL=repost.js.map