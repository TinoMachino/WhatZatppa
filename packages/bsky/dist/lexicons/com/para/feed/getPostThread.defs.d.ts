import { l } from '@atproto/lex';
import * as FeedGetAuthorFeed from './getAuthorFeed.defs.js';
declare const $nsid = "com.para.feed.getPostThread";
export { $nsid };
/** Get a Para post thread around a post URI. */
declare const main: l.Query<"com.para.feed.getPostThread", l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly depth: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly parentHeight: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    post: l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>;
    parents: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
    replies: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
}>>, readonly ["NotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "com.para.feed.getPostThread", $params: l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly depth: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly parentHeight: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    post: l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>;
    parents: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
    replies: l.ArraySchema<l.RefSchema<l.Validator<FeedGetAuthorFeed.PostView, FeedGetAuthorFeed.PostView>>>;
}>>;
//# sourceMappingURL=getPostThread.defs.d.ts.map