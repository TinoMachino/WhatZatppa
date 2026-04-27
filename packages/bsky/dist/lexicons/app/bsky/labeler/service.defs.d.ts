import { l } from '@atproto/lex';
import * as LabelerDefs from './defs.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
import * as ModerationDefs from '../../../com/atproto/moderation/defs.defs.js';
declare const $nsid = "app.bsky.labeler.service";
export { $nsid };
/** A declaration of the existence of labeler service. */
type Main = {
    $type: 'app.bsky.labeler.service';
    policies: LabelerDefs.LabelerPolicies;
    labels?: l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject;
    createdAt: l.DatetimeString;
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
export type { Main };
/** A declaration of the existence of labeler service. */
declare const main: l.RecordSchema<"literal:self", "app.bsky.labeler.service", l.Validator<Omit<Main, "$type">, Omit<Main, "$type">>>;
export { main };
export declare const $isTypeOf: <TValue extends {
    $type?: unknown;
}>(value: TValue) => value is l.TypedRecord<"app.bsky.labeler.service", TValue>, $build: {
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        policies: LabelerDefs.LabelerPolicies;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        reasonTypes?: ModerationDefs.ReasonType[]
        /**
         * The set of subject types (account, record, etc) this service accepts reports on.
         */
         | undefined;
        subjectTypes?: ModerationDefs.SubjectType[]
        /**
         * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
         */
         | undefined;
        subjectCollections?: l.NsidString[] | undefined;
        $type: "app.bsky.labeler.service";
    };
    (input: Omit<Omit<Main, "$type">, "$type">): {
        createdAt: l.DatetimeString;
        policies: LabelerDefs.LabelerPolicies;
        labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
        reasonTypes?: ModerationDefs.ReasonType[]
        /**
         * The set of subject types (account, record, etc) this service accepts reports on.
         */
         | undefined;
        subjectTypes?: ModerationDefs.SubjectType[]
        /**
         * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
         */
         | undefined;
        subjectCollections?: l.NsidString[] | undefined;
        $type: "app.bsky.labeler.service";
    };
}, $type: "app.bsky.labeler.service";
export declare const $assert: (input: unknown, options?: l.ValidateOptions) => asserts input is {
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}, $check: (input: unknown, options?: l.ValidateOptions) => void, $cast: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}, $ifMatches: <I>(input: I, options?: l.ValidateOptions) => (I & {
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}) | undefined, $matches: <I>(input: I, options?: l.ValidateOptions) => input is I & {
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}, $parse: (input: unknown, options?: l.ParseOptions) => {
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}, $safeParse: (input: unknown, options?: l.ParseOptions) => l.ValidationResult<{
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}>, $validate: <I>(input: I, options?: l.ValidateOptions) => I & {
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}, $safeValidate: <I>(input: I, options?: l.ValidateOptions) => l.ValidationResult<I & {
    createdAt: l.DatetimeString;
    policies: LabelerDefs.LabelerPolicies;
    labels?: (l.$Typed<LabelDefs.SelfLabels> | l.Unknown$TypedObject) | undefined;
    reasonTypes?: ModerationDefs.ReasonType[]
    /**
     * The set of subject types (account, record, etc) this service accepts reports on.
     */
     | undefined;
    subjectTypes?: ModerationDefs.SubjectType[]
    /**
     * Set of record types (collection NSIDs) which can be reported to this service. If not defined (distinct from empty array), default is any record type.
     */
     | undefined;
    subjectCollections?: l.NsidString[] | undefined;
    $type: "app.bsky.labeler.service";
}>;
//# sourceMappingURL=service.defs.d.ts.map