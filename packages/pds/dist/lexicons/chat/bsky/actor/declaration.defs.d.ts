import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.actor.declaration";
export { $nsid };
/** A declaration of a Bluesky chat account. */
type Main = {
    $type: 'chat.bsky.actor.declaration';
    allowIncoming: 'all' | 'none' | 'following' | l.UnknownString;
    /**
     * [NOTE: This is under active development and should be considered unstable while this note is here]. Declaration about group chat invitation preferences for the record owner.
     */
    allowGroupInvites?: 'all' | 'none' | 'following' | l.UnknownString;
};
export type { Main };
/** A declaration of a Bluesky chat account. */
declare const main: l.RecordSchema<"literal:self", "chat.bsky.actor.declaration", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"chat.bsky.actor.declaration", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        allowIncoming: "all" | "none" | "following" | l.UnknownString;
        allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
        $type: "chat.bsky.actor.declaration";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        allowIncoming: "all" | "none" | "following" | l.UnknownString;
        allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
        $type: "chat.bsky.actor.declaration";
    };
}, $type: "chat.bsky.actor.declaration";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    allowIncoming: "all" | "none" | "following" | l.UnknownString;
    allowGroupInvites?: ("all" | "none" | "following" | l.UnknownString) | undefined;
    $type: "chat.bsky.actor.declaration";
}>;
//# sourceMappingURL=declaration.defs.d.ts.map