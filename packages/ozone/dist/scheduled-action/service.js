"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduledActionService = void 0;
const xrpc_server_1 = require("@atproto/xrpc-server");
const logger_1 = require("../logger");
class ScheduledActionService {
    constructor(db) {
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
    }
    static creator() {
        return (db) => new ScheduledActionService(db);
    }
    formatScheduledAction(action) {
        return {
            id: action.id,
            action: action.action,
            eventData: action.eventData,
            did: action.did,
            executeAt: action.executeAt
                ? new Date(action.executeAt).toISOString()
                : undefined,
            executeAfter: action.executeAfter
                ? new Date(action.executeAfter).toISOString()
                : undefined,
            executeUntil: action.executeUntil
                ? new Date(action.executeUntil).toISOString()
                : undefined,
            randomizeExecution: action.randomizeExecution,
            createdBy: action.createdBy,
            createdAt: new Date(action.createdAt).toISOString(),
            updatedAt: new Date(action.updatedAt).toISOString(),
            status: action.status,
            lastExecutedAt: action.lastExecutedAt
                ? new Date(action.lastExecutedAt).toISOString()
                : undefined,
            lastFailureReason: action.lastFailureReason || undefined,
            executionEventId: action.executionEventId || undefined,
        };
    }
    async scheduleAction(schedulingParams) {
        const { action, eventData, did, createdBy } = schedulingParams;
        // Only allow one pending action at a time for a given subject and action type
        const existingAction = await this.getPendingActionForSubject(did, action);
        if (existingAction) {
            throw new xrpc_server_1.InvalidRequestError('A pending scheduled action already exists for this subject', 'ActionAlreadyExists');
        }
        // When a time-range for action is specified, ensure that the range is valid
        if ('executeAfter' in schedulingParams &&
            schedulingParams.executeAfter &&
            schedulingParams.executeUntil &&
            schedulingParams.executeAfter >= schedulingParams.executeUntil) {
            throw new xrpc_server_1.InvalidRequestError('executeAfter must be before executeUntil', 'InvalidScheduling');
        }
        const now = new Date().toISOString();
        const randomizeExecution = !('executeAt' in schedulingParams) && 'executeAfter' in schedulingParams;
        const scheduledAction = await this.db.db
            .insertInto('scheduled_action')
            .values({
            action,
            eventData: JSON.stringify(eventData),
            did,
            executeAt: randomizeExecution
                ? null
                : schedulingParams.executeAt?.toISOString(),
            executeAfter: randomizeExecution
                ? schedulingParams.executeAfter?.toISOString()
                : null,
            executeUntil: randomizeExecution
                ? schedulingParams.executeUntil?.toISOString()
                : null,
            randomizeExecution,
            createdBy,
            createdAt: now,
            updatedAt: now,
            status: 'pending',
        })
            .returningAll()
            .executeTakeFirstOrThrow();
        return scheduledAction;
    }
    async getPendingActionForSubject(did, action) {
        const scheduledAction = await this.db.db
            .selectFrom('scheduled_action')
            .selectAll()
            .where('did', '=', did)
            .where('action', '=', action)
            .where('status', '=', 'pending')
            .executeTakeFirst();
        return scheduledAction || null;
    }
    async listScheduledActions({ cursor, limit = 50, startTime, endTime, subjects, statuses = [], direction = 'desc', }) {
        let query = this.db.db
            .selectFrom('scheduled_action')
            .where('status', 'in', statuses)
            .selectAll();
        if (subjects && subjects.length > 0) {
            query = query.where('did', 'in', subjects);
        }
        if (startTime) {
            query = query.where((qb) => {
                return qb
                    .orWhere('executeAt', '>=', startTime.toISOString())
                    .orWhere('executeAfter', '>=', startTime.toISOString());
            });
        }
        if (endTime) {
            query = query.where((qb) => {
                return qb
                    .orWhere('executeAt', '<=', endTime.toISOString())
                    .orWhere('executeUntil', '<=', endTime.toISOString())
                    .orWhere((sqb) => {
                    return sqb
                        .where('executeUntil', 'is', null)
                        .where('executeAfter', '<=', endTime.toISOString());
                });
            });
        }
        if (cursor) {
            query = query.where('id', direction === 'asc' ? '>' : '<', parseInt(cursor, 10));
        }
        const actions = await query.orderBy('id', direction).limit(limit).execute();
        return {
            actions,
            cursor: actions.at(-1)?.id?.toString(),
        };
    }
    async cancelScheduledActions(subjects) {
        const succeeded = [];
        const failed = [];
        for (const did of subjects) {
            try {
                const result = await this.db.db
                    .updateTable('scheduled_action')
                    .set({
                    status: 'cancelled',
                    updatedAt: new Date().toISOString(),
                })
                    .where('did', '=', did)
                    .where('status', '=', 'pending')
                    .executeTakeFirst();
                if (result.numUpdatedRows && result.numUpdatedRows > 0) {
                    succeeded.push(did);
                }
                else {
                    failed.push({
                        did,
                        error: 'No pending scheduled actions found for subject',
                        errorCode: 'NoPendingActions',
                    });
                }
            }
            catch (err) {
                logger_1.dbLogger.error({ err, subjects }, 'Error cancelling scheduled action');
                failed.push({
                    did,
                    error: 'Unknown error',
                    errorCode: 'DatabaseError',
                });
            }
        }
        return { succeeded, failed };
    }
    async getPendingActionsToExecute(now) {
        return await this.db.db
            .selectFrom('scheduled_action')
            .selectAll()
            .where('status', '=', 'pending')
            .where((qb) => {
            return qb
                .orWhere('executeAfter', '<=', now.toISOString())
                .orWhere('executeAt', '<=', now.toISOString());
        })
            .execute();
    }
    async markActionAsExecuted(actionId, executionEventId) {
        const now = new Date().toISOString();
        await this.db.db
            .updateTable('scheduled_action')
            .set({
            status: 'executed',
            lastExecutedAt: now,
            executionEventId,
            updatedAt: now,
        })
            .where('id', '=', actionId)
            .execute();
    }
    async markActionAsFailed(actionId, failureReason) {
        const now = new Date().toISOString();
        await this.db.db
            .updateTable('scheduled_action')
            .set({
            status: 'failed',
            lastExecutedAt: now,
            lastFailureReason: failureReason,
            updatedAt: now,
        })
            .where('id', '=', actionId)
            .execute();
    }
}
exports.ScheduledActionService = ScheduledActionService;
//# sourceMappingURL=service.js.map