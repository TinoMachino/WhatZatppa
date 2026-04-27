import { l } from '@atproto/lex';
import * as LabelDefs from './defs.defs.js';
declare const $nsid = "com.atproto.label.queryLabels";
export { $nsid };
/** Find labels relevant to the provided AT-URI patterns. Public endpoint for moderation services, though may return different or additional results with auth. */
declare const main: l.Query<"com.atproto.label.queryLabels", l.ParamsSchema<{
    readonly uriPatterns: l.ArraySchema<l.StringSchema<{}>>;
    readonly sources: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    labels: l.ArraySchema<l.RefSchema<l.Validator<LabelDefs.Label, LabelDefs.Label>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.label.queryLabels", $params: l.ParamsSchema<{
    readonly uriPatterns: l.ArraySchema<l.StringSchema<{}>>;
    readonly sources: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    labels: l.ArraySchema<l.RefSchema<l.Validator<LabelDefs.Label, LabelDefs.Label>>>;
}>>;
//# sourceMappingURL=queryLabels.defs.d.ts.map