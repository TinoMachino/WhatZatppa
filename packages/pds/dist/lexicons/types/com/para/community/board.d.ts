/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Main {
    $type: 'com.para.community.board';
    name: string;
    description?: string;
    /** Spatial mapping token indicating the nonant or 25th block. */
    quadrant: string;
    /** Reference to the 270-member bounded bsky group chat. */
    delegatesChatId: string;
    /** Reference to the 30-member bounded public-view bsky group chat. */
    subdelegatesChatId: string;
    /** The lifecycle status of the community. */
    status: 'draft' | 'active' | (string & {});
    /** Reference to the starter pack used to track the founding member quorum. */
    founderStarterPackUri?: string;
    createdAt: string;
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.board", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=board.d.ts.map