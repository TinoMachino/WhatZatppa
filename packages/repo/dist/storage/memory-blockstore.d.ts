import { Cid } from '@atproto/lex-data';
import { BlockMap } from '../block-map';
import { CommitData } from '../types';
import { ReadableBlockstore } from './readable-blockstore';
import { RepoStorage } from './types';
export declare class MemoryBlockstore extends ReadableBlockstore implements RepoStorage {
    blocks: BlockMap;
    root: Cid | null;
    rev: string | null;
    constructor(blocks?: BlockMap);
    getRoot(): Promise<Cid | null>;
    getBytes(cid: Cid): Promise<Uint8Array | null>;
    has(cid: Cid): Promise<boolean>;
    getBlocks(cids: Cid[]): Promise<{
        blocks: BlockMap;
        missing: Cid[];
    }>;
    putBlock(cid: Cid, block: Uint8Array): Promise<void>;
    putMany(blocks: BlockMap): Promise<void>;
    updateRoot(cid: Cid, rev: string): Promise<void>;
    applyCommit(commit: CommitData): Promise<void>;
    sizeInBytes(): Promise<number>;
    destroy(): Promise<void>;
}
export default MemoryBlockstore;
//# sourceMappingURL=memory-blockstore.d.ts.map