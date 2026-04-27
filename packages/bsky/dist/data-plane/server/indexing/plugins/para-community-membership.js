"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
// @ts-nocheck
const kysely_1 = require("kysely");
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const lexId = 'com.para.community.membership';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const inserted = await db
        .insertInto('para_community_membership')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        communityUri: obj.community,
        membershipState: obj.membershipState,
        roles: obj.roles?.length ? (0, kysely_1.sql) `${JSON.stringify(obj.roles)}` : null,
        source: obj.source ?? null,
        joinedAt: (0, syntax_1.normalizeDatetimeAlways)(obj.joinedAt),
        leftAt: obj.leftAt ? (0, syntax_1.normalizeDatetimeAlways)(obj.leftAt) : null,
        indexedAt: timestamp,
    })
        .onConflict(oc => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    return inserted ?? null;
};
const findDuplicate = async (db, uri, obj) => {
    const found = await db
        .selectFrom('para_community_membership')
        .where('creator', '=', uri.host)
        .where('communityUri', '=', obj.community)
        .select('uri')
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = () => {
    return [];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('para_community_membership')
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
exports.default = exports.makePlugin;
//# sourceMappingURL=para-community-membership.js.map