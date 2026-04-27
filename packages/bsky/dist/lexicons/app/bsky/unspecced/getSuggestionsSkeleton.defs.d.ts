import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getSuggestionsSkeleton";
export { $nsid };
/** Get a skeleton of suggested actors. Intended to be called and then hydrated through app.bsky.actor.getSuggestions */
declare const main: l.Query<"app.bsky.unspecced.getSuggestionsSkeleton", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly relativeToDid: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    actors: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.SkeletonSearchActor, UnspeccedDefs.SkeletonSearchActor>>>;
    relativeToDid: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    recId: l.OptionalSchema<l.IntegerSchema>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestionsSkeleton", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly relativeToDid: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    actors: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.SkeletonSearchActor, UnspeccedDefs.SkeletonSearchActor>>>;
    relativeToDid: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    recId: l.OptionalSchema<l.IntegerSchema>;
    recIdStr: l.OptionalSchema<l.StringSchema<{}>>;
}>>;
//# sourceMappingURL=getSuggestionsSkeleton.defs.d.ts.map