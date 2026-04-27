import { l } from '@atproto/lex';
import * as EmbedRecord from './record.defs.js';
import * as EmbedImages from './images.defs.js';
import * as EmbedVideo from './video.defs.js';
import * as EmbedExternal from './external.defs.js';
declare const $nsid = "app.bsky.embed.recordWithMedia";
export { $nsid };
type Main = {
    $type?: 'app.bsky.embed.recordWithMedia';
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
};
export type { Main };
declare const main: l.TypedObjectSchema<"app.bsky.embed.recordWithMedia", l.Validator<Main, Main>>;
export { main };
export declare const $isTypeOf: <TValue extends Record<string, unknown>>(value: TValue) => value is l.MaybeTypedObject<"app.bsky.embed.recordWithMedia", TValue>, $build: {
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.recordWithMedia";
        record: EmbedRecord.Main;
        media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
    };
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.recordWithMedia";
        record: EmbedRecord.Main;
        media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
    };
}, $type: "app.bsky.embed.recordWithMedia";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    $type?: "app.bsky.embed.recordWithMedia" | undefined;
    record: EmbedRecord.Main;
    media: l.$Typed<EmbedImages.Main> | l.$Typed<EmbedVideo.Main> | l.$Typed<EmbedExternal.Main> | l.Unknown$TypedObject;
}>;
type View = {
    $type?: 'app.bsky.embed.recordWithMedia#view';
    record: EmbedRecord.View;
    media: l.$Typed<EmbedImages.View> | l.$Typed<EmbedVideo.View> | l.$Typed<EmbedExternal.View> | l.Unknown$TypedObject;
};
export type { View };
declare const view: l.TypedObjectSchema<"app.bsky.embed.recordWithMedia#view", l.Validator<View, View>>;
export { view };
//# sourceMappingURL=recordWithMedia.defs.d.ts.map