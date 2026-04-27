import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.embed.external";
export { $nsid };
/** A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post). */
type Main = {
    $type?: 'app.bsky.embed.external';
    external: External;
};
export type { Main };
/** A representation of some externally linked content (eg, a URL and 'card'), embedded in a Bluesky record (eg, a post). */
declare const main: l.TypedObjectSchema<"app.bsky.embed.external", l.Validator<Main, Main>>;
export { main };
export declare const $isTypeOf: <TValue extends Record<string, unknown>>(value: TValue) => value is l.MaybeTypedObject<"app.bsky.embed.external", TValue>, $build: {
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.external";
        external: External;
    };
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.external";
        external: External;
    };
}, $type: "app.bsky.embed.external";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    $type?: "app.bsky.embed.external" | undefined;
    external: External;
}>;
type External = {
    $type?: 'app.bsky.embed.external#external';
    uri: l.UriString;
    title: string;
    description: string;
    thumb?: l.BlobRef;
};
export type { External };
declare const external: l.TypedObjectSchema<"app.bsky.embed.external#external", l.Validator<External, External>>;
export { external };
type View = {
    $type?: 'app.bsky.embed.external#view';
    external: ViewExternal;
};
export type { View };
declare const view: l.TypedObjectSchema<"app.bsky.embed.external#view", l.Validator<View, View>>;
export { view };
type ViewExternal = {
    $type?: 'app.bsky.embed.external#viewExternal';
    uri: l.UriString;
    title: string;
    description: string;
    thumb?: l.UriString;
};
export type { ViewExternal };
declare const viewExternal: l.TypedObjectSchema<"app.bsky.embed.external#viewExternal", l.Validator<ViewExternal, ViewExternal>>;
export { viewExternal };
//# sourceMappingURL=external.defs.d.ts.map