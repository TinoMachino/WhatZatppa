"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const lexicons_1 = require("../../../../lexicons");
const processor_1 = require("../processor");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    if (uri.rkey !== 'self')
        return null;
    const inserted = await db
        .insertInto('profile')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        displayName: obj.displayName,
        description: obj.description,
        avatarCid: (0, lex_1.getBlobCidString)(obj.avatar),
        bannerCid: (0, lex_1.getBlobCidString)(obj.banner),
        joinedViaStarterPackUri: obj.joinedViaStarterPack?.uri,
        createdAt: obj.createdAt ?? new Date().toISOString(),
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
const notifsForInsert = (obj) => {
    if (!obj.joinedViaStarterPackUri)
        return [];
    const starterPackUri = new syntax_1.AtUri(obj.joinedViaStarterPackUri);
    return [
        {
            did: starterPackUri.host,
            author: obj.creator,
            recordUri: obj.uri,
            recordCid: obj.cid,
            reason: 'starterpack-joined',
            reasonSubject: obj.joinedViaStarterPackUri,
            sortAt: obj.indexedAt,
        },
    ];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('profile')
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
        schema: lexicons_1.app.bsky.actor.profile.main,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=profile.js.map