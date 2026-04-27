import { l } from '@atproto/lex';
declare const $nsid = "com.para.social.postMeta";
export { $nsid };
/** Metadata associated with a Para post. */
type Main = {
    $type: 'com.para.social.postMeta';
    post: l.AtUriString;
    postType: 'policy' | 'matter' | 'meme';
    official?: boolean;
    party?: string;
    community?: string;
    category?: string;
    tags?: string[];
    flairs?: string[];
    voteScore: number;
    createdAt: l.DatetimeString;
};
export type { Main };
/** Metadata associated with a Para post. */
declare const main: l.RecordSchema<"tid", "com.para.social.postMeta", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.social.postMeta", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        category?: string | undefined;
        community?: string | undefined;
        official?: boolean | undefined;
        post: l.AtUriString;
        tags?: string[] | undefined;
        flairs?: string[] | undefined;
        createdAt: l.DatetimeString;
        postType: "policy" | "matter" | "meme";
        party?: string | undefined;
        voteScore: number;
        $type: "com.para.social.postMeta";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        category?: string | undefined;
        community?: string | undefined;
        official?: boolean | undefined;
        post: l.AtUriString;
        tags?: string[] | undefined;
        flairs?: string[] | undefined;
        createdAt: l.DatetimeString;
        postType: "policy" | "matter" | "meme";
        party?: string | undefined;
        voteScore: number;
        $type: "com.para.social.postMeta";
    };
}, $type: "com.para.social.postMeta";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    category?: string | undefined;
    community?: string | undefined;
    official?: boolean | undefined;
    post: l.AtUriString;
    tags?: string[] | undefined;
    flairs?: string[] | undefined;
    createdAt: l.DatetimeString;
    postType: "policy" | "matter" | "meme";
    party?: string | undefined;
    voteScore: number;
    $type: "com.para.social.postMeta";
}>;
//# sourceMappingURL=postMeta.defs.d.ts.map