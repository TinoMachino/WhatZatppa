/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.civic.delegation';
    cabildeo?: string;
    delegateTo: string;
    scopeFlairs?: string[];
    reason?: string;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.delegation", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=delegation.d.ts.map