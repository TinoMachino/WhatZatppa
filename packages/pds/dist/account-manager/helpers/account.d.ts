import { AtIdentifierString, DatetimeString, DidString, HandleString } from '@atproto/lex';
import { com } from '../../lexicons/index.js';
import { AccountDb, ActorEntry } from '../db';
export declare class UserAlreadyExistsError extends Error {
}
export type ActorAccount = ActorEntry & {
    email: string | null;
    emailConfirmedAt: string | null;
    invitesDisabled: 0 | 1 | null;
};
export type AvailabilityFlags = {
    includeTakenDown?: boolean;
    includeDeactivated?: boolean;
};
export declare enum AccountStatus {
    Active = "active",
    Takendown = "takendown",
    Suspended = "suspended",
    Deleted = "deleted",
    Deactivated = "deactivated"
}
export declare const selectAccountQB: (db: AccountDb, flags?: AvailabilityFlags) => import("kysely/dist/cjs/parser/select-parser").QueryBuilderWithSelection<{
    lexicon: import("../db").Lexicon;
    account: import("kysely/dist/cjs/util/type-utils").Nullable<import("../db").Account>;
    actor: import("../db").Actor;
    app_password: import("../db").AppPassword;
    invite_code: import("../db").InviteCode;
    invite_code_use: import("../db").InviteCodeUse;
    refresh_token: import("../db").RefreshToken;
    repo_root: import("../db").RepoRoot;
    email_token: import("../db").EmailToken;
    token: import("../db").Token;
    authorization_request: import("../db").AuthorizationRequest;
    device: import("../db").Device;
    used_refresh_token: import("../db").UsedRefreshToken;
    account_device: import("../db").AccountDevice;
    authorized_client: import("../db/schema/authorized-client").AuthorizedClient;
}, "account" | "actor", import("kysely/dist/cjs/util/type-utils").MergePartial<Partial<Omit<{}, never>>, Partial<Omit<{}, never>>>, "actor.did" | "account.email" | "account.invitesDisabled" | "account.emailConfirmedAt" | "actor.handle" | "actor.createdAt" | "actor.deactivatedAt" | "actor.deleteAfter" | "actor.takedownRef">;
export declare const getAccount: (db: AccountDb, handleOrDid: AtIdentifierString, flags?: AvailabilityFlags) => Promise<ActorAccount | null>;
export declare const getAccounts: (db: AccountDb, dids: DidString[], flags?: AvailabilityFlags) => Promise<Map<string, ActorAccount>>;
export declare const getAccountByEmail: (db: AccountDb, email: string, flags?: AvailabilityFlags) => Promise<ActorAccount | null>;
export declare const registerActor: (db: AccountDb, opts: {
    did: DidString;
    handle: HandleString;
    deactivated?: boolean;
}) => Promise<void>;
export declare const registerAccount: (db: AccountDb, opts: {
    did: string;
    email: string;
    passwordScrypt: string;
}) => Promise<void>;
export declare const deleteAccount: (db: AccountDb, did: DidString) => Promise<void>;
export declare const updateHandle: (db: AccountDb, did: DidString, handle: HandleString) => Promise<void>;
export declare const updateEmail: (db: AccountDb, did: DidString, email: string) => Promise<void>;
export declare const setEmailConfirmedAt: (db: AccountDb, did: DidString, emailConfirmedAt: DatetimeString) => Promise<void>;
export declare const getAccountAdminStatus: (db: AccountDb, did: DidString) => Promise<{
    takedown: com.atproto.admin.defs.StatusAttr;
    deactivated: com.atproto.admin.defs.StatusAttr;
} | null>;
export declare const updateAccountTakedownStatus: (db: AccountDb, did: DidString, takedown: com.atproto.admin.defs.StatusAttr) => Promise<void>;
export declare const deactivateAccount: (db: AccountDb, did: DidString, deleteAfter: string | null) => Promise<void>;
export declare const activateAccount: (db: AccountDb, did: DidString) => Promise<void>;
export declare const formatAccountStatus: (account: null | {
    takedownRef: string | null;
    deactivatedAt: string | null;
}) => {
    readonly active: false;
    readonly status: AccountStatus.Deleted;
} | {
    readonly active: false;
    readonly status: AccountStatus.Takendown;
} | {
    readonly active: false;
    readonly status: AccountStatus.Deactivated;
} | {
    readonly active: true;
    readonly status: undefined;
};
//# sourceMappingURL=account.d.ts.map