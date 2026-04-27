import { BlobRef, Cid, LexMap, LexValue } from '@atproto/lex-data';
import { JsonValue } from './json.js';
export type SpecialJsonObjectOptions = {
    /**
     * When true, objects that contain a `$link`, `$bytes`, or `$type` property
     * but do not conform to the expected structure of those special objects will
     * be rejected. When false (default), such objects will be treated as plain
     * JSON objects without special parsing.
     *
     * @default false
     */
    strict?: boolean;
};
/**
 * @internal
 */
export declare function encodeSpecialJsonObject(input: LexValue): JsonValue | void;
/**
 * @internal
 */
export declare function parseSpecialJsonObject(input: LexMap, options?: SpecialJsonObjectOptions): Cid | Uint8Array | BlobRef | void;
//# sourceMappingURL=special-objects.d.ts.map