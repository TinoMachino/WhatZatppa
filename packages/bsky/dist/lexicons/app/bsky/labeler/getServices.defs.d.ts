import { l } from '@atproto/lex';
import * as LabelerDefs from './defs.defs.js';
declare const $nsid = "app.bsky.labeler.getServices";
export { $nsid };
/** Get information about a list of labeler services. */
declare const main: l.Query<"app.bsky.labeler.getServices", l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly detailed: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    views: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<LabelerDefs.LabelerView, LabelerDefs.LabelerView>>, l.TypedRefSchema<l.TypedObjectValidator<LabelerDefs.LabelerViewDetailed, LabelerDefs.LabelerViewDetailed>>], false>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.labeler.getServices", $params: l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly detailed: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    views: l.ArraySchema<l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<LabelerDefs.LabelerView, LabelerDefs.LabelerView>>, l.TypedRefSchema<l.TypedObjectValidator<LabelerDefs.LabelerViewDetailed, LabelerDefs.LabelerViewDetailed>>], false>>;
}>>;
//# sourceMappingURL=getServices.defs.d.ts.map