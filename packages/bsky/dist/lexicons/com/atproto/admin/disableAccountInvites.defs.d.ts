import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.admin.disableAccountInvites";
export { $nsid };
/** Disable an account from receiving new invite codes, but does not invalidate existing codes. */
declare const main: l.Procedure<"com.atproto.admin.disableAccountInvites", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    account: l.StringSchema<{
        readonly format: "did";
    }>;
    note: l.OptionalSchema<l.StringSchema<{}>>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.disableAccountInvites", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    account: l.StringSchema<{
        readonly format: "did";
    }>;
    note: l.OptionalSchema<l.StringSchema<{}>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=disableAccountInvites.defs.d.ts.map