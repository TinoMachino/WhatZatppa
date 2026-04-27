import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.revokeAppPassword";
export { $nsid };
/** Revoke an App Password by name. */
declare const main: l.Procedure<"com.atproto.server.revokeAppPassword", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.revokeAppPassword", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    name: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=revokeAppPassword.defs.d.ts.map