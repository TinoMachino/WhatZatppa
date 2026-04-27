"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicons");
const processor_1 = require("../processor");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const inserted = await db
        .insertInto('list_block')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        subjectUri: obj.subject,
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
        .selectFrom('list_block')
        .where('creator', '=', uri.host)
        .where('subjectUri', '=', obj.subject)
        .selectAll()
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('list_block')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted || null;
};
const notifsForDelete = () => {
    return { notifs: [], toDelete: [] };
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        schema: lexicons_1.app.bsky.graph.listblock.main,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=list-block.js.map