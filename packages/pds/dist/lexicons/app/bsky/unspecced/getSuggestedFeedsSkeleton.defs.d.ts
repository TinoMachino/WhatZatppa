import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.unspecced.getSuggestedFeedsSkeleton";
export { $nsid };
/** Get a skeleton of suggested feeds. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedFeeds */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedFeedsSkeleton", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    feeds: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestedFeedsSkeleton", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    feeds: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>>;
//# sourceMappingURL=getSuggestedFeedsSkeleton.defs.d.ts.map