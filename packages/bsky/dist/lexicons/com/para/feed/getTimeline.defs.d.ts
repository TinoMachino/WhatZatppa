import { l } from '@atproto/lex';
import * as FeedGetAuthorFeed from './getAuthorFeed.defs.js';
declare const $nsid = "com.para.feed.getTimeline";
export { $nsid };
/** Get a paginated timeline of Para posts authored by accounts the viewer follows, plus the viewer's own posts. */
declare const main: l.Query<"com.para.feed.getTimeline", l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.feed.getTimeline", $params: l.ParamsSchema<{
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
}>>;
//# sourceMappingURL=getTimeline.defs.d.ts.map