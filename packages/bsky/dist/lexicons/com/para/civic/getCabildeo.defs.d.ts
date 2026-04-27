import { l } from '@atproto/lex';
import * as CivicDefs from './defs.defs.js';
declare const $nsid = "com.para.civic.getCabildeo";
export { $nsid };
/** Get a single indexed Cabildeo by URI, including aggregate and viewer context fields. */
declare const main: l.Query<"com.para.civic.getCabildeo", l.ParamsSchema<{
    readonly cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.RefSchema<l.Validator<CivicDefs.CabildeoView, CivicDefs.CabildeoView>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.civic.getCabildeo", $params: l.ParamsSchema<{
    readonly cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.RefSchema<l.Validator<CivicDefs.CabildeoView, CivicDefs.CabildeoView>>;
}>>;
//# sourceMappingURL=getCabildeo.defs.d.ts.map