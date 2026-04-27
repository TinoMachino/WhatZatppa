"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicons");
const util_1 = require("../../db/util");
const processor_1 = require("../processor");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const inserted = await db
        .insertInto('follow')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        subjectDid: obj.subject,
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
        .selectFrom('follow')
        .where('creator', '=', uri.host)
        .where('subjectDid', '=', obj.subject)
        .selectAll()
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = (obj) => {
    return [
        {
            did: obj.subjectDid,
            author: obj.creator,
            recordUri: obj.uri,
            recordCid: obj.cid,
            reason: 'follow',
            reasonSubject: null,
            sortAt: obj.sortAt,
        },
    ];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('follow')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted || null;
};
const notifsForDelete = (deleted, replacedBy) => {
    const toDelete = replacedBy ? [] : [deleted.uri];
    return { notifs: [], toDelete };
};
const updateAggregates = async (db, follow) => {
    const followersCountQb = db
        .insertInto('profile_agg')
        .values({
        did: follow.subjectDid,
        followersCount: db
            .selectFrom('follow')
            .where('follow.subjectDid', '=', follow.subjectDid)
            .select(util_1.countAll.as('count')),
    })
        .onConflict((oc) => oc.column('did').doUpdateSet({
        followersCount: (0, util_1.excluded)(db, 'followersCount'),
    }));
    const followsCountQb = db
        .insertInto('profile_agg')
        .values({
        did: follow.creator,
        followsCount: db
            .selectFrom('follow')
            .where('follow.creator', '=', follow.creator)
            .select(util_1.countAll.as('count')),
    })
        .onConflict((oc) => oc.column('did').doUpdateSet({
        followsCount: (0, util_1.excluded)(db, 'followsCount'),
    }));
    await Promise.all([followersCountQb.execute(), followsCountQb.execute()]);
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        schema: lexicons_1.app.bsky.graph.follow.main,
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
//# sourceMappingURL=follow.js.map