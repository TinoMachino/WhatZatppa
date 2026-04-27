"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .createTable('post_subscription')
        .addColumn('subscriberDid', 'varchar', (col) => col.notNull())
        .addColumn('postUri', 'varchar', (col) => col.notNull())
        .addColumn('indexedAt', 'varchar', (col) => col.notNull())
        .addColumn('reply', 'boolean', (col) => col.notNull())
        .addColumn('quote', 'boolean', (col) => col.notNull())
        .addPrimaryKeyConstraint('post_subscription_pkey', [
        'subscriberDid',
        'postUri',
    ])
        .execute();
    await db.schema
        .createIndex('post_subscription_post_uri_idx')
        .on('post_subscription')
        .column('postUri')
        .execute();
}
async function down(db) {
    await db.schema.dropTable('post_subscription').execute();
}
//# sourceMappingURL=20260426T120000000Z-add-post-subscriptions.js.map