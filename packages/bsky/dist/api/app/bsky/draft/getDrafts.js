"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const lex_1 = require("@atproto/lex");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.draft.getDrafts, {
        auth: ctx.authVerifier.standard,
        handler: async ({ params, auth }) => {
            const viewer = auth.credentials.iss;
            const { cursor, drafts } = await ctx.hydrator.dataplane.getActorDrafts({
                actorDid: viewer,
                limit: params.limit,
                cursor: params.cursor,
            });
            const draftViews = drafts.map((d) => {
                const draftWithId = (0, lex_1.lexParseJsonBytes)(d.payload);
                return {
                    id: draftWithId.id,
                    draft: draftWithId.draft,
                    // The date should always be present, but we avoid required fields on protobuf by convention,
                    // so requires a fallback value to please TS.
                    createdAt: (d.createdAt?.toDate() ?? new Date(0)).toISOString(),
                    updatedAt: (d.updatedAt?.toDate() ?? new Date(0)).toISOString(),
                };
            });
            return {
                encoding: 'application/json',
                body: {
                    cursor,
                    drafts: draftViews,
                },
            };
        },
    });
}
//# sourceMappingURL=getDrafts.js.map