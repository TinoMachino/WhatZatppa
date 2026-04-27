import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.notification.declaration";
export { $nsid };
/** A declaration of the user's choices related to notifications that can be produced by them. */
type Main = {
    $type: 'app.bsky.notification.declaration';
    /**
     * A declaration of the user's preference for allowing activity subscriptions from other users. Absence of a record implies 'followers'.
     */
    allowSubscriptions: 'followers' | 'mutuals' | 'none' | l.UnknownString;
};
export type { Main };
/** A declaration of the user's choices related to notifications that can be produced by them. */
declare const main: l.RecordSchema<"literal:self", "app.bsky.notification.declaration", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.notification.declaration", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
        $type: "app.bsky.notification.declaration";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
        $type: "app.bsky.notification.declaration";
    };
}, $type: "app.bsky.notification.declaration";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    allowSubscriptions: "followers" | "mutuals" | "none" | l.UnknownString;
    $type: "app.bsky.notification.declaration";
}>;
//# sourceMappingURL=declaration.defs.d.ts.map