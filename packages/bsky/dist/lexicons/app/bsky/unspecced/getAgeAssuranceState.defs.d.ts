import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getAgeAssuranceState";
export { $nsid };
/** Returns the current state of the age assurance process for an account. This is used to check if the user has completed age assurance or if further action is required. */
declare const main: l.Query<"app.bsky.unspecced.getAgeAssuranceState", l.ParamsSchema<{}>, l.Payload<"application/json", l.RefSchema<l.Validator<UnspeccedDefs.AgeAssuranceState, UnspeccedDefs.AgeAssuranceState>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getAgeAssuranceState", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<UnspeccedDefs.AgeAssuranceState, UnspeccedDefs.AgeAssuranceState>>>;
//# sourceMappingURL=getAgeAssuranceState.defs.d.ts.map