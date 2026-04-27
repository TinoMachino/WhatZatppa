import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.acceptDraftInvite";
export { $nsid };
/** Accepts an invitation to a draft community, adding the caller to the community's founder starter pack and tracking the quorum. The PDS proxies the listitem creation for the starter pack. */
declare const main: l.Procedure<"com.para.community.acceptDraftInvite", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    communityUri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    status: l.StringSchema<{}>;
    memberCount: l.IntegerSchema;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.acceptDraftInvite", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    communityUri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    status: l.StringSchema<{}>;
    memberCount: l.IntegerSchema;
}>>;
//# sourceMappingURL=acceptDraftInvite.defs.d.ts.map