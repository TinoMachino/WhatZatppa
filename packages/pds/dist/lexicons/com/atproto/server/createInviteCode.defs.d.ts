import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.createInviteCode";
export { $nsid };
/** Create an invite code. */
declare const main: l.Procedure<"com.atproto.server.createInviteCode", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    useCount: l.IntegerSchema;
    forAccount: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    code: l.StringSchema<{}>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.atproto.server.createInviteCode", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    useCount: l.IntegerSchema;
    forAccount: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    code: l.StringSchema<{}>;
}>>;
//# sourceMappingURL=createInviteCode.defs.d.ts.map