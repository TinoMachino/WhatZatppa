import { l } from '@atproto/lex';
declare const $nsid = "com.para.civic.cabildeo";
export { $nsid };
/** A structured civic deliberation proposal. */
type Main = {
    $type: 'com.para.civic.cabildeo';
    title: string;
    description: string;
    community: string;
    communities?: string[];
    flairs?: string[];
    region?: string;
    geoRestricted?: boolean;
    options: CabildeoOption[];
    minQuorum?: number;
    phase: 'draft' | 'open' | 'deliberating' | 'voting' | 'resolved' | l.UnknownString;
    phaseDeadline?: l.DatetimeString;
    createdAt?: l.DatetimeString;
};
export type { Main };
/** A structured civic deliberation proposal. */
declare const main: l.RecordSchema<"tid", "com.para.civic.cabildeo", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.civic.cabildeo", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        description: string;
        communities?: string[] | undefined;
        community: string;
        options: CabildeoOption[];
        phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
        title: string;
        flairs?: string[] | undefined;
        region?: string | undefined;
        geoRestricted?: boolean | undefined;
        minQuorum?: number | undefined;
        phaseDeadline?: l.DatetimeString | undefined;
        createdAt?: l.DatetimeString | undefined;
        $type: "com.para.civic.cabildeo";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        description: string;
        communities?: string[] | undefined;
        community: string;
        options: CabildeoOption[];
        phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
        title: string;
        flairs?: string[] | undefined;
        region?: string | undefined;
        geoRestricted?: boolean | undefined;
        minQuorum?: number | undefined;
        phaseDeadline?: l.DatetimeString | undefined;
        createdAt?: l.DatetimeString | undefined;
        $type: "com.para.civic.cabildeo";
    };
}, $type: "com.para.civic.cabildeo";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    description: string;
    communities?: string[] | undefined;
    community: string;
    options: CabildeoOption[];
    phase: "draft" | "open" | "deliberating" | "voting" | "resolved" | l.UnknownString;
    title: string;
    flairs?: string[] | undefined;
    region?: string | undefined;
    geoRestricted?: boolean | undefined;
    minQuorum?: number | undefined;
    phaseDeadline?: l.DatetimeString | undefined;
    createdAt?: l.DatetimeString | undefined;
    $type: "com.para.civic.cabildeo";
}>;
type CabildeoOption = {
    $type?: 'com.para.civic.cabildeo#cabildeoOption';
    label: string;
    description?: string;
};
export type { CabildeoOption };
declare const cabildeoOption: l.TypedObjectSchema<"com.para.civic.cabildeo#cabildeoOption", l.Validator<CabildeoOption, CabildeoOption>>;
export { cabildeoOption };
//# sourceMappingURL=cabildeo.defs.d.ts.map