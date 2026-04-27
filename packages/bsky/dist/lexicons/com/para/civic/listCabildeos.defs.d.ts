import { l } from '@atproto/lex';
import * as CivicDefs from './defs.defs.js';
declare const $nsid = "com.para.civic.listCabildeos";
export { $nsid };
/** List indexed Cabildeos with aggregate summaries and optional viewer context. */
declare const main: l.Query<"com.para.civic.listCabildeos", l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
    readonly phase: l.OptionalSchema<l.StringSchema<{
        knownValues: ["draft", "open", "deliberating", "voting", "resolved"];
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    cabildeos: l.ArraySchema<l.RefSchema<l.Validator<CivicDefs.CabildeoView, CivicDefs.CabildeoView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.civic.listCabildeos", $params: l.ParamsSchema<{
    readonly community: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
    readonly phase: l.OptionalSchema<l.StringSchema<{
        knownValues: ["draft", "open", "deliberating", "voting", "resolved"];
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    cabildeos: l.ArraySchema<l.RefSchema<l.Validator<CivicDefs.CabildeoView, CivicDefs.CabildeoView>>>;
}>>;
//# sourceMappingURL=listCabildeos.defs.d.ts.map