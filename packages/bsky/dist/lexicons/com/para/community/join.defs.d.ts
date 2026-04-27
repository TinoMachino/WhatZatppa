import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.join";
export { $nsid };
/** Joins a PARA community board by creating or reactivating the caller's membership record. */
declare const main: l.Procedure<"com.para.community.join", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    communityUri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    source: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 64;
        readonly maxGraphemes: 64;
    }>>;
}>>, l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.join", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    communityUri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    source: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 64;
        readonly maxGraphemes: 64;
    }>>;
}>>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>;
type Output = {
    $type?: 'com.para.community.join#output';
    uri: l.AtUriString;
    cid: l.CidString;
    communityUri: l.AtUriString;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | l.UnknownString;
    viewerCapabilities: string[];
};
export type { Output };
declare const output: l.TypedObjectSchema<"com.para.community.join#output", l.Validator<Output, Output>>;
export { output };
//# sourceMappingURL=join.defs.d.ts.map