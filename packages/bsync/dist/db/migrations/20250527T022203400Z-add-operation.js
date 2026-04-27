"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .createTable('operation')
        .addColumn('id', 'bigserial', (col) => col.primaryKey())
        .addColumn('collection', 'varchar', (col) => col.notNull())
        .addColumn('actorDid', 'varchar', (col) => col.notNull())
        .addColumn('rkey', 'varchar', (col) => col.notNull())
        .addColumn('method', 'int2', (col) => col.notNull())
        .addColumn('payload', (0, kysely_1.sql) `bytea`)
        .addColumn('createdAt', 'timestamptz', (col) => col.notNull().defaultTo((0, kysely_1.sql) `CURRENT_TIMESTAMP`))
        .execute();
}
async function down(db) {
    await db.schema.dropTable('operation').execute();
}
//# sourceMappingURL=20250527T022203400Z-add-operation.js.map