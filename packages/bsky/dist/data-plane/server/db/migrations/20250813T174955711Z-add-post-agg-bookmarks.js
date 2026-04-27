"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('post_agg')
        .addColumn('bookmarkCount', 'bigint', (col) => col.notNull().defaultTo(0))
        .execute();
}
async function down(db) {
    await db.schema.alterTable('post_agg').dropColumn('bookmarkCount').execute();
}
//# sourceMappingURL=20250813T174955711Z-add-post-agg-bookmarks.js.map