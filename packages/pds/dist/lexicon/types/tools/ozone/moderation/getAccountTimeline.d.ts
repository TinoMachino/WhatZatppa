/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    did: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    timeline: TimelineItem[];
}
export type HandlerInput = void;
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'RepoNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
export interface TimelineItem {
    $type?: 'tools.ozone.moderation.getAccountTimeline#timelineItem';
    day: string;
    summary: TimelineItemSummary[];
}
export declare function isTimelineItem<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.getAccountTimeline", "timelineItem">;
export declare function validateTimelineItem<V>(v: V): ValidationResult<TimelineItem & V>;
export interface TimelineItemSummary {
    $type?: 'tools.ozone.moderation.getAccountTimeline#timelineItemSummary';
    eventSubjectType: 'account' | 'record' | 'chat' | (string & {});
    eventType: 'tools.ozone.moderation.defs#modEventTakedown' | 'tools.ozone.moderation.defs#modEventReverseTakedown' | 'tools.ozone.moderation.defs#modEventComment' | 'tools.ozone.moderation.defs#modEventReport' | 'tools.ozone.moderation.defs#modEventLabel' | 'tools.ozone.moderation.defs#modEventAcknowledge' | 'tools.ozone.moderation.defs#modEventEscalate' | 'tools.ozone.moderation.defs#modEventMute' | 'tools.ozone.moderation.defs#modEventUnmute' | 'tools.ozone.moderation.defs#modEventMuteReporter' | 'tools.ozone.moderation.defs#modEventUnmuteReporter' | 'tools.ozone.moderation.defs#modEventEmail' | 'tools.ozone.moderation.defs#modEventResolveAppeal' | 'tools.ozone.moderation.defs#modEventDivert' | 'tools.ozone.moderation.defs#modEventTag' | 'tools.ozone.moderation.defs#accountEvent' | 'tools.ozone.moderation.defs#identityEvent' | 'tools.ozone.moderation.defs#recordEvent' | 'tools.ozone.moderation.defs#modEventPriorityScore' | 'tools.ozone.moderation.defs#revokeAccountCredentialsEvent' | 'tools.ozone.moderation.defs#ageAssuranceEvent' | 'tools.ozone.moderation.defs#ageAssuranceOverrideEvent' | 'tools.ozone.moderation.defs#timelineEventPlcCreate' | 'tools.ozone.moderation.defs#timelineEventPlcOperation' | 'tools.ozone.moderation.defs#timelineEventPlcTombstone' | 'tools.ozone.hosting.getAccountHistory#accountCreated' | 'tools.ozone.hosting.getAccountHistory#emailConfirmed' | 'tools.ozone.hosting.getAccountHistory#passwordUpdated' | 'tools.ozone.hosting.getAccountHistory#handleUpdated' | 'tools.ozone.moderation.defs#scheduleTakedownEvent' | 'tools.ozone.moderation.defs#cancelScheduledTakedownEvent' | (string & {});
    count: number;
}
export declare function isTimelineItemSummary<V>(v: V): v is import("../../../../util").$TypedObject<V, "tools.ozone.moderation.getAccountTimeline", "timelineItemSummary">;
export declare function validateTimelineItemSummary<V>(v: V): ValidationResult<TimelineItemSummary & V>;
//# sourceMappingURL=getAccountTimeline.d.ts.map