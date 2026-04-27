import { l } from '@atproto/lex';
import * as CommunityDefs from './defs.defs.js';
declare const $nsid = "com.para.community.governance";
export { $nsid };
/** A published governance record for a PARA community. This is the canonical contract for moderators, officials, deputy roles, and governance metadata exposed to clients. */
type Main = {
    $type: 'com.para.community.governance';
    community: string;
    communityId?: string;
    slug: string;
    createdAt: l.DatetimeString;
    updatedAt: l.DatetimeString;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    metadata?: CommunityDefs.Metadata;
    editHistory?: CommunityDefs.HistoryEntry[];
};
export type { Main };
/** A published governance record for a PARA community. This is the canonical contract for moderators, officials, deputy roles, and governance metadata exposed to clients. */
declare const main: l.RecordSchema<"any", "com.para.community.governance", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"com.para.community.governance", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        community: string;
        createdAt: l.DatetimeString;
        metadata?: CommunityDefs.Metadata | undefined;
        updatedAt: l.DatetimeString;
        communityId?: string | undefined;
        slug: string;
        moderators: CommunityDefs.ModeratorView[];
        officials: CommunityDefs.OfficialView[];
        deputies: CommunityDefs.DeputyRoleView[];
        editHistory?: CommunityDefs.HistoryEntry[] | undefined;
        $type: "com.para.community.governance";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        community: string;
        createdAt: l.DatetimeString;
        metadata?: CommunityDefs.Metadata | undefined;
        updatedAt: l.DatetimeString;
        communityId?: string | undefined;
        slug: string;
        moderators: CommunityDefs.ModeratorView[];
        officials: CommunityDefs.OfficialView[];
        deputies: CommunityDefs.DeputyRoleView[];
        editHistory?: CommunityDefs.HistoryEntry[] | undefined;
        $type: "com.para.community.governance";
    };
}, $type: "com.para.community.governance";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    community: string;
    createdAt: l.DatetimeString;
    metadata?: CommunityDefs.Metadata | undefined;
    updatedAt: l.DatetimeString;
    communityId?: string | undefined;
    slug: string;
    moderators: CommunityDefs.ModeratorView[];
    officials: CommunityDefs.OfficialView[];
    deputies: CommunityDefs.DeputyRoleView[];
    editHistory?: CommunityDefs.HistoryEntry[] | undefined;
    $type: "com.para.community.governance";
}>;
//# sourceMappingURL=governance.defs.d.ts.map