import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.repo.strongRef";
export { $nsid };
type Main = {
    $type?: 'com.atproto.repo.strongRef';
    uri: l.AtUriString;
    cid: l.CidString;
};
export type { Main };
declare const main: l.TypedObjectSchema<"com.atproto.repo.strongRef", l.Validator<Main, Main>>;
export { main };
export declare const $isTypeOf: <TValue extends Record<string, unknown>>(value: TValue) => value is l.MaybeTypedObject<"com.atproto.repo.strongRef", TValue>, $build: {
    (input: Omit<Main, "$type">): {
        $type: "com.atproto.repo.strongRef";
        uri: l.AtUriString;
        cid: l.CidString;
    };
    (input: Omit<Main, "$type">): {
        $type: "com.atproto.repo.strongRef";
        uri: l.AtUriString;
        cid: l.CidString;
    };
}, $type: "com.atproto.repo.strongRef";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    $type?: "com.atproto.repo.strongRef" | undefined;
    uri: l.AtUriString;
    cid: l.CidString;
}>;
//# sourceMappingURL=strongRef.defs.d.ts.map