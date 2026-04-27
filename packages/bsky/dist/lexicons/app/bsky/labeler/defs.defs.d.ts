import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as ModerationDefs from '../../../com/atproto/moderation/defs.defs.js';
declare const $nsid = "app.bsky.labeler.defs";
export { $nsid };
type LabelerView = {
    $type?: 'app.bsky.labeler.defs#labelerView';
    uri: l.AtUriString;
    cid: l.CidString;
    creator: ActorDefs.ProfileView;
    likeCount?: number;
    viewer?: LabelerViewerState;
    indexedAt: l.DatetimeString;
    labels?: LabelDefs.Label[];
};
export type { LabelerView };
declare const labelerView: l.TypedObjectSchema<"app.bsky.labeler.defs#labelerView", l.Validator<LabelerView, LabelerView>>;
export { labelerView };
type LabelerViewDetailed = {
    $type?: 'app.bsky.labeler.defs#labelerViewDetailed';
    uri: l.AtUriString;
    cid: l.CidString;
    creator: ActorDefs.ProfileView;
    policies: LabelerPolicies;
    likeCount?: number;
    viewer?: LabelerViewerState;
    indexedAt: l.DatetimeString;
    labels?: LabelDefs.Label[];
    /**
     * The set of report reason 'codes' which are in-scope for this service to review and action. These usually align to policy categories. If not defined (distinct from empty array), all reason types are allowed.
     */
    reasonTypes?: ModerationDefs.ReasonType[];
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
    subjectTypes?: ModerationDefs.SubjectType[];
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
    subjectCollections?: l.NsidString[];
};
export type { LabelerViewDetailed };
declare const labelerViewDetailed: l.TypedObjectSchema<"app.bsky.labeler.defs#labelerViewDetailed", l.Validator<LabelerViewDetailed, LabelerViewDetailed>>;
export { labelerViewDetailed };
type LabelerViewerState = {
    $type?: 'app.bsky.labeler.defs#labelerViewerState';
    like?: l.AtUriString;
};
export type { LabelerViewerState };
declare const labelerViewerState: l.TypedObjectSchema<"app.bsky.labeler.defs#labelerViewerState", l.Validator<LabelerViewerState, LabelerViewerState>>;
export { labelerViewerState };
type LabelerPolicies = {
    $type?: 'app.bsky.labeler.defs#labelerPolicies';
    /**
     * The label values which this labeler publishes. May include global or custom labels.
     */
    labelValues: LabelDefs.LabelValue[];
    /**
     * Label values created by this labeler and scoped exclusively to it. Labels defined here will override global label definitions for this labeler.
     */
    labelValueDefinitions?: LabelDefs.LabelValueDefinition[];
};
export type { LabelerPolicies };
declare const labelerPolicies: l.TypedObjectSchema<"app.bsky.labeler.defs#labelerPolicies", l.Validator<LabelerPolicies, LabelerPolicies>>;
export { labelerPolicies };
//# sourceMappingURL=defs.defs.d.ts.map