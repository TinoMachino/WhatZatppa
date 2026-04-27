"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyCidError = exports.VerifyCidTransform = exports.cborDecode = exports.cborEncode = void 0;
exports.dataToCborBlock = dataToCborBlock;
exports.cidForCbor = cidForCborLegacy;
exports.isValidCid = isValidCid;
exports.cborBytesToRecord = cborBytesToRecord;
exports.verifyCidForBytes = verifyCidForBytes;
exports.sha256RawToCid = sha256RawToCid;
exports.parseCidFromBytes = parseCidFromBytes;
const node_crypto_1 = require("node:crypto");
const node_stream_1 = require("node:stream");
const block_1 = require("multiformats/block");
const sha2_1 = require("multiformats/hashes/sha2");
const lex_cbor_1 = require("@atproto/lex-cbor");
const lex_data_1 = require("@atproto/lex-data");
/**
 * @deprecated Use {@link encode} from `@atproto/lex-cbor` instead.
 */
const cborEncodeLegacy = lex_cbor_1.encode;
exports.cborEncode = cborEncodeLegacy;
/**
 * @deprecated Use {@link decode} from `@atproto/lex-cbor` instead.
 */
const cborDecodeLegacy = lex_cbor_1.decode;
exports.cborDecode = cborDecodeLegacy;
/**
 * @deprecated Use {@link encode} and {@link cidForCbor} from `@atproto/lex-cbor` instead.
 */
async function dataToCborBlock(value) {
    return (0, block_1.encode)({
        value,
        codec: {
            name: 'at-cbor', // Not actually used
            code: lex_data_1.CBOR_DATA_CODEC,
            encode: lex_cbor_1.encode,
        },
        hasher: sha2_1.sha256,
    });
}
/**
 * @deprecated Use {@link cidForLex} from `@atproto/lex-cbor` instead.
 */
async function cidForCborLegacy(data) {
    return (0, lex_data_1.asMultiformatsCID)(await (0, lex_cbor_1.cidForLex)(data));
}
/**
 * @deprecated Use {@link validateCidString} from '@atproto/lex-data' instead.
 */
async function isValidCid(cidStr) {
    // @NOTE we keep the wrapper function to return a Promise (for backward
    // compatibility).
    return (0, lex_data_1.validateCidString)(cidStr);
}
/**
 * @deprecated Use {@link decode} from `@atproto/lex-cbor`, and {@link isTypedLexMap} from `@atproto/lex-data` instead.
 */
function cborBytesToRecord(bytes) {
    const data = (0, lex_cbor_1.decode)(bytes);
    if ((0, lex_data_1.isTypedLexMap)(data))
        return data;
    throw new Error(`Expected record with $type property`);
}
/**
 * @deprecated Use {@link isCidForBytes} from `@atproto/lex-cbor` instead.
 */
async function verifyCidForBytes(cid, bytes) {
    if (!(await (0, lex_data_1.isCidForBytes)(cid, bytes))) {
        throw new Error(`Not a valid CID for bytes (${cid.toString()})`);
    }
}
/**
 * @deprecated Use {@link cidForRawHash} from `@atproto/lex-cbor` instead.
 */
function sha256RawToCid(hash) {
    return (0, lex_data_1.asMultiformatsCID)((0, lex_data_1.cidForRawHash)(hash));
}
/**
 * @deprecated Use {@link decodeCid} from `@atproto/lex-cbor` instead.
 */
function parseCidFromBytes(bytes) {
    return (0, lex_data_1.asMultiformatsCID)((0, lex_data_1.decodeCid)(bytes, { flavor: 'dasl' }));
}
class VerifyCidTransform extends node_stream_1.Transform {
    constructor(cid) {
        const hasher = (0, node_crypto_1.createHash)('sha256');
        super({
            transform(chunk, encoding, callback) {
                hasher.update(chunk);
                callback(null, chunk);
            },
            flush(callback) {
                try {
                    const actual = sha256RawToCid(hasher.digest());
                    if (actual.equals(cid)) {
                        return callback();
                    }
                    else {
                        return callback(new VerifyCidError(cid, actual));
                    }
                }
                catch (err) {
                    return callback(asError(err));
                }
            },
        });
        Object.defineProperty(this, "cid", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: cid
        });
    }
}
exports.VerifyCidTransform = VerifyCidTransform;
const asError = (err) => err instanceof Error ? err : new Error('Unexpected error', { cause: err });
class VerifyCidError extends Error {
    constructor(expected, actual) {
        super('Bad cid check');
        Object.defineProperty(this, "expected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: expected
        });
        Object.defineProperty(this, "actual", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: actual
        });
    }
}
exports.VerifyCidError = VerifyCidError;
//# sourceMappingURL=ipld.js.map