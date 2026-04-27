"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protobuf_1 = require("@bufbuild/protobuf");
const pagination_1 = require("../db/pagination");
exports.default = (db) => ({
    async getActorDrafts(req) {
        const { actorDid, cursor, limit } = req;
        const { ref } = db.db.dynamic;
        let builder = db.db
            .selectFrom('draft')
            .where('draft.creator', '=', actorDid)
            .selectAll();
        const key = new pagination_1.IsoUpdatedAtKey(ref('draft.updatedAt'));
        builder = key.paginate(builder, {
            cursor,
            limit,
        });
        const res = await builder.execute();
        return {
            drafts: res.map((d) => ({
                key: d.key,
                payload: Buffer.from(d.payload),
                createdAt: protobuf_1.Timestamp.fromDate(new Date(d.createdAt)),
                updatedAt: protobuf_1.Timestamp.fromDate(new Date(d.updatedAt)),
            })),
            cursor: key.packFromResult(res),
        };
    },
});
//# sourceMappingURL=drafts.js.map