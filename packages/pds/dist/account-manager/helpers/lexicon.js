"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.upsert = upsert;
exports.find = find;
exports.remove = remove;
const oauth_provider_1 = require("@atproto/oauth-provider");
const db_1 = require("../../db");
async function upsert(db, nsid, data) {
    const updates = {
        ...data,
        createdAt: (0, db_1.toDateISO)(data.createdAt),
        updatedAt: (0, db_1.toDateISO)(data.updatedAt),
        lastSucceededAt: data.lastSucceededAt
            ? (0, db_1.toDateISO)(data.lastSucceededAt)
            : null,
        lexicon: data.lexicon ? (0, db_1.toJson)(data.lexicon) : null,
    };
    await db.executeWithRetry(db.db
        .insertInto('lexicon')
        .values({ ...updates, nsid })
        .onConflict((oc) => oc.column('nsid').doUpdateSet(updates)));
    // Garbage collection: remove old, never resolved, lexicons.
    // Uses "lexicon_failures_idx"
    await db.executeWithRetry(db.db
        .deleteFrom('lexicon')
        .where('lexicon', 'is', null)
        .where('updatedAt', '<', (0, db_1.toDateISO)(new Date(Date.now() - oauth_provider_1.LEXICON_REFRESH_FREQUENCY))));
}
async function find(db, nsid) {
    const row = await db.db
        .selectFrom('lexicon')
        .selectAll()
        .where('nsid', '=', nsid)
        .executeTakeFirst();
    if (!row)
        return null;
    return {
        ...row,
        createdAt: (0, db_1.fromDateISO)(row.createdAt),
        updatedAt: (0, db_1.fromDateISO)(row.updatedAt),
        lastSucceededAt: row.lastSucceededAt
            ? (0, db_1.fromDateISO)(row.lastSucceededAt)
            : null,
        lexicon: row.lexicon ? (0, db_1.fromJson)(row.lexicon) : null,
    };
}
async function remove(db, nsid) {
    await db.db.deleteFrom('lexicon').where('nsid', '=', nsid).execute();
}
//# sourceMappingURL=lexicon.js.map