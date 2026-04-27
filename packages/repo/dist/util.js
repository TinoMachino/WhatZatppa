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
exports.ensureV3Commit = exports.cidForRecord = exports.cborToLexRecord = exports.cborToLex = exports.verifyCommitSig = exports.signCommit = exports.metaEqual = exports.formatDataKey = exports.parseDataKey = exports.ensureCreates = exports.diffToWriteDescripts = void 0;
exports.concatBytesAsync = concatBytesAsync;
exports.concatBytes = concatBytes;
const common_web_1 = require("@atproto/common-web");
const crypto = __importStar(require("@atproto/crypto"));
const cbor = __importStar(require("@atproto/lex-cbor"));
const lex_data_1 = require("@atproto/lex-data");
const types_1 = require("./types");
const diffToWriteDescripts = (diff) => {
    return Promise.all([
        ...diff.addList().map(async (add) => {
            const { collection, rkey } = (0, exports.parseDataKey)(add.key);
            return {
                action: types_1.WriteOpAction.Create,
                collection,
                rkey,
                cid: add.cid,
            };
        }),
        ...diff.updateList().map(async (upd) => {
            const { collection, rkey } = (0, exports.parseDataKey)(upd.key);
            return {
                action: types_1.WriteOpAction.Update,
                collection,
                rkey,
                cid: upd.cid,
                prev: upd.prev,
            };
        }),
        ...diff.deleteList().map((del) => {
            const { collection, rkey } = (0, exports.parseDataKey)(del.key);
            return {
                action: types_1.WriteOpAction.Delete,
                collection,
                rkey,
                cid: del.cid,
            };
        }),
    ]);
};
exports.diffToWriteDescripts = diffToWriteDescripts;
const ensureCreates = (descripts) => {
    const creates = [];
    for (const descript of descripts) {
        if (descript.action !== types_1.WriteOpAction.Create) {
            throw new Error(`Unexpected action: ${descript.action}`);
        }
        else {
            creates.push(descript);
        }
    }
    return creates;
};
exports.ensureCreates = ensureCreates;
const parseDataKey = (key) => {
    const { length, 0: collection, 1: rkey } = key.split('/');
    if (length !== 2)
        throw new Error(`Invalid record key: ${key}`);
    return { collection, rkey };
};
exports.parseDataKey = parseDataKey;
const formatDataKey = (collection, rkey) => {
    return collection + '/' + rkey;
};
exports.formatDataKey = formatDataKey;
const metaEqual = (a, b) => {
    return a.did === b.did && a.version === b.version;
};
exports.metaEqual = metaEqual;
const signCommit = async (unsigned, keypair) => {
    const encoded = cbor.encode(unsigned);
    const sig = await keypair.sign(encoded);
    return {
        ...unsigned,
        sig,
    };
};
exports.signCommit = signCommit;
const verifyCommitSig = async (commit, didKey) => {
    const { sig, ...rest } = commit;
    const encoded = cbor.encode(rest);
    return crypto.verifySignature(didKey, encoded, sig);
};
exports.verifyCommitSig = verifyCommitSig;
exports.cborToLex = cbor.decode;
const cborToLexRecord = (val) => {
    const parsed = (0, exports.cborToLex)(val);
    if (!(0, lex_data_1.isPlainObject)(parsed)) {
        throw new Error('lexicon records be a json object');
    }
    return parsed;
};
exports.cborToLexRecord = cborToLexRecord;
exports.cidForRecord = cbor.cidForLex;
const ensureV3Commit = (commit) => {
    if (commit.version === 3) {
        return commit;
    }
    else {
        return {
            ...commit,
            version: 3,
            rev: commit.rev ?? common_web_1.TID.nextStr(),
        };
    }
};
exports.ensureV3Commit = ensureV3Commit;
async function concatBytesAsync(iterable) {
    const chunks = [];
    for await (const chunk of iterable)
        chunks.push(chunk);
    return concatBytes(chunks);
}
/**
 * This is the same as {@link Buffer.concat}, without the `totalLength` argument.
 */
function concatBytes(chunks) {
    let totalLength = 0;
    for (const chunk of chunks)
        totalLength += chunk.byteLength;
    const result = new Uint8Array(totalLength);
    let offset = 0;
    for (const chunk of chunks) {
        result.set(chunk, offset);
        offset += chunk.byteLength;
    }
    return result;
}
//# sourceMappingURL=util.js.map