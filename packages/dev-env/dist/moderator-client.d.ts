import { AtpAgent, ToolsOzoneModerationDefs, ToolsOzoneModerationEmitEvent as EmitModerationEvent, ToolsOzoneModerationQueryEvents as QueryModerationEvents, ToolsOzoneModerationQueryStatuses as QueryModerationStatuses, ToolsOzoneSettingRemoveOptions, ToolsOzoneSettingUpsertOption } from '@atproto/api';
import { TestOzone } from './ozone';
type TakeActionInput = EmitModerationEvent.InputSchema;
type QueryStatusesParams = QueryModerationStatuses.QueryParams;
type QueryEventsParams = QueryModerationEvents.QueryParams;
type ModLevel = 'admin' | 'moderator' | 'triage';
export declare class ModeratorClient {
    ozone: TestOzone;
    agent: AtpAgent;
    constructor(ozone: TestOzone);
    getEvent(id: number, role?: ModLevel): Promise<ToolsOzoneModerationDefs.ModEventViewDetail>;
    queryStatuses(input: QueryStatusesParams, role?: ModLevel): Promise<QueryModerationStatuses.OutputSchema>;
    getReporterStats(dids: string[]): Promise<import("@atproto/api/dist/client/types/tools/ozone/moderation/getReporterStats").OutputSchema>;
    queryEvents(input: QueryEventsParams, role?: ModLevel): Promise<QueryModerationEvents.OutputSchema>;
    emitEvent(opts: {
        event: TakeActionInput['event'];
        subject: TakeActionInput['subject'];
        subjectBlobCids?: TakeActionInput['subjectBlobCids'];
        reason?: string;
        createdBy?: string;
        meta?: unknown;
        modTool?: ToolsOzoneModerationDefs.ModTool;
        externalId?: string;
    }, role?: ModLevel): Promise<ToolsOzoneModerationDefs.ModEventView>;
    reverseAction(opts: {
        id: number;
        subject: TakeActionInput['subject'];
        reason?: string;
        createdBy?: string;
        modTool?: ToolsOzoneModerationDefs.ModTool;
    }, role?: ModLevel): Promise<ToolsOzoneModerationDefs.ModEventView>;
    performTakedown(opts: {
        subject: TakeActionInput['subject'];
        subjectBlobCids?: TakeActionInput['subjectBlobCids'];
        durationInHours?: number;
        acknowledgeAccountSubjects?: boolean;
        reason?: string;
        policies?: string[];
    }, role?: ModLevel): Promise<ToolsOzoneModerationDefs.ModEventView>;
    performReverseTakedown(opts: {
        subject: TakeActionInput['subject'];
        subjectBlobCids?: TakeActionInput['subjectBlobCids'];
        reason?: string;
    }, role?: ModLevel): Promise<ToolsOzoneModerationDefs.ModEventView>;
    upsertSettingOption(setting: ToolsOzoneSettingUpsertOption.InputSchema, callerRole?: 'admin' | 'moderator' | 'triage'): Promise<ToolsOzoneSettingUpsertOption.OutputSchema>;
    removeSettingOptions(params: ToolsOzoneSettingRemoveOptions.InputSchema, callerRole?: 'admin' | 'moderator' | 'triage'): Promise<ToolsOzoneSettingRemoveOptions.OutputSchema>;
}
export {};
//# sourceMappingURL=moderator-client.d.ts.map