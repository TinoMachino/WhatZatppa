import { l } from '@atproto/lex';
import * as SignatureDefs from './defs.defs.js';
declare const $nsid = "tools.ozone.signature.findCorrelation";
export { $nsid };
/** Find all correlated threat signatures between 2 or more accounts. */
declare const main: l.Query<"tools.ozone.signature.findCorrelation", l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    details: l.ArraySchema<l.RefSchema<l.Validator<SignatureDefs.SigDetail, SignatureDefs.SigDetail>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.signature.findCorrelation", $params: l.ParamsSchema<{
    readonly dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    details: l.ArraySchema<l.RefSchema<l.Validator<SignatureDefs.SigDetail, SignatureDefs.SigDetail>>>;
}>>;
//# sourceMappingURL=findCorrelation.defs.d.ts.map