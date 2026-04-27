import stream from 'node:stream';
import { Cid } from '@atproto/lex-data';
import { BlobStore } from '@atproto/repo';
export declare class DiskBlobStore implements BlobStore {
    did: string;
    location: string;
    tmpLocation: string;
    quarantineLocation: string;
    constructor(did: string, location: string, tmpLocation: string, quarantineLocation: string);
    static creator(location: string, tmpLocation?: string, quarantineLocation?: string): (did: string) => DiskBlobStore;
    private ensureDir;
    private ensureTemp;
    private ensureQuarantine;
    private genKey;
    getTmpPath(key: string): string;
    getStoredPath(cid: Cid): string;
    getQuarantinePath(cid: Cid): string;
    hasTemp(key: string): Promise<boolean>;
    hasStored(cid: Cid): Promise<boolean>;
    putTemp(bytes: Uint8Array | stream.Readable): Promise<string>;
    makePermanent(key: string, cid: Cid): Promise<void>;
    putPermanent(cid: Cid, bytes: Uint8Array | stream.Readable): Promise<void>;
    quarantine(cid: Cid): Promise<void>;
    unquarantine(cid: Cid): Promise<void>;
    getBytes(cid: Cid): Promise<Uint8Array>;
    getStream(cid: Cid): Promise<stream.Readable>;
    delete(cid: Cid): Promise<void>;
    deleteMany(cids: Cid[]): Promise<void>;
    deleteAll(): Promise<void>;
}
//# sourceMappingURL=disk-blobstore.d.ts.map