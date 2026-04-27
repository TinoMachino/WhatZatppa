import { l } from '@atproto/lex';
import * as AdminDefs from '../../../com/atproto/admin/defs.defs.js';
import * as RepoStrongRef from '../../../com/atproto/repo/strongRef.defs.js';
import * as ConvoDefs from '../../../chat/bsky/convo/defs.defs.js';
import * as ModerationDefs from '../../../com/atproto/moderation/defs.defs.js';
import * as AgeassuranceDefs from '../../../app/bsky/ageassurance/defs.defs.js';
import * as ServerDefs from '../../../com/atproto/server/defs.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
declare const $nsid = "tools.ozone.moderation.defs";
export { $nsid };
type ModEventView = {
    $type?: 'tools.ozone.moderation.defs#modEventView';
    id: number;
    event: l.$Typed<ModEventTakedown> | l.$Typed<ModEventReverseTakedown> | l.$Typed<ModEventComment> | l.$Typed<ModEventReport> | l.$Typed<ModEventLabel> | l.$Typed<ModEventAcknowledge> | l.$Typed<ModEventEscalate> | l.$Typed<ModEventMute> | l.$Typed<ModEventUnmute> | l.$Typed<ModEventMuteReporter> | l.$Typed<ModEventUnmuteReporter> | l.$Typed<ModEventEmail> | l.$Typed<ModEventResolveAppeal> | l.$Typed<ModEventDivert> | l.$Typed<ModEventTag> | l.$Typed<AccountEvent> | l.$Typed<IdentityEvent> | l.$Typed<RecordEvent> | l.$Typed<ModEventPriorityScore> | l.$Typed<AgeAssuranceEvent> | l.$Typed<AgeAssuranceOverrideEvent> | l.$Typed<AgeAssurancePurgeEvent> | l.$Typed<RevokeAccountCredentialsEvent> | l.$Typed<ScheduleTakedownEvent> | l.$Typed<CancelScheduledTakedownEvent> | l.Unknown$TypedObject;
    subject: l.$Typed<AdminDefs.RepoRef> | l.$Typed<RepoStrongRef.Main> | l.$Typed<ConvoDefs.MessageRef> | l.Unknown$TypedObject;
    subjectBlobCids: string[];
    createdBy: l.DidString;
    createdAt: l.DatetimeString;
    creatorHandle?: string;
    subjectHandle?: string;
    modTool?: ModTool;
};
export type { ModEventView };
declare const modEventView: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventView", l.Validator<ModEventView, ModEventView>>;
export { modEventView };
type ModEventViewDetail = {
    $type?: 'tools.ozone.moderation.defs#modEventViewDetail';
    id: number;
    event: l.$Typed<ModEventTakedown> | l.$Typed<ModEventReverseTakedown> | l.$Typed<ModEventComment> | l.$Typed<ModEventReport> | l.$Typed<ModEventLabel> | l.$Typed<ModEventAcknowledge> | l.$Typed<ModEventEscalate> | l.$Typed<ModEventMute> | l.$Typed<ModEventUnmute> | l.$Typed<ModEventMuteReporter> | l.$Typed<ModEventUnmuteReporter> | l.$Typed<ModEventEmail> | l.$Typed<ModEventResolveAppeal> | l.$Typed<ModEventDivert> | l.$Typed<ModEventTag> | l.$Typed<AccountEvent> | l.$Typed<IdentityEvent> | l.$Typed<RecordEvent> | l.$Typed<ModEventPriorityScore> | l.$Typed<AgeAssuranceEvent> | l.$Typed<AgeAssuranceOverrideEvent> | l.$Typed<AgeAssurancePurgeEvent> | l.$Typed<RevokeAccountCredentialsEvent> | l.$Typed<ScheduleTakedownEvent> | l.$Typed<CancelScheduledTakedownEvent> | l.Unknown$TypedObject;
    subject: l.$Typed<RepoView> | l.$Typed<RepoViewNotFound> | l.$Typed<RecordView> | l.$Typed<RecordViewNotFound> | l.Unknown$TypedObject;
    subjectBlobs: BlobView[];
    createdBy: l.DidString;
    createdAt: l.DatetimeString;
    modTool?: ModTool;
};
export type { ModEventViewDetail };
declare const modEventViewDetail: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventViewDetail", l.Validator<ModEventViewDetail, ModEventViewDetail>>;
export { modEventViewDetail };
type SubjectStatusView = {
    $type?: 'tools.ozone.moderation.defs#subjectStatusView';
    id: number;
    subject: l.$Typed<AdminDefs.RepoRef> | l.$Typed<RepoStrongRef.Main> | l.$Typed<ConvoDefs.MessageRef> | l.Unknown$TypedObject;
    hosting?: l.$Typed<AccountHosting> | l.$Typed<RecordHosting> | l.Unknown$TypedObject;
    subjectBlobCids?: l.CidString[];
    subjectRepoHandle?: string;
    /**
     * Timestamp referencing when the last update was made to the moderation status of the subject
     */
    updatedAt: l.DatetimeString;
    /**
     * Timestamp referencing the first moderation status impacting event was emitted on the subject
     */
    createdAt: l.DatetimeString;
    reviewState: SubjectReviewState;
    /**
     * Sticky comment on the subject.
     */
    comment?: string;
    /**
     * Numeric value representing the level of priority. Higher score means higher priority.
     */
    priorityScore?: number;
    muteUntil?: l.DatetimeString;
    muteReportingUntil?: l.DatetimeString;
    lastReviewedBy?: l.DidString;
    lastReviewedAt?: l.DatetimeString;
    lastReportedAt?: l.DatetimeString;
    /**
     * Timestamp referencing when the author of the subject appealed a moderation action
     */
    lastAppealedAt?: l.DatetimeString;
    takendown?: boolean;
    /**
     * True indicates that the a previously taken moderator action was appealed against, by the author of the content. False indicates last appeal was resolved by moderators.
     */
    appealed?: boolean;
    suspendUntil?: l.DatetimeString;
    tags?: string[];
    /**
     * Statistics related to the account subject
     */
    accountStats?: AccountStats;
    /**
     * Statistics related to the record subjects authored by the subject's account
     */
    recordsStats?: RecordsStats;
    /**
     * Strike information for the account (account-level only)
     */
    accountStrike?: AccountStrike;
    /**
     * Current age assurance state of the subject.
     */
    ageAssuranceState?: 'pending' | 'assured' | 'unknown' | 'reset' | 'blocked' | l.UnknownString;
    /**
     * Whether or not the last successful update to age assurance was made by the user or admin.
     */
    ageAssuranceUpdatedBy?: 'admin' | 'user' | l.UnknownString;
};
export type { SubjectStatusView };
declare const subjectStatusView: l.TypedObjectSchema<"tools.ozone.moderation.defs#subjectStatusView", l.Validator<SubjectStatusView, SubjectStatusView>>;
export { subjectStatusView };
/** Detailed view of a subject. For record subjects, the author's repo and profile will be returned. */
type SubjectView = {
    $type?: 'tools.ozone.moderation.defs#subjectView';
    type: ModerationDefs.SubjectType;
    subject: string;
    status?: SubjectStatusView;
    repo?: RepoViewDetail;
    profile?: l.Unknown$TypedObject;
    record?: RecordViewDetail;
};
export type { SubjectView };
/** Detailed view of a subject. For record subjects, the author's repo and profile will be returned. */
declare const subjectView: l.TypedObjectSchema<"tools.ozone.moderation.defs#subjectView", l.Validator<SubjectView, SubjectView>>;
export { subjectView };
/** Statistics about a particular account subject */
type AccountStats = {
    $type?: 'tools.ozone.moderation.defs#accountStats';
    /**
     * Total number of reports on the account
     */
    reportCount?: number;
    /**
     * Total number of appeals against a moderation action on the account
     */
    appealCount?: number;
    /**
     * Number of times the account was suspended
     */
    suspendCount?: number;
    /**
     * Number of times the account was escalated
     */
    escalateCount?: number;
    /**
     * Number of times the account was taken down
     */
    takedownCount?: number;
};
export type { AccountStats };
/** Statistics about a particular account subject */
declare const accountStats: l.TypedObjectSchema<"tools.ozone.moderation.defs#accountStats", l.Validator<AccountStats, AccountStats>>;
export { accountStats };
/** Statistics about a set of record subject items */
type RecordsStats = {
    $type?: 'tools.ozone.moderation.defs#recordsStats';
    /**
     * Cumulative sum of the number of reports on the items in the set
     */
    totalReports?: number;
    /**
     * Number of items that were reported at least once
     */
    reportedCount?: number;
    /**
     * Number of items that were escalated at least once
     */
    escalatedCount?: number;
    /**
     * Number of items that were appealed at least once
     */
    appealedCount?: number;
    /**
     * Total number of item in the set
     */
    subjectCount?: number;
    /**
     * Number of item currently in "reviewOpen" or "reviewEscalated" state
     */
    pendingCount?: number;
    /**
     * Number of item currently in "reviewNone" or "reviewClosed" state
     */
    processedCount?: number;
    /**
     * Number of item currently taken down
     */
    takendownCount?: number;
};
export type { RecordsStats };
/** Statistics about a set of record subject items */
declare const recordsStats: l.TypedObjectSchema<"tools.ozone.moderation.defs#recordsStats", l.Validator<RecordsStats, RecordsStats>>;
export { recordsStats };
/** Strike information for an account */
type AccountStrike = {
    $type?: 'tools.ozone.moderation.defs#accountStrike';
    /**
     * Current number of active strikes (excluding expired strikes)
     */
    activeStrikeCount?: number;
    /**
     * Total number of strikes ever received (including expired strikes)
     */
    totalStrikeCount?: number;
    /**
     * Timestamp of the first strike received
     */
    firstStrikeAt?: l.DatetimeString;
    /**
     * Timestamp of the most recent strike received
     */
    lastStrikeAt?: l.DatetimeString;
};
export type { AccountStrike };
/** Strike information for an account */
declare const accountStrike: l.TypedObjectSchema<"tools.ozone.moderation.defs#accountStrike", l.Validator<AccountStrike, AccountStrike>>;
export { accountStrike };
type SubjectReviewState = 'tools.ozone.moderation.defs#reviewOpen' | 'tools.ozone.moderation.defs#reviewEscalated' | 'tools.ozone.moderation.defs#reviewClosed' | 'tools.ozone.moderation.defs#reviewNone' | l.UnknownString;
export type { SubjectReviewState };
declare const subjectReviewState: l.StringSchema<{
    knownValues: ["tools.ozone.moderation.defs#reviewOpen", "tools.ozone.moderation.defs#reviewEscalated", "tools.ozone.moderation.defs#reviewClosed", "tools.ozone.moderation.defs#reviewNone"];
}>;
export { subjectReviewState };
/** Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator */
type ReviewOpen = 'tools.ozone.moderation.defs#reviewOpen';
export type { ReviewOpen };
/** Moderator review status of a subject: Open. Indicates that the subject needs to be reviewed by a moderator */
declare const reviewOpen: l.TokenSchema<"tools.ozone.moderation.defs#reviewOpen">;
export { reviewOpen };
/** Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator */
type ReviewEscalated = 'tools.ozone.moderation.defs#reviewEscalated';
export type { ReviewEscalated };
/** Moderator review status of a subject: Escalated. Indicates that the subject was escalated for review by a moderator */
declare const reviewEscalated: l.TokenSchema<"tools.ozone.moderation.defs#reviewEscalated">;
export { reviewEscalated };
/** Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator */
type ReviewClosed = 'tools.ozone.moderation.defs#reviewClosed';
export type { ReviewClosed };
/** Moderator review status of a subject: Closed. Indicates that the subject was already reviewed and resolved by a moderator */
declare const reviewClosed: l.TokenSchema<"tools.ozone.moderation.defs#reviewClosed">;
export { reviewClosed };
/** Moderator review status of a subject: Unnecessary. Indicates that the subject does not need a review at the moment but there is probably some moderation related metadata available for it */
type ReviewNone = 'tools.ozone.moderation.defs#reviewNone';
export type { ReviewNone };
/** Moderator review status of a subject: Unnecessary. Indicates that the subject does not need a review at the moment but there is probably some moderation related metadata available for it */
declare const reviewNone: l.TokenSchema<"tools.ozone.moderation.defs#reviewNone">;
export { reviewNone };
/** Take down a subject permanently or temporarily */
type ModEventTakedown = {
    $type?: 'tools.ozone.moderation.defs#modEventTakedown';
    comment?: string;
    /**
     * Indicates how long the takedown should be in effect before automatically expiring.
     */
    durationInHours?: number;
    /**
     * If true, all other reports on content authored by this account will be resolved (acknowledged).
     */
    acknowledgeAccountSubjects?: boolean;
    /**
     * Names/Keywords of the policies that drove the decision.
     */
    policies?: string[];
    /**
     * Severity level of the violation (e.g., 'sev-0', 'sev-1', 'sev-2', etc.).
     */
    severityLevel?: string;
    /**
     * List of services where the takedown should be applied. If empty or not provided, takedown is applied on all configured services.
     */
    targetServices?: ('appview' | 'pds' | l.UnknownString)[];
    /**
     * Number of strikes to assign to the user for this violation.
     */
    strikeCount?: number;
    /**
     * When the strike should expire. If not provided, the strike never expires.
     */
    strikeExpiresAt?: l.DatetimeString;
};
export type { ModEventTakedown };
/** Take down a subject permanently or temporarily */
declare const modEventTakedown: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventTakedown", l.Validator<ModEventTakedown, ModEventTakedown>>;
export { modEventTakedown };
/** Revert take down action on a subject */
type ModEventReverseTakedown = {
    $type?: 'tools.ozone.moderation.defs#modEventReverseTakedown';
    /**
     * Describe reasoning behind the reversal.
     */
    comment?: string;
    /**
     * Names/Keywords of the policy infraction for which takedown is being reversed.
     */
    policies?: string[];
    /**
     * Severity level of the violation. Usually set from the last policy infraction's severity.
     */
    severityLevel?: string;
    /**
     * Number of strikes to subtract from the user's strike count. Usually set from the last policy infraction's severity.
     */
    strikeCount?: number;
};
export type { ModEventReverseTakedown };
/** Revert take down action on a subject */
declare const modEventReverseTakedown: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventReverseTakedown", l.Validator<ModEventReverseTakedown, ModEventReverseTakedown>>;
export { modEventReverseTakedown };
/** Resolve appeal on a subject */
type ModEventResolveAppeal = {
    $type?: 'tools.ozone.moderation.defs#modEventResolveAppeal';
    /**
     * Describe resolution.
     */
    comment?: string;
};
export type { ModEventResolveAppeal };
/** Resolve appeal on a subject */
declare const modEventResolveAppeal: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventResolveAppeal", l.Validator<ModEventResolveAppeal, ModEventResolveAppeal>>;
export { modEventResolveAppeal };
/** Add a comment to a subject. An empty comment will clear any previously set sticky comment. */
type ModEventComment = {
    $type?: 'tools.ozone.moderation.defs#modEventComment';
    comment?: string;
    /**
     * Make the comment persistent on the subject
     */
    sticky?: boolean;
};
export type { ModEventComment };
/** Add a comment to a subject. An empty comment will clear any previously set sticky comment. */
declare const modEventComment: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventComment", l.Validator<ModEventComment, ModEventComment>>;
export { modEventComment };
/** Report a subject */
type ModEventReport = {
    $type?: 'tools.ozone.moderation.defs#modEventReport';
    comment?: string;
    /**
     * Set to true if the reporter was muted from reporting at the time of the event. These reports won't impact the reviewState of the subject.
     */
    isReporterMuted?: boolean;
    reportType: ModerationDefs.ReasonType;
};
export type { ModEventReport };
/** Report a subject */
declare const modEventReport: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventReport", l.Validator<ModEventReport, ModEventReport>>;
export { modEventReport };
/** Apply/Negate labels on a subject */
type ModEventLabel = {
    $type?: 'tools.ozone.moderation.defs#modEventLabel';
    comment?: string;
    createLabelVals: string[];
    negateLabelVals: string[];
    /**
     * Indicates how long the label will remain on the subject. Only applies on labels that are being added.
     */
    durationInHours?: number;
};
export type { ModEventLabel };
/** Apply/Negate labels on a subject */
declare const modEventLabel: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventLabel", l.Validator<ModEventLabel, ModEventLabel>>;
export { modEventLabel };
/** Set priority score of the subject. Higher score means higher priority. */
type ModEventPriorityScore = {
    $type?: 'tools.ozone.moderation.defs#modEventPriorityScore';
    comment?: string;
    score: number;
};
export type { ModEventPriorityScore };
/** Set priority score of the subject. Higher score means higher priority. */
declare const modEventPriorityScore: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventPriorityScore", l.Validator<ModEventPriorityScore, ModEventPriorityScore>>;
export { modEventPriorityScore };
/** Age assurance info coming directly from users. Only works on DID subjects. */
type AgeAssuranceEvent = {
    $type?: 'tools.ozone.moderation.defs#ageAssuranceEvent';
    /**
     * The date and time of this write operation.
     */
    createdAt: l.DatetimeString;
    /**
     * The unique identifier for this instance of the age assurance flow, in UUID format.
     */
    attemptId: string;
    /**
     * The status of the Age Assurance process.
     */
    status: 'unknown' | 'pending' | 'assured' | l.UnknownString;
    access?: AgeassuranceDefs.Access;
    /**
     * The ISO 3166-1 alpha-2 country code provided when beginning the Age Assurance flow.
     */
    countryCode?: string;
    /**
     * The ISO 3166-2 region code provided when beginning the Age Assurance flow.
     */
    regionCode?: string;
    /**
     * The IP address used when initiating the AA flow.
     */
    initIp?: string;
    /**
     * The user agent used when initiating the AA flow.
     */
    initUa?: string;
    /**
     * The IP address used when completing the AA flow.
     */
    completeIp?: string;
    /**
     * The user agent used when completing the AA flow.
     */
    completeUa?: string;
};
export type { AgeAssuranceEvent };
/** Age assurance info coming directly from users. Only works on DID subjects. */
declare const ageAssuranceEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#ageAssuranceEvent", l.Validator<AgeAssuranceEvent, AgeAssuranceEvent>>;
export { ageAssuranceEvent };
/** Age assurance status override by moderators. Only works on DID subjects. */
type AgeAssuranceOverrideEvent = {
    $type?: 'tools.ozone.moderation.defs#ageAssuranceOverrideEvent';
    /**
     * The status to be set for the user decided by a moderator, overriding whatever value the user had previously. Use reset to default to original state.
     */
    status: 'assured' | 'reset' | 'blocked' | l.UnknownString;
    access?: AgeassuranceDefs.Access;
    /**
     * Comment describing the reason for the override.
     */
    comment: string;
};
export type { AgeAssuranceOverrideEvent };
/** Age assurance status override by moderators. Only works on DID subjects. */
declare const ageAssuranceOverrideEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#ageAssuranceOverrideEvent", l.Validator<AgeAssuranceOverrideEvent, AgeAssuranceOverrideEvent>>;
export { ageAssuranceOverrideEvent };
/** Purges all age assurance events for the subject. Only works on DID subjects. Moderator-only. */
type AgeAssurancePurgeEvent = {
    $type?: 'tools.ozone.moderation.defs#ageAssurancePurgeEvent';
    /**
     * Comment describing the reason for the purge.
     */
    comment: string;
};
export type { AgeAssurancePurgeEvent };
/** Purges all age assurance events for the subject. Only works on DID subjects. Moderator-only. */
declare const ageAssurancePurgeEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#ageAssurancePurgeEvent", l.Validator<AgeAssurancePurgeEvent, AgeAssurancePurgeEvent>>;
export { ageAssurancePurgeEvent };
/** Account credentials revocation by moderators. Only works on DID subjects. */
type RevokeAccountCredentialsEvent = {
    $type?: 'tools.ozone.moderation.defs#revokeAccountCredentialsEvent';
    /**
     * Comment describing the reason for the revocation.
     */
    comment: string;
};
export type { RevokeAccountCredentialsEvent };
/** Account credentials revocation by moderators. Only works on DID subjects. */
declare const revokeAccountCredentialsEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#revokeAccountCredentialsEvent", l.Validator<RevokeAccountCredentialsEvent, RevokeAccountCredentialsEvent>>;
export { revokeAccountCredentialsEvent };
type ModEventAcknowledge = {
    $type?: 'tools.ozone.moderation.defs#modEventAcknowledge';
    comment?: string;
    /**
     * If true, all other reports on content authored by this account will be resolved (acknowledged).
     */
    acknowledgeAccountSubjects?: boolean;
};
export type { ModEventAcknowledge };
declare const modEventAcknowledge: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventAcknowledge", l.Validator<ModEventAcknowledge, ModEventAcknowledge>>;
export { modEventAcknowledge };
type ModEventEscalate = {
    $type?: 'tools.ozone.moderation.defs#modEventEscalate';
    comment?: string;
};
export type { ModEventEscalate };
declare const modEventEscalate: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventEscalate", l.Validator<ModEventEscalate, ModEventEscalate>>;
export { modEventEscalate };
/** Mute incoming reports on a subject */
type ModEventMute = {
    $type?: 'tools.ozone.moderation.defs#modEventMute';
    comment?: string;
    /**
     * Indicates how long the subject should remain muted.
     */
    durationInHours: number;
};
export type { ModEventMute };
/** Mute incoming reports on a subject */
declare const modEventMute: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventMute", l.Validator<ModEventMute, ModEventMute>>;
export { modEventMute };
/** Unmute action on a subject */
type ModEventUnmute = {
    $type?: 'tools.ozone.moderation.defs#modEventUnmute';
    /**
     * Describe reasoning behind the reversal.
     */
    comment?: string;
};
export type { ModEventUnmute };
/** Unmute action on a subject */
declare const modEventUnmute: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventUnmute", l.Validator<ModEventUnmute, ModEventUnmute>>;
export { modEventUnmute };
/** Mute incoming reports from an account */
type ModEventMuteReporter = {
    $type?: 'tools.ozone.moderation.defs#modEventMuteReporter';
    comment?: string;
    /**
     * Indicates how long the account should remain muted. Falsy value here means a permanent mute.
     */
    durationInHours?: number;
};
export type { ModEventMuteReporter };
/** Mute incoming reports from an account */
declare const modEventMuteReporter: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventMuteReporter", l.Validator<ModEventMuteReporter, ModEventMuteReporter>>;
export { modEventMuteReporter };
/** Unmute incoming reports from an account */
type ModEventUnmuteReporter = {
    $type?: 'tools.ozone.moderation.defs#modEventUnmuteReporter';
    /**
     * Describe reasoning behind the reversal.
     */
    comment?: string;
};
export type { ModEventUnmuteReporter };
/** Unmute incoming reports from an account */
declare const modEventUnmuteReporter: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventUnmuteReporter", l.Validator<ModEventUnmuteReporter, ModEventUnmuteReporter>>;
export { modEventUnmuteReporter };
/** Keep a log of outgoing email to a user */
type ModEventEmail = {
    $type?: 'tools.ozone.moderation.defs#modEventEmail';
    /**
     * The subject line of the email sent to the user.
     */
    subjectLine: string;
    /**
     * The content of the email sent to the user.
     */
    content?: string;
    /**
     * Additional comment about the outgoing comm.
     */
    comment?: string;
    /**
     * Names/Keywords of the policies that necessitated the email.
     */
    policies?: string[];
    /**
     * Severity level of the violation. Normally 'sev-1' that adds strike on repeat offense
     */
    severityLevel?: string;
    /**
     * Number of strikes to assign to the user for this violation. Normally 0 as an indicator of a warning and only added as a strike on a repeat offense.
     */
    strikeCount?: number;
    /**
     * When the strike should expire. If not provided, the strike never expires.
     */
    strikeExpiresAt?: l.DatetimeString;
    /**
     * Indicates whether the email was successfully delivered to the user's inbox.
     */
    isDelivered?: boolean;
};
export type { ModEventEmail };
/** Keep a log of outgoing email to a user */
declare const modEventEmail: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventEmail", l.Validator<ModEventEmail, ModEventEmail>>;
export { modEventEmail };
/** Divert a record's blobs to a 3rd party service for further scanning/tagging */
type ModEventDivert = {
    $type?: 'tools.ozone.moderation.defs#modEventDivert';
    comment?: string;
};
export type { ModEventDivert };
/** Divert a record's blobs to a 3rd party service for further scanning/tagging */
declare const modEventDivert: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventDivert", l.Validator<ModEventDivert, ModEventDivert>>;
export { modEventDivert };
/** Add/Remove a tag on a subject */
type ModEventTag = {
    $type?: 'tools.ozone.moderation.defs#modEventTag';
    /**
     * Tags to be added to the subject. If already exists, won't be duplicated.
     */
    add: string[];
    /**
     * Tags to be removed to the subject. Ignores a tag If it doesn't exist, won't be duplicated.
     */
    remove: string[];
    /**
     * Additional comment about added/removed tags.
     */
    comment?: string;
};
export type { ModEventTag };
/** Add/Remove a tag on a subject */
declare const modEventTag: l.TypedObjectSchema<"tools.ozone.moderation.defs#modEventTag", l.Validator<ModEventTag, ModEventTag>>;
export { modEventTag };
/** Logs account status related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
type AccountEvent = {
    $type?: 'tools.ozone.moderation.defs#accountEvent';
    comment?: string;
    /**
     * Indicates that the account has a repository which can be fetched from the host that emitted this event.
     */
    active: boolean;
    status?: 'unknown' | 'deactivated' | 'deleted' | 'takendown' | 'suspended' | 'tombstoned' | l.UnknownString;
    timestamp: l.DatetimeString;
};
export type { AccountEvent };
/** Logs account status related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
declare const accountEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#accountEvent", l.Validator<AccountEvent, AccountEvent>>;
export { accountEvent };
/** Logs identity related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
type IdentityEvent = {
    $type?: 'tools.ozone.moderation.defs#identityEvent';
    comment?: string;
    handle?: l.HandleString;
    pdsHost?: l.UriString;
    tombstone?: boolean;
    timestamp: l.DatetimeString;
};
export type { IdentityEvent };
/** Logs identity related events on a repo subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
declare const identityEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#identityEvent", l.Validator<IdentityEvent, IdentityEvent>>;
export { identityEvent };
/** Logs lifecycle event on a record subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
type RecordEvent = {
    $type?: 'tools.ozone.moderation.defs#recordEvent';
    comment?: string;
    op: 'create' | 'update' | 'delete' | l.UnknownString;
    cid?: l.CidString;
    timestamp: l.DatetimeString;
};
export type { RecordEvent };
/** Logs lifecycle event on a record subject. Normally captured by automod from the firehose and emitted to ozone for historical tracking. */
declare const recordEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#recordEvent", l.Validator<RecordEvent, RecordEvent>>;
export { recordEvent };
/** Logs a scheduled takedown action for an account. */
type ScheduleTakedownEvent = {
    $type?: 'tools.ozone.moderation.defs#scheduleTakedownEvent';
    comment?: string;
    executeAt?: l.DatetimeString;
    executeAfter?: l.DatetimeString;
    executeUntil?: l.DatetimeString;
};
export type { ScheduleTakedownEvent };
/** Logs a scheduled takedown action for an account. */
declare const scheduleTakedownEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#scheduleTakedownEvent", l.Validator<ScheduleTakedownEvent, ScheduleTakedownEvent>>;
export { scheduleTakedownEvent };
/** Logs cancellation of a scheduled takedown action for an account. */
type CancelScheduledTakedownEvent = {
    $type?: 'tools.ozone.moderation.defs#cancelScheduledTakedownEvent';
    comment?: string;
};
export type { CancelScheduledTakedownEvent };
/** Logs cancellation of a scheduled takedown action for an account. */
declare const cancelScheduledTakedownEvent: l.TypedObjectSchema<"tools.ozone.moderation.defs#cancelScheduledTakedownEvent", l.Validator<CancelScheduledTakedownEvent, CancelScheduledTakedownEvent>>;
export { cancelScheduledTakedownEvent };
type RepoView = {
    $type?: 'tools.ozone.moderation.defs#repoView';
    did: l.DidString;
    handle: l.HandleString;
    email?: string;
    relatedRecords: l.LexMap[];
    indexedAt: l.DatetimeString;
    moderation: Moderation;
    invitedBy?: ServerDefs.InviteCode;
    invitesDisabled?: boolean;
    inviteNote?: string;
    deactivatedAt?: l.DatetimeString;
    threatSignatures?: AdminDefs.ThreatSignature[];
};
export type { RepoView };
declare const repoView: l.TypedObjectSchema<"tools.ozone.moderation.defs#repoView", l.Validator<RepoView, RepoView>>;
export { repoView };
type RepoViewDetail = {
    $type?: 'tools.ozone.moderation.defs#repoViewDetail';
    did: l.DidString;
    handle: l.HandleString;
    email?: string;
    relatedRecords: l.LexMap[];
    indexedAt: l.DatetimeString;
    moderation: ModerationDetail;
    labels?: LabelDefs.Label[];
    invitedBy?: ServerDefs.InviteCode;
    invites?: ServerDefs.InviteCode[];
    invitesDisabled?: boolean;
    inviteNote?: string;
    emailConfirmedAt?: l.DatetimeString;
    deactivatedAt?: l.DatetimeString;
    threatSignatures?: AdminDefs.ThreatSignature[];
};
export type { RepoViewDetail };
declare const repoViewDetail: l.TypedObjectSchema<"tools.ozone.moderation.defs#repoViewDetail", l.Validator<RepoViewDetail, RepoViewDetail>>;
export { repoViewDetail };
type RepoViewNotFound = {
    $type?: 'tools.ozone.moderation.defs#repoViewNotFound';
    did: l.DidString;
};
export type { RepoViewNotFound };
declare const repoViewNotFound: l.TypedObjectSchema<"tools.ozone.moderation.defs#repoViewNotFound", l.Validator<RepoViewNotFound, RepoViewNotFound>>;
export { repoViewNotFound };
type RecordView = {
    $type?: 'tools.ozone.moderation.defs#recordView';
    uri: l.AtUriString;
    cid: l.CidString;
    value: l.LexMap;
    blobCids: l.CidString[];
    indexedAt: l.DatetimeString;
    moderation: Moderation;
    repo: RepoView;
};
export type { RecordView };
declare const recordView: l.TypedObjectSchema<"tools.ozone.moderation.defs#recordView", l.Validator<RecordView, RecordView>>;
export { recordView };
type RecordViewDetail = {
    $type?: 'tools.ozone.moderation.defs#recordViewDetail';
    uri: l.AtUriString;
    cid: l.CidString;
    value: l.LexMap;
    blobs: BlobView[];
    labels?: LabelDefs.Label[];
    indexedAt: l.DatetimeString;
    moderation: ModerationDetail;
    repo: RepoView;
};
export type { RecordViewDetail };
declare const recordViewDetail: l.TypedObjectSchema<"tools.ozone.moderation.defs#recordViewDetail", l.Validator<RecordViewDetail, RecordViewDetail>>;
export { recordViewDetail };
type RecordViewNotFound = {
    $type?: 'tools.ozone.moderation.defs#recordViewNotFound';
    uri: l.AtUriString;
};
export type { RecordViewNotFound };
declare const recordViewNotFound: l.TypedObjectSchema<"tools.ozone.moderation.defs#recordViewNotFound", l.Validator<RecordViewNotFound, RecordViewNotFound>>;
export { recordViewNotFound };
type Moderation = {
    $type?: 'tools.ozone.moderation.defs#moderation';
    subjectStatus?: SubjectStatusView;
};
export type { Moderation };
declare const moderation: l.TypedObjectSchema<"tools.ozone.moderation.defs#moderation", l.Validator<Moderation, Moderation>>;
export { moderation };
type ModerationDetail = {
    $type?: 'tools.ozone.moderation.defs#moderationDetail';
    subjectStatus?: SubjectStatusView;
};
export type { ModerationDetail };
declare const moderationDetail: l.TypedObjectSchema<"tools.ozone.moderation.defs#moderationDetail", l.Validator<ModerationDetail, ModerationDetail>>;
export { moderationDetail };
type BlobView = {
    $type?: 'tools.ozone.moderation.defs#blobView';
    cid: l.CidString;
    mimeType: string;
    size: number;
    createdAt: l.DatetimeString;
    details?: l.$Typed<ImageDetails> | l.$Typed<VideoDetails> | l.Unknown$TypedObject;
    moderation?: Moderation;
};
export type { BlobView };
declare const blobView: l.TypedObjectSchema<"tools.ozone.moderation.defs#blobView", l.Validator<BlobView, BlobView>>;
export { blobView };
type ImageDetails = {
    $type?: 'tools.ozone.moderation.defs#imageDetails';
    width: number;
    height: number;
};
export type { ImageDetails };
declare const imageDetails: l.TypedObjectSchema<"tools.ozone.moderation.defs#imageDetails", l.Validator<ImageDetails, ImageDetails>>;
export { imageDetails };
type VideoDetails = {
    $type?: 'tools.ozone.moderation.defs#videoDetails';
    width: number;
    height: number;
    length: number;
};
export type { VideoDetails };
declare const videoDetails: l.TypedObjectSchema<"tools.ozone.moderation.defs#videoDetails", l.Validator<VideoDetails, VideoDetails>>;
export { videoDetails };
type AccountHosting = {
    $type?: 'tools.ozone.moderation.defs#accountHosting';
    status: 'takendown' | 'suspended' | 'deleted' | 'deactivated' | 'unknown' | l.UnknownString;
    updatedAt?: l.DatetimeString;
    createdAt?: l.DatetimeString;
    deletedAt?: l.DatetimeString;
    deactivatedAt?: l.DatetimeString;
    reactivatedAt?: l.DatetimeString;
};
export type { AccountHosting };
declare const accountHosting: l.TypedObjectSchema<"tools.ozone.moderation.defs#accountHosting", l.Validator<AccountHosting, AccountHosting>>;
export { accountHosting };
type RecordHosting = {
    $type?: 'tools.ozone.moderation.defs#recordHosting';
    status: 'deleted' | 'unknown' | l.UnknownString;
    updatedAt?: l.DatetimeString;
    createdAt?: l.DatetimeString;
    deletedAt?: l.DatetimeString;
};
export type { RecordHosting };
declare const recordHosting: l.TypedObjectSchema<"tools.ozone.moderation.defs#recordHosting", l.Validator<RecordHosting, RecordHosting>>;
export { recordHosting };
type ReporterStats = {
    $type?: 'tools.ozone.moderation.defs#reporterStats';
    did: l.DidString;
    /**
     * The total number of reports made by the user on accounts.
     */
    accountReportCount: number;
    /**
     * The total number of reports made by the user on records.
     */
    recordReportCount: number;
    /**
     * The total number of accounts reported by the user.
     */
    reportedAccountCount: number;
    /**
     * The total number of records reported by the user.
     */
    reportedRecordCount: number;
    /**
     * The total number of accounts taken down as a result of the user's reports.
     */
    takendownAccountCount: number;
    /**
     * The total number of records taken down as a result of the user's reports.
     */
    takendownRecordCount: number;
    /**
     * The total number of accounts labeled as a result of the user's reports.
     */
    labeledAccountCount: number;
    /**
     * The total number of records labeled as a result of the user's reports.
     */
    labeledRecordCount: number;
};
export type { ReporterStats };
declare const reporterStats: l.TypedObjectSchema<"tools.ozone.moderation.defs#reporterStats", l.Validator<ReporterStats, ReporterStats>>;
export { reporterStats };
/** Moderation tool information for tracing the source of the action */
type ModTool = {
    $type?: 'tools.ozone.moderation.defs#modTool';
    /**
     * Name/identifier of the source (e.g., 'automod', 'ozone/workspace')
     */
    name: string;
    /**
     * Additional arbitrary metadata about the source
     */
    meta?: l.LexMap;
};
export type { ModTool };
/** Moderation tool information for tracing the source of the action */
declare const modTool: l.TypedObjectSchema<"tools.ozone.moderation.defs#modTool", l.Validator<ModTool, ModTool>>;
export { modTool };
/** Moderation event timeline event for a PLC create operation */
type TimelineEventPlcCreate = 'tools.ozone.moderation.defs#timelineEventPlcCreate';
export type { TimelineEventPlcCreate };
/** Moderation event timeline event for a PLC create operation */
declare const timelineEventPlcCreate: l.TokenSchema<"tools.ozone.moderation.defs#timelineEventPlcCreate">;
export { timelineEventPlcCreate };
/** Moderation event timeline event for generic PLC operation */
type TimelineEventPlcOperation = 'tools.ozone.moderation.defs#timelineEventPlcOperation';
export type { TimelineEventPlcOperation };
/** Moderation event timeline event for generic PLC operation */
declare const timelineEventPlcOperation: l.TokenSchema<"tools.ozone.moderation.defs#timelineEventPlcOperation">;
export { timelineEventPlcOperation };
/** Moderation event timeline event for a PLC tombstone operation */
type TimelineEventPlcTombstone = 'tools.ozone.moderation.defs#timelineEventPlcTombstone';
export type { TimelineEventPlcTombstone };
/** Moderation event timeline event for a PLC tombstone operation */
declare const timelineEventPlcTombstone: l.TokenSchema<"tools.ozone.moderation.defs#timelineEventPlcTombstone">;
export { timelineEventPlcTombstone };
/** View of a scheduled moderation action */
type ScheduledActionView = {
    $type?: 'tools.ozone.moderation.defs#scheduledActionView';
    /**
     * Auto-incrementing row ID
     */
    id: number;
    /**
     * Type of action to be executed
     */
    action: 'takedown' | l.UnknownString;
    /**
     * Serialized event object that will be propagated to the event when performed
     */
    eventData?: l.LexMap;
    /**
     * Subject DID for the action
     */
    did: l.DidString;
    /**
     * Exact time to execute the action
     */
    executeAt?: l.DatetimeString;
    /**
     * Earliest time to execute the action (for randomized scheduling)
     */
    executeAfter?: l.DatetimeString;
    /**
     * Latest time to execute the action (for randomized scheduling)
     */
    executeUntil?: l.DatetimeString;
    /**
     * Whether execution time should be randomized within the specified range
     */
    randomizeExecution?: boolean;
    /**
     * DID of the user who created this scheduled action
     */
    createdBy: l.DidString;
    /**
     * When the scheduled action was created
     */
    createdAt: l.DatetimeString;
    /**
     * When the scheduled action was last updated
     */
    updatedAt?: l.DatetimeString;
    /**
     * Current status of the scheduled action
     */
    status: 'pending' | 'executed' | 'cancelled' | 'failed' | l.UnknownString;
    /**
     * When the action was last attempted to be executed
     */
    lastExecutedAt?: l.DatetimeString;
    /**
     * Reason for the last execution failure
     */
    lastFailureReason?: string;
    /**
     * ID of the moderation event created when action was successfully executed
     */
    executionEventId?: number;
};
export type { ScheduledActionView };
/** View of a scheduled moderation action */
declare const scheduledActionView: l.TypedObjectSchema<"tools.ozone.moderation.defs#scheduledActionView", l.Validator<ScheduledActionView, ScheduledActionView>>;
export { scheduledActionView };
//# sourceMappingURL=defs.defs.d.ts.map