/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.civic.vote';
    /** The proposal, policy, matter, or cabildeo record being voted on. */
    subject?: string;
    /** Optional semantic type for clients and indexers. */
    subjectType?: 'cabildeo' | 'policy' | 'matter' | 'governance' | (string & {});
    cabildeo?: string;
    selectedOption?: number;
    /** Weighted consensus signal for policy-style votes: -3 strong opposition, 0 neutral/abstain, +3 strong support. */
    signal?: number;
    /** Optional voter rationale for the signal. */
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