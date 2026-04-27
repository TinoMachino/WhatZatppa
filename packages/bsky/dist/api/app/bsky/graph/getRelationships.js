"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    server.add(index_js_1.app.bsky.graph.getRelationships, {
        handler: async ({ params }) => {
            const { others = [] } = params;
            const [actor] = await ctx.hydrator.actor.getDids([params.actor]);
            if (!actor || others.length < 1) {
                return {
                    encoding: 'application/json',
                    body: {
                        actor,
                        relationships: others.map((actor) => {
                            return index_js_1.app.bsky.graph.defs.notFoundActor.$build({
                                actor,
                                notFound: true,
                            });
                        }),
                    },
                };
            }
            const res = await ctx.hydrator.actor.getProfileViewerStatesNaive(others, actor);
            const relationships = others.map((actor) => {
                const subject = res.get(actor);
                return subject
                    ? index_js_1.app.bsky.graph.defs.relationship.$build({
                        did: subject.did,
                        following: subject.following,
                        followedBy: subject.followedBy,
                        blocking: subject.blocking,
                        blockedBy: subject.blockedBy,
                        blockingByList: subject.blockingByList,
                        blockedByList: subject.blockedByList,
                    })
                    : index_js_1.app.bsky.graph.defs.notFoundActor.$build({
                        actor,
                        notFound: true,
                    });
            });
            return {
                encoding: 'application/json',
                body: {
                    actor,
                    relationships,
                },
            };
        },
    });
}
//# sourceMappingURL=getRelationships.js.map