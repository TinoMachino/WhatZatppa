"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const index_js_1 = require("../../../../lexicons/index.js");
const stash_1 = require("../../../../stash");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.draft.createDraft, {
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth }) => {
            const actorDid = auth.credentials.iss;
            const { draft } = input.body;
            const res = await ctx.dataplane.getCountsForUsers({
                dids: [actorDid],
            });
            const draftsCount = res.drafts[0];
            if (draftsCount >= ctx.cfg.draftsLimit) {
                throw new xrpc_server_1.InvalidRequestError(`Drafts limit reached`, 'DraftLimitReached');
            }
            const draftId = common_1.TID.nextStr();
            const draftWithId = {
                id: draftId,
                draft,
            };
            await ctx.stashClient.create({
                actorDid,
                namespace: stash_1.Namespaces.AppBskyDraftDefsDraftWithId,
                payload: draftWithId,
                key: draftId,
            });
            return {
                encoding: 'application/json',
                body: { id: draftId },
            };
        },
    });
}
//# sourceMappingURL=createDraft.js.map