import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.contact.verifyPhone";
export { $nsid };
/** Verifies control over a phone number with a code received via SMS and starts a contact import session. Requires authentication. */
declare const main: l.Procedure<"app.bsky.contact.verifyPhone", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    phone: l.StringSchema<{}>;
    code: l.StringSchema<{}>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
}>>, readonly ["RateLimitExceeded", "InvalidDid", "InvalidPhone", "InvalidCode", "InternalError"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.contact.verifyPhone", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    phone: l.StringSchema<{}>;
    code: l.StringSchema<{}>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
}>>;
//# sourceMappingURL=verifyPhone.defs.d.ts.map