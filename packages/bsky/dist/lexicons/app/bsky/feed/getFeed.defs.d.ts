import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getFeed";
export { $nsid };
/** Get a hydrated feed from an actor's selected feed generator. Implemented by App View. */
declare const main: l.Query<"app.bsky.feed.getFeed", l.ParamsSchema<{
    readonly feed: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>, readonly ["UnknownFeed"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getFeed", $params: l.ParamsSchema<{
    readonly feed: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>;
//# sourceMappingURL=getFeed.defs.d.ts.map