/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.highlight.annotation';
    subjectUri: string;
    /** Optional CID of the highlighted record at creation time. */
    subjectCid?: string;
    text: string;
    start: number;
    end: number;
    color: string;
    tag?: string;
    community?: string;
    state?: string;
    party?: string;
    visibility: 'public' | 'private' | (string & {});
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.highlight.annotation", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=annotation.d.ts.map