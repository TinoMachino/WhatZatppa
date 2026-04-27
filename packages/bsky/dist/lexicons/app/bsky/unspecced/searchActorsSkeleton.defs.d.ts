import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.searchActorsSkeleton";
export { $nsid };
/** Backend Actors (profile) search, returns only skeleton. */
declare const main: l.Query<"app.bsky.unspecced.searchActorsSkeleton", l.ParamsSchema<{
    readonly q: l.StringSchema<{}>;
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly typeahead: l.OptionalSchema<l.BooleanSchema>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    hitsTotal: l.OptionalSchema<l.IntegerSchema>;
    actors: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.SkeletonSearchActor, UnspeccedDefs.SkeletonSearchActor>>>;
}>>, readonly ["BadQueryString"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.searchActorsSkeleton", $params: l.ParamsSchema<{
    readonly q: l.StringSchema<{}>;
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly typeahead: l.OptionalSchema<l.BooleanSchema>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    hitsTotal: l.OptionalSchema<l.IntegerSchema>;
    actors: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.SkeletonSearchActor, UnspeccedDefs.SkeletonSearchActor>>>;
}>>;
//# sourceMappingURL=searchActorsSkeleton.defs.d.ts.map