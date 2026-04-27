import { Selectable } from 'kysely';
import { Database } from '../db';
import { ScheduledAction } from '../db/schema/scheduled-action';
import { ModTool } from '../lexicon/types/tools/ozone/moderation/defs';
import { ModerationService, ModerationServiceCreator } from '../mod-service';
import { ModEventType } from '../mod-service/types';
import { ScheduledActionServiceCreator } from '../scheduled-action/service';
import { SettingService, SettingServiceCreator } from '../setting/service';
export declare class ScheduledActionProcessor {
    private db;
    private serviceDid;
    private settingService;
    private modService;
    private scheduledActionService;
    destroyed: boolean;
    processingPromise: Promise<void>;
    timer?: NodeJS.Timeout;
    constructor(db: Database, serviceDid: string, settingService: SettingServiceCreator, modService: ModerationServiceCreator, scheduledActionService: ScheduledActionServiceCreator);
    start(): void;
    poll(): void;
    destroy(): Promise<void>;
    executeScheduledAction(actionId: number): Promise<void>;
    performTakedown({ email, action, event, modTool, moderationTxn, settingService, }: {
        email: {
            subject: string;
            content: string;
        };
        action: Selectable<ScheduledAction>;
        event: ModEventType;
        modTool: ModTool | undefined;
        moderationTxn: ModerationService;
        settingService: SettingService;
    }): Promise<{
        event: import("../mod-service/types").ModerationEventRow;
        subjectStatus: import("../mod-service/types").ModerationSubjectStatusRow | null;
    }>;
    findAndExecuteScheduledActions(): Promise<void>;
}
//# sourceMappingURL=scheduled-action-processor.d.ts.map