"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_1 = require("./util");
function default_1(server, ctx) {
    const importContacts = (0, pipeline_1.createPipeline)(skeleton, hydration, pipeline_1.noRules, //
    presentation);
    server.add(index_js_1.app.bsky.contact.importContacts, {
        auth: ctx.authVerifier.standard,
        handler: async ({ input, auth, req }) => {
            (0, util_1.assertRolodexOrThrowUnimplemented)(ctx);
            const viewer = auth.credentials.iss;
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
            });
            const result = await importContacts({ ...input.body, hydrateCtx }, ctx);
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
    const { matches } = await (0, util_1.callRolodexClient)(ctx.rolodexClient.importContacts({
        actor: params.hydrateCtx.viewer,
        contacts: params.contacts,
        token: params.token,
    }));
    return {
        actor,
        matches,
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { matches } = skeleton;
    const subjects = matches.map((m) => m.subject);
    return ctx.hydrator.hydrateProfiles(subjects, params.hydrateCtx);
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    const matchesAndContactIndexes = (0, common_1.mapDefined)(skeleton.matches, ({ subject, inputIndex, }) => {
        const profile = ctx.views.profile(subject, hydration);
        if (!profile) {
            return undefined;
        }
        return {
            contactIndex: inputIndex,
            match: profile,
        };
    });
    return { matchesAndContactIndexes };
};
//# sourceMappingURL=importContacts.js.map