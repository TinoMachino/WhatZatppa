"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
const stash_1 = require("../../../../stash");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.draft.updateDraft, {
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth }) => {
            const actorDid = auth.credentials.iss;
            const { draft: draftWithId } = input.body;
            // NOTE: update drafts does not enforce limits, because if it did, we would not allow updating when the limit is reached,
            // which is not the desired behavior.
            // But this means the consumer of the stash operations can't do an upsert behavior on update, and needs instead to drop non-existent
            // drafts. This avoid misusing the update as a create that does not check limits.
            await ctx.stashClient.update({
                actorDid,
                namespace: stash_1.Namespaces.AppBskyDraftDefsDraftWithId,
                payload: draftWithId,
                key: draftWithId.id,
            });
        },
    });
}
//# sourceMappingURL=updateDraft.js.map