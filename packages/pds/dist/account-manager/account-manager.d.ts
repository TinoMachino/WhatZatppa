import { KeyObject } from 'node:crypto';
import { IdResolver } from '@atproto/identity';
import { AtIdentifierString, DidString, HandleString } from '@atproto/lex';
import { Cid } from '@atproto/lex-data';
import { AuthRequiredError } from '@atproto/xrpc-server';
import { com } from '../lexicons/index.js';
import { AccountDb, EmailTokenPurpose } from './db';
import * as account from './helpers/account';
import { AccountStatus, ActorAccount } from './helpers/account';
import * as password from './helpers/password';
export { AccountStatus, formatAccountStatus } from './helpers/account';
/**
 * Thrown by {@link AccountManager.login} when the identifier resolved to a
 * known account but the supplied credentials (account password / app
 * password) did not match. The matched `did` is attached so downstream
 * callers can distinguish "identifier known, credentials wrong" from
 * "identifier unknown" (which continues to throw a plain
 * {@link AuthRequiredError}).
 *
 * Callers should take care that remote clients *cannot* distinguish the above,
 * to prevent enumeration attacks. (Tested for in
 * packages/pds/tests/auth.test.ts)
 */
export declare class InvalidPasswordError extends AuthRequiredError {
    readonly did: string;
    constructor(did: string, errorMessage?: string);
}
export type AccountManagerDbConfig = {
    accountDbLoc: string;
    disableWalAutoCheckpoint: boolean;
};
export declare class AccountManager {
    readonly idResolver: IdResolver;
    readonly jwtKey: KeyObject;
    readonly serviceDid: string;
    readonly serviceHandleDomains: string[];
    readonly db: AccountDb;
    constructor(idResolver: IdResolver, jwtKey: KeyObject, serviceDid: string, serviceHandleDomains: string[], db: AccountManagerDbConfig);
    migrateOrThrow(): Promise<void>;
    close(): void;
    getAccount(handleOrDid: AtIdentifierString, flags?: account.AvailabilityFlags): Promise<ActorAccount | null>;
    getAccounts(dids: DidString[], flags?: account.AvailabilityFlags): Promise<Map<string, ActorAccount>>;
    getAccountByEmail(email: string, flags?: account.AvailabilityFlags): Promise<ActorAccount | null>;
    isAccountActivated(did: DidString): Promise<boolean>;
    getDidForActor(handleOrDid: AtIdentifierString, flags?: account.AvailabilityFlags): Promise<string | null>;
    getAccountStatus(handleOrDid: AtIdentifierString): Promise<AccountStatus>;
    normalizeAndValidateHandle(handle: string, { did, allowAnyValid, }?: {
        did?: string;
        allowAnyValid?: boolean;
    }): Promise<HandleString>;
    createAccount({ did, handle, email, password, repoCid, repoRev, inviteCode, deactivated, refreshJwt, }: {
        did: DidString;
        handle: HandleString;
        email?: string;
        password?: string;
        repoCid: Cid;
        repoRev: string;
        inviteCode?: string;
        deactivated?: boolean;
        refreshJwt?: string;
    }): Promise<void>;
    createAccountAndSession(opts: {
        did: DidString;
        handle: HandleString;
        email?: string;
        password?: string;
        repoCid: Cid;
        repoRev: string;
        inviteCode?: string;
        deactivated?: boolean;
    }): Promise<{
        accessJwt: string;
        refreshJwt: string;
    }>;
    updateHandle(did: DidString, handle: HandleString): Promise<void>;
    deleteAccount(did: DidString): Promise<void>;
    takedownAccount(did: DidString, takedown: com.atproto.admin.defs.StatusAttr): Promise<void>;
    getAccountAdminStatus(did: DidString): Promise<{
        takedown: com.atproto.admin.defs.StatusAttr;
        deactivated: com.atproto.admin.defs.StatusAttr;
    } | null>;
    updateRepoRoot(did: DidString, cid: Cid, rev: string): Promise<void>;
    deactivateAccount(did: DidString, deleteAfter: string | null): Promise<void>;
    activateAccount(did: DidString): Promise<void>;
    createSession(did: DidString, appPassword: password.AppPassDescript | null, isSoftDeleted?: boolean): Promise<{
        accessJwt: string;
        refreshJwt: string;
    }>;
    rotateRefreshToken(id: string): any;
    revokeRefreshToken(id: string): Promise<boolean>;
    login({ identifier, password, }: {
        identifier: string;
        password: string;
    }): Promise<{
        user: ActorAccount;
        appPassword: password.AppPassDescript | null;
        isSoftDeleted: boolean;
    }>;
    createAppPassword(did: DidString, name: string, privileged: boolean): Promise<com.atproto.server.createAppPassword.$defs.AppPassword>;
    listAppPasswords(did: DidString): Promise<{
        name: string;
        createdAt: import("@atproto/lex").DatetimeString;
        privileged: boolean;
    }[]>;
    verifyAccountPassword(did: DidString, passwordStr: string): Promise<boolean>;
    verifyAppPassword(did: DidString, passwordStr: string): Promise<password.AppPassDescript | null>;
    revokeAppPassword(did: DidString, name: string): Promise<void>;
    ensureInviteIsAvailable(code: string): Promise<void>;
    createInviteCodes(toCreate: {
        account: string;
        codes: string[];
    }[], useCount: number): Promise<void>;
    createAccountInviteCodes(forAccount: string, codes: string[], expectedTotal: number, disabled: 0 | 1): Promise<com.atproto.server.defs.$defs.InviteCode[]>;
    getAccountInvitesCodes(did: DidString): Promise<com.atproto.server.defs.$defs.InviteCode[]>;
    getAccountsInvitesCodes(dids: DidString[]): Promise<Map<string, com.atproto.server.defs.$defs.InviteCode[]>>;
    getInvitedByForAccounts(dids: DidString[]): Promise<Record<string, com.atproto.server.defs.$defs.InviteCode>>;
    getInviteCodesUses(codes: string[]): Promise<Record<string, com.atproto.server.defs.$defs.InviteCodeUse[]>>;
    setAccountInvitesDisabled(did: DidString, disabled: boolean): Promise<void>;
    disableInviteCodes(opts: {
        codes: string[];
        accounts: string[];
    }): Promise<void>;
    createEmailToken(did: DidString, purpose: EmailTokenPurpose): Promise<string>;
    assertValidEmailToken(did: DidString, purpose: EmailTokenPurpose, token: string): Promise<void>;
    assertValidEmailTokenAndCleanup(did: DidString, purpose: EmailTokenPurpose, token: string): Promise<void>;
    confirmEmail(opts: {
        did: DidString;
        token: string;
    }): Promise<void>;
    updateEmail(opts: {
        did: DidString;
        email: string;
    }): Promise<void>;
    resetPassword(opts: {
        password: string;
        token: string;
    }): Promise<`did:${string}:${string}`>;
    updateAccountPassword(opts: {
        did: DidString;
        password: string;
    }): Promise<void>;
}
//# sourceMappingURL=account-manager.d.ts.map