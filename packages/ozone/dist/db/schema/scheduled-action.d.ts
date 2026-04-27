import { GeneratedAlways } from 'kysely';
export declare const scheduledActionTableName = "scheduled_action";
export interface ScheduledAction {
    id: GeneratedAlways<number>;
    action: string;
    eventData: unknown | null;
    did: string;
    executeAt: string | null;
    executeAfter: string | null;
    executeUntil: string | null;
    randomizeExecution: boolean;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
    status: string;
    lastExecutedAt: string | null;
    lastFailureReason: string | null;
    executionEventId: number | null;
}
export type PartialDB = {
    [scheduledActionTableName]: ScheduledAction;
};
//# sourceMappingURL=scheduled-action.d.ts.map