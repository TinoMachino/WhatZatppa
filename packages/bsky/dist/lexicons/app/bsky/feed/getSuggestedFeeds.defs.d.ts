import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getSuggestedFeeds";
export { $nsid };
/** Get a list of suggested feeds (feed generators) for the requesting account. */
declare const main: l.Query<"app.bsky.feed.getSuggestedFeeds", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getSuggestedFeeds", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>;
//# sourceMappingURL=getSuggestedFeeds.defs.d.ts.map