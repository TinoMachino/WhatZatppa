"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const protobuf_1 = require("@bufbuild/protobuf");
const common_1 = require("@atproto/common");
const bsky_pb_1 = require("../../../proto/bsky_pb");
const stash_1 = require("../../../stash");
const pagination_1 = require("../db/pagination");
exports.default = (db) => ({
    async getActorBookmarks(req) {
        const { actorDid, cursor, limit } = req;
        const { ref } = db.db.dynamic;
        let builder = db.db
            .selectFrom('bookmark')
            .where('bookmark.creator', '=', actorDid)
            .selectAll();
        const key = new pagination_1.StashKeyKey(ref('bookmark.key'));
        builder = key.paginate(builder, {
            cursor,
            limit,
        });
        const res = await builder.execute();
        return {
            bookmarks: res.map((b) => ({
                key: b.key,
                subject: b.subjectUri,
            })),
            cursor: key.packFromResult(res),
        };
    },
    async getBookmarksByActorAndSubjects(req) {
        const { actorDid, uris } = req;
        if (uris.length === 0) {
            return new bsky_pb_1.GetBookmarksByActorAndSubjectsResponse({
                bookmarks: [],
            });
        }
        const res = await db.db
            .selectFrom('bookmark')
            .where('bookmark.creator', '=', actorDid)
            .where('bookmark.subjectUri', 'in', uris)
            .selectAll()
            .execute();
        const byUri = (0, common_1.keyBy)(res, 'subjectUri');
        const bookmarks = uris.map((did) => {
            const bookmark = byUri.get(did);
            if (!bookmark) {
                return {
                    ref: undefined,
                    subjectUri: '',
                    subjectCid: '',
                    indexedAt: undefined,
                };
            }
            return {
                ref: {
                    actorDid,
                    namespace: stash_1.Namespaces.AppBskyBookmarkDefsBookmark.$type,
                    key: bookmark.key,
                },
                subjectUri: bookmark.subjectUri,
                subjectCid: bookmark.subjectCid,
                indexedAt: protobuf_1.Timestamp.fromDate(new Date(bookmark.indexedAt)),
            };
        });
        return {
            bookmarks,
        };
    },
});
//# sourceMappingURL=bookmarks.js.map