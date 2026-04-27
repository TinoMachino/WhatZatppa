import { AtIdentifierString, AtUriString, DatetimeString, DidString, HandleString } from '@atproto/syntax';
import { DataPlaneClient } from '../data-plane/client';
import { app } from '../lexicons/index.js';
import { ParaCabildeoLive, VerificationMeta } from '../proto/bsky_pb';
import { ChatDeclarationRecord, GermDeclarationRecord, NotificationDeclarationRecord, ProfileRecord, StatusRecord } from '../views/types.js';
import { HydrationMap, RecordInfo } from './util';
type AllowActivitySubscriptions = Extract<app.bsky.notification.declaration.Main['allowSubscriptions'], 'followers' | 'mutuals' | 'none'>;
export type Actor = {
    did: DidString;
    handle?: HandleString;
    profile?: ProfileRecord;
    profileCid?: string;
    profileTakedownRef?: string;
    sortedAt?: Date;
    indexedAt?: Date;
    takedownRef?: string;
    isLabeler: boolean;
    allowIncomingChatsFrom?: string;
    allowGroupChatInvitesFrom?: string;
    upstreamStatus?: string;
    createdAt?: Date;
    priorityNotifications: boolean;
    trustedVerifier?: boolean;
    verifications: VerificationHydrationState[];
    status?: RecordInfo<StatusRecord>;
    cabildeoLive?: ParaCabildeoLive;
    germ?: RecordInfo<GermDeclarationRecord>;
    allowActivitySubscriptionsFrom: AllowActivitySubscriptions;
    /**
     * Debug information for internal development
     */
    debug?: {
        pagerank?: string;
        accountTags?: string[];
        profileTags?: string[];
    };
};
export type VerificationHydrationState = {
    issuer: DidString;
    uri: AtUriString;
    handle: HandleString;
    displayName: string;
    createdAt: DatetimeString;
};
export type VerificationMetaRequired = Required<VerificationMeta>;
export type Actors = HydrationMap<DidString, Actor>;
export type ChatDeclaration = RecordInfo<ChatDeclarationRecord>;
export type ChatDeclarations = HydrationMap<AtUriString, ChatDeclaration>;
export type GermDeclaration = RecordInfo<GermDeclarationRecord>;
export type GermDeclarations = HydrationMap<AtUriString, GermDeclaration>;
export type NotificationDeclaration = RecordInfo<NotificationDeclarationRecord>;
export type NotificationDeclarations = HydrationMap<AtUriString, NotificationDeclaration>;
export type Status = RecordInfo<StatusRecord>;
export type Statuses = HydrationMap<AtUriString, Status>;
export type ProfileViewerState = {
    did: DidString;
    muted?: boolean;
    mutedByList?: AtUriString;
    blockedBy?: AtUriString;
    blocking?: AtUriString;
    blockedByList?: AtUriString;
    blockingByList?: AtUriString;
    following?: AtUriString;
    followedBy?: AtUriString;
};
export type ProfileViewerStates = HydrationMap<AtIdentifierString, ProfileViewerState>;
type ActivitySubscriptionState = {
    post: boolean;
    reply: boolean;
};
export type ActivitySubscriptionStates = HydrationMap<DidString, ActivitySubscriptionState | undefined>;
type KnownFollowersState = {
    count: number;
    followers: DidString[];
};
export type KnownFollowersStates = HydrationMap<DidString, KnownFollowersState | undefined>;
export type ProfileAgg = {
    followers: number;
    follows: number;
    posts: number;
    lists: number;
    feeds: number;
    starterPacks: number;
};
export type ProfileAggs = HydrationMap<DidString, ProfileAgg>;
export declare class ActorHydrator {
    dataplane: DataPlaneClient;
    constructor(dataplane: DataPlaneClient);
    getRepoRevSafe(did: string | null): Promise<string | null>;
    /**
     * @note handles do not need to be normalized
     */
    getDids(handleOrDids: AtIdentifierString[], opts?: {
        lookupUnidirectional?: boolean;
    }): Promise<(DidString | undefined)[]>;
    getDidsDefined(handleOrDids: AtIdentifierString[]): Promise<DidString[]>;
    getActors(dids: DidString[], opts?: {
        includeTakedowns?: boolean;
        skipCacheForDids?: DidString[];
    }): Promise<Actors>;
    getChatDeclarations(uris: AtUriString[], includeTakedowns?: boolean): Promise<ChatDeclarations>;
    getGermDeclarations(uris: AtUriString[], includeTakedowns?: boolean): Promise<GermDeclarations>;
    getNotificationDeclarations(uris: AtUriString[], includeTakedowns?: boolean): Promise<NotificationDeclarations>;
    getStatus(uris: AtUriString[], includeTakedowns?: boolean): Promise<Statuses>;
    getProfileViewerStatesNaive(actors: AtIdentifierString[], viewer: DidString): Promise<ProfileViewerStates>;
    getKnownFollowers(dids: DidString[], viewer: DidString | null): Promise<KnownFollowersStates>;
    getActivitySubscriptions(dids: DidString[], viewer: DidString | null): Promise<ActivitySubscriptionStates>;
    getProfileAggregates(dids: DidString[]): Promise<ProfileAggs>;
}
export {};
//# sourceMappingURL=actor.d.ts.map