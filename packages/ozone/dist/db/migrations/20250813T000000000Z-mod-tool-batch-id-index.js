"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
async function up(db) {
    // Only small percentage of moderation events have a batchId in modTool meta property so we're creating a partial index
    await (0, kysely_1.sql) `
    CREATE INDEX moderation_event_mod_tool_batch_id_idx
    ON moderation_event (("modTool" -> 'meta' ->> 'batchId'))
    WHERE "modTool" #> '{meta,batchId}' IS NOT NULL
  `.execute(db);
}
async function down(db) {
    await db.schema.dropIndex('moderation_event_mod_tool_batch_id_idx').execute();
}
//# sourceMappingURL=20250813T000000000Z-mod-tool-batch-id-index.js.map