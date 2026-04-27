"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.up = up;
exports.down = down;
const kysely_1 = require("kysely");
const recompute_cabildeo_aggregates_1 = require("../../indexing/plugins/recompute-cabildeo-aggregates");
async function up(db) {
    await (0, kysely_1.sql) `
    delete from cabildeo_vote
    where uri in (
      select uri
      from (
        select
          uri,
          row_number() over (
            partition by creator, cabildeo
            order by "sortAt" desc, cid desc
          ) as row_num
        from cabildeo_vote
      ) ranked
      where row_num > 1
    )
  `.execute(db);
    await db.schema
        .createIndex('cabildeo_vote_unique_creator_cabildeo')
        .on('cabildeo_vote')
        .columns(['creator', 'cabildeo'])
        .unique()
        .execute();
    const cabildeos = await db
        .selectFrom('cabildeo_cabildeo')
        .select(['uri'])
        .execute();
    for (const cabildeo of cabildeos) {
        await (0, recompute_cabildeo_aggregates_1.recomputeCabildeoAggregates)(db, cabildeo.uri);
    }
}
async function down(db) {
    await db.schema.dropIndex('cabildeo_vote_unique_creator_cabildeo').execute();
}
//# sourceMappingURL=20260427T120000000Z-harden-cabildeo-votes.js.map