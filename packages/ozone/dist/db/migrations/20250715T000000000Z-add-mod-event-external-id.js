"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
async function up(db) {
    await db.schema
        .alterTable('moderation_event')
        .addColumn('externalId', 'varchar')
        .execute();
}
async function down(db) {
    await db.schema
        .alterTable('moderation_event')
        .dropColumn('externalId')
        .execute();
}
//# sourceMappingURL=20250715T000000000Z-add-mod-event-external-id.js.map