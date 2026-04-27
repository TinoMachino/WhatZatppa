"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockMap = void 0;
const lex_cbor_1 = require("@atproto/lex-cbor");
const lex_data_1 = require("@atproto/lex-data");
class BlockMap {
    constructor(entries) {
        Object.defineProperty(this, "map", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        if (entries) {
            for (const [cid, bytes] of entries) {
                this.set(cid, bytes);
            }
        }
    }
    async add(value) {
        const bytes = (0, lex_cbor_1.encode)(value);
        const cid = await (0, lex_data_1.cidForCbor)(bytes);
        this.set(cid, bytes);
        return cid;
    }
    set(cid, bytes) {
        this.map.set(cid.toString(), bytes);
        return this;
    }
    get(cid) {
        return this.map.get(cid.toString());
    }
    delete(cid) {
        this.map.delete(cid.toString());
        return this;
    }
    getMany(cids) {
        const missing = [];
        const blocks = new BlockMap();
        for (const cid of cids) {
            const got = this.map.get(cid.toString());
            if (got) {
                blocks.set(cid, got);
            }
            else {
                missing.push(cid);
            }
        }
        return { blocks, missing };
    }
    has(cid) {
        return this.map.has(cid.toString());
    }
    clear() {
        this.map.clear();
    }
    forEach(cb) {
        for (const [cid, bytes] of this)
            cb(bytes, cid);
    }
    entries() {
        return Array.from(this, toEntry);
    }
    cids() {
        return Array.from(this.keys());
    }
    addMap(toAdd) {
        for (const [cid, bytes] of toAdd)
            this.set(cid, bytes);
        return this;
    }
    get size() {
        return this.map.size;
    }
    get byteSize() {
        let size = 0;
        for (const bytes of this.values())
            size += bytes.length;
        return size;
    }
    equals(other) {
        if (this.size !== other.size) {
            return false;
        }
        for (const [cid, bytes] of this) {
            const otherBytes = other.get(cid);
            if (!otherBytes)
                return false;
            if (!(0, lex_data_1.ui8Equals)(bytes, otherBytes)) {
                return false;
            }
        }
        return true;
    }
    *keys() {
        for (const key of this.map.keys()) {
            yield (0, lex_data_1.parseCid)(key);
        }
    }
    *values() {
        yield* this.map.values();
    }
    *[Symbol.iterator]() {
        for (const [key, value] of this.map) {
            yield [(0, lex_data_1.parseCid)(key), value];
        }
    }
}
exports.BlockMap = BlockMap;
function toEntry([cid, bytes]) {
    return { cid, bytes };
}
exports.default = BlockMap;
//# sourceMappingURL=block-map.js.map