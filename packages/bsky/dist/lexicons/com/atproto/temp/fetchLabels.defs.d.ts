import { l } from '@atproto/lex';
import * as LabelDefs from '../label/defs.defs.js';
declare const $nsid = "com.atproto.temp.fetchLabels";
export { $nsid };
/**
 * Fetch all labels from a labeler created after a certain date.
 * @deprecated use queryLabels or subscribeLabels instead
 */
declare const main: l.Query<"com.atproto.temp.fetchLabels", l.ParamsSchema<{
    readonly since: l.OptionalSchema<l.IntegerSchema>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    labels: l.ArraySchema<l.RefSchema<l.Validator<LabelDefs.Label, LabelDefs.Label>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.temp.fetchLabels", $params: l.ParamsSchema<{
    readonly since: l.OptionalSchema<l.IntegerSchema>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    labels: l.ArraySchema<l.RefSchema<l.Validator<LabelDefs.Label, LabelDefs.Label>>>;
}>>;
//# sourceMappingURL=fetchLabels.defs.d.ts.map