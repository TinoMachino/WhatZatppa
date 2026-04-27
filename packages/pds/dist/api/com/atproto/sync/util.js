"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assertRepoAvailability = void 0;
const xrpc_server_1 = require("@atproto/xrpc-server");
const assertRepoAvailability = async (ctx, handleOrDid, isAdminOrSelf) => {
    const account = await ctx.accountManager.getAccount(handleOrDid, {
        includeDeactivated: true,
        includeTakenDown: true,
    });
    if (!account) {
        throw new xrpc_server_1.InvalidRequestError(`Could not find repo for DID: ${handleOrDid}`, 'RepoNotFound');
    }
    if (isAdminOrSelf) {
        return account;
    }
    if (account.takedownRef) {
        throw new xrpc_server_1.InvalidRequestError(`Repo has been takendown: ${handleOrDid}`, 'RepoTakendown');
    }
    if (account.deactivatedAt) {
        throw new xrpc_server_1.InvalidRequestError(`Repo has been deactivated: ${handleOrDid}`, 'RepoDeactivated');
    }
    return account;
};
exports.assertRepoAvailability = assertRepoAvailability;
//# sourceMappingURL=util.js.map