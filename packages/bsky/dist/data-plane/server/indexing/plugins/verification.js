"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicons");
const processor_1 = require("../processor");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const inserted = await db
        .insertInto('verification')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        rkey: uri.rkey,
        creator: uri.host,
        subject: obj.subject,
        handle: obj.handle,
        displayName: obj.displayName,
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
        .selectFrom('verification')
        .where('subject', '=', obj.subject)
        .where('creator', '=', uri.host)
        .selectAll()
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = (obj) => {
    return [
        {
            did: obj.subject,
            author: obj.creator,
            recordUri: obj.uri,
            recordCid: obj.cid,
            reason: 'verified',
            reasonSubject: null,
            sortAt: obj.sortedAt,
        },
    ];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('verification')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted || null;
};
const notifsForDelete = (deleted, _replacedBy) => {
    return {
        notifs: [
            {
                did: deleted.subject,
                author: deleted.creator,
                recordUri: deleted.uri,
                recordCid: deleted.cid,
                reason: 'unverified',
                reasonSubject: null,
                sortAt: new Date().toISOString(),
            },
        ],
        toDelete: [],
    };
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        schema: lexicons_1.app.bsky.graph.verification.main,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=verification.js.map