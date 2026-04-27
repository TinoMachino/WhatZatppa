import { l } from '@atproto/lex';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
declare const $nsid = "app.bsky.graph.follow";
export { $nsid };
/** Record declaring a social 'follow' relationship of another account. Duplicate follows will be ignored by the AppView. */
type Main = {
    $type: 'app.bsky.graph.follow';
    subject: l.DidString;
    createdAt: l.DatetimeString;
    via?: RepoStrongRef.Main;
};
export type { Main };
/** Record declaring a social 'follow' relationship of another account. Duplicate follows will be ignored by the AppView. */
declare const main: l.RecordSchema<"tid", "app.bsky.graph.follow", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.graph.follow", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: l.DidString;
        via?: RepoStrongRef.Main | undefined;
        $type: "app.bsky.graph.follow";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: l.DidString;
        via?: RepoStrongRef.Main | undefined;
        $type: "app.bsky.graph.follow";
    };
}, $type: "app.bsky.graph.follow";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    via?: RepoStrongRef.Main | undefined;
    $type: "app.bsky.graph.follow";
}>;
//# sourceMappingURL=follow.defs.d.ts.map