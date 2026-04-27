import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getFeedSkeleton";
export { $nsid };
/** Get a skeleton of a feed provided by a feed generator. Auth is optional, depending on provider requirements, and provides the DID of the requester. Implemented by Feed Generator Service. */
declare const main: l.Query<"app.bsky.feed.getFeedSkeleton", l.ParamsSchema<{
    readonly feed: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.SkeletonFeedPost, FeedDefs.SkeletonFeedPost>>>;
    reqId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
}>>, readonly ["UnknownFeed"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getFeedSkeleton", $params: l.ParamsSchema<{
    readonly feed: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.SkeletonFeedPost, FeedDefs.SkeletonFeedPost>>>;
    reqId: l.OptionalSchema<l.StringSchema<{
        readonly maxLength: 100;
    }>>;
}>>;
//# sourceMappingURL=getFeedSkeleton.defs.d.ts.map