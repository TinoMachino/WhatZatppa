import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getPostThread";
export { $nsid };
/** Get posts in a thread. Does not require auth, but additional metadata and filtering will be applied for authed requests. */
declare const main: l.Query<"app.bsky.feed.getPostThread", l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly depth: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly parentHeight: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    thread: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<FeedDefs.ThreadViewPost, FeedDefs.ThreadViewPost>>, l.TypedRefSchema<l.TypedObjectValidator<FeedDefs.NotFoundPost, FeedDefs.NotFoundPost>>, l.TypedRefSchema<l.TypedObjectValidator<FeedDefs.BlockedPost, FeedDefs.BlockedPost>>], false>;
    threadgate: l.OptionalSchema<l.RefSchema<l.Validator<FeedDefs.ThreadgateView, FeedDefs.ThreadgateView>>>;
}>>, readonly ["NotFound"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getPostThread", $params: l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly depth: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly parentHeight: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    thread: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<FeedDefs.ThreadViewPost, FeedDefs.ThreadViewPost>>, l.TypedRefSchema<l.TypedObjectValidator<FeedDefs.NotFoundPost, FeedDefs.NotFoundPost>>, l.TypedRefSchema<l.TypedObjectValidator<FeedDefs.BlockedPost, FeedDefs.BlockedPost>>], false>;
    threadgate: l.OptionalSchema<l.RefSchema<l.Validator<FeedDefs.ThreadgateView, FeedDefs.ThreadgateView>>>;
}>>;
//# sourceMappingURL=getPostThread.defs.d.ts.map