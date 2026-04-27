import { Keypair } from '@atproto/crypto';
import { Cid, LexMap, LexValue } from '@atproto/lex-data';
import { DataDiff } from './data-diff';
import { Commit, LegacyV2Commit, RecordCreateDescript, RecordPath, RecordWriteDescript, UnsignedCommit } from './types';
export declare const diffToWriteDescripts: (diff: DataDiff) => Promise<RecordWriteDescript[]>;
export declare const ensureCreates: (descripts: RecordWriteDescript[]) => RecordCreateDescript[];
export declare const parseDataKey: (key: string) => RecordPath;
export declare const formatDataKey: (collection: string, rkey: string) => string;
export declare const metaEqual: (a: Commit, b: Commit) => boolean;
export declare const signCommit: (unsigned: UnsignedCommit, keypair: Keypair) => Promise<Commit>;
export declare const verifyCommitSig: (commit: Commit, didKey: string) => Promise<boolean>;
export declare const cborToLex: (val: Uint8Array) => LexValue;
export declare const cborToLexRecord: (val: Uint8Array) => LexMap;
export declare const cidForRecord: (val: LexValue) => Promise<Cid>;
export declare const ensureV3Commit: (commit: LegacyV2Commit | Commit) => Commit;
export declare function concatBytesAsync(iterable: AsyncIterable<Uint8Array>): Promise<Uint8Array<ArrayBufferLike>>;
/**
 * This is the same as {@link Buffer.concat}, without the `totalLength` argument.
 */
export declare function concatBytes(chunks: readonly Uint8Array[]): Uint8Array;
//# sourceMappingURL=util.d.ts.map