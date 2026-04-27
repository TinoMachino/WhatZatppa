import { l } from '@atproto/lex';
declare const $nsid = "com.para.civic.position";
export { $nsid };
/** User's structured debate stance on a Cabildeo. */
type Main = {
    $type: 'com.para.civic.position';
    cabildeo: l.AtUriString;
    stance: 'for' | 'against' | 'amendment' | l.UnknownString;
    optionIndex?: number;
    text: string;
    compassQuadrant?: string;
    createdAt: l.DatetimeString;
};
export type { Main };
/** User's structured debate stance on a Cabildeo. */
declare const main: l.RecordSchema<"tid", "com.para.civic.position", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.civic.position", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        optionIndex?: number | undefined;
        createdAt: l.DatetimeString;
        cabildeo: l.AtUriString;
        stance: "for" | "against" | "amendment" | l.UnknownString;
        compassQuadrant?: string | undefined;
        $type: "com.para.civic.position";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        optionIndex?: number | undefined;
        createdAt: l.DatetimeString;
        cabildeo: l.AtUriString;
        stance: "for" | "against" | "amendment" | l.UnknownString;
        compassQuadrant?: string | undefined;
        $type: "com.para.civic.position";
    };
}, $type: "com.para.civic.position";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    text: string;
    optionIndex?: number | undefined;
    createdAt: l.DatetimeString;
    cabildeo: l.AtUriString;
    stance: "for" | "against" | "amendment" | l.UnknownString;
    compassQuadrant?: string | undefined;
    $type: "com.para.civic.position";
}>;
//# sourceMappingURL=position.defs.d.ts.map