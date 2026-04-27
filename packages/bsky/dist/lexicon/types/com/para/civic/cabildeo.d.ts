/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.civic.cabildeo';
    title: string;
    description: string;
    community: string;
    communities?: string[];
    flairs?: string[];
    region?: string;
    geoRestricted?: boolean;
    options: CabildeoOption[];
    minQuorum?: number;
    phase: 'draft' | 'open' | 'deliberating' | 'voting' | 'resolved' | (string & {});
    phaseDeadline?: string;
    createdAt?: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.cabildeo", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
export interface CabildeoOption {
    $type?: 'com.para.civic.cabildeo#cabildeoOption';
    label: string;
    description?: string;
}
export declare function isCabildeoOption<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.civic.cabildeo", "cabildeoOption">;
export declare function validateCabildeoOption<V>(v: V): ValidationResult<CabildeoOption & V>;
//# sourceMappingURL=cabildeo.d.ts.map