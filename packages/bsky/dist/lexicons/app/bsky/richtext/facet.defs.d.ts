import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.richtext.facet";
export { $nsid };
/** Annotation of a sub-string within rich text. */
type Main = {
    $type?: 'app.bsky.richtext.facet';
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
};
export type { Main };
/** Annotation of a sub-string within rich text. */
declare const main: l.TypedObjectSchema<"app.bsky.richtext.facet", l.Validator<Main, Main>>;
export { main };
export declare const $isTypeOf: <TValue extends Record<string, unknown>>(value: TValue) => value is l.MaybeTypedObject<"app.bsky.richtext.facet", TValue>, $build: {
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.richtext.facet";
        index: ByteSlice;
        features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
    };
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.richtext.facet";
        index: ByteSlice;
        features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
    };
}, $type: "app.bsky.richtext.facet";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    $type?: "app.bsky.richtext.facet" | undefined;
    index: ByteSlice;
    features: (l.$Typed<Mention> | l.$Typed<Link> | l.$Typed<Tag> | l.Unknown$TypedObject)[];
}>;
/** Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID. */
type Mention = {
    $type?: 'app.bsky.richtext.facet#mention';
    did: l.DidString;
};
export type { Mention };
/** Facet feature for mention of another account. The text is usually a handle, including a '@' prefix, but the facet reference is a DID. */
declare const mention: l.TypedObjectSchema<"app.bsky.richtext.facet#mention", l.Validator<Mention, Mention>>;
export { mention };
/** Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL. */
type Link = {
    $type?: 'app.bsky.richtext.facet#link';
    uri: l.UriString;
};
export type { Link };
/** Facet feature for a URL. The text URL may have been simplified or truncated, but the facet reference should be a complete URL. */
declare const link: l.TypedObjectSchema<"app.bsky.richtext.facet#link", l.Validator<Link, Link>>;
export { link };
/** Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags'). */
type Tag = {
    $type?: 'app.bsky.richtext.facet#tag';
    tag: string;
};
export type { Tag };
/** Facet feature for a hashtag. The text usually includes a '#' prefix, but the facet reference should not (except in the case of 'double hash tags'). */
declare const tag: l.TypedObjectSchema<"app.bsky.richtext.facet#tag", l.Validator<Tag, Tag>>;
export { tag };
/** Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. */
type ByteSlice = {
    $type?: 'app.bsky.richtext.facet#byteSlice';
    byteStart: number;
    byteEnd: number;
};
export type { ByteSlice };
/** Specifies the sub-string range a facet feature applies to. Start index is inclusive, end index is exclusive. Indices are zero-indexed, counting bytes of the UTF-8 encoded text. NOTE: some languages, like Javascript, use UTF-16 or Unicode codepoints for string slice indexing; in these languages, convert to byte arrays before working with facets. */
declare const byteSlice: l.TypedObjectSchema<"app.bsky.richtext.facet#byteSlice", l.Validator<ByteSlice, ByteSlice>>;
export { byteSlice };
//# sourceMappingURL=facet.defs.d.ts.map