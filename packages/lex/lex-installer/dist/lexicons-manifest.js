"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexiconsManifestSchema = void 0;
exports.normalizeLexiconsManifest = normalizeLexiconsManifest;
const lex_schema_1 = require("@atproto/lex-schema");
/**
 * Schema for validating and parsing lexicons manifest files.
 *
 * The manifest tracks which lexicons are installed and how they were resolved.
 * This schema ensures the manifest file conforms to the expected structure.
 */
exports.lexiconsManifestSchema = lex_schema_1.l.object({
    /** Schema version, currently always 1 */
    version: lex_schema_1.l.literal(1),
    /** Array of NSID strings for directly requested lexicons */
    lexicons: lex_schema_1.l.array(lex_schema_1.l.string({ format: 'nsid' })),
    /** Map of NSID to resolution info (AT URI and CID) for all installed lexicons */
    resolutions: lex_schema_1.l.dict(lex_schema_1.l.string({ format: 'nsid' }), lex_schema_1.l.object({
        /** AT URI where the lexicon was fetched from */
        uri: lex_schema_1.l.string({ format: 'at-uri' }),
        /** Content identifier (CID) of the lexicon document */
        cid: lex_schema_1.l.string({ format: 'cid' }),
    })),
});
/**
 * Normalizes a lexicons manifest for consistent storage and comparison.
 *
 * This function:
 * - Sorts the `lexicons` array alphabetically
 * - Sorts the `resolutions` object entries by key
 * - Validates the result against the schema
 *
 * Normalization ensures that manifests with the same content produce identical
 * JSON output, making them suitable for version control and comparison.
 *
 * @param manifest - The manifest to normalize
 * @returns A new normalized manifest object
 */
function normalizeLexiconsManifest(manifest) {
    const normalized = {
        version: manifest.version,
        lexicons: [...manifest.lexicons].sort(),
        resolutions: Object.fromEntries(Object.entries(manifest.resolutions)
            .sort(compareObjectEntriesFn)
            .map(([k, { uri, cid }]) => [k, { uri, cid }])),
    };
    // For good measure:
    return exports.lexiconsManifestSchema.parse(normalized);
}
function compareObjectEntriesFn(a, b) {
    return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
}
//# sourceMappingURL=lexicons-manifest.js.map