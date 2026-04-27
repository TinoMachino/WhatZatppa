import stream from 'node:stream';
import { BlobRef, Cid, TypedBlobRef } from '@atproto/lex-data';
import { BlobStore } from '@atproto/repo';
import { AtUri } from '@atproto/syntax';
import { BackgroundQueue } from '../../background';
import { com } from '../../lexicons/index.js';
import { PreparedWrite } from '../../repo/types';
import { ActorDb } from '../db';
import { BlobReader } from './reader';
export type BlobMetadata = {
    tempKey: string;
    size: number;
    cid: Cid;
    mimeType: string;
};
export declare class BlobTransactor extends BlobReader {
    db: ActorDb;
    blobstore: BlobStore;
    backgroundQueue: BackgroundQueue;
    constructor(db: ActorDb, blobstore: BlobStore, backgroundQueue: BackgroundQueue);
    insertBlobs(recordUri: string, blobs: Iterable<BlobRef>): Promise<void>;
    uploadBlobAndGetMetadata(userSuggestedMime: string, blobStream: stream.Readable): Promise<BlobMetadata>;
    trackUntetheredBlob(metadata: BlobMetadata): Promise<TypedBlobRef>;
    processWriteBlobs(rev: string, writes: PreparedWrite[]): Promise<void>;
    updateBlobTakedownStatus(cid: Cid, takedown: com.atproto.admin.defs.StatusAttr): Promise<void>;
    deleteDereferencedBlobs(writes: PreparedWrite[], skipBlobStore?: boolean): Promise<void>;
    verifyBlobAndMakePermanent(blob: TypedBlobRef, signal?: AbortSignal): Promise<void>;
    insertBlobMetadata(blob: TypedBlobRef): Promise<void>;
    associateBlob(blob: TypedBlobRef, recordUri: AtUri): Promise<void>;
}
export declare class CidNotFound extends Error {
    cid: Cid;
    constructor(cid: Cid);
}
//# sourceMappingURL=transactor.d.ts.map