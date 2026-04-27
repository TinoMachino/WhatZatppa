"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UseCodeKeyset = exports.TimeCodeKeyset = void 0;
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const invite_1 = require("../../../../account-manager/helpers/invite");
const pagination_1 = require("../../../../db/pagination");
const index_js_1 = require("../../../../lexicons/index.js");
function default_1(server, ctx) {
    if (ctx.cfg.entryway) {
        server.add(index_js_1.com.atproto.admin.getInviteCodes, () => {
            throw new xrpc_server_1.InvalidRequestError('Account invites are managed by the entryway service');
        });
        return;
    }
    server.add(index_js_1.com.atproto.admin.getInviteCodes, {
        auth: ctx.authVerifier.moderator,
        handler: async ({ params, }) => {
            const { sort, limit, cursor } = params;
            const db = ctx.accountManager.db;
            const keyset = createKeyset(ctx, sort);
            const builder = (0, invite_1.selectInviteCodesQb)(db);
            const res = await (0, pagination_1.paginate)(builder, {
                limit,
                cursor,
                keyset,
            }).execute();
            const codes = res.map((row) => row.code);
            const uses = await ctx.accountManager.getInviteCodesUses(codes);
            const resultCursor = keyset.packFromResult(res);
            const codeDetails = res.map(({ disabled, createdAt, ...row }) => ({
                ...row,
                createdAt,
                disabled: disabled === 1,
                uses: uses[row.code] ?? [],
            }));
            return {
                encoding: 'application/json',
                body: {
                    cursor: resultCursor,
                    codes: codeDetails,
                },
            };
        },
    });
}
function createKeyset(ctx, sort) {
    const { ref } = ctx.accountManager.db.db.dynamic;
    if (sort === 'recent') {
        return new TimeCodeKeyset(ref('createdAt'), ref('code'));
    }
    if (sort === 'usage') {
        return new UseCodeKeyset(ref('uses'), ref('code'));
    }
    throw new xrpc_server_1.InvalidRequestError(`unknown sort method: ${sort}`);
}
class TimeCodeKeyset extends pagination_1.GenericKeyset {
    labelResult(result) {
        return { primary: result.createdAt, secondary: result.code };
    }
    labeledResultToCursor(labeled) {
        return {
            primary: new Date(labeled.primary).getTime().toString(),
            secondary: labeled.secondary,
        };
    }
    cursorToLabeledResult(cursor) {
        const primaryDate = new Date(parseInt(cursor.primary, 10));
        if (isNaN(primaryDate.getTime())) {
            throw new xrpc_server_1.InvalidRequestError('Malformed cursor');
        }
        return {
            primary: primaryDate.toISOString(),
            secondary: cursor.secondary,
        };
    }
}
exports.TimeCodeKeyset = TimeCodeKeyset;
class UseCodeKeyset extends pagination_1.GenericKeyset {
    labelResult(result) {
        return { primary: result.uses, secondary: result.code };
    }
    labeledResultToCursor(labeled) {
        return {
            primary: labeled.primary.toString(),
            secondary: labeled.secondary,
        };
    }
    cursorToLabeledResult(cursor) {
        const primaryCode = parseInt(cursor.primary, 10);
        if (isNaN(primaryCode)) {
            throw new xrpc_server_1.InvalidRequestError('Malformed cursor');
        }
        return {
            primary: primaryCode,
            secondary: cursor.secondary,
        };
    }
}
exports.UseCodeKeyset = UseCodeKeyset;
//# sourceMappingURL=getInviteCodes.js.map