import { l } from '@atproto/lex';
import * as CivicDefs from './defs.defs.js';
declare const $nsid = "com.para.civic.listCabildeoPositions";
export { $nsid };
/** List indexed positions for a Cabildeo with optional stance filter. */
declare const main: l.Query<"com.para.civic.listCabildeoPositions", l.ParamsSchema<{
    readonly cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly stance: l.OptionalSchema<l.StringSchema<{
        knownValues: ["for", "against", "amendment"];
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    positions: l.ArraySchema<l.RefSchema<l.Validator<CivicDefs.PositionView, CivicDefs.PositionView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.civic.listCabildeoPositions", $params: l.ParamsSchema<{
    readonly cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly stance: l.OptionalSchema<l.StringSchema<{
        knownValues: ["for", "against", "amendment"];
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    positions: l.ArraySchema<l.RefSchema<l.Validator<CivicDefs.PositionView, CivicDefs.PositionView>>>;
}>>;
//# sourceMappingURL=listCabildeoPositions.defs.d.ts.map