import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.getQuotes";
export { $nsid };
/** Get a list of quotes for a given post. */
declare const main: l.Query<"app.bsky.feed.getQuotes", l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.PostView, FeedDefs.PostView>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.getQuotes", $params: l.ParamsSchema<{
    readonly uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    readonly cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    uri: l.StringSchema<{
        readonly format: "at-uri";
    }>;
    cid: l.OptionalSchema<l.StringSchema<{
        readonly format: "cid";
    }>>;
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.PostView, FeedDefs.PostView>>>;
}>>;
//# sourceMappingURL=getQuotes.defs.d.ts.map