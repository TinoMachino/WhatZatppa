"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makePlugin = void 0;
const syntax_1 = require("@atproto/syntax");
const processor_1 = require("../processor");
const lexId = 'com.para.community.governance';
const insertFn = async (db, uri, cid, obj, timestamp) => {
    const metadata = obj.metadata;
    await db
        .insertInto('para_community_governance')
        .values({
        uri: uri.toString(),
        cid: cid.toString(),
        communityUri: obj.community || '',
        state: metadata?.state || null,
        matterFlairIds: metadata?.matterFlairIds ? JSON.stringify(metadata.matterFlairIds) : null,
        policyFlairIds: metadata?.policyFlairIds ? JSON.stringify(metadata.policyFlairIds) : null,
        moderatorCount: Array.isArray(obj.moderators) ? obj.moderators.length : 0,
        officialCount: Array.isArray(obj.officials) ? obj.officials.length : 0,
        deputyRoleCount: Array.isArray(obj.deputies) ? obj.deputies.length : 0,
        lastPublishedAt: metadata?.lastPublishedAt || obj.updatedAt || null,
        indexedAt: timestamp,
    })
        .onConflict((oc) => oc.column('uri').doUpdateSet({
        cid: cid.toString(),
        communityUri: obj.community || '',
        state: metadata?.state || null,
        matterFlairIds: metadata?.matterFlairIds ? JSON.stringify(metadata.matterFlairIds) : null,
        policyFlairIds: metadata?.policyFlairIds ? JSON.stringify(metadata.policyFlairIds) : null,
        moderatorCount: Array.isArray(obj.moderators) ? obj.moderators.length : 0,
        officialCount: Array.isArray(obj.officials) ? obj.officials.length : 0,
        deputyRoleCount: Array.isArray(obj.deputies) ? obj.deputies.length : 0,
        lastPublishedAt: metadata?.lastPublishedAt || obj.updatedAt || null,
        indexedAt: timestamp,
    }))
        .execute();
    return obj;
};
const findDuplicate = async (db, uri, obj) => {
    const found = await db
        .selectFrom('para_community_governance')
        .select('uri')
        .where('communityUri', '=', obj.community || '')
        .where('uri', '!=', uri.toString())
        .executeTakeFirst();
    return found ? new syntax_1.AtUri(found.uri) : null;
};
const deleteFn = async (db, uri) => {
    const found = await db
        .selectFrom('para_community_governance')
        .selectAll()
        .where('uri', '=', uri.toString())
        .executeTakeFirst();
    if (found) {
        await db
            .deleteFrom('para_community_governance')
            .where('uri', '=', uri.toString())
            .execute();
    }
    return null;
};
const notifsForInsert = () => [];
const notifsForDelete = () => ({ notifs: [], toDelete: [] });
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
//# sourceMappingURL=para-community-governance.js.map