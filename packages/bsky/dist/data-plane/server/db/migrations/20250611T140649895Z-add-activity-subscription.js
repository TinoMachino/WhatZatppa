"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('activity_subscription')
        .addColumn('creator', 'varchar', (col) => col.notNull())
        .addColumn('subjectDid', 'varchar', (col) => col.notNull())
        .addColumn('key', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .addColumn('post', 'boolean', (col) => col.notNull())
        .addColumn('reply', 'boolean', (col) => col.notNull())
        .addPrimaryKeyConstraint('activity_subscription_pkey', ['creator', 'key'])
        .addUniqueConstraint('activity_subscription_unique_creator_subject_did', [
        'creator',
        'subjectDid',
    ])
        .execute();
}
async function down(db) {
    await db.schema.dropTable('activity_subscription').execute();
}
//# sourceMappingURL=20250611T140649895Z-add-activity-subscription.js.map