"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CidNotFound = exports.BlobTransactor = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const file_type_1 = require("file-type");
const p_queue_1 = __importDefault(require("p-queue"));
const common_1 = require("@atproto/common");
const lex_data_1 = require("@atproto/lex-data");
const repo_1 = require("@atproto/repo");
const syntax_1 = require("@atproto/syntax");
const xrpc_server_1 = require("@atproto/xrpc-server");
const logger_1 = require("../../logger");
const reader_1 = require("./reader");
class BlobTransactor extends reader_1.BlobReader {
    constructor(db, blobstore, backgroundQueue) {
        super(db, blobstore);
        Object.defineProperty(this, "db", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: db
        });
        Object.defineProperty(this, "blobstore", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: blobstore
        });
        Object.defineProperty(this, "backgroundQueue", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: backgroundQueue
        });
    }
    async insertBlobs(recordUri, blobs) {
        const values = Array.from(blobs, (blob) => ({
            recordUri,
            blobCid: (0, lex_data_1.getBlobCidString)(blob),
        }));
        if (values.length) {
            await this.db.db
                .insertInto('record_blob')
                .values(values)
                .onConflict((oc) => oc.doNothing())
                .execute();
        }
    }
    async uploadBlobAndGetMetadata(userSuggestedMime, blobStream) {
        const [tempKey, size, sha256, sniffedMime] = await Promise.all([
            this.blobstore.putTemp((0, common_1.cloneStream)(blobStream)),
            (0, common_1.streamSize)((0, common_1.cloneStream)(blobStream)),
            sha256Stream((0, common_1.cloneStream)(blobStream)),
            mimeTypeFromStream((0, common_1.cloneStream)(blobStream)),
        ]);
        return {
            tempKey,
            size,
            cid: (0, lex_data_1.cidForRawHash)(sha256),
            mimeType: sniffedMime || userSuggestedMime,
        };
    }
    async trackUntetheredBlob(metadata) {
        const { tempKey, size, cid, mimeType } = metadata;
        const cidStr = cid.toString();
        const found = await this.db.db
            .selectFrom('blob')
            .selectAll()
            .where('cid', '=', cidStr)
            .executeTakeFirst();
        if (found?.takedownRef) {
            throw new xrpc_server_1.InvalidRequestError('Blob has been takendown, cannot re-upload');
        }
        await this.db.db
            .insertInto('blob')
            .values({
            cid: cidStr,
            mimeType,
            size,
            tempKey,
            createdAt: (0, syntax_1.currentDatetimeString)(),
        })
            .onConflict((oc) => oc
            .column('cid')
            .doUpdateSet({ tempKey })
            .where('blob.tempKey', 'is not', null))
            .execute();
        return {
            $type: 'blob',
            ref: cid,
            mimeType,
            size,
        };
    }
    async processWriteBlobs(rev, writes) {
        await this.deleteDereferencedBlobs(writes);
        const ac = new AbortController();
        const tasks = [];
        for (const write of writes) {
            if (isCreate(write) || isUpdate(write)) {
                for (const blob of write.blobs) {
                    tasks.push(async () => {
                        if (ac.signal.aborted)
                            return;
                        await this.associateBlob(blob, write.uri);
                        await this.verifyBlobAndMakePermanent(blob, ac.signal);
                    });
                }
            }
        }
        try {
            const queue = new p_queue_1.default({
                concurrency: 20,
                // The blob store should already limit the time of every operation. We
                // add a timeout here as an extra precaution.
                timeout: 60 * common_1.SECOND,
                throwOnTimeout: true,
            });
            // Will reject as soon as any task fails, causing the "finally" block
            // below to run, aborting every other pending tasks.
            await queue.addAll(tasks);
        }
        finally {
            ac.abort();
        }
    }
    async updateBlobTakedownStatus(cid, takedown) {
        const takedownRef = takedown.applied
            ? takedown.ref ?? (0, syntax_1.currentDatetimeString)()
            : null;
        await this.db.db
            .updateTable('blob')
            .set({ takedownRef })
            .where('cid', '=', cid.toString())
            .executeTakeFirst();
        try {
            // @NOTE find a way to not perform i/o operations during the transaction
            // (typically by using a state in the "blob" table, and another process to
            // handle the actual i/o)
            if (takedown.applied) {
                await this.blobstore.quarantine(cid);
            }
            else {
                await this.blobstore.unquarantine(cid);
            }
        }
        catch (err) {
            if (!(err instanceof repo_1.BlobNotFoundError)) {
                logger_1.blobStoreLogger.error({ err, cid: cid.toString() }, 'could not update blob takedown status');
                throw err;
            }
        }
    }
    async deleteDereferencedBlobs(writes, skipBlobStore) {
        const deletes = writes.filter(isDelete);
        const updates = writes.filter(isUpdate);
        const uris = [...deletes, ...updates].map((w) => w.uri.toString());
        if (uris.length === 0)
            return;
        const deletedRepoBlobs = await this.db.db
            .deleteFrom('record_blob')
            .where('recordUri', 'in', uris)
            .returning('blobCid')
            .execute();
        if (deletedRepoBlobs.length === 0)
            return;
        const deletedRepoBlobCids = deletedRepoBlobs.map((row) => row.blobCid);
        const duplicateCids = await this.db.db
            .selectFrom('record_blob')
            .where('blobCid', 'in', deletedRepoBlobCids)
            .select('blobCid')
            .execute();
        const newBlobCids = writes
            .filter((w) => isUpdate(w) || isCreate(w))
            .flatMap((w) => w.blobs.map((b) => b.ref.toString()));
        const cidsToKeep = [
            ...newBlobCids,
            ...duplicateCids.map((row) => row.blobCid),
        ];
        const cidsToDelete = deletedRepoBlobCids.filter((cid) => !cidsToKeep.includes(cid));
        if (cidsToDelete.length === 0)
            return;
        await this.db.db
            .deleteFrom('blob')
            .where('cid', 'in', cidsToDelete)
            .execute();
        if (!skipBlobStore) {
            this.db.onCommit(() => {
                this.backgroundQueue.add(async () => {
                    try {
                        const cids = cidsToDelete.map((cid) => (0, lex_data_1.parseCid)(cid));
                        await this.blobstore.deleteMany(cids);
                    }
                    catch (err) {
                        logger_1.blobStoreLogger.error({ err, cids: cidsToDelete }, 'could not delete blobs from blobstore');
                    }
                });
            });
        }
    }
    async verifyBlobAndMakePermanent(blob, signal) {
        const found = await this.db.db
            .selectFrom('blob')
            .select(['tempKey', 'size', 'mimeType'])
            .where('cid', '=', blob.ref.toString())
            .where('takedownRef', 'is', null)
            .executeTakeFirst();
        signal?.throwIfAborted();
        if (!found) {
            throw new xrpc_server_1.InvalidRequestError(`Could not find blob: ${blob.ref.toString()}`, 'BlobNotFound');
        }
        if (found.tempKey) {
            verifyBlob(blob, found);
            // @NOTE it is less than ideal to perform async (i/o) operations during a
            // transaction. Especially since there have been instances of the actor-db
            // being locked, requiring to kick the processes.
            // The better solution would be to update the blob state in the database
            // (e.g. "makeItPermanent") and to process those updates outside of the
            // transaction.
            await this.blobstore
                .makePermanent(found.tempKey, blob.ref)
                .catch((err) => {
                logger_1.blobStoreLogger.error({ err, cid: blob.ref.toString() }, 'could not make blob permanent');
                throw err;
            });
            signal?.throwIfAborted();
            await this.db.db
                .updateTable('blob')
                .set({ tempKey: null })
                .where('tempKey', '=', found.tempKey)
                .execute();
        }
    }
    async insertBlobMetadata(blob) {
        await this.db.db
            .insertInto('blob')
            .values({
            cid: blob.ref.toString(),
            mimeType: blob.mimeType,
            size: blob.size,
            createdAt: (0, syntax_1.currentDatetimeString)(),
        })
            .onConflict((oc) => oc.doNothing())
            .execute();
    }
    async associateBlob(blob, recordUri) {
        await this.db.db
            .insertInto('record_blob')
            .values({
            blobCid: blob.ref.toString(),
            recordUri: recordUri.toString(),
        })
            .onConflict((oc) => oc.doNothing())
            .execute();
    }
}
exports.BlobTransactor = BlobTransactor;
class CidNotFound extends Error {
    constructor(cid) {
        super(`cid not found: ${cid.toString()}`);
        Object.defineProperty(this, "cid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.cid = cid;
    }
}
exports.CidNotFound = CidNotFound;
async function sha256Stream(toHash) {
    const hash = node_crypto_1.default.createHash('sha256');
    try {
        for await (const chunk of toHash) {
            hash.write(chunk);
        }
    }
    catch (err) {
        hash.end();
        throw err;
    }
    hash.end();
    return hash.read();
}
async function mimeTypeFromStream(blobStream) {
    const fileType = await (0, file_type_1.fromStream)(blobStream);
    blobStream.destroy();
    return fileType?.mime;
}
/**
 * Ensures that the blob referenced in the record matches the stored blob.
 */
function verifyBlob(blob, found) {
    if (blob.mimeType !== found.mimeType) {
        throw new xrpc_server_1.InvalidRequestError(`Referenced Mimetype does not match stored blob. Expected: ${found.mimeType}, Got: ${blob.mimeType}`, 'InvalidMimeType');
    }
    if (blob.size !== found.size) {
        throw new xrpc_server_1.InvalidRequestError(`Referenced Size does not match stored blob. Expected: ${found.size}, Got: ${blob.size}`, 'InvalidSize');
    }
}
function isCreate(write) {
    return write.action === repo_1.WriteOpAction.Create;
}
function isUpdate(write) {
    return write.action === repo_1.WriteOpAction.Update;
}
function isDelete(write) {
    return write.action === repo_1.WriteOpAction.Delete;
}
//# sourceMappingURL=transactor.js.map