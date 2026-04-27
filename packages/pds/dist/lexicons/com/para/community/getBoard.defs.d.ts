import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.getBoard";
export { $nsid };
/** Returns a hydrated PARA community board with viewer membership and governance summary. */
declare const main: l.Query<"com.para.community.getBoard", l.ParamsSchema<{
    readonly communityId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 256;
    }>>;
    readonly uri: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.community.getBoard", $params: l.ParamsSchema<{
    readonly communityId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 256;
    }>>;
    readonly uri: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, $output: l.Payload<"application/json", l.RefSchema<l.Validator<Output, Output>>>;
type GovernanceSummary = {
    $type?: 'com.para.community.getBoard#governanceSummary';
    moderatorCount: number;
    officialCount: number;
    deputyRoleCount: number;
    lastPublishedAt?: l.DatetimeString;
};
export type { GovernanceSummary };
declare const governanceSummary: l.TypedObjectSchema<"com.para.community.getBoard#governanceSummary", l.Validator<GovernanceSummary, GovernanceSummary>>;
export { governanceSummary };
type BoardView = {
    $type?: 'com.para.community.getBoard#boardView';
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
    governanceSummary?: GovernanceSummary;
};
export type { BoardView };
declare const boardView: l.TypedObjectSchema<"com.para.community.getBoard#boardView", l.Validator<BoardView, BoardView>>;
export { boardView };
type Output = {
    $type?: 'com.para.community.getBoard#output';
    board: BoardView;
    viewerCapabilities: string[];
};
export type { Output };
declare const output: l.TypedObjectSchema<"com.para.community.getBoard#output", l.Validator<Output, Output>>;
export { output };
//# sourceMappingURL=getBoard.defs.d.ts.map