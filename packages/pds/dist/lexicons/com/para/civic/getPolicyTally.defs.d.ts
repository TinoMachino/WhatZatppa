import { l } from '@atproto/lex';
import * as CivicDefs from './defs.defs.js';
declare const $nsid = "com.para.civic.getPolicyTally";
export { $nsid };
/** Get the weighted consensus tally for a policy post using civic vote signals from -3 to +3. */
declare const main: l.Query<"com.para.civic.getPolicyTally", l.ParamsSchema<{
    readonly post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    tally: l.RefSchema<l.Validator<CivicDefs.PolicyTally, CivicDefs.PolicyTally>>;
}>>, readonly ["NotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.civic.getPolicyTally", $params: l.ParamsSchema<{
    readonly post: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    tally: l.RefSchema<l.Validator<CivicDefs.PolicyTally, CivicDefs.PolicyTally>>;
}>>;
//# sourceMappingURL=getPolicyTally.defs.d.ts.map