"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const stash_1 = require("../../../../stash");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.contact.sendNotification, {
        auth: ctx.authVerifier.role,
        handler: async ({ input }) => {
            // Assert rolodex even though we don't call it, it is a proxy to whether the app is configured with contact import support.
            (0, util_1.assertRolodexOrThrowUnimplemented)(ctx);
            const { from, to } = input.body;
            await ctx.stashClient.create({
                actorDid: from,
                namespace: stash_1.Namespaces.AppBskyContactDefsNotification,
                payload: {
                    from,
                    to,
                },
                key: common_1.TID.nextStr(),
            });
            return {
                encoding: 'application/json',
                body: {},
            };
        },
    });
}
//# sourceMappingURL=sendNotification.js.map