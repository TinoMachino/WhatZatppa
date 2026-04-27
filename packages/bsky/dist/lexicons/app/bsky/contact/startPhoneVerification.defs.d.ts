import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.contact.startPhoneVerification";
export { $nsid };
/** Starts a phone verification flow. The phone passed will receive a code via SMS that should be passed to `app.bsky.contact.verifyPhone`. Requires authentication. */
declare const main: l.Procedure<"app.bsky.contact.startPhoneVerification", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    phone: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{}>>, readonly ["RateLimitExceeded", "InvalidDid", "InvalidPhone", "InternalError"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.startPhoneVerification", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    phone: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{}>>;
//# sourceMappingURL=startPhoneVerification.defs.d.ts.map