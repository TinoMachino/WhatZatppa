import { l } from '@atproto/lex';
import * as FeedDefs from '../feed/defs.defs.js';
declare const $nsid = "app.bsky.unspecced.getSuggestedFeeds";
export { $nsid };
/** Get a list of suggested feeds */
declare const main: l.Query<"app.bsky.unspecced.getSuggestedFeeds", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.unspecced.getSuggestedFeeds", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>;
//# sourceMappingURL=getSuggestedFeeds.defs.d.ts.map