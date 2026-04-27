import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.graph.verification";
export { $nsid };
/** Record declaring a verification relationship between two accounts. Verifications are only considered valid by an app if issued by an account the app considers trusted. */
type Main = {
    $type: 'app.bsky.graph.verification';
    /**
     * DID of the subject the verification applies to.
     */
    subject: l.DidString;
    /**
     * Handle of the subject the verification applies to at the moment of verifying, which might not be the same at the time of viewing. The verification is only valid if the current handle matches the one at the time of verifying.
     */
    handle: l.HandleString;
    /**
     * Display name of the subject the verification applies to at the moment of verifying, which might not be the same at the time of viewing. The verification is only valid if the current displayName matches the one at the time of verifying.
     */
    displayName: string;
    /**
     * Date of when the verification was created.
     */
    createdAt: l.DatetimeString;
};
export type { Main };
/** Record declaring a verification relationship between two accounts. Verifications are only considered valid by an app if issued by an account the app considers trusted. */
declare const main: l.RecordSchema<"tid", "app.bsky.graph.verification", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.graph.verification", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        handle: l.HandleString;
        createdAt: l.DatetimeString;
        subject: l.DidString;
        displayName: string;
        $type: "app.bsky.graph.verification";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        handle: l.HandleString;
        createdAt: l.DatetimeString;
        subject: l.DidString;
        displayName: string;
        $type: "app.bsky.graph.verification";
    };
}, $type: "app.bsky.graph.verification";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    handle: l.HandleString;
    createdAt: l.DatetimeString;
    subject: l.DidString;
    displayName: string;
    $type: "app.bsky.graph.verification";
}>;
//# sourceMappingURL=verification.defs.d.ts.map