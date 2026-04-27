"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('bookmark')
        .addColumn('creator', 'varchar', (col) => col.notNull())
        .addColumn('key', 'varchar', (col) => col.notNull())
        .addColumn('subjectUri', 'varchar', (col) => col.notNull())
        .addColumn('subjectCid', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        // Supports paginating over creator's bookmarks sorting by key.
        .addPrimaryKeyConstraint('bookmark_pkey', ['creator', 'key'])
        // Supports checking for bookmark presence by the creator on specific uris, and supports counting bookmarks by uri.
        .addUniqueConstraint('bookmark_unique_uri_creator', [
        'subjectUri',
        'creator',
    ])
        .execute();
}
async function down(db) {
    await db.schema.dropTable('bookmark').execute();
}
//# sourceMappingURL=20250812T183735692Z-add-bookmarks.js.map