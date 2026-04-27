"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("./util");
function default_1(server, ctx) {
    const getMatches = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocks, presentation);
    server.add(index_js_1.app.bsky.contact.getMatches, {
        auth: ctx.authVerifier.standard,
        handler: async ({ params, auth, req }) => {
            (0, util_1.assertRolodexOrThrowUnimplemented)(ctx);
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
            });
            const result = await getMatches({ ...params, hydrateCtx }, ctx);
            return {
                encoding: 'application/json',
                body: result,
            };
        },
    });
}
const skeleton = async (input) => {
    const { params, ctx } = input;
    const actor = params.hydrateCtx.viewer;
    const { cursor, subjects } = await (0, util_1.callRolodexClient)(ctx.rolodexClient.getMatches({
        actor: params.hydrateCtx.viewer,
        limit: params.limit,
        cursor: params.cursor,
    }));
    return {
        actor,
        subjects: subjects,
        cursor: cursor || undefined,
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { subjects } = skeleton;
    return ctx.hydrator.hydrateProfiles(subjects, params.hydrateCtx);
};
const noBlocks = (inputs) => {
    const { ctx, skeleton, hydration } = inputs;
    skeleton.subjects = skeleton.subjects.filter((subject) => {
        return !ctx.views.viewerBlockExists(subject, hydration);
    });
    return skeleton;
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    const matches = (0, common_1.mapDefined)(skeleton.subjects, (did) => ctx.views.profile(did, hydration));
    return { matches };
};
//# sourceMappingURL=getMatches.js.map