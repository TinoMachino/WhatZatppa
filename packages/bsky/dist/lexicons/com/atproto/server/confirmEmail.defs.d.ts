import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.confirmEmail";
export { $nsid };
/** Confirm an email using a token from com.atproto.server.requestEmailConfirmation. */
declare const main: l.Procedure<"com.atproto.server.confirmEmail", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    token: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, readonly ["AccountNotFound", "ExpiredToken", "InvalidToken", "InvalidEmail"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.confirmEmail", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    token: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=confirmEmail.defs.d.ts.map