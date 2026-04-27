import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.unspecced.getSuggestedUsersForDiscoverSkeleton";
export { $nsid };
/** Get a skeleton of suggested users for the Discover page. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedUsersForDiscover */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedUsersForDiscoverSkeleton", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
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
export declare const $lxm: "app.bsky.unspecced.getSuggestedUsersForDiscoverSkeleton", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getSuggestedUsersForDiscoverSkeleton.defs.d.ts.map