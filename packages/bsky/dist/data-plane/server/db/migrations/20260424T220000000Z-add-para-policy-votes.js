"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('para_policy_vote')
        .addColumn('uri', 'varchar', (col) => col.primaryKey())
        .addColumn('cid', 'varchar', (col) => col.notNull())
        .addColumn('creator', 'varchar', (col) => col.notNull())
        .addColumn('subject', 'varchar', (col) => col.notNull())
        .addColumn('subjectType', 'varchar', (col) => col.notNull())
        .addColumn('signal', 'integer', (col) => col.notNull())
        .addColumn('isDirect', 'int2', (col) => col.notNull())
        .addColumn('delegatedFrom', 'jsonb')
        .addColumn('reason', 'varchar')
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .addColumn('sortAt', 'varchar', (col) => col.generatedAlwaysAs((0, kysely_1.sql) `least("createdAt", "indexedAt")`).stored())
        .execute();
    await db.schema
        .createIndex('para_policy_vote_subject_idx')
        .on('para_policy_vote')
        .column('subject')
        .execute();
    await db.schema
        .createIndex('para_policy_vote_subject_type_subject_idx')
        .on('para_policy_vote')
        .columns(['subjectType', 'subject'])
        .execute();
    await db.schema
        .createIndex('para_policy_vote_creator_idx')
        .on('para_policy_vote')
        .column('creator')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('para_policy_vote').execute();
}
//# sourceMappingURL=20260424T220000000Z-add-para-policy-votes.js.map