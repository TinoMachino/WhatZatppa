import { l } from '@atproto/lex';
import * as UnspeccedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getTrendingTopics";
export { $nsid };
/** Get a list of trending topics */
declare const main: l.Query<"app.bsky.unspecced.getTrendingTopics", l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    topics: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.TrendingTopic, UnspeccedDefs.TrendingTopic>>>;
    suggested: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.TrendingTopic, UnspeccedDefs.TrendingTopic>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getTrendingTopics", $params: l.ParamsSchema<{
    readonly viewer: l.OptionalSchema<l.StringSchema<{
        readonly format: "did";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    topics: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.TrendingTopic, UnspeccedDefs.TrendingTopic>>>;
    suggested: l.ArraySchema<l.RefSchema<l.Validator<UnspeccedDefs.TrendingTopic, UnspeccedDefs.TrendingTopic>>>;
}>>;
//# sourceMappingURL=getTrendingTopics.defs.d.ts.map