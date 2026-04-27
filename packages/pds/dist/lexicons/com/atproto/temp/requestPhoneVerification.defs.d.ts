import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.temp.requestPhoneVerification";
export { $nsid };
/** Request a verification code to be sent to the supplied phone number */
declare const main: l.Procedure<"com.atproto.temp.requestPhoneVerification", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    phoneNumber: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.temp.requestPhoneVerification", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    phoneNumber: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=requestPhoneVerification.defs.d.ts.map