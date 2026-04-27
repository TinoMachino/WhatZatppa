import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.feed.describeFeedGenerator";
export { $nsid };
/** Get information about a feed generator, including policies and offered feed URIs. Does not require auth; implemented by Feed Generator services (not App View). */
declare const main: l.Query<"app.bsky.feed.describeFeedGenerator", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    feeds: l.ArraySchema<l.RefSchema<l.Validator<Feed, Feed>>>;
    links: l.OptionalSchema<l.RefSchema<l.Validator<Links, Links>>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.feed.describeFeedGenerator", $params: l.ParamsSchema<{}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    did: l.StringSchema<{
        readonly format: "did";
    }>;
    feeds: l.ArraySchema<l.RefSchema<l.Validator<Feed, Feed>>>;
    links: l.OptionalSchema<l.RefSchema<l.Validator<Links, Links>>>;
}>>;
type Feed = {
    $type?: 'app.bsky.feed.describeFeedGenerator#feed';
    uri: l.AtUriString;
};
export type { Feed };
declare const feed: l.TypedObjectSchema<"app.bsky.feed.describeFeedGenerator#feed", l.Validator<Feed, Feed>>;
export { feed };
type Links = {
    $type?: 'app.bsky.feed.describeFeedGenerator#links';
    privacyPolicy?: string;
    termsOfService?: string;
};
export type { Links };
declare const links: l.TypedObjectSchema<"app.bsky.feed.describeFeedGenerator#links", l.Validator<Links, Links>>;
export { links };
//# sourceMappingURL=describeFeedGenerator.defs.d.ts.map