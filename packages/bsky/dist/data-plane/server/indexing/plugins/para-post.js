"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
// @ts-nocheck
const kysely_1 = require("kysely");
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const para_profile_stats_1 = require("./para-profile-stats");
const discourse_indexing_1 = require("../discourse-indexing");
const lexId = 'com.para.post';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const post = {
        uri: uri.toString(),
        cid: cid.toString(),
        creator: uri.host,
        text: obj.text,
        createdAt: (0, syntax_1.normalizeDatetimeAlways)(obj.createdAt),
        replyRoot: obj.reply?.root?.uri || null,
        replyRootCid: obj.reply?.root?.cid || null,
        replyParent: obj.reply?.parent?.uri || null,
        replyParentCid: obj.reply?.parent?.cid || null,
        langs: obj.langs?.length
            ? (0, kysely_1.sql) `${JSON.stringify(obj.langs)}`
            : null,
        tags: obj.tags?.length ? (0, kysely_1.sql) `${JSON.stringify(obj.tags)}` : null,
        flairs: obj.flairs?.length
            ? (0, kysely_1.sql) `${JSON.stringify(obj.flairs)}`
            : null,
        postType: obj.postType || null,
        indexedAt: timestamp,
    };
    const insertedPost = await db
        .insertInto('para_post')
        .values(post)
        .onConflict((oc) => oc.doNothing())
        .returningAll()
        .executeTakeFirst();
    if (!insertedPost) {
        return null;
    }
    await (0, discourse_indexing_1.indexPostDiscourse)(db, uri, obj.text, timestamp);
    return {
        post: insertedPost,
        facets: [],
    };
};
const findDuplicate = async () => {
    return null;
};
const notifsForInsert = (_obj) => {
    return [];
};
const deleteFn = async (db, uri) => {
    const [deleted] = await Promise.all([
        db
            .deleteFrom('para_post')
            .where('uri', '=', uri.toString())
            .returningAll()
            .executeTakeFirst(),
        db
            .deleteFrom('para_post_meta')
            .where('postUri', '=', uri.toString())
            .executeTakeFirst(),
        (0, discourse_indexing_1.deletePostDiscourse)(db, uri),
    ]);
    return deleted
        ? {
            post: deleted,
            facets: [],
        }
        : null;
};
const notifsForDelete = (deleted, replacedBy) => {
    const notifs = replacedBy ? notifsForInsert(replacedBy) : [];
    return {
        notifs,
        toDelete: [deleted.post.uri],
    };
};
const updateAggregates = async (db, postIdx) => {
    await (0, para_profile_stats_1.recomputeParaProfileStats)(db, postIdx.post.creator);
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
//# sourceMappingURL=para-post.js.map