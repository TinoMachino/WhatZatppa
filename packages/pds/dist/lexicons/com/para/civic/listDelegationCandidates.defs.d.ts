import { l } from '@atproto/lex';
declare const $nsid = "com.para.civic.listDelegationCandidates";
export { $nsid };
/** Lists real delegation candidates for a cabildeo/community. */
declare const main: l.Query<"com.para.civic.listDelegationCandidates", l.ParamsSchema<{
    readonly cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly communityId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 256;
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.civic.listDelegationCandidates", $params: l.ParamsSchema<{
    readonly cabildeo: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly communityId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 256;
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>;
type CandidateView = {
    $type?: 'com.para.civic.listDelegationCandidates#candidateView';
    did: l.DidString;
    handle?: l.HandleString;
    displayName?: string;
    avatar?: l.UriString;
    description?: string;
    roles: string[];
    activeDelegationCount: number;
    hasVoted: boolean;
    votedAt?: l.DatetimeString;
    selectedOption?: number;
};
export type { CandidateView };
declare const candidateView: l.TypedObjectSchema<"com.para.civic.listDelegationCandidates#candidateView", l.Validator<CandidateView, CandidateView>>;
export { candidateView };
type Output = {
    $type?: 'com.para.civic.listDelegationCandidates#output';
    candidates: CandidateView[];
    cursor?: string;
};
export type { Output };
declare const output: l.TypedObjectSchema<"com.para.civic.listDelegationCandidates#output", l.Validator<Output, Output>>;
export { output };
//# sourceMappingURL=listDelegationCandidates.defs.d.ts.map