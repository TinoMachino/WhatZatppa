"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isActivitySubscriptionEnabled = exports.safeTakedownRef = exports.split = exports.urisByCollection = exports.parseDate = exports.parseCid = exports.parseString = exports.parseJsonBytes = exports.mergeManyMaps = exports.mergeNestedMaps = exports.mergeMaps = exports.HydrationMap = void 0;
exports.parseRecord = parseRecord;
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const PARSE_OPTIONS = {
    strict: false,
};
class HydrationMap extends Map {
    merge(map) {
        for (const [key, val] of map) {
            this.set(key, val);
        }
        return this;
    }
}
exports.HydrationMap = HydrationMap;
const mergeMaps = (mapA, mapB) => {
    if (!mapA)
        return mapB;
    if (!mapB)
        return mapA;
    return mapA.merge(mapB);
};
exports.mergeMaps = mergeMaps;
const mergeNestedMaps = (mapA, mapB) => {
    if (!mapA)
        return mapB;
    if (!mapB)
        return mapA;
    for (const [key, map] of mapB) {
        const merged = (0, exports.mergeMaps)(mapA.get(key) ?? undefined, map ?? undefined);
        mapA.set(key, merged ?? null);
    }
    return mapA;
};
exports.mergeNestedMaps = mergeNestedMaps;
const mergeManyMaps = (...maps) => {
    return maps.reduce(exports.mergeMaps, undefined);
};
exports.mergeManyMaps = mergeManyMaps;
function parseRecord(recordSchema, recordEntry, includeTakedowns) {
    if (!includeTakedowns && recordEntry.takenDown) {
        return undefined;
    }
    const cid = recordEntry.cid;
    if (!cid) {
        return undefined;
    }
    if (recordEntry.record.byteLength === 0) {
        return undefined;
    }
    const record = (0, lex_1.lexParseJsonBytes)(recordEntry.record, PARSE_OPTIONS);
    if (!record) {
        return undefined;
    }
    // @NOTE We cannot use parse mode here. We must return the original to ensure
    // that the caller gets the same data as what is stored in the PDS (in case of
    // records). This is important because the receiver of the data should be able
    // to compute the right record CID.
    if (!recordSchema.$matches(record, PARSE_OPTIONS)) {
        return undefined;
    }
    return {
        record,
        cid,
        sortedAt: (0, exports.parseDate)(recordEntry.sortedAt) ?? new Date(0),
        indexedAt: (0, exports.parseDate)(recordEntry.indexedAt) ?? new Date(0),
        takedownRef: (0, exports.safeTakedownRef)(recordEntry),
    };
}
/**
 * Decodes binary data containing a JSON representation of a Lex value, and
 * validates it against the provided schema, in parse mode (i.e., allowing
 * coercion & defaults).
 *
 * Returns undefined if the input is empty (from dataplane's empty value
 * convention), or if the validation fails.
 */
const parseJsonBytes = (schema, bytes) => {
    if (!bytes || bytes.byteLength === 0)
        return undefined;
    const value = (0, lex_1.lexParseJsonBytes)(bytes, PARSE_OPTIONS);
    const result = schema.safeParse(value, PARSE_OPTIONS);
    return result.success ? result.value : undefined;
};
exports.parseJsonBytes = parseJsonBytes;
const parseString = (str) => {
    return str ? str : undefined;
};
exports.parseString = parseString;
const parseCid = (cidStr) => {
    if (!cidStr)
        return null;
    return (0, lex_1.parseCidSafe)(cidStr);
};
exports.parseCid = parseCid;
const parseDate = (timestamp) => {
    if (!timestamp)
        return undefined;
    const date = timestamp.toDate();
    // Check for year 1 (0001-01-01 00:00:00 UTC) which is -62135596800000ms from epoch.
    // The Go dataplane gives us those values as they come from the Go zero-value for dates.
    if (date.getTime() === -62135596800000)
        return undefined;
    return date;
};
exports.parseDate = parseDate;
const urisByCollection = (uris) => {
    const result = new Map();
    for (const uri of uris) {
        const collection = new syntax_1.AtUri(uri).collection;
        const items = result.get(collection) ?? [];
        items.push(uri);
        result.set(collection, items);
    }
    return result;
};
exports.urisByCollection = urisByCollection;
const split = (items, predicate) => {
    const yes = [];
    const no = [];
    for (const item of items) {
        if (predicate(item)) {
            yes.push(item);
        }
        else {
            no.push(item);
        }
    }
    return [yes, no];
};
exports.split = split;
const safeTakedownRef = (obj) => {
    if (!obj)
        return;
    if (obj.takedownRef)
        return obj.takedownRef;
    if (obj.takenDown)
        return 'BSKY-TAKEDOWN-UNKNOWN';
};
exports.safeTakedownRef = safeTakedownRef;
const isActivitySubscriptionEnabled = ({ post, reply, }) => post || reply;
exports.isActivitySubscriptionEnabled = isActivitySubscriptionEnabled;
//# sourceMappingURL=util.js.map