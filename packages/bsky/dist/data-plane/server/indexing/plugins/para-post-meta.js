"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
// @ts-nocheck
const kysely_1 = require("kysely");
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const para_profile_stats_1 = require("./para-profile-stats");
const discourse_indexing_1 = require("../discourse-indexing");
const lexId = 'com.para.social.postMeta';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const postUri = new syntax_1.AtUri(obj.post);
    if (postUri.host !== uri.host) {
        return null;
    }
    const inserted = await db
        .insertInto('para_post_meta')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        postUri: obj.post,
        postType: obj.postType,
        official: typeof obj.official === 'boolean' ? obj.official : null,
        party: obj.party ?? null,
        community: obj.community ?? null,
        category: obj.category ?? null,
        tags: obj.tags?.length ? (0, kysely_1.sql) `${JSON.stringify(obj.tags)}` : null,
        flairs: obj.flairs?.length
            ? (0, kysely_1.sql) `${JSON.stringify(obj.flairs)}`
            : null,
        voteScore: obj.voteScore ?? 0,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    if (inserted && obj.community) {
        await (0, discourse_indexing_1.updatePostDiscourseCommunity)(db, obj.post, obj.community);
    }
    return inserted ?? null;
};
const findDuplicate = async (db, _uri, obj) => {
    const found = await db
        .selectFrom('para_post_meta')
        .where('postUri', '=', obj.post)
        .select('uri')
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const notifsForInsert = (_obj) => {
    return [];
};
const deleteFn = async (db, uri) => {
    const deleted = await db
        .deleteFrom('para_post_meta')
        .where('uri', '=', uri.toString())
        .returningAll()
        .executeTakeFirst();
    return deleted ?? null;
};
const notifsForDelete = (deleted, replacedBy) => {
    const notifs = replacedBy ? notifsForInsert(replacedBy) : [];
    return {
        notifs,
        toDelete: [deleted.uri],
    };
};
const updateAggregates = async (db, obj) => {
    await (0, para_profile_stats_1.recomputeParaProfileStats)(db, obj.creator);
};
const makePlugin = (db, background) => {
    return new processor_1.RecordProcessor(db, background, {
        lexId,
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
//# sourceMappingURL=para-post-meta.js.map