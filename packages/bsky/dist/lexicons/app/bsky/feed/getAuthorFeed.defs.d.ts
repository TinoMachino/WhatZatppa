import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getAuthorFeed";
export { $nsid };
/** Get a view of an actor's 'author feed' (post and reposts by the author). Does not require auth. */
declare const main: l.Query<"app.bsky.feed.getAuthorFeed", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly filter: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["posts_with_replies", "posts_no_replies", "posts_with_media", "posts_and_author_threads", "posts_with_video"];
    }>>>;
    readonly includePins: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>, readonly ["BlockedActor", "BlockedByActor"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getAuthorFeed", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly filter: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["posts_with_replies", "posts_no_replies", "posts_with_media", "posts_and_author_threads", "posts_with_video"];
    }>>>;
    readonly includePins: l.OptionalSchema<l.WithDefaultSchema<l.BooleanSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>;
//# sourceMappingURL=getAuthorFeed.defs.d.ts.map