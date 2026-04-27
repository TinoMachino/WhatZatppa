import { DatetimeString, DidString } from '@atproto/lex';
import { com } from '../../lexicons/index.js';
import { AccountDb } from '../db';
export type CodeDetail = com.atproto.server.defs.InviteCode;
export type CodeUse = com.atproto.server.defs.InviteCodeUse;
export declare const createInviteCodes: (db: AccountDb, toCreate: {
    account: string;
    codes: string[];
}[], useCount: number) => Promise<void>;
export declare const createAccountInviteCodes: (db: AccountDb, forAccount: string, codes: string[], expectedTotal: number, disabled: 0 | 1) => Promise<CodeDetail[]>;
export declare const recordInviteUse: (db: AccountDb, opts: {
    did: DidString;
    inviteCode: string | undefined;
    now: DatetimeString;
}) => Promise<void>;
export declare const ensureInviteIsAvailable: (db: AccountDb, inviteCode: string) => Promise<void>;
export declare const selectInviteCodesQb: (db: AccountDb) => import("kysely/dist/cjs/parser/select-parser").SelectAllQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, import("kysely").AliasedQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code">, "invite_code", import("kysely").Selection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code">, "invite_code", "invite_code.code as code" | "invite_code.availableUses as available" | "invite_code.disabled as disabled" | "invite_code.forAccount as forAccount" | "invite_code.createdBy as createdBy" | "invite_code.createdAt as createdAt" | import("kysely").AliasedQueryBuilder<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code_use">, "invite_code_use", import("kysely").Selection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "invite_code_use">, "invite_code_use", import("kysely").AliasedRawBuilder<number, "count">>, "uses">>, "codes">>, "codes", {}, "codes">;
export declare const getAccountsInviteCodes: (db: AccountDb, dids: string[]) => Promise<Map<string, CodeDetail[]>>;
export declare const getInviteCodesUses: (db: AccountDb, codes: string[]) => Promise<Record<string, CodeUse[]>>;
export declare const getInvitedByForAccounts: (db: AccountDb, dids: DidString[]) => Promise<Record<string, CodeDetail>>;
export declare const disableInviteCodes: (db: AccountDb, opts: {
    codes: string[];
    accounts: string[];
}) => Promise<void>;
export declare const setAccountInvitesDisabled: (db: AccountDb, did: DidString, disabled: boolean) => Promise<void>;
//# sourceMappingURL=invite.d.ts.map