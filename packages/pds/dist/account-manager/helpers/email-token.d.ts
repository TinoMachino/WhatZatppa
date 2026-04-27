import { DidString } from '@atproto/lex';
import { AccountDb, EmailTokenPurpose } from '../db';
export declare const createEmailToken: (db: AccountDb, did: DidString, purpose: EmailTokenPurpose) => Promise<string>;
export declare const deleteEmailToken: (db: AccountDb, did: DidString, purpose: EmailTokenPurpose) => Promise<void>;
export declare const deleteAllEmailTokens: (db: AccountDb, did: DidString) => Promise<void>;
export declare const assertValidToken: (db: AccountDb, did: DidString, purpose: EmailTokenPurpose, token: string, expirationLen?: number) => Promise<void>;
export declare const assertValidTokenAndFindDid: (db: AccountDb, purpose: EmailTokenPurpose, token: string, expirationLen?: number) => Promise<DidString>;
//# sourceMappingURL=email-token.d.ts.map