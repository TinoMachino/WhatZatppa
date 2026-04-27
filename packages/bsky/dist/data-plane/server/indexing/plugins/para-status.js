"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const lexId = 'com.para.status';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    if (uri.rkey !== 'self')
        return null;
    const inserted = await db
        .insertInto('para_status')
        .values({
        did: uri.host,
        uri: uri.toString(),
        cid: cid.toString(),
        status: obj.status,
        party: obj.party ?? null,
        community: obj.community ?? null,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.column('did').doUpdateSet({
        uri: uri.toString(),
        cid: cid.toString(),
        status: obj.status,
        party: obj.party ?? null,
        community: obj.community ?? null,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    }))
        .returningAll()
        .executeTakeFirst();
    return inserted ?? null;
};
const findDuplicate = async () => {
    return null;
};
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (db, uri) => {
    if (uri.rkey !== 'self')
        return null;
    const deleted = await db
        .deleteFrom('para_status')
        .where('did', '=', uri.host)
        .returningAll()
        .executeTakeFirst();
    return deleted ?? null;
};
const notifsForDelete = () => {
    return { notifs: [], toDelete: [] };
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        lexId,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=para-status.js.map