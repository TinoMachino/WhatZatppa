import { Cid } from '@atproto/lex-data';
import { BlockMap, CarBlock, ReadableBlockstore } from '@atproto/repo';
import { ActorDb } from '../db';
export declare class SqlRepoReader extends ReadableBlockstore {
    db: ActorDb;
    cache: BlockMap;
    constructor(db: ActorDb);
    getRoot(): Promise<Cid>;
    getRootDetailed(): Promise<{
        cid: Cid;
        rev: string;
    }>;
    getBytes(cid: Cid): Promise<Uint8Array | null>;
    has(cid: Cid): Promise<boolean>;
    getBlocks(cids: Cid[]): Promise<{
        blocks: BlockMap;
        missing: Cid[];
    }>;
    getCarStream(since?: string): Promise<AsyncIterable<Uint8Array<ArrayBufferLike>>>;
    iterateCarBlocks(since?: string): AsyncIterable<CarBlock>;
    getBlockRange(since?: string, cursor?: RevCursor): Promise<import("kysely").Selection<import("kysely/dist/cjs/parser/table-parser").From<import("../db").DatabaseSchema, "repo_block">, "repo_block", "content" | "cid" | "repoRev">[]>;
    countBlocks(): Promise<number>;
    destroy(): Promise<void>;
}
type RevCursor = {
    cid: Cid;
    rev: string;
};
export declare class RepoRootNotFoundError extends Error {
}
export {};
//# sourceMappingURL=sql-repo-reader.d.ts.map