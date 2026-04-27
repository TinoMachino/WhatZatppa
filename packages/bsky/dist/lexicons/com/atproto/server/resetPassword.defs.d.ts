import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.resetPassword";
export { $nsid };
/** Reset a user account password using a token. */
declare const main: l.Procedure<"com.atproto.server.resetPassword", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
    password: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, readonly ["ExpiredToken", "InvalidToken"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.resetPassword", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    token: l.StringSchema<{}>;
    password: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=resetPassword.defs.d.ts.map