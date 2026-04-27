import stream from 'node:stream';
import { S3ClientConfig } from '@aws-sdk/client-s3';
import { CID } from 'multiformats/cid';
import { BlobStore } from '@atproto/repo';
export type S3Config = {
    bucket: string;
    /**
     * The maximum time any request to S3 (including individual blob chunks
     * uploads) can take, in milliseconds.
     */
    requestTimeoutMs?: number;
    /**
     * The maximum total time a blob upload can take, in milliseconds.
     */
    uploadTimeoutMs?: number;
} & Omit<S3ClientConfig, 'apiVersion' | 'requestHandler'>;
export declare class S3BlobStore implements BlobStore {
    did: string;
    private client;
    private bucket;
    private uploadTimeoutMs;
    constructor(did: string, cfg: S3Config);
    static creator(cfg: S3Config): (did: string) => S3BlobStore;
    private genKey;
    private getTmpPath;
    private getStoredPath;
    private getQuarantinedPath;
    private uploadBytes;
    putTemp(bytes: Uint8Array | stream.Readable): Promise<string>;
    makePermanent(key: string, cid: CID): Promise<void>;
    putPermanent(cid: CID, bytes: Uint8Array | stream.Readable): Promise<void>;
    quarantine(cid: CID): Promise<void>;
    unquarantine(cid: CID): Promise<void>;
    private getObject;
    getBytes(cid: CID): Promise<Uint8Array>;
    getStream(cid: CID): Promise<stream.Readable>;
    delete(cid: CID): Promise<void>;
    deleteMany(cids: CID[]): Promise<void>;
    hasStored(cid: CID): Promise<boolean>;
    hasTemp(key: string): Promise<boolean>;
    private hasKey;
    private deleteKey;
    private deleteManyKeys;
    private move;
}
export default S3BlobStore;
//# sourceMappingURL=s3.d.ts.map