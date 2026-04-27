import { l } from '@atproto/lex';
import * as EmbedDefs from './defs.defs.js';
declare const $nsid = "app.bsky.embed.video";
export { $nsid };
type Main = {
    $type?: 'app.bsky.embed.video';
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
    video: l.BlobRef;
    captions?: Caption[];
    /**
     * Alt text description of the video, for accessibility.
     */
    alt?: string;
    aspectRatio?: EmbedDefs.AspectRatio;
    /**
     * A hint to the client about how to present the video.
     */
    presentation?: 'default' | 'gif' | l.UnknownString;
};
export type { Main };
declare const main: l.TypedObjectSchema<"app.bsky.embed.video", l.Validator<Main, Main>>;
export { main };
export declare const $isTypeOf: <TValue extends Record<string, unknown>>(value: TValue) => value is l.MaybeTypedObject<"app.bsky.embed.video", TValue>, $build: {
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.video";
        video: l.BlobRef;
        captions?: Caption[]
        /**
         * Alt text description of the video, for accessibility.
         */
         | undefined;
        alt?: string | undefined;
        aspectRatio?: EmbedDefs.AspectRatio
        /**
         * A hint to the client about how to present the video.
         */
         | undefined;
        presentation?: ("default" | "gif" | l.UnknownString) | undefined;
    };
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.video";
        video: l.BlobRef;
        captions?: Caption[]
        /**
         * Alt text description of the video, for accessibility.
         */
         | undefined;
        alt?: string | undefined;
        aspectRatio?: EmbedDefs.AspectRatio
        /**
         * A hint to the client about how to present the video.
         */
         | undefined;
        presentation?: ("default" | "gif" | l.UnknownString) | undefined;
    };
}, $type: "app.bsky.embed.video";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    $type?: "app.bsky.embed.video"
    /**
     * The mp4 video file. May be up to 100mb, formerly limited to 50mb.
     */
     | undefined;
    video: l.BlobRef;
    captions?: Caption[]
    /**
     * Alt text description of the video, for accessibility.
     */
     | undefined;
    alt?: string | undefined;
    aspectRatio?: EmbedDefs.AspectRatio
    /**
     * A hint to the client about how to present the video.
     */
     | undefined;
    presentation?: ("default" | "gif" | l.UnknownString) | undefined;
}>;
type Caption = {
    $type?: 'app.bsky.embed.video#caption';
    lang: l.LanguageString;
    file: l.BlobRef;
};
export type { Caption };
declare const caption: l.TypedObjectSchema<"app.bsky.embed.video#caption", l.Validator<Caption, Caption>>;
export { caption };
type View = {
    $type?: 'app.bsky.embed.video#view';
    cid: l.CidString;
    playlist: l.UriString;
    thumbnail?: l.UriString;
    alt?: string;
    aspectRatio?: EmbedDefs.AspectRatio;
    /**
     * A hint to the client about how to present the video.
     */
    presentation?: 'default' | 'gif' | l.UnknownString;
};
export type { View };
declare const view: l.TypedObjectSchema<"app.bsky.embed.video#view", l.Validator<View, View>>;
export { view };
//# sourceMappingURL=video.defs.d.ts.map