"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.readCarReader = exports.readCarStream = exports.readCarWithRoot = exports.readCar = exports.blocksToCarStream = void 0;
exports.writeCarStream = writeCarStream;
exports.blocksToCarFile = blocksToCarFile;
exports.verifyIncomingCarBlocks = verifyIncomingCarBlocks;
const promises_1 = require("node:timers/promises");
const varint = __importStar(require("varint"));
const cbor = __importStar(require("@atproto/lex-cbor"));
const lex_data_1 = require("@atproto/lex-data");
const block_map_1 = require("./block-map");
const types_1 = require("./types");
const util_1 = require("./util");
async function* writeCarStream(root, blocks) {
    const header = new Uint8Array(cbor.encode({
        version: 1,
        roots: root ? [root] : [],
    }));
    yield new Uint8Array(varint.encode(header.byteLength));
    yield header;
    for await (const block of blocks) {
        yield new Uint8Array(varint.encode(block.cid.bytes.byteLength + block.bytes.byteLength));
        yield block.cid.bytes;
        yield block.bytes;
    }
}
async function blocksToCarFile(root, blocks) {
    return (0, util_1.concatBytesAsync)((0, exports.blocksToCarStream)(root, blocks));
}
const blocksToCarStream = (root, blocks) => {
    return writeCarStream(root, iterateBlocks(blocks));
};
exports.blocksToCarStream = blocksToCarStream;
async function* iterateBlocks(blocks) {
    for (const entry of blocks.entries()) {
        yield { cid: entry.cid, bytes: entry.bytes };
    }
}
const readCar = async (bytes, opts) => {
    const { roots, blocks } = await (0, exports.readCarReader)(new Ui8Reader(bytes), opts);
    const blockMap = new block_map_1.BlockMap();
    for await (const block of blocks) {
        blockMap.set(block.cid, block.bytes);
    }
    return { roots, blocks: blockMap };
};
exports.readCar = readCar;
const readCarWithRoot = async (bytes, opts) => {
    const { roots, blocks } = await (0, exports.readCar)(bytes, opts);
    if (roots.length !== 1) {
        throw new Error(`Expected one root, got ${roots.length}`);
    }
    const root = roots[0];
    return {
        root,
        blocks,
    };
};
exports.readCarWithRoot = readCarWithRoot;
const readCarStream = async (car, opts) => {
    return (0, exports.readCarReader)(new BufferedReader(car), opts);
};
exports.readCarStream = readCarStream;
const readCarReader = async (reader, opts) => {
    try {
        const headerSize = await readVarint(reader);
        if (headerSize === null) {
            throw new Error('Could not parse CAR header');
        }
        const headerBytes = await reader.read(headerSize);
        const header = cbor.decode(headerBytes);
        const result = types_1.schema.carHeader.safeParse(header);
        if (!result.success) {
            throw new Error('Could not parse CAR header', { cause: result.error });
        }
        return {
            roots: result.data.roots,
            blocks: readCarBlocksIter(reader, opts),
        };
    }
    catch (err) {
        await reader.close();
        throw err;
    }
};
exports.readCarReader = readCarReader;
const readCarBlocksIter = (reader, opts) => {
    let generator = readCarBlocksIterGenerator(reader);
    if (!opts?.skipCidVerification) {
        generator = verifyIncomingCarBlocks(generator);
    }
    return Object.assign(generator, {
        async dump() {
            // try/finally to ensure that reader.close is called even if blocks.return throws.
            try {
                // Prevent the iterator from being started after this method is called.
                await generator.return();
            }
            finally {
                // @NOTE the "finally" block of the async generator won't be called
                // if the iteration was never started so we need to manually close here.
                await reader.close();
            }
        },
    });
};
async function* readCarBlocksIterGenerator(reader) {
    let blocks = 0;
    try {
        while (!reader.isDone) {
            const blockSize = await readVarint(reader);
            if (blockSize === null) {
                break;
            }
            const blockBytes = await reader.read(blockSize);
            const cid = (0, lex_data_1.decodeCid)(blockBytes.subarray(0, 36));
            const bytes = blockBytes.subarray(36);
            yield { cid, bytes };
            // yield to the event loop every 25 blocks
            // in the case the incoming CAR is synchronous, this can end up jamming up the thread
            blocks++;
            if (blocks % 25 === 0) {
                await (0, promises_1.setImmediate)();
            }
        }
    }
    finally {
        await reader.close();
    }
}
async function* verifyIncomingCarBlocks(car) {
    for await (const block of car) {
        if (!(await (0, lex_data_1.isCidForBytes)(block.cid, block.bytes))) {
            throw new Error(`Not a valid CID for bytes (${block.cid.toString()})`);
        }
        yield block;
    }
}
const readVarint = async (reader) => {
    let done = false;
    const bytes = [];
    while (!done) {
        const byte = await reader.read(1);
        if (byte.byteLength === 0) {
            if (bytes.length > 0) {
                throw new Error('could not parse varint');
            }
            else {
                return null;
            }
        }
        bytes.push(byte);
        if (byte[0] < 128) {
            done = true;
        }
    }
    const concatted = Buffer.concat(bytes);
    return varint.decode(concatted);
};
class Ui8Reader {
    constructor(bytes) {
        Object.defineProperty(this, "bytes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: bytes
        });
        Object.defineProperty(this, "idx", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "isDone", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
    }
    async read(bytesToRead) {
        const value = this.bytes.subarray(this.idx, this.idx + bytesToRead);
        this.idx += bytesToRead;
        if (this.idx >= this.bytes.length) {
            this.isDone = true;
        }
        return value;
    }
    async close() { }
}
/**
 * This code was optimized for performance. See
 * {@link https://github.com/bluesky-social/atproto/pull/4729 #4729} for more details
 * and benchmarks.
 */
class BufferedReader {
    constructor(stream) {
        Object.defineProperty(this, "iterator", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "isDone", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        /** fifo list of chunks to consume */
        Object.defineProperty(this, "chunks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        this.iterator =
            Symbol.asyncIterator in stream
                ? stream[Symbol.asyncIterator]()
                : stream[Symbol.iterator]();
    }
    /** Number of bytes currently buffered and available for reading */
    get bufferedByteLength() {
        let total = 0;
        for (let i = 0; i < this.chunks.length; i++) {
            total += this.chunks[i].byteLength;
        }
        return total;
    }
    /**
     * @note concurrent reads are **NOT** supported by the current implementation
     * and would require call to readUntilBuffered to be using a fifo lock for
     * read()s to be processed in fifo order.
     */
    async read(bytesToRead) {
        const bytesNeeded = bytesToRead - this.bufferedByteLength;
        if (bytesNeeded > 0 && !this.isDone) {
            await this.readUntilBuffered(bytesNeeded);
        }
        const resultLength = Math.min(bytesToRead, this.bufferedByteLength);
        if (resultLength <= 0)
            return new Uint8Array();
        const firstChunk = this.consumeChunk(resultLength);
        if (firstChunk.byteLength === resultLength) {
            // If the data consumed from the first chunk contains all we need, return
            // it as-is. This allows to avoid any copy operation.
            return firstChunk;
        }
        // The first chunk does not have all the data we need. We have to copy
        // multiple chunks into a larger buffer
        const result = new Uint8Array(resultLength);
        let resultWriteIndex = 0;
        // Copy the first chunk into the result buffer
        result.set(firstChunk, resultWriteIndex);
        resultWriteIndex += firstChunk.byteLength;
        // Copy more chunks as needed (we use do-while because we *know* we need
        // more than one chunk)
        do {
            const missingLength = resultLength - resultWriteIndex;
            const currentChunk = this.consumeChunk(missingLength);
            result.set(currentChunk, resultWriteIndex);
            resultWriteIndex += currentChunk.byteLength;
        } while (resultWriteIndex < resultLength);
        return result;
    }
    async readUntilBuffered(bytesNeeded) {
        let bytesRead = 0;
        while (bytesRead < bytesNeeded) {
            const next = await this.iterator.next();
            if (next.done) {
                this.isDone = true;
                break;
            }
            else {
                this.chunks.push(next.value);
                bytesRead += next.value.byteLength;
            }
        }
        return bytesRead;
    }
    consumeChunk(bytesToConsume) {
        const firstChunk = this.chunks[0];
        if (bytesToConsume < firstChunk.byteLength) {
            // return a sub-view of the data being read and replace the first chunk
            // with a sub-view that does not contain that data.
            // @NOTE for some reason, subarray() revealed to be 7-8% slower in NodeJS
            // benchmarks.
            // this.chunks[0] = firstChunk.subarray(bytesToConsume)
            // return firstChunk.subarray(0, bytesToConsume)
            this.chunks[0] = new Uint8Array(firstChunk.buffer, firstChunk.byteOffset + bytesToConsume, firstChunk.byteLength - bytesToConsume);
            return new Uint8Array(firstChunk.buffer, firstChunk.byteOffset, bytesToConsume);
        }
        else {
            // First chunk is being read in full, discard it
            this.chunks.shift();
            return firstChunk;
        }
    }
    async close() {
        try {
            if (!this.isDone && this.iterator.return) {
                await this.iterator.return();
            }
        }
        finally {
            this.isDone = true;
            this.chunks.length = 0;
        }
    }
}
//# sourceMappingURL=car.js.map