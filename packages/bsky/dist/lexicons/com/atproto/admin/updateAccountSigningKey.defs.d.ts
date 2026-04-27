import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.admin.updateAccountSigningKey";
export { $nsid };
/** Administrative action to update an account's signing key in their Did document. */
declare const main: l.Procedure<"com.atproto.admin.updateAccountSigningKey", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    signingKey: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.updateAccountSigningKey", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    signingKey: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=updateAccountSigningKey.defs.d.ts.map