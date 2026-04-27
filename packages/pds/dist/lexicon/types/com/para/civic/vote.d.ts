/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.civic.vote';
    subject?: string;
    subjectType?: 'cabildeo' | 'policy' | 'matter' | 'governance' | (string & {});
    cabildeo?: string;
    selectedOption?: number;
    signal?: number;
    reason?: string;
    isDirect: boolean;
    delegatedFrom?: string[];
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.vote", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=vote.d.ts.map