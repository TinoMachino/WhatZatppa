"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('private_data')
        .addColumn('actorDid', 'varchar', (col) => col.notNull())
        .addColumn('namespace', 'varchar', (col) => col.notNull())
        .addColumn('key', 'varchar', (col) => col.notNull())
        .addColumn('payload', 'text', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .addColumn('updatedAt', 'varchar', (col) => col.notNull())
        .addPrimaryKeyConstraint('private_data_pkey', [
        'actorDid',
        'namespace',
        'key',
    ])
        .execute();
}
async function down(db) {
    await db.schema.dropTable('private_data').execute();
}
//# sourceMappingURL=20250602T190357447Z-add-private-data.js.map