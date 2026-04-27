import { l } from '@atproto/lex';
declare const $nsid = "com.para.highlight.defs";
export { $nsid };
type HighlightView = {
    $type?: 'com.para.highlight.defs#highlightView';
    uri: l.AtUriString;
    cid: l.Cid;
    creator: l.DidString;
    indexedAt: l.DatetimeString;
    subjectUri: l.AtUriString;
    subjectCid?: string;
    text: string;
    start: number;
    end: number;
    color: string;
    tag?: string;
    community?: string;
    state?: string;
    party?: string;
    visibility: 'public' | 'private' | l.UnknownString;
    createdAt: l.DatetimeString;
};
export type { HighlightView };
declare const highlightView: l.TypedObjectSchema<"com.para.highlight.defs#highlightView", l.Validator<HighlightView, HighlightView>>;
export { highlightView };
//# sourceMappingURL=defs.defs.d.ts.map