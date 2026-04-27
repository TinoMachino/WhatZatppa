"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const common_1 = require("@atproto/common");
const xrpc_server_1 = require("@atproto/xrpc-server");
const hydrator_1 = require("../../../../hydration/hydrator");
const index_js_1 = require("../../../../lexicons/index.js");
const pipeline_1 = require("../../../../pipeline");
const uris_1 = require("../../../../util/uris");
const util_1 = require("../../../util");
function default_1(server, ctx) {
    const getList = (0, pipeline_1.createPipeline)(skeleton, hydration, noBlocks, presentation);
    server.add(index_js_1.app.bsky.graph.getList, {
        auth: ctx.authVerifier.standardOptional,
        handler: async ({ params, auth, req }) => {
            const { viewer, includeTakedowns, skipViewerBlocks } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const hydrateCtx = await ctx.hydrator.createContext({
                labelers,
                viewer,
                includeTakedowns,
                skipViewerBlocks,
            });
            const result = await getList({ ...params, hydrateCtx }, ctx);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_1.resHeaders)({ labelers: hydrateCtx.labelers }),
            };
        },
    });
}
const skeleton = async (input) => {
    const { ctx, params } = input;
    if ((0, util_1.clearlyBadCursor)(params.cursor)) {
        return { listUri: params.list, listitems: [] };
    }
    const { listitems, cursor } = await ctx.hydrator.dataplane.getListMembers({
        listUri: params.list,
        limit: params.limit,
        cursor: params.cursor,
    });
    return {
        listUri: params.list,
        listitems,
        cursor: cursor || undefined,
    };
};
const hydration = async (input) => {
    const { ctx, params, skeleton } = input;
    const { listUri, listitems } = skeleton;
    const [listState, profileState] = await Promise.all([
        ctx.hydrator.hydrateLists([listUri], params.hydrateCtx),
        ctx.hydrator.hydrateProfiles(listitems.map(({ did }) => did), params.hydrateCtx),
    ]);
    const bidirectionalBlocks = await maybeGetBlocksForReferenceAndCurateList({
        ctx,
        params,
        skeleton,
        listState,
    });
    return (0, hydrator_1.mergeManyStates)(listState, profileState, { bidirectionalBlocks });
};
const noBlocks = (input) => {
    const { skeleton, hydration } = input;
    const creator = (0, uris_1.uriToDid)(skeleton.listUri);
    const blocks = hydration.bidirectionalBlocks?.get(creator);
    skeleton.listitems = skeleton.listitems.filter(({ did }) => {
        return !blocks?.get(did);
    });
    return skeleton;
};
const presentation = (input) => {
    const { ctx, skeleton, hydration } = input;
    const { listUri, listitems, cursor } = skeleton;
    const list = ctx.views.list(listUri, hydration);
    const items = (0, common_1.mapDefined)(listitems, ({ uri, did }) => ctx.views.listItemView(uri, did, hydration));
    if (!list) {
        throw new xrpc_server_1.InvalidRequestError('List not found');
    }
    return { list, items, cursor };
};
const maybeGetBlocksForReferenceAndCurateList = async (input) => {
    const { ctx, params, listState, skeleton } = input;
    const { listitems } = skeleton;
    const { list } = params;
    const listRecord = listState.lists?.get(list);
    const creator = (0, uris_1.uriToDid)(list);
    if (params.hydrateCtx.viewer === creator ||
        listRecord?.record.purpose === 'app.bsky.graph.defs#modlist') {
        return;
    }
    const pairs = new Map();
    pairs.set(creator, listitems.map(({ did }) => did));
    return await ctx.hydrator.hydrateBidirectionalBlocks(pairs, params.hydrateCtx);
};
//# sourceMappingURL=getList.js.map