"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3BlobStore = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const lib_storage_1 = require("@aws-sdk/lib-storage");
const common_web_1 = require("@atproto/common-web");
const crypto_1 = require("@atproto/crypto");
const repo_1 = require("@atproto/repo");
class S3BlobStore {
    constructor(did, cfg) {
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "client", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "bucket", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "uploadTimeoutMs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const { bucket, uploadTimeoutMs = 10 * common_web_1.SECOND, requestTimeoutMs = uploadTimeoutMs, ...rest } = cfg;
        this.bucket = bucket;
        this.uploadTimeoutMs = uploadTimeoutMs;
        this.client = new client_s3_1.S3({
            ...rest,
            apiVersion: '2006-03-01',
            // Ensures that all requests timeout under "requestTimeoutMs".
            //
            // @NOTE This will also apply to the upload of each individual chunk
            // when using Upload from @aws-sdk/lib-storage.
            requestHandler: { requestTimeout: requestTimeoutMs },
        });
    }
    static creator(cfg) {
        return (did) => {
            return new S3BlobStore(did, cfg);
        };
    }
    genKey() {
        return (0, crypto_1.randomStr)(32, 'base32');
    }
    getTmpPath(key) {
        return `tmp/${this.did}/${key}`;
    }
    getStoredPath(cid) {
        return `blocks/${this.did}/${cid.toString()}`;
    }
    getQuarantinedPath(cid) {
        return `quarantine/${this.did}/${cid.toString()}`;
    }
    async uploadBytes(path, bytes) {
        // @NOTE we use Upload rather than client.putObject because stream length is
        // not known in advance. See also aws/aws-sdk-js-v3#2348.
        //
        // See also https://github.com/aws/aws-sdk-js-v3/issues/6426, wherein Upload
        // may hang the s3 connection under certain circumstances. We don't have a
        // good way to avoid this, so we use timeouts defensively on all s3
        // requests.
        const abortSignal = AbortSignal.timeout(this.uploadTimeoutMs);
        const abortController = new AbortController();
        abortSignal.addEventListener('abort', () => abortController.abort());
        const upload = new lib_storage_1.Upload({
            client: this.client,
            params: {
                Bucket: this.bucket,
                Body: bytes,
                Key: path,
            },
            // @ts-ignore native implementation fine in node >=15
            abortController,
        });
        try {
            await upload.done();
        }
        catch (err) {
            // Translate aws-sdk's abort error to something more specific
            if (err instanceof Error && err.name === 'AbortError') {
                throw new Error('Blob upload timed out', { cause: err });
            }
            throw err;
        }
    }
    async putTemp(bytes) {
        const key = this.genKey();
        await this.uploadBytes(this.getTmpPath(key), bytes);
        return key;
    }
    async makePermanent(key, cid) {
        try {
            // @NOTE we normally call this method when we know the file is temporary.
            // Because of this, we optimistically move the file, allowing to make
            // fewer network requests in the happy path.
            await this.move({
                from: this.getTmpPath(key),
                to: this.getStoredPath(cid),
            });
        }
        catch (err) {
            // If the optimistic move failed because the temp file was not found,
            // check if the permanent file already exists. If it does, we can assume
            // that another process made the file permanent concurrently, and we can
            // no-op.
            if (err instanceof repo_1.BlobNotFoundError) {
                // Blob was not found from temp storage...
                const alreadyHas = await this.hasStored(cid);
                // already saved, so we no-op
                if (alreadyHas)
                    return;
            }
            throw err;
        }
    }
    async putPermanent(cid, bytes) {
        await this.uploadBytes(this.getStoredPath(cid), bytes);
    }
    async quarantine(cid) {
        await this.move({
            from: this.getStoredPath(cid),
            to: this.getQuarantinedPath(cid),
        });
    }
    async unquarantine(cid) {
        await this.move({
            from: this.getQuarantinedPath(cid),
            to: this.getStoredPath(cid),
        });
    }
    async getObject(cid) {
        const res = await this.client.getObject({
            Bucket: this.bucket,
            Key: this.getStoredPath(cid),
        });
        if (res.Body) {
            return res.Body;
        }
        else {
            throw new repo_1.BlobNotFoundError();
        }
    }
    async getBytes(cid) {
        const res = await this.getObject(cid);
        return res.transformToByteArray();
    }
    async getStream(cid) {
        const res = await this.getObject(cid);
        return res;
    }
    async delete(cid) {
        await this.deleteKey(this.getStoredPath(cid));
    }
    async deleteMany(cids) {
        const errors = [];
        for (const chunk of (0, common_web_1.chunkArray)(cids, 500)) {
            try {
                const keys = chunk.map((cid) => this.getStoredPath(cid));
                await this.deleteManyKeys(keys);
            }
            catch (err) {
                errors.push(err);
            }
        }
        if (errors.length)
            throw (0, common_web_1.aggregateErrors)(errors);
    }
    async hasStored(cid) {
        return this.hasKey(this.getStoredPath(cid));
    }
    async hasTemp(key) {
        return this.hasKey(this.getTmpPath(key));
    }
    async hasKey(key) {
        try {
            const res = await this.client.headObject({
                Bucket: this.bucket,
                Key: key,
            });
            return res.$metadata.httpStatusCode === 200;
        }
        catch (err) {
            return false;
        }
    }
    async deleteKey(key) {
        await this.client.deleteObject({
            Bucket: this.bucket,
            Key: key,
        });
    }
    async deleteManyKeys(keys) {
        await this.client.deleteObjects({
            Bucket: this.bucket,
            Delete: {
                Objects: keys.map((k) => ({ Key: k })),
            },
        });
    }
    async move(keys) {
        try {
            await this.client.copyObject({
                Bucket: this.bucket,
                CopySource: `${this.bucket}/${keys.from}`,
                Key: keys.to,
            });
        }
        catch (cause) {
            if (cause instanceof client_s3_1.NoSuchKey) {
                // Already deleted, possibly by a concurrently running process
                throw new repo_1.BlobNotFoundError(undefined, { cause });
            }
            throw cause;
        }
        try {
            await this.client.deleteObject({
                Bucket: this.bucket,
                Key: keys.from,
            });
        }
        catch (err) {
            if (err instanceof client_s3_1.NoSuchKey) {
                // Already deleted, possibly by a concurrently running process
                return;
            }
            throw err;
        }
    }
}
exports.S3BlobStore = S3BlobStore;
exports.default = S3BlobStore;
//# sourceMappingURL=s3.js.map