"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const xrpc_server_1 = require("@atproto/xrpc-server");
const auth_scope_1 = require("../../../../auth-scope");
const index_js_1 = require("../../../../lexicons/index.js");
const util_1 = require("./util");
function default_1(server, ctx) {
    server.add(index_js_1.com.atproto.server.getAccountInviteCodes, {
        auth: ctx.authVerifier.authorization({
            checkTakedown: true,
            scopes: auth_scope_1.ACCESS_FULL,
            authorize: () => {
                throw new xrpc_server_1.ForbiddenError('OAuth credentials are not supported for this endpoint');
            },
        }),
        handler: async ({ params, auth, req }) => {
            if (ctx.entrywayClient) {
                const { headers } = await ctx.entrywayAuthHeaders(req, auth.credentials.did, index_js_1.com.atproto.server.getAccountInviteCodes.$lxm);
                return ctx.entrywayClient.xrpc(index_js_1.com.atproto.server.getAccountInviteCodes, { params, headers });
            }
            const requester = auth.credentials.did;
            const { includeUsed, createAvailable } = params;
            const [account, userCodes] = await Promise.all([
                ctx.accountManager.getAccount(requester),
                ctx.accountManager.getAccountInvitesCodes(requester),
            ]);
            if (!account) {
                throw new xrpc_server_1.InvalidRequestError('Account not found', 'NotFound');
            }
            let created = [];
            if (createAvailable &&
                ctx.cfg.invites.required &&
                ctx.cfg.invites.interval !== null) {
                const { toCreate, total } = calculateCodesToCreate({
                    did: requester,
                    userCreatedAt: new Date(account.createdAt).getTime(),
                    codes: userCodes,
                    epoch: ctx.cfg.invites.epoch,
                    interval: ctx.cfg.invites.interval,
                });
                if (toCreate > 0) {
                    const codes = (0, util_1.genInvCodes)(ctx.cfg, toCreate);
                    created = await ctx.accountManager.createAccountInviteCodes(requester, codes, total, account.invitesDisabled ?? 0);
                }
            }
            const allCodes = [...userCodes, ...created];
            const filtered = allCodes.filter((code) => {
                if (code.disabled)
                    return false;
                if (!includeUsed && code.uses.length >= code.available)
                    return false;
                return true;
            });
            return {
                encoding: 'application/json',
                body: { codes: filtered },
            };
        },
    });
}
/**
 * WARNING: TRICKY SUBTLE MATH - DONT MESS WITH THIS FUNCTION UNLESS YOUR'RE VERY CONFIDENT
 * if the user wishes to create available codes & the server allows that,
 * we determine the number to create by dividing their account lifetime by the interval at which they can create codes
 * if an invite epoch is provided, we only calculate available invites since that epoch
 * we allow a max of 5 open codes at a given time
 * note: even if a user is disabled from future invites, we still create the invites for bookkeeping, we just immediately disable them as well
 */
const calculateCodesToCreate = (opts) => {
    // for the sake of generating routine interval codes, we do not count explicitly gifted admin codes
    const routineCodes = opts.codes.filter((code) => code.createdBy !== 'admin');
    const unusedRoutineCodes = routineCodes.filter((row) => !row.disabled && row.available > row.uses.length);
    const userLifespan = Date.now() - opts.userCreatedAt;
    // how many codes a user could create within the current epoch if they have 0
    let couldCreate;
    if (opts.userCreatedAt >= opts.epoch) {
        // if the user was created after the epoch, then they can create a code for each interval since the epoch
        couldCreate = Math.floor(userLifespan / opts.interval);
    }
    else {
        // if the user was created before the epoch, we:
        // - calculate the total intervals since account creation
        // - calculate the total intervals before the epoch
        // - subtract the two
        const couldCreateTotal = Math.floor(userLifespan / opts.interval);
        const userPreEpochLifespan = opts.epoch - opts.userCreatedAt;
        const couldCreateBeforeEpoch = Math.floor(userPreEpochLifespan / opts.interval);
        couldCreate = couldCreateTotal - couldCreateBeforeEpoch;
    }
    // we count the codes that the user has created within the current epoch
    const epochCodes = routineCodes.filter((code) => new Date(code.createdAt).getTime() > opts.epoch);
    // finally we the number of codes they currently have from the number that they could create, and take a max of 5
    const toCreate = Math.min(5 - unusedRoutineCodes.length, couldCreate - epochCodes.length);
    return {
        toCreate,
        total: routineCodes.length + toCreate,
    };
};
//# sourceMappingURL=getAccountInviteCodes.js.map