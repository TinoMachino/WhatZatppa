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
    server.com.para.community.listBoards({
        auth: ctx.authVerifier.authorization({
            authorize: (permissions, { req }) => {
                const lxm = lexicons_1.ids.ComParaCommunityListBoards;
                const aud = (0, pipethrough_1.computeProxyTo)(ctx, req, lxm);
                permissions.assertRpc({ aud, lxm });
            },
        }),
        handler: async ({ auth, req, params }) => {
            const viewerDid = auth.credentials.did;
            const streamRes = await (0, pipethrough_1.pipethrough)(ctx, req, { iss: viewerDid });
            const localBoards = await ctx.actorStore.read(viewerDid, async (store) => {
                const boards = await (0, util_1.listLocalBoards)(store, params.limit || 50);
                return Promise.all(boards.map(async (board) => {
                    const [membership, foundingMemberCount] = await Promise.all([
                        (0, util_1.getLocalMembership)({
                            store,
                            viewerDid,
                            boardUri: board.uri,
                        }),
                        (0, util_1.getFoundingMemberCount)({ store, board }),
                    ]);
                    return (0, util_1.toListBoardView)({
                        board,
                        creatorDid: viewerDid,
                        viewerMembershipState: membership?.membershipState ?? 'active',
                        viewerRoles: membership?.roles ?? ['owner', 'moderator'],
                        memberCount: foundingMemberCount,
                    });
                }));
            });
            if (localBoards.length === 0) {
                return streamRes;
            }
            if ((0, pipethrough_1.isJsonContentType)(streamRes.headers['content-type']) === false) {
                return streamRes;
            }
            let bufferRes;
            try {
                const { buffer } = (bufferRes = await (0, pipethrough_1.asPipeThroughBuffer)(streamRes));
                const body = (0, lexicon_1.jsonToLex)(JSON.parse(buffer.toString('utf8')));
                const seen = new Set(body.boards.map((board) => board.uri));
                const mergedBoards = [
                    ...localBoards.filter((board) => !seen.has(board.uri)),
                    ...body.boards,
                ];
                return (0, read_after_write_1.formatMungedResponse)({
                    ...body,
                    boards: mergedBoards.slice(0, params.limit || 50),
                });
            }
            catch {
                return bufferRes ?? streamRes;
            }
        },
    });
}
//# sourceMappingURL=listBoards.js.map