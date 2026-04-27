import { LexiconData } from '@atproto/oauth-provider';
import { AccountDb } from '../db';
export declare function upsert(db: AccountDb, nsid: string, data: LexiconData): Promise<void>;
export declare function find(db: AccountDb, nsid: string): Promise<LexiconData | null>;
export declare function remove(db: AccountDb, nsid: string): Promise<void>;
//# sourceMappingURL=lexicon.d.ts.map