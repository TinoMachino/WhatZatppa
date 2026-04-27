import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.graph.listitem";
export { $nsid };
/** Record representing an account's inclusion on a specific list. The AppView will ignore duplicate listitem records. */
type Main = {
    $type: 'app.bsky.graph.listitem';
    /**
     * The account which is included on the list.
     */
    subject: l.DidString;
    /**
     * Reference (AT-URI) to the list record (app.bsky.graph.list).
     */
    list: l.AtUriString;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record representing an account's inclusion on a specific list. The AppView will ignore duplicate listitem records. */
declare const main: l.RecordSchema<"tid", "app.bsky.graph.listitem", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.graph.listitem", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        list: l.AtUriString;
        createdAt: l.DatetimeString;
        subject: l.DidString;
        $type: "app.bsky.graph.listitem";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        list: l.AtUriString;
        createdAt: l.DatetimeString;
        subject: l.DidString;
        $type: "app.bsky.graph.listitem";
    };
}, $type: "app.bsky.graph.listitem";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    list: l.AtUriString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    $type: "app.bsky.graph.listitem";
}>;
//# sourceMappingURL=listitem.defs.d.ts.map