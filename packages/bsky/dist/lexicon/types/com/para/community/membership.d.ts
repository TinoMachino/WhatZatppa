/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.community.membership';
    /** Reference to the community board record. */
    community: string;
    membershipState: 'pending' | 'active' | 'left' | 'removed' | 'blocked' | (string & {});
    roles?: string[];
    source?: string;
    joinedAt: string;
    leftAt?: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.membership", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=membership.d.ts.map