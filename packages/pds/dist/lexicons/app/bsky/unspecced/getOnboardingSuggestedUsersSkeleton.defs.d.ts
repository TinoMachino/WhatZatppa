import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.unspecced.getOnboardingSuggestedUsersSkeleton";
export { $nsid };
/** Get a skeleton of suggested users for onboarding. Intended to be called and hydrated by app.bsky.unspecced.getSuggestedOnboardingUsers */
declare const main: l.Query<"app.bsky.unspecced.getOnboardingSuggestedUsersSkeleton", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly category: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    recId: l.OptionalSchema<l.StringSchema<{}>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getOnboardingSuggestedUsersSkeleton", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly category: l.OptionalSchema<l.StringSchema<{}>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    dids: l.ArraySchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    recId: l.OptionalSchema<l.StringSchema<{}>>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getOnboardingSuggestedUsersSkeleton.defs.d.ts.map