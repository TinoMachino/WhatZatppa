import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.graph.block";
export { $nsid };
/** Record declaring a 'block' relationship against another account. NOTE: blocks are public in Bluesky; see blog posts for details. */
type Main = {
    $type: 'app.bsky.graph.block';
    /**
     * DID of the account to be blocked.
     */
    subject: l.DidString;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record declaring a 'block' relationship against another account. NOTE: blocks are public in Bluesky; see blog posts for details. */
declare const main: l.RecordSchema<"tid", "app.bsky.graph.block", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.graph.block", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: l.DidString;
        $type: "app.bsky.graph.block";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: l.DidString;
        $type: "app.bsky.graph.block";
    };
}, $type: "app.bsky.graph.block";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.block";
}>;
//# sourceMappingURL=block.defs.d.ts.map