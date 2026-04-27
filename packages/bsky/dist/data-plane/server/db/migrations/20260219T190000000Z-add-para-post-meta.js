"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('para_post_meta')
        .addColumn('uri', 'varchar', (col) => col.primaryKey())
        .addColumn('cid', 'varchar', (col) => col.notNull())
        .addColumn('creator', 'varchar', (col) => col.notNull())
        .addColumn('postUri', 'varchar', (col) => col.notNull().unique())
        .addColumn('postType', 'varchar', (col) => col.notNull())
        .addColumn('official', 'boolean')
        .addColumn('party', 'varchar')
        .addColumn('community', 'varchar')
        .addColumn('category', 'varchar')
        .addColumn('tags', 'jsonb')
        .addColumn('flairs', 'jsonb')
        .addColumn('voteScore', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .execute();
    await db.schema
        .createIndex('para_post_meta_post_uri_idx')
        .on('para_post_meta')
        .column('postUri')
        .execute();
    await db.schema
        .createIndex('para_post_meta_creator_idx')
        .on('para_post_meta')
        .column('creator')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('para_post_meta').execute();
}
//# sourceMappingURL=20260219T190000000Z-add-para-post-meta.js.map