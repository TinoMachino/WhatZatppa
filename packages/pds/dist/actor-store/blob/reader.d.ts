import stream from 'node:stream';
import { Cid } from '@atproto/lex-data';
import { BlobStore } from '@atproto/repo';
import { AtUriString } from '@atproto/syntax';
import { com } from '../../lexicons/index.js';
import { ActorDb } from '../db';
export declare class BlobReader {
    db: ActorDb;
    blobstore: BlobStore;
    constructor(db: ActorDb, blobstore: BlobStore);
    getBlobMetadata(cid: Cid): Promise<{
        size: number;
        mimeType?: `${string}/${string}`;
    }>;
    getBlob(cid: Cid): Promise<{
        size: number;
        mimeType?: `${string}/${string}`;
        stream: stream.Readable;
    }>;
    listBlobs(opts: {
        since?: string;
        cursor?: string;
        limit: number;
    }): Promise<string[]>;
    getBlobTakedownStatus(cid: Cid): Promise<com.atproto.admin.defs.StatusAttr | null>;
    hasRecordsForBlob(cid: Cid): Promise<boolean>;
    getBlobsForRecord(recordUri: string): Promise<string[]>;
    blobCount(): Promise<number>;
    recordBlobCount(): Promise<number>;
    listMissingBlobs(opts: {
        cursor?: string;
        limit: number;
    }): Promise<{
        cid: string;
        recordUri: AtUriString;
    }[]>;
    getBlobCids(): Promise<Cid<0 | 1, number, number>[]>;
}
//# sourceMappingURL=reader.d.ts.map