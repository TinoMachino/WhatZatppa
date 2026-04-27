import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.queryEvents";
export { $nsid };
/** List moderation events related to a subject. */
declare const main: l.Query<"tools.ozone.moderation.queryEvents", l.ParamsSchema<{
    readonly types: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
    readonly createdAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly createdBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly subject: l.OptionalSchema<l.StringSchema<{
        readonly format: "uri";
    }>>;
    readonly collections: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>>;
    readonly subjectType: l.OptionalSchema<l.StringSchema<{
        knownValues: ["account", "record"];
    }>>;
    readonly includeAllUserRecords: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly hasComment: l.OptionalSchema<l.BooleanSchema>;
    readonly comment: l.OptionalSchema<l.StringSchema<{}>>;
    readonly addedLabels: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly removedLabels: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly addedTags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly removedTags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly reportTypes: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly policies: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly modTool: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly batchId: l.OptionalSchema<l.StringSchema<{}>>;
    readonly ageAssuranceState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["pending", "assured", "unknown", "reset", "blocked"];
    }>>;
    readonly withStrike: l.OptionalSchema<l.BooleanSchema>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    events: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.ModEventView, ModerationDefs.ModEventView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.queryEvents", $params: l.ParamsSchema<{
    readonly types: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly createdBy: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly sortDirection: l.OptionalSchema<l.WithDefaultSchema<l.EnumSchema<"asc" | "desc">>>;
    readonly createdAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly createdBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    readonly subject: l.OptionalSchema<l.StringSchema<{
        readonly format: "uri";
    }>>;
    readonly collections: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "nsid";
    }>>>;
    readonly subjectType: l.OptionalSchema<l.StringSchema<{
        knownValues: ["account", "record"];
    }>>;
    readonly includeAllUserRecords: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly hasComment: l.OptionalSchema<l.BooleanSchema>;
    readonly comment: l.OptionalSchema<l.StringSchema<{}>>;
    readonly addedLabels: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly removedLabels: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly addedTags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly removedTags: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly reportTypes: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly policies: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly modTool: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly batchId: l.OptionalSchema<l.StringSchema<{}>>;
    readonly ageAssuranceState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["pending", "assured", "unknown", "reset", "blocked"];
    }>>;
    readonly withStrike: l.OptionalSchema<l.BooleanSchema>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    events: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.ModEventView, ModerationDefs.ModEventView>>>;
}>>;
//# sourceMappingURL=queryEvents.defs.d.ts.map