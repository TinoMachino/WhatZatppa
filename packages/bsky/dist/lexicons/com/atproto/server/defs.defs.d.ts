import { l } from '@atproto/lex';
declare const $nsid = "com.atproto.server.defs";
export { $nsid };
type InviteCode = {
    $type?: 'com.atproto.server.defs#inviteCode';
    code: string;
    available: number;
    disabled: boolean;
    forAccount: string;
    createdBy: string;
    createdAt: l.DatetimeString;
    uses: InviteCodeUse[];
};
export type { InviteCode };
declare const inviteCode: l.TypedObjectSchema<"com.atproto.server.defs#inviteCode", l.Validator<InviteCode, InviteCode>>;
export { inviteCode };
type InviteCodeUse = {
    $type?: 'com.atproto.server.defs#inviteCodeUse';
    usedBy: l.DidString;
    usedAt: l.DatetimeString;
};
export type { InviteCodeUse };
declare const inviteCodeUse: l.TypedObjectSchema<"com.atproto.server.defs#inviteCodeUse", l.Validator<InviteCodeUse, InviteCodeUse>>;
export { inviteCodeUse };
//# sourceMappingURL=defs.defs.d.ts.map