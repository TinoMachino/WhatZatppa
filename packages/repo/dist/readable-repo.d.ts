import { Cid, LexMap } from '@atproto/lex-data';
import { MST } from './mst';
import { ReadableBlockstore } from './storage';
import { Commit, RepoContents } from './types';
type Params = {
    storage: ReadableBlockstore;
    data: MST;
    commit: Commit;
    cid: Cid;
};
export declare class ReadableRepo {
    storage: ReadableBlockstore;
    data: MST;
    commit: Commit;
    cid: Cid;
    constructor(params: Params);
    static load(storage: ReadableBlockstore, commitCid: Cid): Promise<ReadableRepo>;
    get did(): string;
    get version(): number;
    walkRecords(from?: string): AsyncIterable<{
        collection: string;
        rkey: string;
        cid: Cid;
        record: LexMap;
    }>;
    getRecord(collection: string, rkey: string): Promise<unknown | null>;
    getContents(): Promise<RepoContents>;
}
export {};
//# sourceMappingURL=readable-repo.d.ts.map