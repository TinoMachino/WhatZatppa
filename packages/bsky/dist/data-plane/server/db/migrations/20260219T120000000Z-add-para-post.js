"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('para_post')
        .addColumn('uri', 'varchar', (col) => col.primaryKey())
        .addColumn('cid', 'varchar', (col) => col.notNull())
        .addColumn('creator', 'varchar', (col) => col.notNull())
        .addColumn('text', 'text', (col) => col.notNull())
        .addColumn('replyRoot', 'varchar')
        .addColumn('replyRootCid', 'varchar')
        .addColumn('replyParent', 'varchar')
        .addColumn('replyParentCid', 'varchar')
        .addColumn('langs', 'jsonb')
        .addColumn('tags', 'jsonb')
        .addColumn('flairs', 'jsonb')
        .addColumn('postType', 'varchar')
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .addColumn('sortAt', 'varchar', (col) => col.generatedAlwaysAs((0, kysely_1.sql) `least("createdAt", "indexedAt")`).stored())
        .execute();
    await db.schema
        .createIndex('para_post_creator_idx')
        .on('para_post')
        .column('creator')
        .execute();
    await db.schema
        .createIndex('para_post_sort_at_idx')
        .on('para_post')
        .column('sortAt')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('para_post').execute();
}
//# sourceMappingURL=20260219T120000000Z-add-para-post.js.map