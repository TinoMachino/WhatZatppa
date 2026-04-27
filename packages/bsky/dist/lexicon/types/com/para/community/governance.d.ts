/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as ComParaCommunityDefs from './defs.js';
export interface Main {
    $type: 'com.para.community.governance';
    community: string;
    communityId?: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    moderators: ComParaCommunityDefs.ModeratorView[];
    officials: ComParaCommunityDefs.OfficialView[];
    deputies: ComParaCommunityDefs.DeputyRoleView[];
    metadata?: ComParaCommunityDefs.Metadata;
    editHistory?: ComParaCommunityDefs.HistoryEntry[];
    [k: string]: unknown;
}
export declare function isMain<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.governance", "main">;
export declare function validateMain<V>(v: V): ValidationResult<Main & V>;
export { type Main as Record, isMain as isRecord, validateMain as validateRecord, };
//# sourceMappingURL=governance.d.ts.map