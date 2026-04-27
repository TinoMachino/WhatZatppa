import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getTrendsSkeleton";
export { $nsid };
/** Get the skeleton of trends on the network. Intended to be called and then hydrated through app.bsky.unspecced.getTrends */
declare const main: l.Query<"app.bsky.unspecced.getTrendsSkeleton", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    trends: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.SkeletonTrend, UnspeccedDefs.SkeletonTrend>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getTrendsSkeleton", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    trends: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.SkeletonTrend, UnspeccedDefs.SkeletonTrend>>>;
}>>;
//# sourceMappingURL=getTrendsSkeleton.defs.d.ts.map