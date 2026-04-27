"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    // @NOTE: These queries should be run with the "CONCURRENTLY" option in
    // production to avoid locking the table. This is not supported by Kysely.
    await db.schema
        .dropIndex('moderation_event_created_by_idx')
        .ifExists()
        .execute();
    await db.schema
        .createIndex('moderation_event_created_by_idx')
        .on('moderation_event')
        .columns(['createdBy', 'createdAt', 'id'])
        .execute();
}
async function down(db) {
    await db.schema
        .dropIndex('moderation_event_created_by_idx')
        .ifExists()
        .execute();
}
//# sourceMappingURL=20260210T154806448Z-mod-event-created-by-indexes.js.map