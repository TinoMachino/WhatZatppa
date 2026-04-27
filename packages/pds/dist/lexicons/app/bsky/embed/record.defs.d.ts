import { l } from '@atproto/lex';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
import * as FeedDefs from '../feed/defs.defs.js';
import * as GraphDefs from '../graph/defs.defs.js';
import * as LabelerDefs from '../labeler/defs.defs.js';
import * as ActorDefs from '../actor/defs.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as EmbedImages from './images.defs.js';
import * as EmbedVideo from './video.defs.js';
import * as EmbedExternal from './external.defs.js';
import * as EmbedRecordWithMedia from './recordWithMedia.defs.js';
declare const $nsid = "app.bsky.embed.record";
export { $nsid };
type Main = {
    $type?: 'app.bsky.embed.record';
    record: RepoStrongRef.Main;
};
export type { Main };
declare const main: l.TypedObjectSchema<"app.bsky.embed.record", l.Validator<Main, Main>>;
export { main };
export declare const $isTypeOf: <TValue extends Record<string, unknown>>(value: TValue) => value is l.MaybeTypedObject<"app.bsky.embed.record", TValue>, $build: {
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.record";
        record: RepoStrongRef.Main;
    };
    (input: Omit<Main, "$type">): {
        $type: "app.bsky.embed.record";
        record: RepoStrongRef.Main;
    };
}, $type: "app.bsky.embed.record";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    $type?: "app.bsky.embed.record" | undefined;
    record: RepoStrongRef.Main;
}>;
type View = {
    $type?: 'app.bsky.embed.record#view';
    record: l.$Typed<ViewRecord> | l.$Typed<ViewNotFound> | l.$Typed<ViewBlocked> | l.$Typed<ViewDetached> | l.$Typed<FeedDefs.GeneratorView> | l.$Typed<GraphDefs.ListView> | l.$Typed<LabelerDefs.LabelerView> | l.$Typed<GraphDefs.StarterPackViewBasic> | l.Unknown$TypedObject;
};
export type { View };
declare const view: l.TypedObjectSchema<"app.bsky.embed.record#view", l.Validator<View, View>>;
export { view };
type ViewRecord = {
    $type?: 'app.bsky.embed.record#viewRecord';
    uri: l.AtUriString;
    cid: l.CidString;
    author: ActorDefs.ProfileViewBasic;
    /**
     * The record data itself.
     */
    value: l.LexMap;
    labels?: LabelDefs.Label[];
    replyCount?: number;
    repostCount?: number;
    likeCount?: number;
    quoteCount?: number;
    embeds?: (l.$Typed<EmbedImages.View> | l.$Typed<EmbedVideo.View> | l.$Typed<EmbedExternal.View> | l.$Typed<View> | l.$Typed<EmbedRecordWithMedia.View> | l.Unknown$TypedObject)[];
    indexedAt: l.DatetimeString;
};
export type { ViewRecord };
declare const viewRecord: l.TypedObjectSchema<"app.bsky.embed.record#viewRecord", l.Validator<ViewRecord, ViewRecord>>;
export { viewRecord };
type ViewNotFound = {
    $type?: 'app.bsky.embed.record#viewNotFound';
    uri: l.AtUriString;
    notFound: true;
};
export type { ViewNotFound };
declare const viewNotFound: l.TypedObjectSchema<"app.bsky.embed.record#viewNotFound", l.Validator<ViewNotFound, ViewNotFound>>;
export { viewNotFound };
type ViewBlocked = {
    $type?: 'app.bsky.embed.record#viewBlocked';
    uri: l.AtUriString;
    blocked: true;
    author: FeedDefs.BlockedAuthor;
};
export type { ViewBlocked };
declare const viewBlocked: l.TypedObjectSchema<"app.bsky.embed.record#viewBlocked", l.Validator<ViewBlocked, ViewBlocked>>;
export { viewBlocked };
type ViewDetached = {
    $type?: 'app.bsky.embed.record#viewDetached';
    uri: l.AtUriString;
    detached: true;
};
export type { ViewDetached };
declare const viewDetached: l.TypedObjectSchema<"app.bsky.embed.record#viewDetached", l.Validator<ViewDetached, ViewDetached>>;
export { viewDetached };
//# sourceMappingURL=record.defs.d.ts.map