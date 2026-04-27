import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.temp.revokeAccountCredentials";
export { $nsid };
/** Revoke sessions, password, and app passwords associated with account. May be resolved by a password reset. */
declare const main: l.Procedure<"com.atproto.temp.revokeAccountCredentials", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    account: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.temp.revokeAccountCredentials", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    account: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=revokeAccountCredentials.defs.d.ts.map