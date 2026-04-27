"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const util_1 = require("../../../../hydration/util");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const util_2 = require("../../../util");
const CURATELIST = index_js_1.app.bsky.graph.defs.curatelist.value;
const MODLIST = index_js_1.app.bsky.graph.defs.modlist.value;
function default_1(server, ctx) {
    const getLists = (0, pipeline_1.createPipeline)(skeleton, hydration, filterPurposes, presentation);
    server.add(index_js_1.app.bsky.graph.getLists, {
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const labelers = ctx.reqLabelers(req);
            const { viewer, includeTakedowns, skipViewerBlocks } = ctx.authVerifier.parseCreds(auth);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
                skipViewerBlocks,
            });
            const result = await getLists({ ...params, hydrateCtx }, ctx);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({ labelers: hydrateCtx.labelers }),
            };
        },
    });
}
const skeleton = async (input) => {
    const { ctx, params } = input;
    if ((0, util_2.clearlyBadCursor)(params.cursor)) {
        return { listUris: [] };
    }
    const [did] = await ctx.hydrator.actor.getDids([params.actor]);
    if (!did)
        throw new xrpc_server_1.InvalidRequestError('Profile not found');
    const { listUris, cursor } = await ctx.hydrator.dataplane.getActorLists({
        actorDid: did,
        cursor: params.cursor,
        limit: params.limit,
    });
    return {
        listUris: listUris,
        cursor: (0, util_1.parseString)(cursor),
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { listUris } = skeleton;
    return ctx.hydrator.hydrateLists(listUris, params.hydrateCtx);
};
const filterPurposes = (input) => {
    const { skeleton, hydration, params } = input;
    const purposes = params.purposes || ['modlist', 'curatelist'];
    const acceptedPurposes = new Set();
    if (purposes.includes('modlist'))
        acceptedPurposes.add(MODLIST);
    if (purposes.includes(MODLIST))
        acceptedPurposes.add(MODLIST);
    if (purposes.includes('curatelist'))
        acceptedPurposes.add(CURATELIST);
    if (purposes.includes(CURATELIST))
        acceptedPurposes.add(CURATELIST);
    // @NOTE: While we don't support filtering on the dataplane, this might result in empty pages.
    // Despite the empty pages, the pagination still can enumerate all items for the specified filters.
    skeleton.listUris = skeleton.listUris.filter((uri) => {
        const list = hydration.lists?.get(uri);
        return acceptedPurposes.has(list?.record.purpose);
    });
    return skeleton;
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    const { listUris, cursor } = skeleton;
    const lists = (0, common_1.mapDefined)(listUris, (uri) => {
        return ctx.views.list(uri, hydration);
    });
    return { lists, cursor };
};
//# sourceMappingURL=getLists.js.map