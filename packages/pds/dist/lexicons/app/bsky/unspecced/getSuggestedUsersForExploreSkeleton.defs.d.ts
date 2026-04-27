import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.unspecced.getSuggestedUsersForExploreSkeleton";
export { $nsid };
/** Get a skeleton of suggested users for the Explore page. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedUsersForExplore */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedUsersForExploreSkeleton", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly category: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestedUsersForExploreSkeleton", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly category: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getSuggestedUsersForExploreSkeleton.defs.d.ts.map