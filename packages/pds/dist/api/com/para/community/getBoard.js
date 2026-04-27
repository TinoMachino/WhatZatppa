"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
// @ts-nocheck
const lexicon_1 = require("@atproto/lexicon");
const lexicons_1 = require("../../../../lexicon/lexicons");
const pipethrough_1 = require("../../../../pipethrough");
const read_after_write_1 = require("../../../../read-after-write");
const util_1 = require("./util");
function default_1(server, ctx) {
    if (!ctx.bskyAppView)
        return;
    server.com.para.community.getBoard({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = lexicons_1.ids.ComParaCommunityGetBoard;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async ({ auth, req, params }) => {
            const viewerDid = auth.credentials.did;
            const local = await ctx.actorStore.read(viewerDid, async (store) => {
                const board = await (0, util_1.findLocalBoard)({
                    store,
                    uri: params.uri,
                    communityId: params.communityId,
                });
                if (!board)
                    return null;
                const [membership, governance, foundingMemberCount] = await Promise.all([
                    (0, util_1.getLocalMembership)({ store, viewerDid, boardUri: board.uri }),
                    (0, util_1.getLocalGovernance)({ store, creatorDid: viewerDid, board }),
                    (0, util_1.getFoundingMemberCount)({ store, board }),
                ]);
                return {
                    board: (0, util_1.toGetBoardView)({
                        board,
                        creatorDid: viewerDid,
                        viewerMembershipState: membership?.membershipState ?? 'active',
                        viewerRoles: membership?.roles ?? ['owner', 'moderator'],
                        memberCount: foundingMemberCount,
                    }),
                    viewerCapabilities: (0, util_1.getViewerCapabilities)(membership ?? {
                        membershipState: 'active',
                        roles: ['owner', 'moderator'],
                    }),
                    governanceSummary: (0, util_1.toGovernanceSummary)(governance),
                };
            });
            if (local) {
                return (0, read_after_write_1.formatMungedResponse)({
                    board: {
                        ...local.board,
                        governanceSummary: local.governanceSummary,
                    },
                    viewerCapabilities: local.viewerCapabilities,
                });
            }
            const streamRes = await (0, pipethrough_1.pipethrough)(ctx, req, { iss: viewerDid });
            if ((0, pipethrough_1.isJsonContentType)(streamRes.headers['content-type']) === false) {
                return streamRes;
            }
            let bufferRes;
            try {
                const { buffer } = (bufferRes = await (0, pipethrough_1.asPipeThroughBuffer)(streamRes));
                const body = (0, lexicon_1.jsonToLex)(JSON.parse(buffer.toString('utf8')));
                return (0, read_after_write_1.formatMungedResponse)(body);
            }
            catch {
                return bufferRes ?? streamRes;
            }
        },
    });
}
//# sourceMappingURL=getBoard.js.map