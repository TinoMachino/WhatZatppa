"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    // Deduplicate: keep latest per (creator, subjectType, subject)
    await db.deleteFrom('para_policy_vote')
        .where('uri', 'in', (qb) => qb.selectFrom('para_policy_vote')
        .select('uri')
        .where('uri', 'not in', (inner) => inner.selectFrom('para_policy_vote')
        .select('uri')
        .distinctOn(['creator', 'subjectType', 'subject'])
        .orderBy('creator')
        .orderBy('subjectType')
        .orderBy('subject')
        .orderBy('createdAt', 'desc')
        .orderBy('cid', 'desc')))
        .execute();
    await db.schema
        .createIndex('para_policy_vote_unique_idx')
        .on('para_policy_vote')
        .columns(['creator', 'subjectType', 'subject'])
        .unique()
        .execute();
}
async function down(db) {
    await db.schema.dropIndex('para_policy_vote_unique_idx').execute();
}
//# sourceMappingURL=20260427T150000000Z-harden-policy-votes.js.map