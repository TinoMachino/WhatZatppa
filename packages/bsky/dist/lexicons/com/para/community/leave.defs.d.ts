import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.leave";
export { $nsid };
/** Leaves a PARA community board by marking the caller's membership record as left. */
declare const main: l.Procedure<"com.para.community.leave", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    communityUri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.leave", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    communityUri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>;
type Output = {
    $type?: 'com.para.community.leave#output';
    uri: l.AtUriString;
    cid: l.CidString;
    communityUri: l.AtUriString;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | l.UnknownString;
    viewerCapabilities: string[];
};
export type { Output };
declare const output: l.TypedObjectSchema<"com.para.community.leave#output", l.Validator<Output, Output>>;
export { output };
//# sourceMappingURL=leave.defs.d.ts.map