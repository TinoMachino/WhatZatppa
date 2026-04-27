import { l } from '@atproto/lex';
import * as FeedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.feed.searchPosts";
export { $nsid };
/** Find posts matching search criteria, returning views of those posts. Note that this API endpoint may require authentication (eg, not public) for some service providers and implementations. */
declare const main: l.Query<"app.bsky.feed.searchPosts", l.ParamsSchema<{
    readonly q: l.StringSchema<{}>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["top", "latest"];
    }>>>;
    readonly since: l.OptionalSchema<l.StringSchema<{}>>;
    readonly until: l.OptionalSchema<l.StringSchema<{}>>;
    readonly mentions: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>;
    readonly author: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>;
    readonly lang: l.OptionalSchema<l.StringSchema<{
        readonly format: "language";
    }>>;
    readonly domain: l.OptionalSchema<l.StringSchema<{}>>;
    readonly url: l.OptionalSchema<l.StringSchema<{
        readonly format: "uri";
    }>>;
    readonly tag: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly maxLength: 640;
        readonly maxGraphemes: 64;
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    hitsTotal: l.OptionalSchema<l.IntegerSchema>;
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.PostView, FeedDefs.PostView>>>;
}>>, readonly ["BadQueryString"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.searchPosts", $params: l.ParamsSchema<{
    readonly q: l.StringSchema<{}>;
    readonly sort: l.OptionalSchema<l.WithDefaultSchema<l.StringSchema<{
        knownValues: ["top", "latest"];
    }>>>;
    readonly since: l.OptionalSchema<l.StringSchema<{}>>;
    readonly until: l.OptionalSchema<l.StringSchema<{}>>;
    readonly mentions: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>;
    readonly author: l.OptionalSchema<l.StringSchema<{
        readonly format: "at-identifier";
    }>>;
    readonly lang: l.OptionalSchema<l.StringSchema<{
        readonly format: "language";
    }>>;
    readonly domain: l.OptionalSchema<l.StringSchema<{}>>;
    readonly url: l.OptionalSchema<l.StringSchema<{
        readonly format: "uri";
    }>>;
    readonly tag: l.OptionalSchema<l.ArraySchema<l.StringSchema<{
        readonly maxLength: 640;
        readonly maxGraphemes: 64;
    }>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    hitsTotal: l.OptionalSchema<l.IntegerSchema>;
    posts: l.ArraySchema<l.RefSchema<l.Validator<FeedDefs.PostView, FeedDefs.PostView>>>;
}>>;
//# sourceMappingURL=searchPosts.defs.d.ts.map