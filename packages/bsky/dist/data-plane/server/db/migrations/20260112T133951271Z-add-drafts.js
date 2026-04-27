"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('draft')
        .addColumn('creator', 'varchar', (col) => col.notNull())
        .addColumn('key', 'varchar', (col) => col.notNull())
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('updatedAt', 'varchar', (col) => col.notNull())
        .addColumn('payload', 'text', (col) => col.notNull())
        .addPrimaryKeyConstraint('draft_pkey', ['creator', 'key'])
        .execute();
    // Supports getting paginated drafts by updatedAt.
    await db.schema
        .createIndex('draft_creator_updated_at_key_idx')
        .on('draft')
        .columns(['creator', 'updatedAt', 'key'])
        .execute();
}
async function down(db) {
    await db.schema.dropTable('draft').execute();
}
//# sourceMappingURL=20260112T133951271Z-add-drafts.js.map