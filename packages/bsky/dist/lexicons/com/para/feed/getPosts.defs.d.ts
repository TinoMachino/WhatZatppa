import { l } from '@atproto/lex';
import * as FeedGetAuthorFeed from './getAuthorFeed.defs.js';
declare const $nsid = "com.para.feed.getPosts";
export { $nsid };
/** Get Para post views for a specified list of post AT-URIs. */
declare const main: l.Query<"com.para.feed.getPosts", l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.feed.getPosts", $params: l.ParamsSchema<{
    readonly uris: l.ArraySchema<l.StringSchema<{
        readonly format: "at-uri";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
}>>;
//# sourceMappingURL=getPosts.defs.d.ts.map