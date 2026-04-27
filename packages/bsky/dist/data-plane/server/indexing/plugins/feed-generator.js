"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicons");
const processor_1 = require("../processor");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const inserted = await db
        .insertInto('feed_generator')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        feedDid: obj.did,
        displayName: obj.displayName,
        description: obj.description,
        descriptionFacets: obj.descriptionFacets
            ? JSON.stringify(obj.descriptionFacets)
            : undefined,
        avatarCid: (0, lex_1.getBlobCidString)(obj.avatar),
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    return inserted || null;
};
const findDuplicate = async () => {
    return null;
};
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('feed_generator')
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
        schema: lexicons_1.app.bsky.feed.generator.main,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=feed-generator.js.map