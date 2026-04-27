import { l } from '@atproto/lex';
declare const $nsid = "com.para.community.membership";
export { $nsid };
/** Membership state of an actor in a Para community. */
type Main = {
    $type: 'com.para.community.membership';
    /**
     * Reference to the community board record.
     */
    community: l.AtUriString;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | l.UnknownString;
    roles?: string[];
    source?: string;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString;
};
export type { Main };
/** Membership state of an actor in a Para community. */
declare const main: l.RecordSchema<"tid", "com.para.community.membership", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.community.membership", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        community: l.AtUriString;
        source?: string | undefined;
        roles?: string[] | undefined;
        membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
        joinedAt: l.DatetimeString;
        leftAt?: l.DatetimeString | undefined;
        $type: "com.para.community.membership";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        community: l.AtUriString;
        source?: string | undefined;
        roles?: string[] | undefined;
        membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
        joinedAt: l.DatetimeString;
        leftAt?: l.DatetimeString | undefined;
        $type: "com.para.community.membership";
    };
}, $type: "com.para.community.membership";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    community: l.AtUriString;
    source?: string | undefined;
    roles?: string[] | undefined;
    membershipState: "pending" | "active" | "left" | "removed" | "blocked" | l.UnknownString;
    joinedAt: l.DatetimeString;
    leftAt?: l.DatetimeString | undefined;
    $type: "com.para.community.membership";
}>;
//# sourceMappingURL=membership.defs.d.ts.map