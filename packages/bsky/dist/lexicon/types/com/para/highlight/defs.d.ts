/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { CID } from 'multiformats/cid';
export interface HighlightView {
    $type?: 'com.para.highlight.defs#highlightView';
    uri: string;
    cid: CID;
    creator: string;
    indexedAt: string;
    subjectUri: string;
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
}
export declare function isHighlightView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.highlight.defs", "highlightView">;
export declare function validateHighlightView<V>(v: V): ValidationResult<HighlightView & V>;
//# sourceMappingURL=defs.d.ts.map