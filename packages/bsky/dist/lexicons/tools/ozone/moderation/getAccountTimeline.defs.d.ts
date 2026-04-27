import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.moderation.getAccountTimeline";
export { $nsid };
/** Get timeline of all available events of an account. This includes moderation events, account history and did history. */
declare const main: l.Query<"tools.ozone.moderation.getAccountTimeline", l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    timeline: l.ArraySchema<l.RefSchema<l.Validator<TimelineItem, TimelineItem>>>;
}>>, readonly ["RepoNotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.getAccountTimeline", $params: l.ParamsSchema<{
    readonly did: l.StringSchema<{
        readonly format: "did";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    timeline: l.ArraySchema<l.RefSchema<l.Validator<TimelineItem, TimelineItem>>>;
}>>;
type TimelineItem = {
    $type?: 'tools.ozone.moderation.getAccountTimeline#timelineItem';
    day: string;
    summary: TimelineItemSummary[];
};
export type { TimelineItem };
declare const timelineItem: l.TypedObjectSchema<"tools.ozone.moderation.getAccountTimeline#timelineItem", l.Validator<TimelineItem, TimelineItem>>;
export { timelineItem };
type TimelineItemSummary = {
    $type?: 'tools.ozone.moderation.getAccountTimeline#timelineItemSummary';
    eventSubjectType: 'account' | 'record' | 'chat' | l.UnknownString;
    eventType: 'tools.ozone.moderation.defs#modEventTakedown' | 'tools.ozone.moderation.defs#modEventReverseTakedown' | 'tools.ozone.moderation.defs#modEventComment' | 'tools.ozone.moderation.defs#modEventReport' | 'tools.ozone.moderation.defs#modEventLabel' | 'tools.ozone.moderation.defs#modEventAcknowledge' | 'tools.ozone.moderation.defs#modEventEscalate' | 'tools.ozone.moderation.defs#modEventMute' | 'tools.ozone.moderation.defs#modEventUnmute' | 'tools.ozone.moderation.defs#modEventMuteReporter' | 'tools.ozone.moderation.defs#modEventUnmuteReporter' | 'tools.ozone.moderation.defs#modEventEmail' | 'tools.ozone.moderation.defs#modEventResolveAppeal' | 'tools.ozone.moderation.defs#modEventDivert' | 'tools.ozone.moderation.defs#modEventTag' | 'tools.ozone.moderation.defs#accountEvent' | 'tools.ozone.moderation.defs#identityEvent' | 'tools.ozone.moderation.defs#recordEvent' | 'tools.ozone.moderation.defs#modEventPriorityScore' | 'tools.ozone.moderation.defs#revokeAccountCredentialsEvent' | 'tools.ozone.moderation.defs#ageAssuranceEvent' | 'tools.ozone.moderation.defs#ageAssuranceOverrideEvent' | 'tools.ozone.moderation.defs#timelineEventPlcCreate' | 'tools.ozone.moderation.defs#timelineEventPlcOperation' | 'tools.ozone.moderation.defs#timelineEventPlcTombstone' | 'tools.ozone.hosting.getAccountHistory#accountCreated' | 'tools.ozone.hosting.getAccountHistory#emailConfirmed' | 'tools.ozone.hosting.getAccountHistory#passwordUpdated' | 'tools.ozone.hosting.getAccountHistory#handleUpdated' | 'tools.ozone.moderation.defs#scheduleTakedownEvent' | 'tools.ozone.moderation.defs#cancelScheduledTakedownEvent' | l.UnknownString;
    count: number;
};
export type { TimelineItemSummary };
declare const timelineItemSummary: l.TypedObjectSchema<"tools.ozone.moderation.getAccountTimeline#timelineItemSummary", l.Validator<TimelineItemSummary, TimelineItemSummary>>;
export { timelineItemSummary };
//# sourceMappingURL=getAccountTimeline.defs.d.ts.map