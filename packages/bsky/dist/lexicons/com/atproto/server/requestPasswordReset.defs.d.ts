import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.requestPasswordReset";
export { $nsid };
/** Initiate a user account password reset via email. */
declare const main: l.Procedure<"com.atproto.server.requestPasswordReset", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.requestPasswordReset", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    email: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=requestPasswordReset.defs.d.ts.map