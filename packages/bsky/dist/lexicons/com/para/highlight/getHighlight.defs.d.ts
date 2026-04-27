import { l } from '@atproto/lex';
import * as HighlightDefs from './defs.defs.js';
declare const $nsid = "com.para.highlight.getHighlight";
export { $nsid };
/** Get a single indexed highlight annotation by URI. */
declare const main: l.Query<"com.para.highlight.getHighlight", l.ParamsSchema<{
    readonly highlight: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    highlight: l.OptionalSchema<l.RefSchema<l.Validator<HighlightDefs.HighlightView, HighlightDefs.HighlightView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.highlight.getHighlight", $params: l.ParamsSchema<{
    readonly highlight: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    highlight: l.OptionalSchema<l.RefSchema<l.Validator<HighlightDefs.HighlightView, HighlightDefs.HighlightView>>>;
}>>;
//# sourceMappingURL=getHighlight.defs.d.ts.map