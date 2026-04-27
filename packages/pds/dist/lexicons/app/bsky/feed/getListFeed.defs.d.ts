import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getListFeed";
export { $nsid };
/** Get a feed of recent posts from a list (posts and reposts from any actors on the list). Does not require auth. */
declare const main: l.Query<"app.bsky.feed.getListFeed", l.ParamsSchema<{
    readonly list: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>, readonly ["UnknownList"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getListFeed", $params: l.ParamsSchema<{
    readonly list: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>;
//# sourceMappingURL=getListFeed.defs.d.ts.map