import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.unspecced.getSuggestedStarterPacksSkeleton";
export { $nsid };
/** Get a skeleton of suggested starterpacks. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedStarterpacks */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedStarterPacksSkeleton", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    starterPacks: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestedStarterPacksSkeleton", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    starterPacks: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>>;
//# sourceMappingURL=getSuggestedStarterPacksSkeleton.defs.d.ts.map