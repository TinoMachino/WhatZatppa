import { l } from '@atproto/lex';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
declare const $nsid = "app.bsky.feed.like";
export { $nsid };
/** Record declaring a 'like' of a piece of subject content. */
type Main = {
    $type: 'app.bsky.feed.like';
    subject: RepoStrongRef.Main;
    createdAt: l.DatetimeString;
    via?: RepoStrongRef.Main;
};
export type { Main };
/** Record declaring a 'like' of a piece of subject content. */
declare const main: l.RecordSchema<"tid", "app.bsky.feed.like", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.feed.like", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: RepoStrongRef.Main;
        via?: RepoStrongRef.Main | undefined;
        $type: "app.bsky.feed.like";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: RepoStrongRef.Main;
        via?: RepoStrongRef.Main | undefined;
        $type: "app.bsky.feed.like";
    };
}, $type: "app.bsky.feed.like";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    subject: RepoStrongRef.Main;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.feed.like";
}>;
//# sourceMappingURL=like.defs.d.ts.map