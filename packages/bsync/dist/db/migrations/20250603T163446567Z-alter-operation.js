"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('operation')
        .renameColumn('collection', 'namespace')
        .execute();
    await db.schema.alterTable('operation').renameColumn('rkey', 'key').execute();
}
async function down(db) {
    await db.schema
        .alterTable('operation')
        .renameColumn('namespace', 'collection')
        .execute();
    await db.schema.alterTable('operation').renameColumn('key', 'rkey').execute();
}
//# sourceMappingURL=20250603T163446567Z-alter-operation.js.map