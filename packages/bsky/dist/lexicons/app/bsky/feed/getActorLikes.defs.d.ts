import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getActorLikes";
export { $nsid };
/** Get a list of posts liked by an actor. Requires auth, actor must be the requesting account. */
declare const main: l.Query<"app.bsky.feed.getActorLikes", l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>, readonly ["BlockedActor", "BlockedByActor"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getActorLikes", $params: l.ParamsSchema<{
    readonly actor: l.StringSchema<{
        readonly format: "at-identifier";
    }>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    feed: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.FeedViewPost, FeedDefs.FeedViewPost>>>;
}>>;
//# sourceMappingURL=getActorLikes.defs.d.ts.map