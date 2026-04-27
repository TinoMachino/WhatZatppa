import { l } from '@atproto/lex';
declare const $nsid = "com.para.civic.delegation";
export { $nsid };
/** Standing delegation of civic voting power. */
type Main = {
    $type: 'com.para.civic.delegation';
    cabildeo?: l.AtUriString;
    delegateTo: l.DidString;
    scopeFlairs?: string[];
    reason?: string;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Standing delegation of civic voting power. */
declare const main: l.RecordSchema<"tid", "com.para.civic.delegation", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.civic.delegation", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        reason?: string | undefined;
        cabildeo?: l.AtUriString | undefined;
        delegateTo: l.DidString;
        scopeFlairs?: string[] | undefined;
        $type: "com.para.civic.delegation";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        reason?: string | undefined;
        cabildeo?: l.AtUriString | undefined;
        delegateTo: l.DidString;
        scopeFlairs?: string[] | undefined;
        $type: "com.para.civic.delegation";
    };
}, $type: "com.para.civic.delegation";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    reason?: string | undefined;
    cabildeo?: l.AtUriString | undefined;
    delegateTo: l.DidString;
    scopeFlairs?: string[] | undefined;
    $type: "com.para.civic.delegation";
}>;
//# sourceMappingURL=delegation.defs.d.ts.map