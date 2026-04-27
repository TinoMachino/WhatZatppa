"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CidSet = void 0;
const lex_data_1 = require("@atproto/lex-data");
class CidSet {
    constructor(arr = []) {
        Object.defineProperty(this, "set", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        const strArr = arr.map((c) => c.toString());
        this.set = new Set(strArr);
    }
    add(cid) {
        this.set.add(cid.toString());
        return this;
    }
    addSet(toMerge) {
        for (const c of toMerge.set)
            this.set.add(c);
        return this;
    }
    subtractSet(toSubtract) {
        for (const c of toSubtract.set)
            this.set.delete(c);
        return this;
    }
    delete(cid) {
        this.set.delete(cid.toString());
        return this;
    }
    has(cid) {
        return this.set.has(cid.toString());
    }
    size() {
        return this.set.size;
    }
    clear() {
        this.set.clear();
        return this;
    }
    toList() {
        return Array.from(this);
    }
    *[Symbol.iterator]() {
        for (const c of this.set) {
            yield (0, lex_data_1.parseCid)(c);
        }
    }
}
exports.CidSet = CidSet;
exports.default = CidSet;
//# sourceMappingURL=cid-set.js.map