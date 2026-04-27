import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.updateEmail";
export { $nsid };
/** Update an account's email. */
declare const main: l.Procedure<"com.atproto.server.updateEmail", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    emailAuthFactor: l.OptionalSchema<l.BooleanSchema>;
    token: l.OptionalSchema<l.StringSchema<{}>>;
}>>, l.Payload<undefined, undefined>, readonly ["ExpiredToken", "InvalidToken", "TokenRequired"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.updateEmail", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
    emailAuthFactor: l.OptionalSchema<l.BooleanSchema>;
    token: l.OptionalSchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=updateEmail.defs.d.ts.map