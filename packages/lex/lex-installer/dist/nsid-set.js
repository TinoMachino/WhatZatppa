"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsidSet = exports.MappedSet = void 0;
const syntax_1 = require("@atproto/syntax");
/**
 * A Set implementation that maps values of type K to an internal representation I.
 *
 * Value identity is determined by the {@link Object.is} comparison of the
 * encoded values. This is useful for complex types that can be serialized
 * to a unique primitive representation (typically strings).
 *
 * @typeParam K - The external value type stored in the set
 * @typeParam I - The internal encoded type used for identity comparison
 */
class MappedSet {
    encodeValue;
    decodeValue;
    set = new Set();
    /**
     * Creates a new MappedSet with custom encoding/decoding functions.
     *
     * @param encodeValue - Function to convert external values to internal representation
     * @param decodeValue - Function to convert internal representation back to external values
     */
    constructor(encodeValue, decodeValue) {
        this.encodeValue = encodeValue;
        this.decodeValue = decodeValue;
    }
    get size() {
        return this.set.size;
    }
    clear() {
        this.set.clear();
    }
    add(val) {
        this.set.add(this.encodeValue(val));
        return this;
    }
    has(val) {
        return this.set.has(this.encodeValue(val));
    }
    delete(val) {
        return this.set.delete(this.encodeValue(val));
    }
    *values() {
        for (const val of this.set.values()) {
            yield this.decodeValue(val);
        }
    }
    keys() {
        return this.values();
    }
    *entries() {
        for (const val of this)
            yield [val, val];
    }
    forEach(callbackfn, thisArg) {
        for (const val of this) {
            callbackfn.call(thisArg, val, val, this);
        }
    }
    [Symbol.iterator]() {
        return this.values();
    }
    [Symbol.toStringTag] = 'MappedSet';
}
exports.MappedSet = MappedSet;
/**
 * A Set specialized for storing NSID (Namespaced Identifier) values.
 *
 * NSIDs are compared by their string representation, allowing different
 * NSID object instances with the same value to be treated as equal.
 *
 * @example
 * ```typescript
 * import { NsidSet } from '@atproto/lex-installer'
 * import { NSID } from '@atproto/syntax'
 *
 * const nsidSet = new NsidSet()
 *
 * nsidSet.add(NSID.from('app.bsky.feed.post'))
 * nsidSet.add(NSID.from('app.bsky.actor.profile'))
 *
 * // Check membership
 * nsidSet.has(NSID.from('app.bsky.feed.post')) // true
 *
 * // Iterate over NSIDs
 * for (const nsid of nsidSet) {
 *   console.log(nsid.toString())
 * }
 * ```
 */
class NsidSet extends MappedSet {
    /**
     * Creates a new empty NsidSet.
     */
    constructor() {
        super((val) => val.toString(), (enc) => syntax_1.NSID.from(enc));
    }
}
exports.NsidSet = NsidSet;
//# sourceMappingURL=nsid-set.js.map