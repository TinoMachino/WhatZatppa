"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NsidMap = void 0;
const syntax_1 = require("@atproto/syntax");
/**
 * A Map implementation that maps keys of type K to an internal representation I.
 *
 * Key identity is determined by the {@link Object.is} comparison of the
 * encoded keys. This is useful for complex key types that can be serialized
 * to a unique primitive representation (typically strings).
 *
 * @typeParam K - The external key type
 * @typeParam V - The value type stored in the map
 * @typeParam I - The internal encoded key type used for identity comparison
 */
class MappedMap {
    encodeKey;
    decodeKey;
    map = new Map();
    /**
     * Creates a new MappedMap with custom key encoding/decoding functions.
     *
     * @param encodeKey - Function to convert external keys to internal representation
     * @param decodeKey - Function to convert internal representation back to external keys
     */
    constructor(encodeKey, decodeKey) {
        this.encodeKey = encodeKey;
        this.decodeKey = decodeKey;
    }
    get size() {
        return this.map.size;
    }
    clear() {
        this.map.clear();
    }
    set(key, value) {
        this.map.set(this.encodeKey(key), value);
        return this;
    }
    get(key) {
        return this.map.get(this.encodeKey(key));
    }
    has(key) {
        return this.map.has(this.encodeKey(key));
    }
    delete(key) {
        return this.map.delete(this.encodeKey(key));
    }
    values() {
        return this.map.values();
    }
    *keys() {
        for (const key of this.map.keys()) {
            yield this.decodeKey(key);
        }
    }
    *entries() {
        for (const [key, value] of this.map.entries()) {
            yield [this.decodeKey(key), value];
        }
    }
    forEach(callbackfn, thisArg) {
        for (const [key, value] of this) {
            callbackfn.call(thisArg, value, key, this);
        }
    }
    [Symbol.iterator]() {
        return this.entries();
    }
    [Symbol.toStringTag] = 'MappedMap';
}
/**
 * A Map specialized for using NSID (Namespaced Identifier) values as keys.
 *
 * NSIDs are compared by their string representation, allowing different
 * NSID object instances with the same value to be treated as the same key.
 *
 * @typeParam T - The value type stored in the map
 *
 * @example
 * ```typescript
 * import { NsidMap } from '@atproto/lex-installer'
 * import { NSID } from '@atproto/syntax'
 * import { LexiconDocument } from '@atproto/lex-document'
 *
 * const lexicons = new NsidMap<LexiconDocument>()
 *
 * // Store lexicon documents by NSID
 * lexicons.set(NSID.from('app.bsky.feed.post'), postLexicon)
 * lexicons.set(NSID.from('app.bsky.actor.profile'), profileLexicon)
 *
 * // Retrieve by NSID (different object instance works)
 * const doc = lexicons.get(NSID.from('app.bsky.feed.post'))
 *
 * // Iterate over entries
 * for (const [nsid, lexicon] of lexicons) {
 *   console.log(`${nsid}: ${lexicon.description}`)
 * }
 * ```
 */
class NsidMap extends MappedMap {
    /**
     * Creates a new empty NsidMap.
     */
    constructor() {
        super((key) => key.toString(), (enc) => syntax_1.NSID.from(enc));
    }
}
exports.NsidMap = NsidMap;
//# sourceMappingURL=nsid-map.js.map