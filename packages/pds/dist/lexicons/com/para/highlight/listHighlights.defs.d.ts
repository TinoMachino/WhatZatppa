import { l } from '@atproto/lex';
import * as HighlightDefs from './defs.defs.js';
declare const $nsid = "com.para.highlight.listHighlights";
export { $nsid };
/** List indexed public highlight annotations with optional filters. */
declare const main: l.Query<"com.para.highlight.listHighlights", l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
    readonly state: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
    readonly subject: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    readonly creator: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    highlights: l.ArraySchema<l.RefSchema<l.Validator<HighlightDefs.HighlightView, HighlightDefs.HighlightView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.highlight.listHighlights", $params: l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
    readonly state: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
    readonly subject: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
    readonly creator: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    highlights: l.ArraySchema<l.RefSchema<l.Validator<HighlightDefs.HighlightView, HighlightDefs.HighlightView>>>;
}>>;
//# sourceMappingURL=listHighlights.defs.d.ts.map