import { l } from '@atproto/lex';
import * as RichtextFacet from '../richtext/facet.defs.js';
declare const $nsid = "app.bsky.graph.starterpack";
export { $nsid };
/** Record defining a starter pack of actors and feeds for new users. */
type Main = {
    $type: 'app.bsky.graph.starterpack';
    /**
     * Display name for starter pack; can not be empty.
     */
    name: string;
    description?: string;
    descriptionFacets?: RichtextFacet.Main[];
    /**
     * Reference (AT-URI) to the list record.
     */
    list: l.AtUriString;
    feeds?: FeedItem[];
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record defining a starter pack of actors and feeds for new users. */
declare const main: l.RecordSchema<"tid", "app.bsky.graph.starterpack", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.graph.starterpack", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        list: l.AtUriString;
        description?: string | undefined;
        createdAt: l.DatetimeString;
        descriptionFacets?: RichtextFacet.Main[]
        /**
         * Reference (AT-URI) to the list record.
         */
         | undefined;
        name: string;
        feeds?: FeedItem[] | undefined;
        $type: "app.bsky.graph.starterpack";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        list: l.AtUriString;
        description?: string | undefined;
        createdAt: l.DatetimeString;
        descriptionFacets?: RichtextFacet.Main[]
        /**
         * Reference (AT-URI) to the list record.
         */
         | undefined;
        name: string;
        feeds?: FeedItem[] | undefined;
        $type: "app.bsky.graph.starterpack";
    };
}, $type: "app.bsky.graph.starterpack";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    list: l.AtUriString;
    description?: string | undefined;
    createdAt: l.DatetimeString;
    descriptionFacets?: RichtextFacet.Main[]
    /**
     * Reference (AT-URI) to the list record.
     */
     | undefined;
    name: string;
    feeds?: FeedItem[] | undefined;
    $type: "app.bsky.graph.starterpack";
}>;
type FeedItem = {
    $type?: 'app.bsky.graph.starterpack#feedItem';
    uri: l.AtUriString;
};
export type { FeedItem };
declare const feedItem: l.TypedObjectSchema<"app.bsky.graph.starterpack#feedItem", l.Validator<FeedItem, FeedItem>>;
export { feedItem };
//# sourceMappingURL=starterpack.defs.d.ts.map