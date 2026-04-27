import { l } from '@atproto/lex';
declare const $nsid = "com.para.status";
export { $nsid };
/** Current public status for a Para account. */
type Main = {
    $type: 'com.para.status';
    /**
     * User's public status message.
     */
    status: string;
    /**
     * Optional political party affiliation.
     */
    party?: string;
    /**
     * Optional primary community label.
     */
    community?: string;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Current public status for a Para account. */
declare const main: l.RecordSchema<"literal:self", "com.para.status", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.status", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        community?: string | undefined;
        status: string;
        createdAt: l.DatetimeString;
        party?: string
        /**
         * Optional primary community label.
         */
         | undefined;
        $type: "com.para.status";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        community?: string | undefined;
        status: string;
        createdAt: l.DatetimeString;
        party?: string
        /**
         * Optional primary community label.
         */
         | undefined;
        $type: "com.para.status";
    };
}, $type: "com.para.status";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    community?: string | undefined;
    status: string;
    createdAt: l.DatetimeString;
    party?: string
    /**
     * Optional primary community label.
     */
     | undefined;
    $type: "com.para.status";
}>;
//# sourceMappingURL=status.defs.d.ts.map