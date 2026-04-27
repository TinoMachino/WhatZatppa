import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.feed.postgate";
export { $nsid };
/** Record defining interaction rules for a post. The record key (rkey) of the postgate record must match the record key of the post, and that record must be in the same repository. */
type Main = {
    $type: 'app.bsky.feed.postgate';
    createdAt: l.DatetimeString;
    /**
     * Reference (AT-URI) to the post record.
     */
    post: l.AtUriString;
    /**
     * List of AT-URIs embedding this post that the author has detached from.
     */
    detachedEmbeddingUris?: l.AtUriString[];
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[];
};
export type { Main };
/** Record defining interaction rules for a post. The record key (rkey) of the postgate record must match the record key of the post, and that record must be in the same repository. */
declare const main: l.RecordSchema<"tid", "app.bsky.feed.postgate", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.feed.postgate", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        post: l.AtUriString;
        createdAt: l.DatetimeString;
        detachedEmbeddingUris?: l.AtUriString[]
        /**
         * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
         */
         | undefined;
        embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
        $type: "app.bsky.feed.postgate";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        post: l.AtUriString;
        createdAt: l.DatetimeString;
        detachedEmbeddingUris?: l.AtUriString[]
        /**
         * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
         */
         | undefined;
        embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
        $type: "app.bsky.feed.postgate";
    };
}, $type: "app.bsky.feed.postgate";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    detachedEmbeddingUris?: l.AtUriString[]
    /**
     * List of rules defining who can embed this post. If value is an empty array or is undefined, no particular rules apply and anyone can embed.
     */
     | undefined;
    embeddingRules?: (l.$Typed<DisableRule> | l.Unknown$TypedObject)[] | undefined;
    $type: "app.bsky.feed.postgate";
}>;
/** Disables embedding of this post. */
type DisableRule = {
    $type?: 'app.bsky.feed.postgate#disableRule';
};
export type { DisableRule };
/** Disables embedding of this post. */
declare const disableRule: l.TypedObjectSchema<"app.bsky.feed.postgate#disableRule", l.Validator<DisableRule, DisableRule>>;
export { disableRule };
//# sourceMappingURL=postgate.defs.d.ts.map