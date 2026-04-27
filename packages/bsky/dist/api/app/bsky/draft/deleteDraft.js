"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lexicons_1 = require("../../../../lexicons");
const stash_1 = require("../../../../stash");
function default_1(server, ctx) {
    server.add(lexicons_1.app.bsky.draft.deleteDraft, {
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth }) => {
            const actorDid = auth.credentials.iss;
            const { id } = input.body;
            await ctx.stashClient.delete({
                actorDid,
                namespace: stash_1.Namespaces.AppBskyDraftDefsDraftWithId,
                key: id,
            });
        },
    });
}
//# sourceMappingURL=deleteDraft.js.map