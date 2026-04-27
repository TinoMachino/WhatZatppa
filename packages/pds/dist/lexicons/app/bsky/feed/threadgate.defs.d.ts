import { l } from '@atproto/lex';
declare const $nsid = "app.bsky.feed.threadgate";
export { $nsid };
/** Record defining interaction gating rules for a thread (aka, reply controls). The record key (rkey) of the threadgate record must match the record key of the thread's root post, and that record must be in the same repository. */
type Main = {
    $type: 'app.bsky.feed.threadgate';
    /**
     * Reference (AT-URI) to the post record.
     */
    post: l.AtUriString;
    /**
     * List of rules defining who can reply to this post. If value is an empty array, no one can reply. If value is undefined, anyone can reply.
     */
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[];
    createdAt: l.DatetimeString;
    /**
     * List of hidden reply URIs.
     */
    hiddenReplies?: l.AtUriString[];
};
export type { Main };
/** Record defining interaction gating rules for a thread (aka, reply controls). The record key (rkey) of the threadgate record must match the record key of the thread's root post, and that record must be in the same repository. */
declare const main: l.RecordSchema<"tid", "app.bsky.feed.threadgate", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.feed.threadgate", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        post: l.AtUriString;
        createdAt: l.DatetimeString;
        allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
        hiddenReplies?: l.AtUriString[] | undefined;
        $type: "app.bsky.feed.threadgate";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        post: l.AtUriString;
        createdAt: l.DatetimeString;
        allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
        hiddenReplies?: l.AtUriString[] | undefined;
        $type: "app.bsky.feed.threadgate";
    };
}, $type: "app.bsky.feed.threadgate";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    post: l.AtUriString;
    createdAt: l.DatetimeString;
    allow?: (l.$Typed<MentionRule> | l.$Typed<FollowerRule> | l.$Typed<FollowingRule> | l.$Typed<ListRule> | l.Unknown$TypedObject)[] | undefined;
    hiddenReplies?: l.AtUriString[] | undefined;
    $type: "app.bsky.feed.threadgate";
}>;
/** Allow replies from actors mentioned in your post. */
type MentionRule = {
    $type?: 'app.bsky.feed.threadgate#mentionRule';
};
export type { MentionRule };
/** Allow replies from actors mentioned in your post. */
declare const mentionRule: l.TypedObjectSchema<"app.bsky.feed.threadgate#mentionRule", l.Validator<MentionRule, MentionRule>>;
export { mentionRule };
/** Allow replies from actors who follow you. */
type FollowerRule = {
    $type?: 'app.bsky.feed.threadgate#followerRule';
};
export type { FollowerRule };
/** Allow replies from actors who follow you. */
declare const followerRule: l.TypedObjectSchema<"app.bsky.feed.threadgate#followerRule", l.Validator<FollowerRule, FollowerRule>>;
export { followerRule };
/** Allow replies from actors you follow. */
type FollowingRule = {
    $type?: 'app.bsky.feed.threadgate#followingRule';
};
export type { FollowingRule };
/** Allow replies from actors you follow. */
declare const followingRule: l.TypedObjectSchema<"app.bsky.feed.threadgate#followingRule", l.Validator<FollowingRule, FollowingRule>>;
export { followingRule };
/** Allow replies from actors on a list. */
type ListRule = {
    $type?: 'app.bsky.feed.threadgate#listRule';
    list: l.AtUriString;
};
export type { ListRule };
/** Allow replies from actors on a list. */
declare const listRule: l.TypedObjectSchema<"app.bsky.feed.threadgate#listRule", l.Validator<ListRule, ListRule>>;
export { listRule };
//# sourceMappingURL=threadgate.defs.d.ts.map