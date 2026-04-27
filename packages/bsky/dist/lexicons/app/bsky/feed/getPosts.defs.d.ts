import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getPosts";
export { $nsid };
/** Gets post views for a specified list of posts (by AT-URI). This is sometimes referred to as 'hydrating' a 'feed skeleton'. */
declare const main: l.Query<"app.bsky.feed.getPosts", l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.PostView, FeedDefs.PostView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getPosts", $params: l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.PostView, FeedDefs.PostView>>>;
}>>;
//# sourceMappingURL=getPosts.defs.d.ts.map