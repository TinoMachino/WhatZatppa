import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.listBoards";
export { $nsid };
/** Lists PARA community boards available to the viewer, along with creation capability. */
declare const main: l.Query<"com.para.community.listBoards", l.ParamsSchema<{
    readonly query: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 128;
        readonly maxLength: 256;
    }>>;
    readonly state: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 64;
        readonly maxLength: 128;
    }>>;
    readonly participationKind: l.OptionalSchema<l.StringSchema<{
        knownValues: ["matter", "policy"];
    }>>;
    readonly flairId: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 128;
        readonly maxLength: 128;
    }>>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["recent", "activity", "size"];
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly quadrant: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.listBoards", $params: l.ParamsSchema<{
    readonly query: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 128;
        readonly maxLength: 256;
    }>>;
    readonly state: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 64;
        readonly maxLength: 128;
    }>>;
    readonly participationKind: l.OptionalSchema<l.StringSchema<{
        knownValues: ["matter", "policy"];
    }>>;
    readonly flairId: l.OptionalSchema<l.StringSchema<{
        readonly maxGraphemes: 128;
        readonly maxLength: 128;
    }>>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["recent", "activity", "size"];
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly quadrant: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>;
type BoardView = {
    $type?: 'com.para.community.listBoards#boardView';
    uri: l.AtUriString;
    cid: l.CidString;
    creatorDid: l.DidString;
    creatorHandle?: l.HandleString;
    creatorDisplayName?: string;
    communityId: string;
    slug: string;
    name: string;
    description?: string;
    quadrant: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    memberCount: number;
    viewerMembershipState: 'none' | 'pending' | 'active' | 'left' | 'removed' | 'blocked' | l.UnknownString;
    viewerRoles?: string[];
    status?: 'draft' | 'active' | l.UnknownString;
    founderStarterPackUri?: l.AtUriString;
    createdAt: l.DatetimeString;
};
export type { BoardView };
declare const boardView: l.TypedObjectSchema<"com.para.community.listBoards#boardView", l.Validator<BoardView, BoardView>>;
export { boardView };
type Output = {
    $type?: 'com.para.community.listBoards#output';
    boards: BoardView[];
    cursor?: string;
    canCreateCommunity: boolean;
};
export type { Output };
declare const output: l.TypedObjectSchema<"com.para.community.listBoards#output", l.Validator<Output, Output>>;
export { output };
//# sourceMappingURL=listBoards.defs.d.ts.map