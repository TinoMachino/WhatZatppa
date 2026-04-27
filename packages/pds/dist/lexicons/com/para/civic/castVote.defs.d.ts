import { l } from '@atproto/lex';
declare const $nsid = "com.para.civic.castVote";
export { $nsid };
/** Cast or replace the viewer's direct vote for a cabildeo. */
declare const main: l.Procedure<"com.para.civic.castVote", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    selectedOption: l.IntegerSchema;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    commit: l.RefSchema<l.Validator<Commit, Commit>>;
}>>, readonly ["NotFound", "InvalidPhase", "DeadlineExpired", "InvalidOption", "CommunityMembershipRequired"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.civic.castVote", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    selectedOption: l.IntegerSchema;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.StringSchema<{
        readonly format: "cid";
    }>;
    commit: l.RefSchema<l.Validator<Commit, Commit>>;
}>>;
type Commit = {
    $type?: 'com.para.civic.castVote#commit';
    cid: l.CidString;
    rev: string;
};
export type { Commit };
declare const commit: l.TypedObjectSchema<"com.para.civic.castVote#commit", l.Validator<Commit, Commit>>;
export { commit };
//# sourceMappingURL=castVote.defs.d.ts.map