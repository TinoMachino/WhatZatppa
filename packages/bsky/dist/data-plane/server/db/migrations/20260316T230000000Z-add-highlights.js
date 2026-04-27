"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('highlight_annotation')
        .addColumn('uri', 'varchar', (col) => col.primaryKey())
        .addColumn('cid', 'varchar', (col) => col.notNull())
        .addColumn('creator', 'varchar', (col) => col.notNull())
        .addColumn('subjectUri', 'varchar', (col) => col.notNull())
        .addColumn('subjectCid', 'varchar')
        .addColumn('text', 'text', (col) => col.notNull())
        .addColumn('start', 'integer', (col) => col.notNull())
        .addColumn('end', 'integer', (col) => col.notNull())
        .addColumn('color', 'varchar', (col) => col.notNull())
        .addColumn('tag', 'varchar')
        .addColumn('community', 'varchar')
        .addColumn('state', 'varchar')
        .addColumn('party', 'varchar')
        .addColumn('visibility', 'varchar', (col) => col.notNull())
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .addColumn('sortAt', 'varchar', (col) => col.generatedAlwaysAs((0, kysely_1.sql) `least("createdAt", "indexedAt")`).stored())
        .execute();
    await db.schema
        .createIndex('highlight_annotation_visibility_sort_idx')
        .on('highlight_annotation')
        .columns(['visibility', 'sortAt', 'cid'])
        .execute();
    await db.schema
        .createIndex('highlight_annotation_subject_idx')
        .on('highlight_annotation')
        .columns(['subjectUri', 'sortAt', 'cid'])
        .execute();
    await db.schema
        .createIndex('highlight_annotation_creator_idx')
        .on('highlight_annotation')
        .columns(['creator', 'sortAt', 'cid'])
        .execute();
    await db.schema
        .createIndex('highlight_annotation_community_idx')
        .on('highlight_annotation')
        .columns(['community', 'sortAt', 'cid'])
        .execute();
    await db.schema
        .createIndex('highlight_annotation_state_idx')
        .on('highlight_annotation')
        .columns(['state', 'sortAt', 'cid'])
        .execute();
}
async function down(db) {
    await db.schema.dropTable('highlight_annotation').execute();
}
//# sourceMappingURL=20260316T230000000Z-add-highlights.js.map