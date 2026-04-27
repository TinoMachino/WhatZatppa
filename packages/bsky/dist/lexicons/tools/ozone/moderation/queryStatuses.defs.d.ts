import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.queryStatuses";
export { $nsid };
/** View moderation statuses of subjects (record or repo). */
declare const main: l.Query<"tools.ozone.moderation.queryStatuses", l.ParamsSchema<{
    readonly queueCount: l.OptionalSchema<l.IntegerSchema>;
    readonly queueIndex: l.OptionalSchema<l.IntegerSchema>;
    readonly queueSeed: l.OptionalSchema<l.StringSchema<{}>>;
    readonly includeAllUserRecords: l.OptionalSchema<l.BooleanSchema>;
    readonly subject: l.OptionalSchema<l.StringSchema<{
        readonly format: "uri";
    }>>;
    readonly comment: l.OptionalSchema<l.StringSchema<{}>>;
    readonly reportedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly reportedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly reviewedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingDeletedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingDeletedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingUpdatedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingUpdatedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingStatuses: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly reviewedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly includeMuted: l.OptionalSchema<l.BooleanSchema>;
    readonly onlyMuted: l.OptionalSchema<l.BooleanSchema>;
    readonly reviewState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["tools.ozone.moderation.defs#reviewOpen", "tools.ozone.moderation.defs#reviewClosed", "tools.ozone.moderation.defs#reviewEscalated", "tools.ozone.moderation.defs#reviewNone"];
    }>>;
    readonly ignoreSubjects: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "uri";
    }>>>;
    readonly lastReviewedBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly sortField: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"lastReviewedAt" | "lastReportedAt" | "priorityScore" | "reportedRecordsCount" | "takendownRecordsCount">>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
    readonly takendown: l.OptionalSchema<l.BooleanSchema>;
    readonly appealed: l.OptionalSchema<l.BooleanSchema>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly tags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly excludeTags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly collections: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>>;
    readonly subjectType: l.OptionalSchema<l.StringSchema<{
        knownValues: ["account", "record"];
    }>>;
    readonly minAccountSuspendCount: l.OptionalSchema<l.IntegerSchema>;
    readonly minReportedRecordsCount: l.OptionalSchema<l.IntegerSchema>;
    readonly minTakendownRecordsCount: l.OptionalSchema<l.IntegerSchema>;
    readonly minPriorityScore: l.OptionalSchema<l.IntegerSchema>;
    readonly minStrikeCount: l.OptionalSchema<l.IntegerSchema>;
    readonly ageAssuranceState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["pending", "assured", "unknown", "reset", "blocked"];
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    subjectStatuses: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.SubjectStatusView, ModerationDefs.SubjectStatusView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.queryStatuses", $params: l.ParamsSchema<{
    readonly queueCount: l.OptionalSchema<l.IntegerSchema>;
    readonly queueIndex: l.OptionalSchema<l.IntegerSchema>;
    readonly queueSeed: l.OptionalSchema<l.StringSchema<{}>>;
    readonly includeAllUserRecords: l.OptionalSchema<l.BooleanSchema>;
    readonly subject: l.OptionalSchema<l.StringSchema<{
        readonly format: "uri";
    }>>;
    readonly comment: l.OptionalSchema<l.StringSchema<{}>>;
    readonly reportedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly reportedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly reviewedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingDeletedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingDeletedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingUpdatedAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingUpdatedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly hostingStatuses: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly reviewedBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly includeMuted: l.OptionalSchema<l.BooleanSchema>;
    readonly onlyMuted: l.OptionalSchema<l.BooleanSchema>;
    readonly reviewState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["tools.ozone.moderation.defs#reviewOpen", "tools.ozone.moderation.defs#reviewClosed", "tools.ozone.moderation.defs#reviewEscalated", "tools.ozone.moderation.defs#reviewNone"];
    }>>;
    readonly ignoreSubjects: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "uri";
    }>>>;
    readonly lastReviewedBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly sortField: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"lastReviewedAt" | "lastReportedAt" | "priorityScore" | "reportedRecordsCount" | "takendownRecordsCount">>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
    readonly takendown: l.OptionalSchema<l.BooleanSchema>;
    readonly appealed: l.OptionalSchema<l.BooleanSchema>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly tags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly excludeTags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly collections: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>>;
    readonly subjectType: l.OptionalSchema<l.StringSchema<{
        knownValues: ["account", "record"];
    }>>;
    readonly minAccountSuspendCount: l.OptionalSchema<l.IntegerSchema>;
    readonly minReportedRecordsCount: l.OptionalSchema<l.IntegerSchema>;
    readonly minTakendownRecordsCount: l.OptionalSchema<l.IntegerSchema>;
    readonly minPriorityScore: l.OptionalSchema<l.IntegerSchema>;
    readonly minStrikeCount: l.OptionalSchema<l.IntegerSchema>;
    readonly ageAssuranceState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["pending", "assured", "unknown", "reset", "blocked"];
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    subjectStatuses: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.SubjectStatusView, ModerationDefs.SubjectStatusView>>>;
}>>;
//# sourceMappingURL=queryStatuses.defs.d.ts.map