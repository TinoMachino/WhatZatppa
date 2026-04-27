import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getFeedGenerators";
export { $nsid };
/** Get information about a list of feed generators. */
declare const main: l.Query<"app.bsky.feed.getFeedGenerators", l.ParamsSchema<{
    readonly feeds: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getFeedGenerators", $params: l.ParamsSchema<{
    readonly feeds: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    feeds: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.GeneratorView, FeedDefs.GeneratorView>>>;
}>>;
//# sourceMappingURL=getFeedGenerators.defs.d.ts.map