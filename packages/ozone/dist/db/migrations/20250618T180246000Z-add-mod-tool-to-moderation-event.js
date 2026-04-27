"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    await db.schema
        .alterTable('moderation_event')
        .addColumn('modTool', 'jsonb')
        .execute();
    await db.schema
        .createIndex('moderation_event_mod_tool_name_idx')
        .on('moderation_event')
        .expression((0, kysely_1.sql) `("modTool" ->> 'name')`)
        .execute();
}
async function down(db) {
    await db.schema.alterTable('moderation_event').dropColumn('modTool').execute();
}
//# sourceMappingURL=20250618T180246000Z-add-mod-tool-to-moderation-event.js.map