import { Cid } from '@atproto/lex-data';
import { BlockMap } from '../block-map';
import { ReadableBlockstore } from './readable-blockstore';
export declare class SyncStorage extends ReadableBlockstore {
    staged: ReadableBlockstore;
    saved: ReadableBlockstore;
    constructor(staged: ReadableBlockstore, saved: ReadableBlockstore);
    getBytes(cid: Cid): Promise<Uint8Array | null>;
    getBlocks(cids: Cid[]): Promise<{
        blocks: BlockMap;
        missing: Cid[];
    }>;
    has(cid: Cid): Promise<boolean>;
}
export default SyncStorage;
//# sourceMappingURL=sync-storage.d.ts.map