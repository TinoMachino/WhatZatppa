import { l } from '@atproto/lex';
declare const $nsid = "com.para.highlight.annotation";
export { $nsid };
/** A public or private highlight annotation over a post or record. */
type Main = {
    $type: 'com.para.highlight.annotation';
    subjectUri: l.AtUriString;
    /**
     * Optional CID of the highlighted record at creation time.
     */
    subjectCid?: string;
    text: string;
    start: number;
    end: number;
    color: string;
    tag?: string;
    community?: string;
    state?: string;
    party?: string;
    visibility: 'public' | 'private' | l.UnknownString;
    createdAt: l.DatetimeString;
};
export type { Main };
/** A public or private highlight annotation over a post or record. */
declare const main: l.RecordSchema<"tid", "com.para.highlight.annotation", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.highlight.annotation", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        community?: string | undefined;
        end: number;
        start: number;
        state?: string | undefined;
        tag?: string | undefined;
        createdAt: l.DatetimeString;
        visibility: "public" | "private" | l.UnknownString;
        subjectUri: l.AtUriString;
        subjectCid?: string | undefined;
        color: string;
        party?: string | undefined;
        $type: "com.para.highlight.annotation";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        text: string;
        community?: string | undefined;
        end: number;
        start: number;
        state?: string | undefined;
        tag?: string | undefined;
        createdAt: l.DatetimeString;
        visibility: "public" | "private" | l.UnknownString;
        subjectUri: l.AtUriString;
        subjectCid?: string | undefined;
        color: string;
        party?: string | undefined;
        $type: "com.para.highlight.annotation";
    };
}, $type: "com.para.highlight.annotation";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    text: string;
    community?: string | undefined;
    end: number;
    start: number;
    state?: string | undefined;
    tag?: string | undefined;
    createdAt: l.DatetimeString;
    visibility: "public" | "private" | l.UnknownString;
    subjectUri: l.AtUriString;
    subjectCid?: string | undefined;
    color: string;
    party?: string | undefined;
    $type: "com.para.highlight.annotation";
}>;
//# sourceMappingURL=annotation.defs.d.ts.map