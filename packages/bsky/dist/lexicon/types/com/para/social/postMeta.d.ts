/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.social.postMeta';
    post: string;
    postType: 'policy' | 'matter' | 'meme';
    official: boolean;
    party?: string;
    community?: string;
    category?: string;
    tags?: string[];
    flairs?: string[];
    voteScore: number;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.social.postMeta", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=postMeta.d.ts.map