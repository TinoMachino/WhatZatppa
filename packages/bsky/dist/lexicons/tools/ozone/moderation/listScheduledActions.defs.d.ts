import { l } from '@atproto/lex';
import * as ModerationDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.moderation.listScheduledActions";
export { $nsid };
/** List scheduled moderation actions with optional filtering */
declare const main: l.Procedure<"tools.ozone.moderation.listScheduledActions", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    startsAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    endsBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    subjects: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    statuses: l.ArraySchema<l.StringSchema<{
        knownValues: ["pending", "executed", "cancelled", "failed"];
    }>>;
    limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    actions: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.ScheduledActionView, ModerationDefs.ScheduledActionView>>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.moderation.listScheduledActions", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    startsAfter: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    endsBefore: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
    subjects: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    statuses: l.ArraySchema<l.StringSchema<{
        knownValues: ["pending", "executed", "cancelled", "failed"];
    }>>;
    limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    actions: l.ArraySchema<l.RefSchema<l.Validator<ModerationDefs.ScheduledActionView, ModerationDefs.ScheduledActionView>>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=listScheduledActions.defs.d.ts.map