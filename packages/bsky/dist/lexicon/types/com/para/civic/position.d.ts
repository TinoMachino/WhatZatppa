/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.civic.position';
    cabildeo: string;
    stance: 'for' | 'against' | 'amendment' | (string & {});
    optionIndex?: number;
    text: string;
    compassQuadrant?: string;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.position", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=position.d.ts.map