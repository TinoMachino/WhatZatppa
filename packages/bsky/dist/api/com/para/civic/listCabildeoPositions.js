"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const util_1 = require("../../../../hydration/util");
const util_2 = require("../../../util");
function default_1(server, ctx) {
    server.com.para.civic.listCabildeoPositions({
        auth: ctx.authVerifier.optionalStandardOrRole,
        handler: async ({ params, auth, req }) => {
            const { viewer } = ctx.authVerifier.parseCreds(auth);
            const labelers = ctx.reqLabelers(req);
            const result = await listCabildeoPositions({
                ctx,
                params,
            });
            const repoRev = await ctx.hydrator.actor.getRepoRevSafe(viewer);
            return {
                encoding: 'application/json',
                body: result,
                headers: (0, util_2.resHeaders)({ repoRev, labelers }),
            };
        },
    });
}
const listCabildeoPositions = async (inputs) => {
    const { ctx, params } = inputs;
    if ((0, util_2.clearlyBadCursor)(params.cursor)) {
        return { positions: [] };
    }
    const res = await ctx.dataplane.getParaCabildeoPositions({
        cabildeoUri: params.cabildeo,
        stance: params.stance ?? '',
        limit: params.limit,
        cursor: params.cursor ?? '',
    });
    return {
        positions: res.positions.map((position) => ({
            uri: position.uri,
            cid: parseCidOrThrow(position.cid),
            creator: position.creator,
            indexedAt: position.indexedAt,
            cabildeo: position.cabildeo,
            stance: position.stance,
            optionIndex: position.optionIndex,
            text: position.text,
            compassQuadrant: (0, util_1.parseString)(position.compassQuadrant),
            createdAt: position.createdAt,
        })),
        cursor: (0, util_1.parseString)(res.cursor),
    };
};
const parseCidOrThrow = (cidStr) => {
    const cid = (0, util_1.parseCid)(cidStr);
    if (!cid) {
        throw new Error(`Invalid CID in cabildeo position view: ${cidStr}`);
    }
    return cid;
};
//# sourceMappingURL=listCabildeoPositions.js.map