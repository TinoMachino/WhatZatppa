"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('safelink_event')
        .addColumn('id', 'bigserial', (col) => col.primaryKey())
        .addColumn('eventType', 'varchar', (col) => col.notNull())
        .addColumn('url', 'varchar', (col) => col.notNull())
        .addColumn('pattern', 'varchar', (col) => col.notNull())
        .addColumn('action', 'varchar', (col) => col.notNull())
        .addColumn('reason', 'varchar', (col) => col.notNull())
        .addColumn('createdBy', 'varchar', (col) => col.notNull())
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('comment', 'text')
        .execute();
    await db.schema
        .createTable('safelink_rule')
        .addColumn('id', 'bigserial', (col) => col.primaryKey())
        .addColumn('url', 'varchar', (col) => col.notNull())
        .addColumn('pattern', 'varchar', (col) => col.notNull())
        .addColumn('action', 'varchar', (col) => col.notNull())
        .addColumn('reason', 'varchar', (col) => col.notNull())
        .addColumn('createdBy', 'varchar', (col) => col.notNull())
        .addColumn('createdAt', 'varchar', (col) => col.notNull())
        .addColumn('updatedAt', 'varchar', (col) => col.notNull())
        .addColumn('comment', 'text')
        .addUniqueConstraint('safelink_rule_url_pattern_key', ['url', 'pattern'])
        .execute();
    await db.schema
        .createIndex('safelink_event_url_pattern_idx')
        .on('safelink_event')
        .columns(['url', 'pattern'])
        .execute();
    await db.schema
        .createIndex('safelink_rule_action_idx')
        .on('safelink_rule')
        .column('action')
        .execute();
    await db.schema
        .createIndex('safelink_rule_reason_idx')
        .on('safelink_rule')
        .column('reason')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('safelink_rule').execute();
    await db.schema.dropTable('safelink_event').execute();
}
//# sourceMappingURL=20250609T110704000Z-safelink.js.map