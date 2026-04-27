"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = require("@connectrpc/connect");
const kysely_1 = require("kysely");
const syntax_1 = require("@atproto/syntax");
const operation_1 = require("../db/schema/operation");
const bsync_pb_1 = require("../proto/bsync_pb");
const auth_1 = require("./auth");
const util_1 = require("./util");
exports.default = (ctx) => ({
    async putOperation(req, handlerCtx) {
        (0, auth_1.authWithApiKey)(ctx, handlerCtx);
        const { db } = ctx;
        const op = validateOp(req);
        const id = await db.transaction(async (txn) => {
            return putOp(txn, op);
        });
        return new bsync_pb_1.PutOperationResponse({
            operation: {
                id: String(id),
                actorDid: op.actorDid,
                namespace: op.namespace,
                key: op.key,
                method: op.method,
                payload: op.payload,
            },
        });
    },
});
const putOp = async (db, op) => {
    const { ref } = db.db.dynamic;
    const { id } = await db.db
        .insertInto('operation')
        .values({
        actorDid: op.actorDid,
        namespace: op.namespace,
        key: op.key,
        method: op.method,
        payload: op.payload,
    })
        .returning('id')
        .executeTakeFirstOrThrow();
    await (0, kysely_1.sql) `notify ${ref(operation_1.createOperationChannel)}`.execute(db.db); // emitted transactionally
    return id;
};
const validateOp = (req) => {
    try {
        (0, util_1.validateNamespace)(req.namespace);
    }
    catch (error) {
        throw new connect_1.ConnectError('operation namespace is invalid NSID', connect_1.Code.InvalidArgument);
    }
    if (!(0, util_1.isValidDid)(req.actorDid)) {
        throw new connect_1.ConnectError('operation actor_did is invalid DID', connect_1.Code.InvalidArgument);
    }
    try {
        (0, syntax_1.ensureValidRecordKey)(req.key);
    }
    catch (error) {
        throw new connect_1.ConnectError('operation key is required', connect_1.Code.InvalidArgument);
    }
    if (req.method !== bsync_pb_1.Method.CREATE &&
        req.method !== bsync_pb_1.Method.UPDATE &&
        req.method !== bsync_pb_1.Method.DELETE) {
        throw new connect_1.ConnectError('operation method is invalid', connect_1.Code.InvalidArgument);
    }
    if (req.method === bsync_pb_1.Method.CREATE || req.method === bsync_pb_1.Method.UPDATE) {
        try {
            JSON.parse(new TextDecoder().decode(req.payload));
        }
        catch (error) {
            throw new connect_1.ConnectError('payload must be a valid JSON when method is CREATE or UPDATE', connect_1.Code.InvalidArgument);
        }
    }
    if (req.method === bsync_pb_1.Method.DELETE && req.payload.length > 0) {
        throw new connect_1.ConnectError('cannot specify a payload when method is DELETE', connect_1.Code.InvalidArgument);
    }
    return req;
};
//# sourceMappingURL=put-operation.js.map