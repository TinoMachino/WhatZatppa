"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
// THIS IS A TEMPORARY UNSPECCED ROUTE
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.unspecced.getTaggedSuggestions, {
        handler: async () => {
            const res = await ctx.dataplane.getSuggestedEntities({});
            const suggestions = res.entities.map((entity) => ({
                tag: entity.tag,
                subjectType: entity.subjectType,
                subject: entity.subject,
            }));
            return {
                encoding: 'application/json',
                body: {
                    suggestions,
                },
            };
        },
    });
}
//# sourceMappingURL=getTaggedSuggestions.js.map