"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const lexId = 'com.para.community.board';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const inserted = await db
        .insertInto('para_community_board')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        rkey: uri.rkey,
        name: obj.name,
        description: obj.description ?? null,
        quadrant: obj.quadrant,
        slug: deriveBoardSlug(uri, obj.name),
        delegatesChatId: obj.delegatesChatId,
        subdelegatesChatId: obj.subdelegatesChatId,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    })
        .onConflict(oc => oc.doNothing())
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
    const deleted = await db
        .deleteFrom('para_community_board')
        .where('uri', '=', uri.toString())
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
function deriveBoardSlug(uri, name) {
    const base = normalizeSlug(name);
    return base ? `${base}-${uri.rkey}` : `community-${uri.rkey}`;
}
function normalizeSlug(value) {
    return value
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}
exports.default = exports.makePlugin;
//# sourceMappingURL=para-community-board.js.map