import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.listMembers";
export { $nsid };
/** Lists real members of a PARA community board. */
declare const main: l.Query<"com.para.community.listMembers", l.ParamsSchema<{
    readonly communityId: l.StringSchema<{
        readonly maxLength: 256;
    }>;
    readonly membershipState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["pending", "active", "left", "removed", "blocked"];
    }>>;
    readonly role: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 64;
        readonly maxLength: 128;
    }>>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["joined", "participation"];
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.listMembers", $params: l.ParamsSchema<{
    readonly communityId: l.StringSchema<{
        readonly maxLength: 256;
    }>;
    readonly membershipState: l.OptionalSchema<l.StringSchema<{
        knownValues: ["pending", "active", "left", "removed", "blocked"];
    }>>;
    readonly role: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 64;
        readonly maxLength: 128;
    }>>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["joined", "participation"];
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>;
type MemberView = {
    $type?: 'com.para.community.listMembers#memberView';
    did: l.DidString;
    handle?: l.HandleString;
    displayName?: string;
    avatar?: l.UriString;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | l.UnknownString;
    roles: string[];
    joinedAt: l.DatetimeString;
    votesCast: number;
    delegationsReceived: number;
    policyPosts: number;
    matterPosts: number;
};
export type { MemberView };
declare const memberView: l.TypedObjectSchema<"com.para.community.listMembers#memberView", l.Validator<MemberView, MemberView>>;
export { memberView };
type Output = {
    $type?: 'com.para.community.listMembers#output';
    members: MemberView[];
    cursor?: string;
};
export type { Output };
declare const output: l.TypedObjectSchema<"com.para.community.listMembers#output", l.Validator<Output, Output>>;
export { output };
//# sourceMappingURL=listMembers.defs.d.ts.map