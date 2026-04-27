import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.admin.disableInviteCodes";
export { $nsid };
/** Disable some set of codes and/or all codes associated with a set of users. */
declare const main: l.Procedure<"com.atproto.admin.disableInviteCodes", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    codes: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    accounts: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
}>>, l.Payload<undefined, undefined>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.admin.disableInviteCodes", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    codes: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    accounts: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=disableInviteCodes.defs.d.ts.map