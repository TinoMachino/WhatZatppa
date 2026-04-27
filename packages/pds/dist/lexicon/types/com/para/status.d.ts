/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.status';
    /** User's public status message. */
    status: string;
    /** Optional political party affiliation. */
    party?: string;
    /** Optional primary community label. */
    community?: string;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../util").$TypedObject<V, "com.para.status", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=status.d.ts.map