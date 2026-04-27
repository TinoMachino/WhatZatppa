import { ClearActorMutelistSubscriptionsRequest, ClearActorMutelistSubscriptionsResponse, ClearActorMutesRequest, ClearActorMutesResponse, ClearThreadMutesRequest, ClearThreadMutesResponse, CreateActorMutelistSubscriptionRequest, CreateActorMutelistSubscriptionResponse, CreateActorMuteRequest, CreateActorMuteResponse, CreateThreadMuteRequest, CreateThreadMuteResponse, DeleteActorMutelistSubscriptionRequest, DeleteActorMutelistSubscriptionResponse, DeleteActorMuteRequest, DeleteActorMuteResponse, DeleteThreadMuteRequest, DeleteThreadMuteResponse, GetActivitySubscriptionDidsRequest, GetActivitySubscriptionDidsResponse, GetActivitySubscriptionsByActorAndSubjectsRequest, GetActivitySubscriptionsByActorAndSubjectsResponse, GetActorBookmarksRequest, GetActorBookmarksResponse, GetActorChatDeclarationRecordsRequest, GetActorChatDeclarationRecordsResponse, GetActorDraftsRequest, GetActorDraftsResponse, GetActorFeedsRequest, GetActorFeedsResponse, GetActorFollowsActorsRequest, GetActorFollowsActorsResponse, GetActorLikesRequest, GetActorLikesResponse, GetActorListsRequest, GetActorListsResponse, GetActorMutesActorRequest, GetActorMutesActorResponse, GetActorMutesActorViaListRequest, GetActorMutesActorViaListResponse, GetActorRepostsRequest, GetActorRepostsResponse, GetActorsRequest, GetActorsResponse, GetActorStarterPacksRequest, GetActorStarterPacksResponse, GetActorTakedownRequest, GetActorTakedownResponse, GetAllLabelersRequest, GetAllLabelersResponse, GetAuthorFeedRequest, GetAuthorFeedResponse, GetBidirectionalBlockRequest, GetBidirectionalBlockResponse, GetBidirectionalBlockViaListRequest, GetBidirectionalBlockViaListResponse, GetBlobTakedownRequest, GetBlobTakedownResponse, GetBlockExistenceRequest, GetBlockExistenceResponse, GetBlocklistSubscriptionRequest, GetBlocklistSubscriptionResponse, GetBlocklistSubscriptionsRequest, GetBlocklistSubscriptionsResponse, GetBlockRecordsRequest, GetBlockRecordsResponse, GetBlocksRequest, GetBlocksResponse, GetBookmarksByActorAndSubjectsRequest, GetBookmarksByActorAndSubjectsResponse, GetCountsForUsersRequest, GetCountsForUsersResponse, GetDidsByHandlesRequest, GetDidsByHandlesResponse, GetFeedGeneratorRecordsRequest, GetFeedGeneratorRecordsResponse, GetFeedGeneratorStatusRequest, GetFeedGeneratorStatusResponse, GetFollowersRequest, GetFollowersResponse, GetFollowRecordsRequest, GetFollowRecordsResponse, GetFollowsFollowingRequest, GetFollowsFollowingResponse, GetFollowsRequest, GetFollowsResponse, GetFollowSuggestionsRequest, GetFollowSuggestionsResponse, GetGermDeclarationRecordsRequest, GetGermDeclarationRecordsResponse, GetIdentityByDidRequest, GetIdentityByDidResponse, GetIdentityByHandleRequest, GetIdentityByHandleResponse, GetInteractionCountsRequest, GetInteractionCountsResponse, GetLabelerRecordsRequest, GetLabelerRecordsResponse, GetLabelsRequest, GetLabelsResponse, GetLatestRevRequest, GetLatestRevResponse, GetLikeRecordsRequest, GetLikeRecordsResponse, GetLikesByActorAndSubjectsRequest, GetLikesByActorAndSubjectsResponse, GetLikesBySubjectRequest, GetLikesBySubjectResponse, GetLikesBySubjectSortedRequest, GetLikesBySubjectSortedResponse, GetListBlockRecordsRequest, GetListBlockRecordsResponse, GetListCountRequest, GetListCountResponse, GetListCountsRequest, GetListCountsResponse, GetListFeedRequest, GetListFeedResponse, GetListItemRecordsRequest, GetListItemRecordsResponse, GetListMembershipRequest, GetListMembershipResponse, GetListMembersRequest, GetListMembersResponse, GetListRecordsRequest, GetListRecordsResponse, GetMutelistSubscriptionRequest, GetMutelistSubscriptionResponse, GetMutelistSubscriptionsRequest, GetMutelistSubscriptionsResponse, GetMutesRequest, GetMutesResponse, GetNewUserCountForRangeRequest, GetNewUserCountForRangeResponse, GetNotificationDeclarationRecordsRequest, GetNotificationDeclarationRecordsResponse, GetNotificationPreferencesRequest, GetNotificationPreferencesResponse, GetNotificationSeenRequest, GetNotificationSeenResponse, GetNotificationsRequest, GetNotificationsResponse, GetParaAuthorFeedRequest, GetParaAuthorFeedResponse, GetParaCabildeoPositionsRequest, GetParaCabildeoPositionsResponse, GetParaCabildeoRequest, GetParaCabildeoResponse, GetParaCabildeosRequest, GetParaCabildeosResponse, GetParaCommunityBoardRequest, GetParaCommunityBoardResponse, GetParaCommunityBoardsRequest, GetParaCommunityBoardsResponse, GetParaCommunityGovernanceRequest, GetParaCommunityGovernanceResponse, GetParaCommunityMembersRequest, GetParaCommunityMembersResponse, GetParaDelegationCandidatesRequest, GetParaDelegationCandidatesResponse, GetParaDiscourseSentimentRequest, GetParaDiscourseSentimentResponse, GetParaDiscourseSnapshotRequest, GetParaDiscourseSnapshotResponse, GetParaDiscourseTopicsRequest, GetParaDiscourseTopicsResponse, GetParaHighlightRequest, GetParaHighlightResponse, GetParaHighlightsRequest, GetParaHighlightsResponse, GetParaPolicyTallyRequest, GetParaPolicyTallyResponse, GetParaPostMetaRequest, GetParaPostMetaResponse, GetParaPostsRequest, GetParaPostsResponse, GetParaProfileStatsRequest, GetParaProfileStatsResponse, GetParaThreadRequest, GetParaThreadResponse, GetParaTimelineRequest, GetParaTimelineResponse, GetPostgateRecordsRequest, GetPostgateRecordsResponse, GetPostRecordsRequest, GetPostRecordsResponse, GetPostSubscriptionRequest, GetPostSubscriptionResponse, GetProfileRecordsRequest, GetProfileRecordsResponse, GetQuotesBySubjectSortedRequest, GetQuotesBySubjectSortedResponse, GetRecordTakedownRequest, GetRecordTakedownResponse, GetRelationshipsRequest, GetRelationshipsResponse, GetRepostRecordsRequest, GetRepostRecordsResponse, GetRepostsByActorAndSubjectsRequest, GetRepostsByActorAndSubjectsResponse, GetRepostsBySubjectRequest, GetRepostsBySubjectResponse, GetSitemapIndexRequest, GetSitemapIndexResponse, GetSitemapPageRequest, GetSitemapPageResponse, GetStarterPackCountsRequest, GetStarterPackCountsResponse, GetStarterPackRecordsRequest, GetStarterPackRecordsResponse, GetStatusRecordsRequest, GetStatusRecordsResponse, GetSuggestedEntitiesRequest, GetSuggestedEntitiesResponse, GetSuggestedFeedsRequest, GetSuggestedFeedsResponse, GetThreadGateRecordsRequest, GetThreadGateRecordsResponse, GetThreadMutesOnSubjectsRequest, GetThreadMutesOnSubjectsResponse, GetThreadRequest, GetThreadResponse, GetTimelineRequest, GetTimelineResponse, GetUnreadNotificationCountRequest, GetUnreadNotificationCountResponse, GetVerificationRecordsRequest, GetVerificationRecordsResponse, GetVerificationsIssuedRequest, GetVerificationsIssuedResponse, GetVerificationsReceivedRequest, GetVerificationsReceivedResponse, PingRequest, PingResponse, PutParaCabildeoLivePresenceRequest, PutParaCabildeoLivePresenceResponse, PutPostSubscriptionRequest, PutPostSubscriptionResponse, SearchActorsRequest, SearchActorsResponse, SearchFeedGeneratorsRequest, SearchFeedGeneratorsResponse, SearchPostsRequest, SearchPostsResponse, SearchStarterPacksRequest, SearchStarterPacksResponse, TakedownActorRequest, TakedownActorResponse, TakedownBlobRequest, TakedownBlobResponse, TakedownRecordRequest, TakedownRecordResponse, UntakedownActorRequest, UntakedownActorResponse, UntakedownBlobRequest, UntakedownBlobResponse, UntakedownRecordRequest, UntakedownRecordResponse, UpdateActorUpstreamStatusRequest, UpdateActorUpstreamStatusResponse, UpdateNotificationSeenRequest, UpdateNotificationSeenResponse } from "./bsky_pb";
import { MethodKind } from "@bufbuild/protobuf";
/**
 *
 * Read Path
 *
 *
 * @generated from service bsky.Service
 */
export declare const Service: {
    readonly typeName: "bsky.Service";
    readonly methods: {
        /**
         * Records
         *
         * @generated from rpc bsky.Service.GetBlockRecords
         */
        readonly getBlockRecords: {
            readonly name: "GetBlockRecords";
            readonly I: typeof GetBlockRecordsRequest;
            readonly O: typeof GetBlockRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetFeedGeneratorRecords
         */
        readonly getFeedGeneratorRecords: {
            readonly name: "GetFeedGeneratorRecords";
            readonly I: typeof GetFeedGeneratorRecordsRequest;
            readonly O: typeof GetFeedGeneratorRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetFollowRecords
         */
        readonly getFollowRecords: {
            readonly name: "GetFollowRecords";
            readonly I: typeof GetFollowRecordsRequest;
            readonly O: typeof GetFollowRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetLikeRecords
         */
        readonly getLikeRecords: {
            readonly name: "GetLikeRecords";
            readonly I: typeof GetLikeRecordsRequest;
            readonly O: typeof GetLikeRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListBlockRecords
         */
        readonly getListBlockRecords: {
            readonly name: "GetListBlockRecords";
            readonly I: typeof GetListBlockRecordsRequest;
            readonly O: typeof GetListBlockRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListItemRecords
         */
        readonly getListItemRecords: {
            readonly name: "GetListItemRecords";
            readonly I: typeof GetListItemRecordsRequest;
            readonly O: typeof GetListItemRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListRecords
         */
        readonly getListRecords: {
            readonly name: "GetListRecords";
            readonly I: typeof GetListRecordsRequest;
            readonly O: typeof GetListRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetPostRecords
         */
        readonly getPostRecords: {
            readonly name: "GetPostRecords";
            readonly I: typeof GetPostRecordsRequest;
            readonly O: typeof GetPostRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetProfileRecords
         */
        readonly getProfileRecords: {
            readonly name: "GetProfileRecords";
            readonly I: typeof GetProfileRecordsRequest;
            readonly O: typeof GetProfileRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetActorChatDeclarationRecords
         */
        readonly getActorChatDeclarationRecords: {
            readonly name: "GetActorChatDeclarationRecords";
            readonly I: typeof GetActorChatDeclarationRecordsRequest;
            readonly O: typeof GetActorChatDeclarationRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetNotificationDeclarationRecords
         */
        readonly getNotificationDeclarationRecords: {
            readonly name: "GetNotificationDeclarationRecords";
            readonly I: typeof GetNotificationDeclarationRecordsRequest;
            readonly O: typeof GetNotificationDeclarationRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetGermDeclarationRecords
         */
        readonly getGermDeclarationRecords: {
            readonly name: "GetGermDeclarationRecords";
            readonly I: typeof GetGermDeclarationRecordsRequest;
            readonly O: typeof GetGermDeclarationRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetStatusRecords
         */
        readonly getStatusRecords: {
            readonly name: "GetStatusRecords";
            readonly I: typeof GetStatusRecordsRequest;
            readonly O: typeof GetStatusRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetRepostRecords
         */
        readonly getRepostRecords: {
            readonly name: "GetRepostRecords";
            readonly I: typeof GetRepostRecordsRequest;
            readonly O: typeof GetRepostRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetThreadGateRecords
         */
        readonly getThreadGateRecords: {
            readonly name: "GetThreadGateRecords";
            readonly I: typeof GetThreadGateRecordsRequest;
            readonly O: typeof GetThreadGateRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetPostgateRecords
         */
        readonly getPostgateRecords: {
            readonly name: "GetPostgateRecords";
            readonly I: typeof GetPostgateRecordsRequest;
            readonly O: typeof GetPostgateRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetLabelerRecords
         */
        readonly getLabelerRecords: {
            readonly name: "GetLabelerRecords";
            readonly I: typeof GetLabelerRecordsRequest;
            readonly O: typeof GetLabelerRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetStarterPackRecords
         */
        readonly getStarterPackRecords: {
            readonly name: "GetStarterPackRecords";
            readonly I: typeof GetStarterPackRecordsRequest;
            readonly O: typeof GetStarterPackRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Follows
         *
         * @generated from rpc bsky.Service.GetActorFollowsActors
         */
        readonly getActorFollowsActors: {
            readonly name: "GetActorFollowsActors";
            readonly I: typeof GetActorFollowsActorsRequest;
            readonly O: typeof GetActorFollowsActorsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetFollowers
         */
        readonly getFollowers: {
            readonly name: "GetFollowers";
            readonly I: typeof GetFollowersRequest;
            readonly O: typeof GetFollowersResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetFollows
         */
        readonly getFollows: {
            readonly name: "GetFollows";
            readonly I: typeof GetFollowsRequest;
            readonly O: typeof GetFollowsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Verifications
         *
         * @generated from rpc bsky.Service.GetVerificationRecords
         */
        readonly getVerificationRecords: {
            readonly name: "GetVerificationRecords";
            readonly I: typeof GetVerificationRecordsRequest;
            readonly O: typeof GetVerificationRecordsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetVerificationsIssued
         */
        readonly getVerificationsIssued: {
            readonly name: "GetVerificationsIssued";
            readonly I: typeof GetVerificationsIssuedRequest;
            readonly O: typeof GetVerificationsIssuedResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetVerificationsReceived
         */
        readonly getVerificationsReceived: {
            readonly name: "GetVerificationsReceived";
            readonly I: typeof GetVerificationsReceivedRequest;
            readonly O: typeof GetVerificationsReceivedResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Likes
         *
         * @generated from rpc bsky.Service.GetLikesBySubject
         */
        readonly getLikesBySubject: {
            readonly name: "GetLikesBySubject";
            readonly I: typeof GetLikesBySubjectRequest;
            readonly O: typeof GetLikesBySubjectResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetLikesBySubjectSorted
         */
        readonly getLikesBySubjectSorted: {
            readonly name: "GetLikesBySubjectSorted";
            readonly I: typeof GetLikesBySubjectSortedRequest;
            readonly O: typeof GetLikesBySubjectSortedResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetLikesByActorAndSubjects
         */
        readonly getLikesByActorAndSubjects: {
            readonly name: "GetLikesByActorAndSubjects";
            readonly I: typeof GetLikesByActorAndSubjectsRequest;
            readonly O: typeof GetLikesByActorAndSubjectsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetActorLikes
         */
        readonly getActorLikes: {
            readonly name: "GetActorLikes";
            readonly I: typeof GetActorLikesRequest;
            readonly O: typeof GetActorLikesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Reposts
         *
         * @generated from rpc bsky.Service.GetRepostsBySubject
         */
        readonly getRepostsBySubject: {
            readonly name: "GetRepostsBySubject";
            readonly I: typeof GetRepostsBySubjectRequest;
            readonly O: typeof GetRepostsBySubjectResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetRepostsByActorAndSubjects
         */
        readonly getRepostsByActorAndSubjects: {
            readonly name: "GetRepostsByActorAndSubjects";
            readonly I: typeof GetRepostsByActorAndSubjectsRequest;
            readonly O: typeof GetRepostsByActorAndSubjectsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetActorReposts
         */
        readonly getActorReposts: {
            readonly name: "GetActorReposts";
            readonly I: typeof GetActorRepostsRequest;
            readonly O: typeof GetActorRepostsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Quotes
         *
         * @generated from rpc bsky.Service.GetQuotesBySubjectSorted
         */
        readonly getQuotesBySubjectSorted: {
            readonly name: "GetQuotesBySubjectSorted";
            readonly I: typeof GetQuotesBySubjectSortedRequest;
            readonly O: typeof GetQuotesBySubjectSortedResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Interaction Counts
         *
         * @generated from rpc bsky.Service.GetInteractionCounts
         */
        readonly getInteractionCounts: {
            readonly name: "GetInteractionCounts";
            readonly I: typeof GetInteractionCountsRequest;
            readonly O: typeof GetInteractionCountsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetCountsForUsers
         */
        readonly getCountsForUsers: {
            readonly name: "GetCountsForUsers";
            readonly I: typeof GetCountsForUsersRequest;
            readonly O: typeof GetCountsForUsersResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetStarterPackCounts
         */
        readonly getStarterPackCounts: {
            readonly name: "GetStarterPackCounts";
            readonly I: typeof GetStarterPackCountsRequest;
            readonly O: typeof GetStarterPackCountsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListCounts
         */
        readonly getListCounts: {
            readonly name: "GetListCounts";
            readonly I: typeof GetListCountsRequest;
            readonly O: typeof GetListCountsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetNewUserCountForRange
         */
        readonly getNewUserCountForRange: {
            readonly name: "GetNewUserCountForRange";
            readonly I: typeof GetNewUserCountForRangeRequest;
            readonly O: typeof GetNewUserCountForRangeResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Profile
         *
         * @generated from rpc bsky.Service.GetActors
         */
        readonly getActors: {
            readonly name: "GetActors";
            readonly I: typeof GetActorsRequest;
            readonly O: typeof GetActorsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetDidsByHandles
         */
        readonly getDidsByHandles: {
            readonly name: "GetDidsByHandles";
            readonly I: typeof GetDidsByHandlesRequest;
            readonly O: typeof GetDidsByHandlesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Relationships
         *
         * @generated from rpc bsky.Service.GetRelationships
         */
        readonly getRelationships: {
            readonly name: "GetRelationships";
            readonly I: typeof GetRelationshipsRequest;
            readonly O: typeof GetRelationshipsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetBlockExistence
         */
        readonly getBlockExistence: {
            readonly name: "GetBlockExistence";
            readonly I: typeof GetBlockExistenceRequest;
            readonly O: typeof GetBlockExistenceResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Lists
         *
         * @generated from rpc bsky.Service.GetActorLists
         */
        readonly getActorLists: {
            readonly name: "GetActorLists";
            readonly I: typeof GetActorListsRequest;
            readonly O: typeof GetActorListsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListMembers
         */
        readonly getListMembers: {
            readonly name: "GetListMembers";
            readonly I: typeof GetListMembersRequest;
            readonly O: typeof GetListMembersResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListMembership
         */
        readonly getListMembership: {
            readonly name: "GetListMembership";
            readonly I: typeof GetListMembershipRequest;
            readonly O: typeof GetListMembershipResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListCount
         */
        readonly getListCount: {
            readonly name: "GetListCount";
            readonly I: typeof GetListCountRequest;
            readonly O: typeof GetListCountResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Mutes
         *
         * @generated from rpc bsky.Service.GetActorMutesActor
         */
        readonly getActorMutesActor: {
            readonly name: "GetActorMutesActor";
            readonly I: typeof GetActorMutesActorRequest;
            readonly O: typeof GetActorMutesActorResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetMutes
         */
        readonly getMutes: {
            readonly name: "GetMutes";
            readonly I: typeof GetMutesRequest;
            readonly O: typeof GetMutesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Mutelists
         *
         * @generated from rpc bsky.Service.GetActorMutesActorViaList
         */
        readonly getActorMutesActorViaList: {
            readonly name: "GetActorMutesActorViaList";
            readonly I: typeof GetActorMutesActorViaListRequest;
            readonly O: typeof GetActorMutesActorViaListResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetMutelistSubscription
         */
        readonly getMutelistSubscription: {
            readonly name: "GetMutelistSubscription";
            readonly I: typeof GetMutelistSubscriptionRequest;
            readonly O: typeof GetMutelistSubscriptionResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetMutelistSubscriptions
         */
        readonly getMutelistSubscriptions: {
            readonly name: "GetMutelistSubscriptions";
            readonly I: typeof GetMutelistSubscriptionsRequest;
            readonly O: typeof GetMutelistSubscriptionsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Thread Mutes
         *
         * @generated from rpc bsky.Service.GetThreadMutesOnSubjects
         */
        readonly getThreadMutesOnSubjects: {
            readonly name: "GetThreadMutesOnSubjects";
            readonly I: typeof GetThreadMutesOnSubjectsRequest;
            readonly O: typeof GetThreadMutesOnSubjectsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Blocks
         *
         * @generated from rpc bsky.Service.GetBidirectionalBlock
         */
        readonly getBidirectionalBlock: {
            readonly name: "GetBidirectionalBlock";
            readonly I: typeof GetBidirectionalBlockRequest;
            readonly O: typeof GetBidirectionalBlockResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetBlocks
         */
        readonly getBlocks: {
            readonly name: "GetBlocks";
            readonly I: typeof GetBlocksRequest;
            readonly O: typeof GetBlocksResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Blocklists
         *
         * @generated from rpc bsky.Service.GetBidirectionalBlockViaList
         */
        readonly getBidirectionalBlockViaList: {
            readonly name: "GetBidirectionalBlockViaList";
            readonly I: typeof GetBidirectionalBlockViaListRequest;
            readonly O: typeof GetBidirectionalBlockViaListResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetBlocklistSubscription
         */
        readonly getBlocklistSubscription: {
            readonly name: "GetBlocklistSubscription";
            readonly I: typeof GetBlocklistSubscriptionRequest;
            readonly O: typeof GetBlocklistSubscriptionResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetBlocklistSubscriptions
         */
        readonly getBlocklistSubscriptions: {
            readonly name: "GetBlocklistSubscriptions";
            readonly I: typeof GetBlocklistSubscriptionsRequest;
            readonly O: typeof GetBlocklistSubscriptionsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Notifications
         *
         * @generated from rpc bsky.Service.GetNotificationPreferences
         */
        readonly getNotificationPreferences: {
            readonly name: "GetNotificationPreferences";
            readonly I: typeof GetNotificationPreferencesRequest;
            readonly O: typeof GetNotificationPreferencesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetNotifications
         */
        readonly getNotifications: {
            readonly name: "GetNotifications";
            readonly I: typeof GetNotificationsRequest;
            readonly O: typeof GetNotificationsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetNotificationSeen
         */
        readonly getNotificationSeen: {
            readonly name: "GetNotificationSeen";
            readonly I: typeof GetNotificationSeenRequest;
            readonly O: typeof GetNotificationSeenResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetUnreadNotificationCount
         */
        readonly getUnreadNotificationCount: {
            readonly name: "GetUnreadNotificationCount";
            readonly I: typeof GetUnreadNotificationCountRequest;
            readonly O: typeof GetUnreadNotificationCountResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetActivitySubscriptionDids
         */
        readonly getActivitySubscriptionDids: {
            readonly name: "GetActivitySubscriptionDids";
            readonly I: typeof GetActivitySubscriptionDidsRequest;
            readonly O: typeof GetActivitySubscriptionDidsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetActivitySubscriptionsByActorAndSubjects
         */
        readonly getActivitySubscriptionsByActorAndSubjects: {
            readonly name: "GetActivitySubscriptionsByActorAndSubjects";
            readonly I: typeof GetActivitySubscriptionsByActorAndSubjectsRequest;
            readonly O: typeof GetActivitySubscriptionsByActorAndSubjectsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetPostSubscription
         */
        readonly getPostSubscription: {
            readonly name: "GetPostSubscription";
            readonly I: typeof GetPostSubscriptionRequest;
            readonly O: typeof GetPostSubscriptionResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.PutPostSubscription
         */
        readonly putPostSubscription: {
            readonly name: "PutPostSubscription";
            readonly I: typeof PutPostSubscriptionRequest;
            readonly O: typeof PutPostSubscriptionResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.UpdateNotificationSeen
         */
        readonly updateNotificationSeen: {
            readonly name: "UpdateNotificationSeen";
            readonly I: typeof UpdateNotificationSeenRequest;
            readonly O: typeof UpdateNotificationSeenResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * FeedGenerators
         *
         * @generated from rpc bsky.Service.GetActorFeeds
         */
        readonly getActorFeeds: {
            readonly name: "GetActorFeeds";
            readonly I: typeof GetActorFeedsRequest;
            readonly O: typeof GetActorFeedsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetSuggestedFeeds
         */
        readonly getSuggestedFeeds: {
            readonly name: "GetSuggestedFeeds";
            readonly I: typeof GetSuggestedFeedsRequest;
            readonly O: typeof GetSuggestedFeedsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetFeedGeneratorStatus
         */
        readonly getFeedGeneratorStatus: {
            readonly name: "GetFeedGeneratorStatus";
            readonly I: typeof GetFeedGeneratorStatusRequest;
            readonly O: typeof GetFeedGeneratorStatusResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.SearchFeedGenerators
         */
        readonly searchFeedGenerators: {
            readonly name: "SearchFeedGenerators";
            readonly I: typeof SearchFeedGeneratorsRequest;
            readonly O: typeof SearchFeedGeneratorsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Feeds
         *
         * @generated from rpc bsky.Service.GetAuthorFeed
         */
        readonly getAuthorFeed: {
            readonly name: "GetAuthorFeed";
            readonly I: typeof GetAuthorFeedRequest;
            readonly O: typeof GetAuthorFeedResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetTimeline
         */
        readonly getTimeline: {
            readonly name: "GetTimeline";
            readonly I: typeof GetTimelineRequest;
            readonly O: typeof GetTimelineResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetListFeed
         */
        readonly getListFeed: {
            readonly name: "GetListFeed";
            readonly I: typeof GetListFeedRequest;
            readonly O: typeof GetListFeedResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Threads
         *
         * @generated from rpc bsky.Service.GetThread
         */
        readonly getThread: {
            readonly name: "GetThread";
            readonly I: typeof GetThreadRequest;
            readonly O: typeof GetThreadResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaAuthorFeed
         */
        readonly getParaAuthorFeed: {
            readonly name: "GetParaAuthorFeed";
            readonly I: typeof GetParaAuthorFeedRequest;
            readonly O: typeof GetParaAuthorFeedResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaTimeline
         */
        readonly getParaTimeline: {
            readonly name: "GetParaTimeline";
            readonly I: typeof GetParaTimelineRequest;
            readonly O: typeof GetParaTimelineResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaPosts
         */
        readonly getParaPosts: {
            readonly name: "GetParaPosts";
            readonly I: typeof GetParaPostsRequest;
            readonly O: typeof GetParaPostsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaThread
         */
        readonly getParaThread: {
            readonly name: "GetParaThread";
            readonly I: typeof GetParaThreadRequest;
            readonly O: typeof GetParaThreadResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaPostMeta
         */
        readonly getParaPostMeta: {
            readonly name: "GetParaPostMeta";
            readonly I: typeof GetParaPostMetaRequest;
            readonly O: typeof GetParaPostMetaResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaPolicyTally
         */
        readonly getParaPolicyTally: {
            readonly name: "GetParaPolicyTally";
            readonly I: typeof GetParaPolicyTallyRequest;
            readonly O: typeof GetParaPolicyTallyResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaProfileStats
         */
        readonly getParaProfileStats: {
            readonly name: "GetParaProfileStats";
            readonly I: typeof GetParaProfileStatsRequest;
            readonly O: typeof GetParaProfileStatsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaCommunityGovernance
         */
        readonly getParaCommunityGovernance: {
            readonly name: "GetParaCommunityGovernance";
            readonly I: typeof GetParaCommunityGovernanceRequest;
            readonly O: typeof GetParaCommunityGovernanceResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaCommunityBoard
         */
        readonly getParaCommunityBoard: {
            readonly name: "GetParaCommunityBoard";
            readonly I: typeof GetParaCommunityBoardRequest;
            readonly O: typeof GetParaCommunityBoardResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaCommunityBoards
         */
        readonly getParaCommunityBoards: {
            readonly name: "GetParaCommunityBoards";
            readonly I: typeof GetParaCommunityBoardsRequest;
            readonly O: typeof GetParaCommunityBoardsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaCommunityMembers
         */
        readonly getParaCommunityMembers: {
            readonly name: "GetParaCommunityMembers";
            readonly I: typeof GetParaCommunityMembersRequest;
            readonly O: typeof GetParaCommunityMembersResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaCabildeos
         */
        readonly getParaCabildeos: {
            readonly name: "GetParaCabildeos";
            readonly I: typeof GetParaCabildeosRequest;
            readonly O: typeof GetParaCabildeosResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaCabildeo
         */
        readonly getParaCabildeo: {
            readonly name: "GetParaCabildeo";
            readonly I: typeof GetParaCabildeoRequest;
            readonly O: typeof GetParaCabildeoResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaCabildeoPositions
         */
        readonly getParaCabildeoPositions: {
            readonly name: "GetParaCabildeoPositions";
            readonly I: typeof GetParaCabildeoPositionsRequest;
            readonly O: typeof GetParaCabildeoPositionsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaDelegationCandidates
         */
        readonly getParaDelegationCandidates: {
            readonly name: "GetParaDelegationCandidates";
            readonly I: typeof GetParaDelegationCandidatesRequest;
            readonly O: typeof GetParaDelegationCandidatesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.PutParaCabildeoLivePresence
         */
        readonly putParaCabildeoLivePresence: {
            readonly name: "PutParaCabildeoLivePresence";
            readonly I: typeof PutParaCabildeoLivePresenceRequest;
            readonly O: typeof PutParaCabildeoLivePresenceResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaHighlights
         */
        readonly getParaHighlights: {
            readonly name: "GetParaHighlights";
            readonly I: typeof GetParaHighlightsRequest;
            readonly O: typeof GetParaHighlightsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaHighlight
         */
        readonly getParaHighlight: {
            readonly name: "GetParaHighlight";
            readonly I: typeof GetParaHighlightRequest;
            readonly O: typeof GetParaHighlightResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaDiscourseSnapshot
         */
        readonly getParaDiscourseSnapshot: {
            readonly name: "GetParaDiscourseSnapshot";
            readonly I: typeof GetParaDiscourseSnapshotRequest;
            readonly O: typeof GetParaDiscourseSnapshotResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaDiscourseTopics
         */
        readonly getParaDiscourseTopics: {
            readonly name: "GetParaDiscourseTopics";
            readonly I: typeof GetParaDiscourseTopicsRequest;
            readonly O: typeof GetParaDiscourseTopicsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetParaDiscourseSentiment
         */
        readonly getParaDiscourseSentiment: {
            readonly name: "GetParaDiscourseSentiment";
            readonly I: typeof GetParaDiscourseSentimentRequest;
            readonly O: typeof GetParaDiscourseSentimentResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Search
         *
         * @generated from rpc bsky.Service.SearchActors
         */
        readonly searchActors: {
            readonly name: "SearchActors";
            readonly I: typeof SearchActorsRequest;
            readonly O: typeof SearchActorsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.SearchPosts
         */
        readonly searchPosts: {
            readonly name: "SearchPosts";
            readonly I: typeof SearchPostsRequest;
            readonly O: typeof SearchPostsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.SearchStarterPacks
         */
        readonly searchStarterPacks: {
            readonly name: "SearchStarterPacks";
            readonly I: typeof SearchStarterPacksRequest;
            readonly O: typeof SearchStarterPacksResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Suggestions
         *
         * @generated from rpc bsky.Service.GetFollowSuggestions
         */
        readonly getFollowSuggestions: {
            readonly name: "GetFollowSuggestions";
            readonly I: typeof GetFollowSuggestionsRequest;
            readonly O: typeof GetFollowSuggestionsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetSuggestedEntities
         */
        readonly getSuggestedEntities: {
            readonly name: "GetSuggestedEntities";
            readonly I: typeof GetSuggestedEntitiesRequest;
            readonly O: typeof GetSuggestedEntitiesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Labels
         *
         * @generated from rpc bsky.Service.GetLabels
         */
        readonly getLabels: {
            readonly name: "GetLabels";
            readonly I: typeof GetLabelsRequest;
            readonly O: typeof GetLabelsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetAllLabelers
         */
        readonly getAllLabelers: {
            readonly name: "GetAllLabelers";
            readonly I: typeof GetAllLabelersRequest;
            readonly O: typeof GetAllLabelersResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Starter packs
         *
         * @generated from rpc bsky.Service.GetActorStarterPacks
         */
        readonly getActorStarterPacks: {
            readonly name: "GetActorStarterPacks";
            readonly I: typeof GetActorStarterPacksRequest;
            readonly O: typeof GetActorStarterPacksResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Sync
         *
         * @generated from rpc bsky.Service.GetLatestRev
         */
        readonly getLatestRev: {
            readonly name: "GetLatestRev";
            readonly I: typeof GetLatestRevRequest;
            readonly O: typeof GetLatestRevResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Moderation
         *
         * @generated from rpc bsky.Service.GetBlobTakedown
         */
        readonly getBlobTakedown: {
            readonly name: "GetBlobTakedown";
            readonly I: typeof GetBlobTakedownRequest;
            readonly O: typeof GetBlobTakedownResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetRecordTakedown
         */
        readonly getRecordTakedown: {
            readonly name: "GetRecordTakedown";
            readonly I: typeof GetRecordTakedownRequest;
            readonly O: typeof GetRecordTakedownResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetActorTakedown
         */
        readonly getActorTakedown: {
            readonly name: "GetActorTakedown";
            readonly I: typeof GetActorTakedownRequest;
            readonly O: typeof GetActorTakedownResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Bookmarks
         * Returns bookmarks created by the actor for the specified URIs.
         *
         * @generated from rpc bsky.Service.GetBookmarksByActorAndSubjects
         */
        readonly getBookmarksByActorAndSubjects: {
            readonly name: "GetBookmarksByActorAndSubjects";
            readonly I: typeof GetBookmarksByActorAndSubjectsRequest;
            readonly O: typeof GetBookmarksByActorAndSubjectsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Returns the bookmarks created by the actor.
         *
         * @generated from rpc bsky.Service.GetActorBookmarks
         */
        readonly getActorBookmarks: {
            readonly name: "GetActorBookmarks";
            readonly I: typeof GetActorBookmarksRequest;
            readonly O: typeof GetActorBookmarksResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Drafts
         * Returns a page of drafts for a user.
         *
         * @generated from rpc bsky.Service.GetActorDrafts
         */
        readonly getActorDrafts: {
            readonly name: "GetActorDrafts";
            readonly I: typeof GetActorDraftsRequest;
            readonly O: typeof GetActorDraftsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Identity
         *
         * @generated from rpc bsky.Service.GetIdentityByDid
         */
        readonly getIdentityByDid: {
            readonly name: "GetIdentityByDid";
            readonly I: typeof GetIdentityByDidRequest;
            readonly O: typeof GetIdentityByDidResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetIdentityByHandle
         */
        readonly getIdentityByHandle: {
            readonly name: "GetIdentityByHandle";
            readonly I: typeof GetIdentityByHandleRequest;
            readonly O: typeof GetIdentityByHandleResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Graph
         *
         * @generated from rpc bsky.Service.GetFollowsFollowing
         */
        readonly getFollowsFollowing: {
            readonly name: "GetFollowsFollowing";
            readonly I: typeof GetFollowsFollowingRequest;
            readonly O: typeof GetFollowsFollowingResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Sitemaps
         *
         * @generated from rpc bsky.Service.GetSitemapIndex
         */
        readonly getSitemapIndex: {
            readonly name: "GetSitemapIndex";
            readonly I: typeof GetSitemapIndexRequest;
            readonly O: typeof GetSitemapIndexResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.GetSitemapPage
         */
        readonly getSitemapPage: {
            readonly name: "GetSitemapPage";
            readonly I: typeof GetSitemapPageRequest;
            readonly O: typeof GetSitemapPageResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Ping
         *
         * @generated from rpc bsky.Service.Ping
         */
        readonly ping: {
            readonly name: "Ping";
            readonly I: typeof PingRequest;
            readonly O: typeof PingResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Moderation
         *
         * @generated from rpc bsky.Service.TakedownBlob
         */
        readonly takedownBlob: {
            readonly name: "TakedownBlob";
            readonly I: typeof TakedownBlobRequest;
            readonly O: typeof TakedownBlobResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.TakedownRecord
         */
        readonly takedownRecord: {
            readonly name: "TakedownRecord";
            readonly I: typeof TakedownRecordRequest;
            readonly O: typeof TakedownRecordResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.TakedownActor
         */
        readonly takedownActor: {
            readonly name: "TakedownActor";
            readonly I: typeof TakedownActorRequest;
            readonly O: typeof TakedownActorResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.UpdateActorUpstreamStatus
         */
        readonly updateActorUpstreamStatus: {
            readonly name: "UpdateActorUpstreamStatus";
            readonly I: typeof UpdateActorUpstreamStatusRequest;
            readonly O: typeof UpdateActorUpstreamStatusResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.UntakedownBlob
         */
        readonly untakedownBlob: {
            readonly name: "UntakedownBlob";
            readonly I: typeof UntakedownBlobRequest;
            readonly O: typeof UntakedownBlobResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.UntakedownRecord
         */
        readonly untakedownRecord: {
            readonly name: "UntakedownRecord";
            readonly I: typeof UntakedownRecordRequest;
            readonly O: typeof UntakedownRecordResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.UntakedownActor
         */
        readonly untakedownActor: {
            readonly name: "UntakedownActor";
            readonly I: typeof UntakedownActorRequest;
            readonly O: typeof UntakedownActorResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * Ingestion
         *
         * @generated from rpc bsky.Service.CreateActorMute
         */
        readonly createActorMute: {
            readonly name: "CreateActorMute";
            readonly I: typeof CreateActorMuteRequest;
            readonly O: typeof CreateActorMuteResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.DeleteActorMute
         */
        readonly deleteActorMute: {
            readonly name: "DeleteActorMute";
            readonly I: typeof DeleteActorMuteRequest;
            readonly O: typeof DeleteActorMuteResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.ClearActorMutes
         */
        readonly clearActorMutes: {
            readonly name: "ClearActorMutes";
            readonly I: typeof ClearActorMutesRequest;
            readonly O: typeof ClearActorMutesResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.CreateActorMutelistSubscription
         */
        readonly createActorMutelistSubscription: {
            readonly name: "CreateActorMutelistSubscription";
            readonly I: typeof CreateActorMutelistSubscriptionRequest;
            readonly O: typeof CreateActorMutelistSubscriptionResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.DeleteActorMutelistSubscription
         */
        readonly deleteActorMutelistSubscription: {
            readonly name: "DeleteActorMutelistSubscription";
            readonly I: typeof DeleteActorMutelistSubscriptionRequest;
            readonly O: typeof DeleteActorMutelistSubscriptionResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.ClearActorMutelistSubscriptions
         */
        readonly clearActorMutelistSubscriptions: {
            readonly name: "ClearActorMutelistSubscriptions";
            readonly I: typeof ClearActorMutelistSubscriptionsRequest;
            readonly O: typeof ClearActorMutelistSubscriptionsResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.CreateThreadMute
         */
        readonly createThreadMute: {
            readonly name: "CreateThreadMute";
            readonly I: typeof CreateThreadMuteRequest;
            readonly O: typeof CreateThreadMuteResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.DeleteThreadMute
         */
        readonly deleteThreadMute: {
            readonly name: "DeleteThreadMute";
            readonly I: typeof DeleteThreadMuteRequest;
            readonly O: typeof DeleteThreadMuteResponse;
            readonly kind: MethodKind.Unary;
        };
        /**
         * @generated from rpc bsky.Service.ClearThreadMutes
         */
        readonly clearThreadMutes: {
            readonly name: "ClearThreadMutes";
            readonly I: typeof ClearThreadMutesRequest;
            readonly O: typeof ClearThreadMutesResponse;
            readonly kind: MethodKind.Unary;
        };
    };
};
//# sourceMappingURL=bsky_connect.d.ts.map