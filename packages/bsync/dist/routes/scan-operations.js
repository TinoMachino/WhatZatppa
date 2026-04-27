"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_events_1 = require("node:events");
const operation_1 = require("../db/schema/operation");
const bsync_pb_1 = require("../proto/bsync_pb");
const auth_1 = require("./auth");
const util_1 = require("./util");
exports.default = (ctx) => ({
    async scanOperations(req, handlerCtx) {
        (0, auth_1.authWithApiKey)(ctx, handlerCtx);
        const { db, events } = ctx;
        const limit = req.limit || 1000;
        const cursor = (0, util_1.validCursor)(req.cursor);
        const nextOpPromise = (0, node_events_1.once)(events, operation_1.createOperationChannel, {
            signal: (0, util_1.combineSignals)(ctx.shutdown, AbortSignal.timeout(ctx.cfg.service.longPollTimeoutMs)),
        });
        nextOpPromise.catch(() => null); // ensure timeout is always handled
        const nextOpPageQb = db.db
            .selectFrom('operation')
            .selectAll()
            .where('id', '>', cursor ?? -1)
            .orderBy('id', 'asc')
            .limit(limit);
        let ops = await nextOpPageQb.execute();
        if (!ops.length) {
            // if there were no ops on the page, wait for an event then try again.
            try {
                await nextOpPromise;
            }
            catch (err) {
                ctx.shutdown.throwIfAborted();
                return new bsync_pb_1.ScanOperationsResponse({
                    operations: [],
                    cursor: req.cursor,
                });
            }
            ops = await nextOpPageQb.execute();
            if (!ops.length) {
                return new bsync_pb_1.ScanOperationsResponse({
                    operations: [],
                    cursor: req.cursor,
                });
            }
        }
        const lastOp = ops[ops.length - 1];
        return new bsync_pb_1.ScanOperationsResponse({
            operations: ops.map((op) => ({
                id: op.id.toString(),
                actorDid: op.actorDid,
                namespace: op.namespace,
                key: op.key,
                method: op.method,
                payload: op.payload,
            })),
            cursor: lastOp.id.toString(),
        });
    },
});
//# sourceMappingURL=scan-operations.js.map