import { l } from '@atproto/lex';
import * as AgeassuranceDefs from './defs.defs.js';
declare const $nsid = "app.bsky.ageassurance.begin";
export { $nsid };
/** Initiate Age Assurance for an account. */
declare const main: l.Procedure<"app.bsky.ageassurance.begin", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    language: l.StringSchema<{}>;
    countryCode: l.StringSchema<{}>;
    regionCode: l.OptionalSchema<l.StringSchema<{}>>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<AgeassuranceDefs.State, AgeassuranceDefs.State>>>, readonly ["InvalidEmail", "DidTooLong", "InvalidInitiation", "RegionNotSupported"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.ageassurance.begin", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    language: l.StringSchema<{}>;
    countryCode: l.StringSchema<{}>;
    regionCode: l.OptionalSchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<AgeassuranceDefs.State, AgeassuranceDefs.State>>>;
//# sourceMappingURL=begin.defs.d.ts.map