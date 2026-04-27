"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const lexId = 'com.para.highlight.annotation';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const start = Math.max(0, Math.trunc(obj.start));
    const end = Math.max(start, Math.trunc(obj.end));
    const inserted = await db
        .insertInto('highlight_annotation')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        subjectUri: obj.subjectUri,
        subjectCid: obj.subjectCid || null,
        text: obj.text,
        start,
        end,
        color: obj.color,
        tag: obj.tag || null,
        community: obj.community || null,
        state: obj.state || null,
        party: obj.party || null,
        visibility: obj.visibility,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    if (!inserted)
        return null;
    return { record: inserted };
};
const findDuplicate = async () => {
    return null;
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('highlight_annotation')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted ? { record: deleted } : null;
};
const notifsForInsert = () => {
    return [];
};
const notifsForDelete = (deleted, _replacedBy) => {
    return { notifs: [], toDelete: [deleted.record.uri] };
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
//# sourceMappingURL=highlight.js.map