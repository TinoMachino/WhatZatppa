"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema.alterTable('record').addColumn('tags', 'jsonb').execute();
}
async function down(db) {
    await db.schema.alterTable('record').dropColumn('tags').execute();
}
//# sourceMappingURL=20250528T221913281Z-add-record-tags.js.map