"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("@connectrpc/connect");
const bsync_pb_1 = require("../proto/bsync_pb");
const auth_1 = require("./auth");
const util_1 = require("./util");
exports.default = (ctx) => ({
    /**
     * This method is responsible for deleting log rows from the bsync db, it has
     * no other downstream effects. This method is called from the dataplane in
     * response to a data deletion request initiated by a moderator in Ozone.
     * It's the final step of the deletion process, basically cleaning up the
     * breadcrumbs that resulted in the state we store in the dataplane.
     */
    async deleteOperationsByActorAndNamespace(req, handlerCtx) {
        (0, auth_1.authWithApiKey)(ctx, handlerCtx);
        const { db } = ctx;
        try {
            (0, util_1.validateNamespace)(req.namespace);
        }
        catch (error) {
            throw new connect_1.ConnectError('requested namespace for deletion is invalid NSID', connect_1.Code.InvalidArgument);
        }
        if (!(0, util_1.isValidDid)(req.actorDid)) {
            throw new connect_1.ConnectError('requested actor_did for deletion is invalid DID', connect_1.Code.InvalidArgument);
        }
        const deletedRows = await db.db
            .deleteFrom('operation')
            .where('actorDid', '=', req.actorDid)
            .where('namespace', '=', req.namespace)
            .returning('id')
            .execute();
        return new bsync_pb_1.DeleteOperationsByActorAndNamespaceResponse({
            deletedCount: deletedRows.length,
        });
    },
});
//# sourceMappingURL=delete-operations.js.map