import { l } from '@atproto/lex';
import * as FeedDefs from '../feed/defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getPopularFeedGenerators";
export { $nsid };
/** An unspecced view of globally popular feed generators. */
declare const main: l.Query<"app.bsky.unspecced.getPopularFeedGenerators", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly query: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getPopularFeedGenerators", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly query: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>;
//# sourceMappingURL=getPopularFeedGenerators.defs.d.ts.map