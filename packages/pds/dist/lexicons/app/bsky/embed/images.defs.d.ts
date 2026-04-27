import { l } from '@atproto/lex';
import * as EmbedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.embed.images";
export { $nsid };
type Main = {
    $type?: 'app.bsky.embed.images';
    images: Image[];
};
export type { Main };
declare const main: l.TypedObjectSchema<"app.bsky.embed.images", l.Validator<Main, Main>>;
export { main };
export declare const $isTypeOf: <TValue extends Record<string, unknown>>(value: TValue) => value is l.MaybeTypedObject<"app.bsky.embed.images", TValue>, $build: {
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.images";
        images: Image[];
    };
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.images";
        images: Image[];
    };
}, $type: "app.bsky.embed.images";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    $type?: "app.bsky.embed.images" | undefined;
    images: Image[];
}>;
type Image = {
    $type?: 'app.bsky.embed.images#image';
    /**
     * The raw image file. May be up to 2 MB, formerly limited to 1 MB.
     */
    image: l.BlobRef;
    /**
     * Alt text description of the image, for accessibility.
     */
    alt: string;
    aspectRatio?: EmbedDefs.AspectRatio;
};
export type { Image };
declare const image: l.TypedObjectSchema<"app.bsky.embed.images#image", l.Validator<Image, Image>>;
export { image };
type View = {
    $type?: 'app.bsky.embed.images#view';
    images: ViewImage[];
};
export type { View };
declare const view: l.TypedObjectSchema<"app.bsky.embed.images#view", l.Validator<View, View>>;
export { view };
type ViewImage = {
    $type?: 'app.bsky.embed.images#viewImage';
    /**
     * Fully-qualified URL where a thumbnail of the image can be fetched. For example, CDN location provided by the App View.
     */
    thumb: l.UriString;
    /**
     * Fully-qualified URL where a large version of the image can be fetched. May or may not be the exact original blob. For example, CDN location provided by the App View.
     */
    fullsize: l.UriString;
    /**
     * Alt text description of the image, for accessibility.
     */
    alt: string;
    aspectRatio?: EmbedDefs.AspectRatio;
};
export type { ViewImage };
declare const viewImage: l.TypedObjectSchema<"app.bsky.embed.images#viewImage", l.Validator<ViewImage, ViewImage>>;
export { viewImage };
//# sourceMappingURL=images.defs.d.ts.map