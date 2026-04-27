"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const lexicons_1 = require("../../../../lexicons");
const processor_1 = require("../processor");
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const postUri = new syntax_1.AtUri(obj.post);
    if (postUri.host !== uri.host || postUri.rkey !== uri.rkey) {
        throw new xrpc_server_1.InvalidRequestError('Creator and rkey of post gate does not match its post');
    }
    const inserted = await db
        .insertInto('post_gate')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        postUri: obj.post,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    await db
        .updateTable('post')
        .where('uri', '=', postUri.toString())
        .set({ hasPostGate: true })
        .executeTakeFirst();
    return inserted || null;
};
const findDuplicate = async (db, _uri, obj) => {
    const found = await db
        .selectFrom('post_gate')
        .where('postUri', '=', obj.post)
        .selectAll()
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('post_gate')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    if (deleted) {
        await db
            .updateTable('post')
            .where('uri', '=', deleted.postUri)
            .set({ hasPostGate: false })
            .executeTakeFirst();
    }
    return deleted || null;
};
const notifsForDelete = () => {
    return { notifs: [], toDelete: [] };
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        schema: lexicons_1.app.bsky.feed.postgate.main,
        insertFn,
        findDuplicate,
        deleteFn,
        notifsForInsert,
        notifsForDelete,
    });
};
exports.makePlugin = makePlugin;
exports.default = exports.makePlugin;
//# sourceMappingURL=post-gate.js.map