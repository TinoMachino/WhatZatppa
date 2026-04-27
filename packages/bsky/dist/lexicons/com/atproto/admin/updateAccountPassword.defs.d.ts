import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.admin.updateAccountPassword";
export { $nsid };
/** Update the password for a user account as an administrator. */
declare const main: l.Procedure<"com.atproto.admin.updateAccountPassword", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    password: l.StringSchema<{}>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.updateAccountPassword", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    password: l.StringSchema<{}>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=updateAccountPassword.defs.d.ts.map