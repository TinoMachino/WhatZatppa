import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.graph.listblock";
export { $nsid };
/** Record representing a block relationship against an entire an entire list of accounts (actors). */
type Main = {
    $type: 'app.bsky.graph.listblock';
    /**
     * Reference (AT-URI) to the mod list record.
     */
    subject: l.AtUriString;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record representing a block relationship against an entire an entire list of accounts (actors). */
declare const main: l.RecordSchema<"tid", "app.bsky.graph.listblock", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.graph.listblock", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: l.AtUriString;
        $type: "app.bsky.graph.listblock";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        subject: l.AtUriString;
        $type: "app.bsky.graph.listblock";
    };
}, $type: "app.bsky.graph.listblock";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    subject: l.AtUriString;
    $type: "app.bsky.graph.listblock";
}>;
//# sourceMappingURL=listblock.defs.d.ts.map