import { Selectable } from 'kysely';
import { ScheduledActionStatus, ScheduledActionType } from '../api/util';
import { Database } from '../db';
import { ScheduledAction } from '../db/schema/scheduled-action';
import { ScheduledActionView } from '../lexicon/types/tools/ozone/moderation/defs';
import { SchedulingParams } from './types';
export type ScheduledActionServiceCreator = (db: Database) => ScheduledActionService;
export declare class ScheduledActionService {
    db: Database;
    constructor(db: Database);
    static creator(): (db: Database) => ScheduledActionService;
    formatScheduledAction(action: Selectable<ScheduledAction>): ScheduledActionView;
    scheduleAction(schedulingParams: SchedulingParams): Promise<Selectable<ScheduledAction>>;
    getPendingActionForSubject(did: string, action: ScheduledActionType): Promise<Selectable<ScheduledAction> | null>;
    listScheduledActions({ cursor, limit, startTime, endTime, subjects, statuses, direction, }: {
        cursor?: string;
        limit?: number;
        startTime?: Date;
        endTime?: Date;
        subjects?: string[];
        statuses: ScheduledActionStatus[];
        direction?: 'asc' | 'desc';
    }): Promise<{
        actions: Selectable<ScheduledAction>[];
        cursor?: string;
    }>;
    cancelScheduledActions(subjects: string[]): Promise<{
        succeeded: string[];
        failed: {
            did: string;
            error: string;
            errorCode?: string;
        }[];
    }>;
    getPendingActionsToExecute(now: Date): Promise<Selectable<ScheduledAction>[]>;
    markActionAsExecuted(actionId: number, executionEventId: number): Promise<void>;
    markActionAsFailed(actionId: number, failureReason: string): Promise<void>;
}
//# sourceMappingURL=service.d.ts.map