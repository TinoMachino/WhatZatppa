import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.initAgeAssurance";
export { $nsid };
/** Initiate age assurance for an account. This is a one-time action that will start the process of verifying the user's age. */
declare const main: l.Procedure<"app.bsky.unspecced.initAgeAssurance", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    language: l.StringSchema<{}>;
    countryCode: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<UnspeccedDefs.AgeAssuranceState, UnspeccedDefs.AgeAssuranceState>>>, readonly ["InvalidEmail", "DidTooLong", "InvalidInitiation"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.initAgeAssurance", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    language: l.StringSchema<{}>;
    countryCode: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<UnspeccedDefs.AgeAssuranceState, UnspeccedDefs.AgeAssuranceState>>>;
//# sourceMappingURL=initAgeAssurance.defs.d.ts.map