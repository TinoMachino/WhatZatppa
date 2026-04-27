import { l } from '@atproto/lex';
declare const $nsid = "com.para.civic.vote";
export { $nsid };
/** A signed civic vote. Cabildeo option votes use selectedOption; policy consensus votes use signal from -3 to +3. */
type Main = {
    $type: 'com.para.civic.vote';
    /**
     * The proposal, policy, matter, or cabildeo record being voted on.
     */
    subject?: l.AtUriString;
    /**
     * Optional semantic type for clients and indexers.
     */
    subjectType?: 'cabildeo' | 'policy' | 'matter' | 'governance' | l.UnknownString;
    cabildeo?: l.AtUriString;
    selectedOption?: number;
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
    signal?: number;
    /**
     * Optional voter rationale for the signal.
     */
    reason?: string;
    isDirect: boolean;
    delegatedFrom?: l.DidString[];
    createdAt: l.DatetimeString;
};
export type { Main };
/** A signed civic vote. Cabildeo option votes use selectedOption; policy consensus votes use signal from -3 to +3. */
declare const main: l.RecordSchema<"tid", "com.para.civic.vote", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.civic.vote", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        cabildeo?: l.AtUriString | undefined;
        signal?: number
        /**
         * Optional voter rationale for the signal.
         */
         | undefined;
        subject?: l.AtUriString
        /**
         * Optional semantic type for clients and indexers.
         */
         | undefined;
        subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
        reason?: string | undefined;
        selectedOption?: number
        /**
         * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
         */
         | undefined;
        isDirect: boolean;
        delegatedFrom?: l.DidString[] | undefined;
        $type: "com.para.civic.vote";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        cabildeo?: l.AtUriString | undefined;
        signal?: number
        /**
         * Optional voter rationale for the signal.
         */
         | undefined;
        subject?: l.AtUriString
        /**
         * Optional semantic type for clients and indexers.
         */
         | undefined;
        subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
        reason?: string | undefined;
        selectedOption?: number
        /**
         * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
         */
         | undefined;
        isDirect: boolean;
        delegatedFrom?: l.DidString[] | undefined;
        $type: "com.para.civic.vote";
    };
}, $type: "com.para.civic.vote";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    cabildeo?: l.AtUriString | undefined;
    signal?: number
    /**
     * Optional voter rationale for the signal.
     */
     | undefined;
    subject?: l.AtUriString
    /**
     * Optional semantic type for clients and indexers.
     */
     | undefined;
    subjectType?: ("cabildeo" | "policy" | "matter" | "governance" | l.UnknownString) | undefined;
    reason?: string | undefined;
    selectedOption?: number
    /**
     * Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support.
     */
     | undefined;
    isDirect: boolean;
    delegatedFrom?: l.DidString[] | undefined;
    $type: "com.para.civic.vote";
}>;
//# sourceMappingURL=vote.defs.d.ts.map