import { Cid } from '@atproto/lex-data';
import { ReadableBlockstore, RepoStorage } from '../storage';
import { RecordPath } from '../types';
export declare const getFullRepo: (storage: RepoStorage, commitCid: Cid) => AsyncIterable<Uint8Array>;
export declare const getRecords: (storage: ReadableBlockstore, commitCid: Cid, paths: RecordPath[]) => AsyncIterable<Uint8Array>;
//# sourceMappingURL=provider.d.ts.map