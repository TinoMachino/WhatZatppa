import { l } from '@atproto/lex';
declare const $nsid = "tools.ozone.team.deleteMember";
export { $nsid };
/** Delete a member from ozone team. Requires admin role. */
declare const main: l.Procedure<"tools.ozone.team.deleteMember", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, l.Payload<undefined, undefined>, readonly ["MemberNotFound", "CannotDeleteSelf"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "tools.ozone.team.deleteMember", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
}>>, $output: l.Payload<undefined, undefined>;
//# sourceMappingURL=deleteMember.defs.d.ts.map