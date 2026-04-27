/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export interface Summary {
    $type?: 'com.para.community.defs#summary';
    members: number;
    visiblePosters: number;
    policyPosts: number;
    matterPosts: number;
    badgeHolders: number;
}
export declare function isSummary<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "summary">;
export declare function validateSummary<V>(v: V): ValidationResult<Summary & V>;
export interface Person {
    $type?: 'com.para.community.defs#person';
    did?: string;
    handle?: string;
    displayName?: string;
    avatar?: string;
}
export declare function isPerson<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "person">;
export declare function validatePerson<V>(v: V): ValidationResult<Person & V>;
export interface ModeratorView {
    $type?: 'com.para.community.defs#moderatorView';
    did?: string;
    handle?: string;
    displayName?: string;
    avatar?: string;
    role: string;
    badge: string;
    capabilities: string[];
}
export declare function isModeratorView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "moderatorView">;
export declare function validateModeratorView<V>(v: V): ValidationResult<ModeratorView & V>;
export interface OfficialView {
    $type?: 'com.para.community.defs#officialView';
    did?: string;
    handle?: string;
    displayName?: string;
    avatar?: string;
    office: string;
    mandate: string;
}
export declare function isOfficialView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "officialView">;
export declare function validateOfficialView<V>(v: V): ValidationResult<OfficialView & V>;
export interface Applicant {
    $type?: 'com.para.community.defs#applicant';
    did?: string;
    handle?: string;
    displayName?: string;
    avatar?: string;
    appliedAt: string;
    status: 'applied' | 'approved' | 'rejected' | (string & {});
    note?: string;
}
export declare function isApplicant<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "applicant">;
export declare function validateApplicant<V>(v: V): ValidationResult<Applicant & V>;
export interface DeputyRoleView {
    $type?: 'com.para.community.defs#deputyRoleView';
    key: string;
    tier: string;
    role: string;
    description: string;
    capabilities: string[];
    activeHolder?: Person;
    activeSince?: string;
    votes: number;
    applicants: Applicant[];
}
export declare function isDeputyRoleView<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "deputyRoleView">;
export declare function validateDeputyRoleView<V>(v: V): ValidationResult<DeputyRoleView & V>;
export interface Metadata {
    $type?: 'com.para.community.defs#metadata';
    termLengthDays?: number;
    reviewCadence?: string;
    escalationPath?: string;
    publicContact?: string;
    lastPublishedAt?: string;
    state?: string;
    matterFlairIds?: string[];
    policyFlairIds?: string[];
}
export declare function isMetadata<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "metadata">;
export declare function validateMetadata<V>(v: V): ValidationResult<Metadata & V>;
export interface HistoryEntry {
    $type?: 'com.para.community.defs#historyEntry';
    id: string;
    action: string;
    actorDid?: string;
    actorHandle?: string;
    createdAt: string;
    summary: string;
}
export declare function isHistoryEntry<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.para.community.defs", "historyEntry">;
export declare function validateHistoryEntry<V>(v: V): ValidationResult<HistoryEntry & V>;
//# sourceMappingURL=defs.d.ts.map