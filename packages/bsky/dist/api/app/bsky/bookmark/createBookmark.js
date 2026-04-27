"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const stash_1 = require("../../../../stash");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.bookmark.createBookmark, {
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth }) => {
            const actorDid = auth.credentials.iss;
            const { cid, uri } = input.body;
            (0, util_1.validateUri)(uri);
            const res = await ctx.dataplane.getBookmarksByActorAndSubjects({
                actorDid,
                uris: [uri],
            });
            const [existing] = res.bookmarks;
            if (existing.ref?.key) {
                // Idempotent, return without creating.
                return;
            }
            await ctx.stashClient.create({
                actorDid,
                namespace: stash_1.Namespaces.AppBskyBookmarkDefsBookmark,
                payload: {
                    subject: {
                        cid,
                        uri,
                    },
                },
                key: common_1.TID.nextStr(),
            });
        },
    });
}
//# sourceMappingURL=createBookmark.js.map