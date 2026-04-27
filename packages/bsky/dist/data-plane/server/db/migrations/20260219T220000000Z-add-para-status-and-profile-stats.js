"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('para_status')
        .addColumn('did', 'varchar', (col) => col.primaryKey())
        .addColumn('uri', 'varchar', (col) => col.notNull().unique())
        .addColumn('cid', 'varchar', (col) => col.notNull())
        .addColumn('status', 'varchar', (col) => col.notNull())
        .addColumn('party', 'varchar')
        .addColumn('community', 'varchar')
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .execute();
    await db.schema
        .createTable('para_profile_stats')
        .addColumn('did', 'varchar', (col) => col.primaryKey())
        .addColumn('influence', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('votesReceivedAllTime', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('votesCastAllTime', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('policies', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('matters', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('comments', 'integer', (col) => col.notNull().defaultTo(0))
        .addColumn('activeIn', 'jsonb')
        .addColumn('computedAt', 'varchar', (col) => col.notNull())
        .execute();
    await db.schema
        .createIndex('para_profile_stats_influence_idx')
        .on('para_profile_stats')
        .column('influence')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('para_profile_stats').execute();
    await db.schema.dropTable('para_status').execute();
}
//# sourceMappingURL=20260219T220000000Z-add-para-status-and-profile-stats.js.map