"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema.alterTable('like').addColumn('via', 'varchar').execute();
    await db.schema.alterTable('like').addColumn('viaCid', 'varchar').execute();
    await db.schema.alterTable('repost').addColumn('via', 'varchar').execute();
    await db.schema.alterTable('repost').addColumn('viaCid', 'varchar').execute();
}
async function down(db) {
    await db.schema.alterTable('like').dropColumn('via').execute();
    await db.schema.alterTable('like').dropColumn('viaCid').execute();
    await db.schema.alterTable('repost').dropColumn('via').execute();
    await db.schema.alterTable('repost').dropColumn('viaCid').execute();
}
//# sourceMappingURL=20250526T023712742Z-like-repost-via.js.map