/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type Auth, type Options as XrpcOptions, Server as XrpcServer, type StreamConfigOrHandler, type MethodConfigOrHandler } from '@atproto/xrpc-server';
import * as AppBskyActorGetPreferences from './types/app/bsky/actor/getPreferences.js';
import * as AppBskyActorGetProfile from './types/app/bsky/actor/getProfile.js';
import * as AppBskyActorGetProfiles from './types/app/bsky/actor/getProfiles.js';
import * as AppBskyActorGetSuggestions from './types/app/bsky/actor/getSuggestions.js';
import * as AppBskyActorPutPreferences from './types/app/bsky/actor/putPreferences.js';
import * as AppBskyActorSearchActors from './types/app/bsky/actor/searchActors.js';
import * as AppBskyActorSearchActorsTypeahead from './types/app/bsky/actor/searchActorsTypeahead.js';
import * as AppBskyAgeassuranceBegin from './types/app/bsky/ageassurance/begin.js';
import * as AppBskyAgeassuranceGetConfig from './types/app/bsky/ageassurance/getConfig.js';
import * as AppBskyAgeassuranceGetState from './types/app/bsky/ageassurance/getState.js';
import * as AppBskyBookmarkCreateBookmark from './types/app/bsky/bookmark/createBookmark.js';
import * as AppBskyBookmarkDeleteBookmark from './types/app/bsky/bookmark/deleteBookmark.js';
import * as AppBskyBookmarkGetBookmarks from './types/app/bsky/bookmark/getBookmarks.js';
import * as AppBskyContactDismissMatch from './types/app/bsky/contact/dismissMatch.js';
import * as AppBskyContactGetMatches from './types/app/bsky/contact/getMatches.js';
import * as AppBskyContactGetSyncStatus from './types/app/bsky/contact/getSyncStatus.js';
import * as AppBskyContactImportContacts from './types/app/bsky/contact/importContacts.js';
import * as AppBskyContactRemoveData from './types/app/bsky/contact/removeData.js';
import * as AppBskyContactSendNotification from './types/app/bsky/contact/sendNotification.js';
import * as AppBskyContactStartPhoneVerification from './types/app/bsky/contact/startPhoneVerification.js';
import * as AppBskyContactVerifyPhone from './types/app/bsky/contact/verifyPhone.js';
import * as AppBskyDraftCreateDraft from './types/app/bsky/draft/createDraft.js';
import * as AppBskyDraftDeleteDraft from './types/app/bsky/draft/deleteDraft.js';
import * as AppBskyDraftGetDrafts from './types/app/bsky/draft/getDrafts.js';
import * as AppBskyDraftUpdateDraft from './types/app/bsky/draft/updateDraft.js';
import * as AppBskyFeedDescribeFeedGenerator from './types/app/bsky/feed/describeFeedGenerator.js';
import * as AppBskyFeedGetActorFeeds from './types/app/bsky/feed/getActorFeeds.js';
import * as AppBskyFeedGetActorLikes from './types/app/bsky/feed/getActorLikes.js';
import * as AppBskyFeedGetAuthorFeed from './types/app/bsky/feed/getAuthorFeed.js';
import * as AppBskyFeedGetFeed from './types/app/bsky/feed/getFeed.js';
import * as AppBskyFeedGetFeedGenerator from './types/app/bsky/feed/getFeedGenerator.js';
import * as AppBskyFeedGetFeedGenerators from './types/app/bsky/feed/getFeedGenerators.js';
import * as AppBskyFeedGetFeedSkeleton from './types/app/bsky/feed/getFeedSkeleton.js';
import * as AppBskyFeedGetLikes from './types/app/bsky/feed/getLikes.js';
import * as AppBskyFeedGetListFeed from './types/app/bsky/feed/getListFeed.js';
import * as AppBskyFeedGetPostThread from './types/app/bsky/feed/getPostThread.js';
import * as AppBskyFeedGetPosts from './types/app/bsky/feed/getPosts.js';
import * as AppBskyFeedGetQuotes from './types/app/bsky/feed/getQuotes.js';
import * as AppBskyFeedGetRepostedBy from './types/app/bsky/feed/getRepostedBy.js';
import * as AppBskyFeedGetSuggestedFeeds from './types/app/bsky/feed/getSuggestedFeeds.js';
import * as AppBskyFeedGetTimeline from './types/app/bsky/feed/getTimeline.js';
import * as AppBskyFeedSearchPosts from './types/app/bsky/feed/searchPosts.js';
import * as AppBskyFeedSendInteractions from './types/app/bsky/feed/sendInteractions.js';
import * as AppBskyGraphGetActorStarterPacks from './types/app/bsky/graph/getActorStarterPacks.js';
import * as AppBskyGraphGetBlocks from './types/app/bsky/graph/getBlocks.js';
import * as AppBskyGraphGetFollowers from './types/app/bsky/graph/getFollowers.js';
import * as AppBskyGraphGetFollows from './types/app/bsky/graph/getFollows.js';
import * as AppBskyGraphGetKnownFollowers from './types/app/bsky/graph/getKnownFollowers.js';
import * as AppBskyGraphGetList from './types/app/bsky/graph/getList.js';
import * as AppBskyGraphGetListBlocks from './types/app/bsky/graph/getListBlocks.js';
import * as AppBskyGraphGetListMutes from './types/app/bsky/graph/getListMutes.js';
import * as AppBskyGraphGetLists from './types/app/bsky/graph/getLists.js';
import * as AppBskyGraphGetListsWithMembership from './types/app/bsky/graph/getListsWithMembership.js';
import * as AppBskyGraphGetMutes from './types/app/bsky/graph/getMutes.js';
import * as AppBskyGraphGetRelationships from './types/app/bsky/graph/getRelationships.js';
import * as AppBskyGraphGetStarterPack from './types/app/bsky/graph/getStarterPack.js';
import * as AppBskyGraphGetStarterPacks from './types/app/bsky/graph/getStarterPacks.js';
import * as AppBskyGraphGetStarterPacksWithMembership from './types/app/bsky/graph/getStarterPacksWithMembership.js';
import * as AppBskyGraphGetSuggestedFollowsByActor from './types/app/bsky/graph/getSuggestedFollowsByActor.js';
import * as AppBskyGraphMuteActor from './types/app/bsky/graph/muteActor.js';
import * as AppBskyGraphMuteActorList from './types/app/bsky/graph/muteActorList.js';
import * as AppBskyGraphMuteThread from './types/app/bsky/graph/muteThread.js';
import * as AppBskyGraphSearchStarterPacks from './types/app/bsky/graph/searchStarterPacks.js';
import * as AppBskyGraphUnmuteActor from './types/app/bsky/graph/unmuteActor.js';
import * as AppBskyGraphUnmuteActorList from './types/app/bsky/graph/unmuteActorList.js';
import * as AppBskyGraphUnmuteThread from './types/app/bsky/graph/unmuteThread.js';
import * as AppBskyLabelerGetServices from './types/app/bsky/labeler/getServices.js';
import * as AppBskyNotificationGetPreferences from './types/app/bsky/notification/getPreferences.js';
import * as AppBskyNotificationGetUnreadCount from './types/app/bsky/notification/getUnreadCount.js';
import * as AppBskyNotificationListActivitySubscriptions from './types/app/bsky/notification/listActivitySubscriptions.js';
import * as AppBskyNotificationListNotifications from './types/app/bsky/notification/listNotifications.js';
import * as AppBskyNotificationPutActivitySubscription from './types/app/bsky/notification/putActivitySubscription.js';
import * as AppBskyNotificationPutPreferences from './types/app/bsky/notification/putPreferences.js';
import * as AppBskyNotificationPutPreferencesV2 from './types/app/bsky/notification/putPreferencesV2.js';
import * as AppBskyNotificationRegisterPush from './types/app/bsky/notification/registerPush.js';
import * as AppBskyNotificationUnregisterPush from './types/app/bsky/notification/unregisterPush.js';
import * as AppBskyNotificationUpdateSeen from './types/app/bsky/notification/updateSeen.js';
import * as AppBskyUnspeccedGetAgeAssuranceState from './types/app/bsky/unspecced/getAgeAssuranceState.js';
import * as AppBskyUnspeccedGetConfig from './types/app/bsky/unspecced/getConfig.js';
import * as AppBskyUnspeccedGetOnboardingSuggestedStarterPacks from './types/app/bsky/unspecced/getOnboardingSuggestedStarterPacks.js';
import * as AppBskyUnspeccedGetOnboardingSuggestedStarterPacksSkeleton from './types/app/bsky/unspecced/getOnboardingSuggestedStarterPacksSkeleton.js';
import * as AppBskyUnspeccedGetOnboardingSuggestedUsersSkeleton from './types/app/bsky/unspecced/getOnboardingSuggestedUsersSkeleton.js';
import * as AppBskyUnspeccedGetPopularFeedGenerators from './types/app/bsky/unspecced/getPopularFeedGenerators.js';
import * as AppBskyUnspeccedGetPostThreadOtherV2 from './types/app/bsky/unspecced/getPostThreadOtherV2.js';
import * as AppBskyUnspeccedGetPostThreadV2 from './types/app/bsky/unspecced/getPostThreadV2.js';
import * as AppBskyUnspeccedGetSuggestedFeeds from './types/app/bsky/unspecced/getSuggestedFeeds.js';
import * as AppBskyUnspeccedGetSuggestedFeedsSkeleton from './types/app/bsky/unspecced/getSuggestedFeedsSkeleton.js';
import * as AppBskyUnspeccedGetSuggestedOnboardingUsers from './types/app/bsky/unspecced/getSuggestedOnboardingUsers.js';
import * as AppBskyUnspeccedGetSuggestedStarterPacks from './types/app/bsky/unspecced/getSuggestedStarterPacks.js';
import * as AppBskyUnspeccedGetSuggestedStarterPacksSkeleton from './types/app/bsky/unspecced/getSuggestedStarterPacksSkeleton.js';
import * as AppBskyUnspeccedGetSuggestedUsers from './types/app/bsky/unspecced/getSuggestedUsers.js';
import * as AppBskyUnspeccedGetSuggestedUsersForDiscover from './types/app/bsky/unspecced/getSuggestedUsersForDiscover.js';
import * as AppBskyUnspeccedGetSuggestedUsersForDiscoverSkeleton from './types/app/bsky/unspecced/getSuggestedUsersForDiscoverSkeleton.js';
import * as AppBskyUnspeccedGetSuggestedUsersForExplore from './types/app/bsky/unspecced/getSuggestedUsersForExplore.js';
import * as AppBskyUnspeccedGetSuggestedUsersForExploreSkeleton from './types/app/bsky/unspecced/getSuggestedUsersForExploreSkeleton.js';
import * as AppBskyUnspeccedGetSuggestedUsersForSeeMore from './types/app/bsky/unspecced/getSuggestedUsersForSeeMore.js';
import * as AppBskyUnspeccedGetSuggestedUsersForSeeMoreSkeleton from './types/app/bsky/unspecced/getSuggestedUsersForSeeMoreSkeleton.js';
import * as AppBskyUnspeccedGetSuggestedUsersSkeleton from './types/app/bsky/unspecced/getSuggestedUsersSkeleton.js';
import * as AppBskyUnspeccedGetSuggestionsSkeleton from './types/app/bsky/unspecced/getSuggestionsSkeleton.js';
import * as AppBskyUnspeccedGetTaggedSuggestions from './types/app/bsky/unspecced/getTaggedSuggestions.js';
import * as AppBskyUnspeccedGetTrendingTopics from './types/app/bsky/unspecced/getTrendingTopics.js';
import * as AppBskyUnspeccedGetTrends from './types/app/bsky/unspecced/getTrends.js';
import * as AppBskyUnspeccedGetTrendsSkeleton from './types/app/bsky/unspecced/getTrendsSkeleton.js';
import * as AppBskyUnspeccedInitAgeAssurance from './types/app/bsky/unspecced/initAgeAssurance.js';
import * as AppBskyUnspeccedSearchActorsSkeleton from './types/app/bsky/unspecced/searchActorsSkeleton.js';
import * as AppBskyUnspeccedSearchPostsSkeleton from './types/app/bsky/unspecced/searchPostsSkeleton.js';
import * as AppBskyUnspeccedSearchStarterPacksSkeleton from './types/app/bsky/unspecced/searchStarterPacksSkeleton.js';
import * as AppBskyVideoGetJobStatus from './types/app/bsky/video/getJobStatus.js';
import * as AppBskyVideoGetUploadLimits from './types/app/bsky/video/getUploadLimits.js';
import * as AppBskyVideoUploadVideo from './types/app/bsky/video/uploadVideo.js';
import * as ChatBskyActorDeleteAccount from './types/chat/bsky/actor/deleteAccount.js';
import * as ChatBskyActorExportAccountData from './types/chat/bsky/actor/exportAccountData.js';
import * as ChatBskyConvoAcceptConvo from './types/chat/bsky/convo/acceptConvo.js';
import * as ChatBskyConvoAddReaction from './types/chat/bsky/convo/addReaction.js';
import * as ChatBskyConvoDeleteMessageForSelf from './types/chat/bsky/convo/deleteMessageForSelf.js';
import * as ChatBskyConvoGetConvo from './types/chat/bsky/convo/getConvo.js';
import * as ChatBskyConvoGetConvoAvailability from './types/chat/bsky/convo/getConvoAvailability.js';
import * as ChatBskyConvoGetConvoForMembers from './types/chat/bsky/convo/getConvoForMembers.js';
import * as ChatBskyConvoGetLog from './types/chat/bsky/convo/getLog.js';
import * as ChatBskyConvoGetMessages from './types/chat/bsky/convo/getMessages.js';
import * as ChatBskyConvoLeaveConvo from './types/chat/bsky/convo/leaveConvo.js';
import * as ChatBskyConvoListConvoRequests from './types/chat/bsky/convo/listConvoRequests.js';
import * as ChatBskyConvoListConvos from './types/chat/bsky/convo/listConvos.js';
import * as ChatBskyConvoLockConvo from './types/chat/bsky/convo/lockConvo.js';
import * as ChatBskyConvoMuteConvo from './types/chat/bsky/convo/muteConvo.js';
import * as ChatBskyConvoRemoveReaction from './types/chat/bsky/convo/removeReaction.js';
import * as ChatBskyConvoSendMessage from './types/chat/bsky/convo/sendMessage.js';
import * as ChatBskyConvoSendMessageBatch from './types/chat/bsky/convo/sendMessageBatch.js';
import * as ChatBskyConvoUnlockConvo from './types/chat/bsky/convo/unlockConvo.js';
import * as ChatBskyConvoUnmuteConvo from './types/chat/bsky/convo/unmuteConvo.js';
import * as ChatBskyConvoUpdateAllRead from './types/chat/bsky/convo/updateAllRead.js';
import * as ChatBskyConvoUpdateRead from './types/chat/bsky/convo/updateRead.js';
import * as ChatBskyGroupAddMembers from './types/chat/bsky/group/addMembers.js';
import * as ChatBskyGroupApproveJoinRequest from './types/chat/bsky/group/approveJoinRequest.js';
import * as ChatBskyGroupCreateGroup from './types/chat/bsky/group/createGroup.js';
import * as ChatBskyGroupCreateJoinLink from './types/chat/bsky/group/createJoinLink.js';
import * as ChatBskyGroupDisableJoinLink from './types/chat/bsky/group/disableJoinLink.js';
import * as ChatBskyGroupEditGroup from './types/chat/bsky/group/editGroup.js';
import * as ChatBskyGroupEditJoinLink from './types/chat/bsky/group/editJoinLink.js';
import * as ChatBskyGroupEnableJoinLink from './types/chat/bsky/group/enableJoinLink.js';
import * as ChatBskyGroupGetGroupPublicInfo from './types/chat/bsky/group/getGroupPublicInfo.js';
import * as ChatBskyGroupListJoinRequests from './types/chat/bsky/group/listJoinRequests.js';
import * as ChatBskyGroupRejectJoinRequest from './types/chat/bsky/group/rejectJoinRequest.js';
import * as ChatBskyGroupRemoveMembers from './types/chat/bsky/group/removeMembers.js';
import * as ChatBskyGroupRequestJoin from './types/chat/bsky/group/requestJoin.js';
import * as ChatBskyModerationGetActorMetadata from './types/chat/bsky/moderation/getActorMetadata.js';
import * as ChatBskyModerationGetMessageContext from './types/chat/bsky/moderation/getMessageContext.js';
import * as ChatBskyModerationSubscribeModEvents from './types/chat/bsky/moderation/subscribeModEvents.js';
import * as ChatBskyModerationUpdateActorAccess from './types/chat/bsky/moderation/updateActorAccess.js';
import * as ComAtprotoAdminDeleteAccount from './types/com/atproto/admin/deleteAccount.js';
import * as ComAtprotoAdminDisableAccountInvites from './types/com/atproto/admin/disableAccountInvites.js';
import * as ComAtprotoAdminDisableInviteCodes from './types/com/atproto/admin/disableInviteCodes.js';
import * as ComAtprotoAdminEnableAccountInvites from './types/com/atproto/admin/enableAccountInvites.js';
import * as ComAtprotoAdminGetAccountInfo from './types/com/atproto/admin/getAccountInfo.js';
import * as ComAtprotoAdminGetAccountInfos from './types/com/atproto/admin/getAccountInfos.js';
import * as ComAtprotoAdminGetInviteCodes from './types/com/atproto/admin/getInviteCodes.js';
import * as ComAtprotoAdminGetSubjectStatus from './types/com/atproto/admin/getSubjectStatus.js';
import * as ComAtprotoAdminSearchAccounts from './types/com/atproto/admin/searchAccounts.js';
import * as ComAtprotoAdminSendEmail from './types/com/atproto/admin/sendEmail.js';
import * as ComAtprotoAdminUpdateAccountEmail from './types/com/atproto/admin/updateAccountEmail.js';
import * as ComAtprotoAdminUpdateAccountHandle from './types/com/atproto/admin/updateAccountHandle.js';
import * as ComAtprotoAdminUpdateAccountPassword from './types/com/atproto/admin/updateAccountPassword.js';
import * as ComAtprotoAdminUpdateAccountSigningKey from './types/com/atproto/admin/updateAccountSigningKey.js';
import * as ComAtprotoAdminUpdateSubjectStatus from './types/com/atproto/admin/updateSubjectStatus.js';
import * as ComAtprotoIdentityGetRecommendedDidCredentials from './types/com/atproto/identity/getRecommendedDidCredentials.js';
import * as ComAtprotoIdentityRefreshIdentity from './types/com/atproto/identity/refreshIdentity.js';
import * as ComAtprotoIdentityRequestPlcOperationSignature from './types/com/atproto/identity/requestPlcOperationSignature.js';
import * as ComAtprotoIdentityResolveDid from './types/com/atproto/identity/resolveDid.js';
import * as ComAtprotoIdentityResolveHandle from './types/com/atproto/identity/resolveHandle.js';
import * as ComAtprotoIdentityResolveIdentity from './types/com/atproto/identity/resolveIdentity.js';
import * as ComAtprotoIdentitySignPlcOperation from './types/com/atproto/identity/signPlcOperation.js';
import * as ComAtprotoIdentitySubmitPlcOperation from './types/com/atproto/identity/submitPlcOperation.js';
import * as ComAtprotoIdentityUpdateHandle from './types/com/atproto/identity/updateHandle.js';
import * as ComAtprotoLabelQueryLabels from './types/com/atproto/label/queryLabels.js';
import * as ComAtprotoLabelSubscribeLabels from './types/com/atproto/label/subscribeLabels.js';
import * as ComAtprotoLexiconResolveLexicon from './types/com/atproto/lexicon/resolveLexicon.js';
import * as ComAtprotoModerationCreateReport from './types/com/atproto/moderation/createReport.js';
import * as ComAtprotoRepoApplyWrites from './types/com/atproto/repo/applyWrites.js';
import * as ComAtprotoRepoCreateRecord from './types/com/atproto/repo/createRecord.js';
import * as ComAtprotoRepoDeleteRecord from './types/com/atproto/repo/deleteRecord.js';
import * as ComAtprotoRepoDescribeRepo from './types/com/atproto/repo/describeRepo.js';
import * as ComAtprotoRepoGetRecord from './types/com/atproto/repo/getRecord.js';
import * as ComAtprotoRepoImportRepo from './types/com/atproto/repo/importRepo.js';
import * as ComAtprotoRepoListMissingBlobs from './types/com/atproto/repo/listMissingBlobs.js';
import * as ComAtprotoRepoListRecords from './types/com/atproto/repo/listRecords.js';
import * as ComAtprotoRepoPutRecord from './types/com/atproto/repo/putRecord.js';
import * as ComAtprotoRepoUploadBlob from './types/com/atproto/repo/uploadBlob.js';
import * as ComAtprotoServerActivateAccount from './types/com/atproto/server/activateAccount.js';
import * as ComAtprotoServerCheckAccountStatus from './types/com/atproto/server/checkAccountStatus.js';
import * as ComAtprotoServerConfirmEmail from './types/com/atproto/server/confirmEmail.js';
import * as ComAtprotoServerCreateAccount from './types/com/atproto/server/createAccount.js';
import * as ComAtprotoServerCreateAppPassword from './types/com/atproto/server/createAppPassword.js';
import * as ComAtprotoServerCreateInviteCode from './types/com/atproto/server/createInviteCode.js';
import * as ComAtprotoServerCreateInviteCodes from './types/com/atproto/server/createInviteCodes.js';
import * as ComAtprotoServerCreateSession from './types/com/atproto/server/createSession.js';
import * as ComAtprotoServerDeactivateAccount from './types/com/atproto/server/deactivateAccount.js';
import * as ComAtprotoServerDeleteAccount from './types/com/atproto/server/deleteAccount.js';
import * as ComAtprotoServerDeleteSession from './types/com/atproto/server/deleteSession.js';
import * as ComAtprotoServerDescribeServer from './types/com/atproto/server/describeServer.js';
import * as ComAtprotoServerGetAccountInviteCodes from './types/com/atproto/server/getAccountInviteCodes.js';
import * as ComAtprotoServerGetServiceAuth from './types/com/atproto/server/getServiceAuth.js';
import * as ComAtprotoServerGetSession from './types/com/atproto/server/getSession.js';
import * as ComAtprotoServerListAppPasswords from './types/com/atproto/server/listAppPasswords.js';
import * as ComAtprotoServerRefreshSession from './types/com/atproto/server/refreshSession.js';
import * as ComAtprotoServerRequestAccountDelete from './types/com/atproto/server/requestAccountDelete.js';
import * as ComAtprotoServerRequestEmailConfirmation from './types/com/atproto/server/requestEmailConfirmation.js';
import * as ComAtprotoServerRequestEmailUpdate from './types/com/atproto/server/requestEmailUpdate.js';
import * as ComAtprotoServerRequestPasswordReset from './types/com/atproto/server/requestPasswordReset.js';
import * as ComAtprotoServerReserveSigningKey from './types/com/atproto/server/reserveSigningKey.js';
import * as ComAtprotoServerResetPassword from './types/com/atproto/server/resetPassword.js';
import * as ComAtprotoServerRevokeAppPassword from './types/com/atproto/server/revokeAppPassword.js';
import * as ComAtprotoServerUpdateEmail from './types/com/atproto/server/updateEmail.js';
import * as ComAtprotoSyncGetBlob from './types/com/atproto/sync/getBlob.js';
import * as ComAtprotoSyncGetBlocks from './types/com/atproto/sync/getBlocks.js';
import * as ComAtprotoSyncGetCheckout from './types/com/atproto/sync/getCheckout.js';
import * as ComAtprotoSyncGetHead from './types/com/atproto/sync/getHead.js';
import * as ComAtprotoSyncGetHostStatus from './types/com/atproto/sync/getHostStatus.js';
import * as ComAtprotoSyncGetLatestCommit from './types/com/atproto/sync/getLatestCommit.js';
import * as ComAtprotoSyncGetRecord from './types/com/atproto/sync/getRecord.js';
import * as ComAtprotoSyncGetRepo from './types/com/atproto/sync/getRepo.js';
import * as ComAtprotoSyncGetRepoStatus from './types/com/atproto/sync/getRepoStatus.js';
import * as ComAtprotoSyncListBlobs from './types/com/atproto/sync/listBlobs.js';
import * as ComAtprotoSyncListHosts from './types/com/atproto/sync/listHosts.js';
import * as ComAtprotoSyncListRepos from './types/com/atproto/sync/listRepos.js';
import * as ComAtprotoSyncListReposByCollection from './types/com/atproto/sync/listReposByCollection.js';
import * as ComAtprotoSyncNotifyOfUpdate from './types/com/atproto/sync/notifyOfUpdate.js';
import * as ComAtprotoSyncRequestCrawl from './types/com/atproto/sync/requestCrawl.js';
import * as ComAtprotoSyncSubscribeRepos from './types/com/atproto/sync/subscribeRepos.js';
import * as ComAtprotoTempAddReservedHandle from './types/com/atproto/temp/addReservedHandle.js';
import * as ComAtprotoTempCheckHandleAvailability from './types/com/atproto/temp/checkHandleAvailability.js';
import * as ComAtprotoTempCheckSignupQueue from './types/com/atproto/temp/checkSignupQueue.js';
import * as ComAtprotoTempDereferenceScope from './types/com/atproto/temp/dereferenceScope.js';
import * as ComAtprotoTempFetchLabels from './types/com/atproto/temp/fetchLabels.js';
import * as ComAtprotoTempRequestPhoneVerification from './types/com/atproto/temp/requestPhoneVerification.js';
import * as ComAtprotoTempRevokeAccountCredentials from './types/com/atproto/temp/revokeAccountCredentials.js';
import * as ComParaActorGetProfileStats from './types/com/para/actor/getProfileStats.js';
import * as ComParaCivicCastVote from './types/com/para/civic/castVote.js';
import * as ComParaCivicGetCabildeo from './types/com/para/civic/getCabildeo.js';
import * as ComParaCivicListCabildeoPositions from './types/com/para/civic/listCabildeoPositions.js';
import * as ComParaCivicListCabildeos from './types/com/para/civic/listCabildeos.js';
import * as ComParaCivicPutLivePresence from './types/com/para/civic/putLivePresence.js';
import * as ComParaCommunityAcceptDraftInvite from './types/com/para/community/acceptDraftInvite.js';
import * as ComParaCommunityCreateBoard from './types/com/para/community/createBoard.js';
import * as ComParaCommunityGetBoard from './types/com/para/community/getBoard.js';
import * as ComParaCommunityGetGovernance from './types/com/para/community/getGovernance.js';
import * as ComParaCommunityJoin from './types/com/para/community/join.js';
import * as ComParaCommunityLeave from './types/com/para/community/leave.js';
import * as ComParaCommunityListBoards from './types/com/para/community/listBoards.js';
import * as ComParaDiscourseGetSentiment from './types/com/para/discourse/getSentiment.js';
import * as ComParaDiscourseGetSnapshot from './types/com/para/discourse/getSnapshot.js';
import * as ComParaDiscourseGetTopics from './types/com/para/discourse/getTopics.js';
import * as ComParaFeedGetAuthorFeed from './types/com/para/feed/getAuthorFeed.js';
import * as ComParaFeedGetPostThread from './types/com/para/feed/getPostThread.js';
import * as ComParaFeedGetPosts from './types/com/para/feed/getPosts.js';
import * as ComParaFeedGetTimeline from './types/com/para/feed/getTimeline.js';
import * as ComParaHighlightGetHighlight from './types/com/para/highlight/getHighlight.js';
import * as ComParaHighlightListHighlights from './types/com/para/highlight/listHighlights.js';
import * as ComParaSocialGetPostMeta from './types/com/para/social/getPostMeta.js';
import * as ToolsOzoneCommunicationCreateTemplate from './types/tools/ozone/communication/createTemplate.js';
import * as ToolsOzoneCommunicationDeleteTemplate from './types/tools/ozone/communication/deleteTemplate.js';
import * as ToolsOzoneCommunicationListTemplates from './types/tools/ozone/communication/listTemplates.js';
import * as ToolsOzoneCommunicationUpdateTemplate from './types/tools/ozone/communication/updateTemplate.js';
import * as ToolsOzoneHostingGetAccountHistory from './types/tools/ozone/hosting/getAccountHistory.js';
import * as ToolsOzoneModerationCancelScheduledActions from './types/tools/ozone/moderation/cancelScheduledActions.js';
import * as ToolsOzoneModerationEmitEvent from './types/tools/ozone/moderation/emitEvent.js';
import * as ToolsOzoneModerationGetAccountTimeline from './types/tools/ozone/moderation/getAccountTimeline.js';
import * as ToolsOzoneModerationGetEvent from './types/tools/ozone/moderation/getEvent.js';
import * as ToolsOzoneModerationGetRecord from './types/tools/ozone/moderation/getRecord.js';
import * as ToolsOzoneModerationGetRecords from './types/tools/ozone/moderation/getRecords.js';
import * as ToolsOzoneModerationGetRepo from './types/tools/ozone/moderation/getRepo.js';
import * as ToolsOzoneModerationGetReporterStats from './types/tools/ozone/moderation/getReporterStats.js';
import * as ToolsOzoneModerationGetRepos from './types/tools/ozone/moderation/getRepos.js';
import * as ToolsOzoneModerationGetSubjects from './types/tools/ozone/moderation/getSubjects.js';
import * as ToolsOzoneModerationListScheduledActions from './types/tools/ozone/moderation/listScheduledActions.js';
import * as ToolsOzoneModerationQueryEvents from './types/tools/ozone/moderation/queryEvents.js';
import * as ToolsOzoneModerationQueryStatuses from './types/tools/ozone/moderation/queryStatuses.js';
import * as ToolsOzoneModerationScheduleAction from './types/tools/ozone/moderation/scheduleAction.js';
import * as ToolsOzoneModerationSearchRepos from './types/tools/ozone/moderation/searchRepos.js';
import * as ToolsOzoneSafelinkAddRule from './types/tools/ozone/safelink/addRule.js';
import * as ToolsOzoneSafelinkQueryEvents from './types/tools/ozone/safelink/queryEvents.js';
import * as ToolsOzoneSafelinkQueryRules from './types/tools/ozone/safelink/queryRules.js';
import * as ToolsOzoneSafelinkRemoveRule from './types/tools/ozone/safelink/removeRule.js';
import * as ToolsOzoneSafelinkUpdateRule from './types/tools/ozone/safelink/updateRule.js';
import * as ToolsOzoneServerGetConfig from './types/tools/ozone/server/getConfig.js';
import * as ToolsOzoneSetAddValues from './types/tools/ozone/set/addValues.js';
import * as ToolsOzoneSetDeleteSet from './types/tools/ozone/set/deleteSet.js';
import * as ToolsOzoneSetDeleteValues from './types/tools/ozone/set/deleteValues.js';
import * as ToolsOzoneSetGetValues from './types/tools/ozone/set/getValues.js';
import * as ToolsOzoneSetQuerySets from './types/tools/ozone/set/querySets.js';
import * as ToolsOzoneSetUpsertSet from './types/tools/ozone/set/upsertSet.js';
import * as ToolsOzoneSettingListOptions from './types/tools/ozone/setting/listOptions.js';
import * as ToolsOzoneSettingRemoveOptions from './types/tools/ozone/setting/removeOptions.js';
import * as ToolsOzoneSettingUpsertOption from './types/tools/ozone/setting/upsertOption.js';
import * as ToolsOzoneSignatureFindCorrelation from './types/tools/ozone/signature/findCorrelation.js';
import * as ToolsOzoneSignatureFindRelatedAccounts from './types/tools/ozone/signature/findRelatedAccounts.js';
import * as ToolsOzoneSignatureSearchAccounts from './types/tools/ozone/signature/searchAccounts.js';
import * as ToolsOzoneTeamAddMember from './types/tools/ozone/team/addMember.js';
import * as ToolsOzoneTeamDeleteMember from './types/tools/ozone/team/deleteMember.js';
import * as ToolsOzoneTeamListMembers from './types/tools/ozone/team/listMembers.js';
import * as ToolsOzoneTeamUpdateMember from './types/tools/ozone/team/updateMember.js';
import * as ToolsOzoneVerificationGrantVerifications from './types/tools/ozone/verification/grantVerifications.js';
import * as ToolsOzoneVerificationListVerifications from './types/tools/ozone/verification/listVerifications.js';
import * as ToolsOzoneVerificationRevokeVerifications from './types/tools/ozone/verification/revokeVerifications.js';
export declare const APP_BSKY_ACTOR: {
    StatusLive: string;
};
export declare const APP_BSKY_FEED: {
    DefsRequestLess: string;
    DefsRequestMore: string;
    DefsClickthroughItem: string;
    DefsClickthroughAuthor: string;
    DefsClickthroughReposter: string;
    DefsClickthroughEmbed: string;
    DefsContentModeUnspecified: string;
    DefsContentModeVideo: string;
    DefsInteractionSeen: string;
    DefsInteractionLike: string;
    DefsInteractionRepost: string;
    DefsInteractionReply: string;
    DefsInteractionQuote: string;
    DefsInteractionShare: string;
};
export declare const APP_BSKY_GRAPH: {
    DefsModlist: string;
    DefsCuratelist: string;
    DefsReferencelist: string;
};
export declare const COM_ATPROTO_MODERATION: {
    DefsReasonSpam: string;
    DefsReasonViolation: string;
    DefsReasonMisleading: string;
    DefsReasonSexual: string;
    DefsReasonRude: string;
    DefsReasonOther: string;
    DefsReasonAppeal: string;
};
export declare const TOOLS_OZONE_MODERATION: {
    DefsReviewOpen: string;
    DefsReviewEscalated: string;
    DefsReviewClosed: string;
    DefsReviewNone: string;
    DefsTimelineEventPlcCreate: string;
    DefsTimelineEventPlcOperation: string;
    DefsTimelineEventPlcTombstone: string;
};
export declare const TOOLS_OZONE_REPORT: {
    DefsReasonAppeal: string;
    DefsReasonOther: string;
    DefsReasonViolenceAnimal: string;
    DefsReasonViolenceThreats: string;
    DefsReasonViolenceGraphicContent: string;
    DefsReasonViolenceGlorification: string;
    DefsReasonViolenceExtremistContent: string;
    DefsReasonViolenceTrafficking: string;
    DefsReasonViolenceOther: string;
    DefsReasonSexualAbuseContent: string;
    DefsReasonSexualNCII: string;
    DefsReasonSexualDeepfake: string;
    DefsReasonSexualAnimal: string;
    DefsReasonSexualUnlabeled: string;
    DefsReasonSexualOther: string;
    DefsReasonChildSafetyCSAM: string;
    DefsReasonChildSafetyGroom: string;
    DefsReasonChildSafetyPrivacy: string;
    DefsReasonChildSafetyHarassment: string;
    DefsReasonChildSafetyOther: string;
    DefsReasonHarassmentTroll: string;
    DefsReasonHarassmentTargeted: string;
    DefsReasonHarassmentHateSpeech: string;
    DefsReasonHarassmentDoxxing: string;
    DefsReasonHarassmentOther: string;
    DefsReasonMisleadingBot: string;
    DefsReasonMisleadingImpersonation: string;
    DefsReasonMisleadingSpam: string;
    DefsReasonMisleadingScam: string;
    DefsReasonMisleadingElections: string;
    DefsReasonMisleadingOther: string;
    DefsReasonRuleSiteSecurity: string;
    DefsReasonRuleProhibitedSales: string;
    DefsReasonRuleBanEvasion: string;
    DefsReasonRuleOther: string;
    DefsReasonSelfHarmContent: string;
    DefsReasonSelfHarmED: string;
    DefsReasonSelfHarmStunts: string;
    DefsReasonSelfHarmSubstances: string;
    DefsReasonSelfHarmOther: string;
};
export declare const TOOLS_OZONE_TEAM: {
    DefsRoleAdmin: string;
    DefsRoleModerator: string;
    DefsRoleTriage: string;
    DefsRoleVerifier: string;
};
export declare function createServer(options?: XrpcOptions): Server;
export declare class Server {
    xrpc: XrpcServer;
    app: AppNS;
    chat: ChatNS;
    com: ComNS;
    tools: ToolsNS;
    constructor(options?: XrpcOptions);
}
export declare class AppNS {
    _server: Server;
    bsky: AppBskyNS;
    constructor(server: Server);
}
export declare class AppBskyNS {
    _server: Server;
    actor: AppBskyActorNS;
    ageassurance: AppBskyAgeassuranceNS;
    bookmark: AppBskyBookmarkNS;
    contact: AppBskyContactNS;
    draft: AppBskyDraftNS;
    embed: AppBskyEmbedNS;
    feed: AppBskyFeedNS;
    graph: AppBskyGraphNS;
    labeler: AppBskyLabelerNS;
    notification: AppBskyNotificationNS;
    richtext: AppBskyRichtextNS;
    unspecced: AppBskyUnspeccedNS;
    video: AppBskyVideoNS;
    constructor(server: Server);
}
export declare class AppBskyActorNS {
    _server: Server;
    constructor(server: Server);
    getPreferences<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyActorGetPreferences.QueryParams, AppBskyActorGetPreferences.HandlerInput, AppBskyActorGetPreferences.HandlerOutput>): void;
    getProfile<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyActorGetProfile.QueryParams, AppBskyActorGetProfile.HandlerInput, AppBskyActorGetProfile.HandlerOutput>): void;
    getProfiles<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyActorGetProfiles.QueryParams, AppBskyActorGetProfiles.HandlerInput, AppBskyActorGetProfiles.HandlerOutput>): void;
    getSuggestions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyActorGetSuggestions.QueryParams, AppBskyActorGetSuggestions.HandlerInput, AppBskyActorGetSuggestions.HandlerOutput>): void;
    putPreferences<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyActorPutPreferences.QueryParams, AppBskyActorPutPreferences.HandlerInput, AppBskyActorPutPreferences.HandlerOutput>): void;
    searchActors<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyActorSearchActors.QueryParams, AppBskyActorSearchActors.HandlerInput, AppBskyActorSearchActors.HandlerOutput>): void;
    searchActorsTypeahead<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyActorSearchActorsTypeahead.QueryParams, AppBskyActorSearchActorsTypeahead.HandlerInput, AppBskyActorSearchActorsTypeahead.HandlerOutput>): void;
}
export declare class AppBskyAgeassuranceNS {
    _server: Server;
    constructor(server: Server);
    begin<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyAgeassuranceBegin.QueryParams, AppBskyAgeassuranceBegin.HandlerInput, AppBskyAgeassuranceBegin.HandlerOutput>): void;
    getConfig<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyAgeassuranceGetConfig.QueryParams, AppBskyAgeassuranceGetConfig.HandlerInput, AppBskyAgeassuranceGetConfig.HandlerOutput>): void;
    getState<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyAgeassuranceGetState.QueryParams, AppBskyAgeassuranceGetState.HandlerInput, AppBskyAgeassuranceGetState.HandlerOutput>): void;
}
export declare class AppBskyBookmarkNS {
    _server: Server;
    constructor(server: Server);
    createBookmark<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyBookmarkCreateBookmark.QueryParams, AppBskyBookmarkCreateBookmark.HandlerInput, AppBskyBookmarkCreateBookmark.HandlerOutput>): void;
    deleteBookmark<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyBookmarkDeleteBookmark.QueryParams, AppBskyBookmarkDeleteBookmark.HandlerInput, AppBskyBookmarkDeleteBookmark.HandlerOutput>): void;
    getBookmarks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyBookmarkGetBookmarks.QueryParams, AppBskyBookmarkGetBookmarks.HandlerInput, AppBskyBookmarkGetBookmarks.HandlerOutput>): void;
}
export declare class AppBskyContactNS {
    _server: Server;
    constructor(server: Server);
    dismissMatch<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactDismissMatch.QueryParams, AppBskyContactDismissMatch.HandlerInput, AppBskyContactDismissMatch.HandlerOutput>): void;
    getMatches<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactGetMatches.QueryParams, AppBskyContactGetMatches.HandlerInput, AppBskyContactGetMatches.HandlerOutput>): void;
    getSyncStatus<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactGetSyncStatus.QueryParams, AppBskyContactGetSyncStatus.HandlerInput, AppBskyContactGetSyncStatus.HandlerOutput>): void;
    importContacts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactImportContacts.QueryParams, AppBskyContactImportContacts.HandlerInput, AppBskyContactImportContacts.HandlerOutput>): void;
    removeData<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactRemoveData.QueryParams, AppBskyContactRemoveData.HandlerInput, AppBskyContactRemoveData.HandlerOutput>): void;
    sendNotification<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactSendNotification.QueryParams, AppBskyContactSendNotification.HandlerInput, AppBskyContactSendNotification.HandlerOutput>): void;
    startPhoneVerification<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactStartPhoneVerification.QueryParams, AppBskyContactStartPhoneVerification.HandlerInput, AppBskyContactStartPhoneVerification.HandlerOutput>): void;
    verifyPhone<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyContactVerifyPhone.QueryParams, AppBskyContactVerifyPhone.HandlerInput, AppBskyContactVerifyPhone.HandlerOutput>): void;
}
export declare class AppBskyDraftNS {
    _server: Server;
    constructor(server: Server);
    createDraft<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyDraftCreateDraft.QueryParams, AppBskyDraftCreateDraft.HandlerInput, AppBskyDraftCreateDraft.HandlerOutput>): void;
    deleteDraft<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyDraftDeleteDraft.QueryParams, AppBskyDraftDeleteDraft.HandlerInput, AppBskyDraftDeleteDraft.HandlerOutput>): void;
    getDrafts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyDraftGetDrafts.QueryParams, AppBskyDraftGetDrafts.HandlerInput, AppBskyDraftGetDrafts.HandlerOutput>): void;
    updateDraft<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyDraftUpdateDraft.QueryParams, AppBskyDraftUpdateDraft.HandlerInput, AppBskyDraftUpdateDraft.HandlerOutput>): void;
}
export declare class AppBskyEmbedNS {
    _server: Server;
    constructor(server: Server);
}
export declare class AppBskyFeedNS {
    _server: Server;
    constructor(server: Server);
    describeFeedGenerator<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedDescribeFeedGenerator.QueryParams, AppBskyFeedDescribeFeedGenerator.HandlerInput, AppBskyFeedDescribeFeedGenerator.HandlerOutput>): void;
    getActorFeeds<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetActorFeeds.QueryParams, AppBskyFeedGetActorFeeds.HandlerInput, AppBskyFeedGetActorFeeds.HandlerOutput>): void;
    getActorLikes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetActorLikes.QueryParams, AppBskyFeedGetActorLikes.HandlerInput, AppBskyFeedGetActorLikes.HandlerOutput>): void;
    getAuthorFeed<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetAuthorFeed.QueryParams, AppBskyFeedGetAuthorFeed.HandlerInput, AppBskyFeedGetAuthorFeed.HandlerOutput>): void;
    getFeed<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetFeed.QueryParams, AppBskyFeedGetFeed.HandlerInput, AppBskyFeedGetFeed.HandlerOutput>): void;
    getFeedGenerator<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetFeedGenerator.QueryParams, AppBskyFeedGetFeedGenerator.HandlerInput, AppBskyFeedGetFeedGenerator.HandlerOutput>): void;
    getFeedGenerators<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetFeedGenerators.QueryParams, AppBskyFeedGetFeedGenerators.HandlerInput, AppBskyFeedGetFeedGenerators.HandlerOutput>): void;
    getFeedSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetFeedSkeleton.QueryParams, AppBskyFeedGetFeedSkeleton.HandlerInput, AppBskyFeedGetFeedSkeleton.HandlerOutput>): void;
    getLikes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetLikes.QueryParams, AppBskyFeedGetLikes.HandlerInput, AppBskyFeedGetLikes.HandlerOutput>): void;
    getListFeed<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetListFeed.QueryParams, AppBskyFeedGetListFeed.HandlerInput, AppBskyFeedGetListFeed.HandlerOutput>): void;
    getPostThread<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetPostThread.QueryParams, AppBskyFeedGetPostThread.HandlerInput, AppBskyFeedGetPostThread.HandlerOutput>): void;
    getPosts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetPosts.QueryParams, AppBskyFeedGetPosts.HandlerInput, AppBskyFeedGetPosts.HandlerOutput>): void;
    getQuotes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetQuotes.QueryParams, AppBskyFeedGetQuotes.HandlerInput, AppBskyFeedGetQuotes.HandlerOutput>): void;
    getRepostedBy<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetRepostedBy.QueryParams, AppBskyFeedGetRepostedBy.HandlerInput, AppBskyFeedGetRepostedBy.HandlerOutput>): void;
    getSuggestedFeeds<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetSuggestedFeeds.QueryParams, AppBskyFeedGetSuggestedFeeds.HandlerInput, AppBskyFeedGetSuggestedFeeds.HandlerOutput>): void;
    getTimeline<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedGetTimeline.QueryParams, AppBskyFeedGetTimeline.HandlerInput, AppBskyFeedGetTimeline.HandlerOutput>): void;
    searchPosts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedSearchPosts.QueryParams, AppBskyFeedSearchPosts.HandlerInput, AppBskyFeedSearchPosts.HandlerOutput>): void;
    sendInteractions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyFeedSendInteractions.QueryParams, AppBskyFeedSendInteractions.HandlerInput, AppBskyFeedSendInteractions.HandlerOutput>): void;
}
export declare class AppBskyGraphNS {
    _server: Server;
    constructor(server: Server);
    getActorStarterPacks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetActorStarterPacks.QueryParams, AppBskyGraphGetActorStarterPacks.HandlerInput, AppBskyGraphGetActorStarterPacks.HandlerOutput>): void;
    getBlocks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetBlocks.QueryParams, AppBskyGraphGetBlocks.HandlerInput, AppBskyGraphGetBlocks.HandlerOutput>): void;
    getFollowers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetFollowers.QueryParams, AppBskyGraphGetFollowers.HandlerInput, AppBskyGraphGetFollowers.HandlerOutput>): void;
    getFollows<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetFollows.QueryParams, AppBskyGraphGetFollows.HandlerInput, AppBskyGraphGetFollows.HandlerOutput>): void;
    getKnownFollowers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetKnownFollowers.QueryParams, AppBskyGraphGetKnownFollowers.HandlerInput, AppBskyGraphGetKnownFollowers.HandlerOutput>): void;
    getList<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetList.QueryParams, AppBskyGraphGetList.HandlerInput, AppBskyGraphGetList.HandlerOutput>): void;
    getListBlocks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetListBlocks.QueryParams, AppBskyGraphGetListBlocks.HandlerInput, AppBskyGraphGetListBlocks.HandlerOutput>): void;
    getListMutes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetListMutes.QueryParams, AppBskyGraphGetListMutes.HandlerInput, AppBskyGraphGetListMutes.HandlerOutput>): void;
    getLists<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetLists.QueryParams, AppBskyGraphGetLists.HandlerInput, AppBskyGraphGetLists.HandlerOutput>): void;
    getListsWithMembership<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetListsWithMembership.QueryParams, AppBskyGraphGetListsWithMembership.HandlerInput, AppBskyGraphGetListsWithMembership.HandlerOutput>): void;
    getMutes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetMutes.QueryParams, AppBskyGraphGetMutes.HandlerInput, AppBskyGraphGetMutes.HandlerOutput>): void;
    getRelationships<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetRelationships.QueryParams, AppBskyGraphGetRelationships.HandlerInput, AppBskyGraphGetRelationships.HandlerOutput>): void;
    getStarterPack<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetStarterPack.QueryParams, AppBskyGraphGetStarterPack.HandlerInput, AppBskyGraphGetStarterPack.HandlerOutput>): void;
    getStarterPacks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetStarterPacks.QueryParams, AppBskyGraphGetStarterPacks.HandlerInput, AppBskyGraphGetStarterPacks.HandlerOutput>): void;
    getStarterPacksWithMembership<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetStarterPacksWithMembership.QueryParams, AppBskyGraphGetStarterPacksWithMembership.HandlerInput, AppBskyGraphGetStarterPacksWithMembership.HandlerOutput>): void;
    getSuggestedFollowsByActor<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphGetSuggestedFollowsByActor.QueryParams, AppBskyGraphGetSuggestedFollowsByActor.HandlerInput, AppBskyGraphGetSuggestedFollowsByActor.HandlerOutput>): void;
    muteActor<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphMuteActor.QueryParams, AppBskyGraphMuteActor.HandlerInput, AppBskyGraphMuteActor.HandlerOutput>): void;
    muteActorList<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphMuteActorList.QueryParams, AppBskyGraphMuteActorList.HandlerInput, AppBskyGraphMuteActorList.HandlerOutput>): void;
    muteThread<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphMuteThread.QueryParams, AppBskyGraphMuteThread.HandlerInput, AppBskyGraphMuteThread.HandlerOutput>): void;
    searchStarterPacks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphSearchStarterPacks.QueryParams, AppBskyGraphSearchStarterPacks.HandlerInput, AppBskyGraphSearchStarterPacks.HandlerOutput>): void;
    unmuteActor<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphUnmuteActor.QueryParams, AppBskyGraphUnmuteActor.HandlerInput, AppBskyGraphUnmuteActor.HandlerOutput>): void;
    unmuteActorList<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphUnmuteActorList.QueryParams, AppBskyGraphUnmuteActorList.HandlerInput, AppBskyGraphUnmuteActorList.HandlerOutput>): void;
    unmuteThread<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyGraphUnmuteThread.QueryParams, AppBskyGraphUnmuteThread.HandlerInput, AppBskyGraphUnmuteThread.HandlerOutput>): void;
}
export declare class AppBskyLabelerNS {
    _server: Server;
    constructor(server: Server);
    getServices<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyLabelerGetServices.QueryParams, AppBskyLabelerGetServices.HandlerInput, AppBskyLabelerGetServices.HandlerOutput>): void;
}
export declare class AppBskyNotificationNS {
    _server: Server;
    constructor(server: Server);
    getPreferences<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationGetPreferences.QueryParams, AppBskyNotificationGetPreferences.HandlerInput, AppBskyNotificationGetPreferences.HandlerOutput>): void;
    getUnreadCount<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationGetUnreadCount.QueryParams, AppBskyNotificationGetUnreadCount.HandlerInput, AppBskyNotificationGetUnreadCount.HandlerOutput>): void;
    listActivitySubscriptions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationListActivitySubscriptions.QueryParams, AppBskyNotificationListActivitySubscriptions.HandlerInput, AppBskyNotificationListActivitySubscriptions.HandlerOutput>): void;
    listNotifications<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationListNotifications.QueryParams, AppBskyNotificationListNotifications.HandlerInput, AppBskyNotificationListNotifications.HandlerOutput>): void;
    putActivitySubscription<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationPutActivitySubscription.QueryParams, AppBskyNotificationPutActivitySubscription.HandlerInput, AppBskyNotificationPutActivitySubscription.HandlerOutput>): void;
    putPreferences<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationPutPreferences.QueryParams, AppBskyNotificationPutPreferences.HandlerInput, AppBskyNotificationPutPreferences.HandlerOutput>): void;
    putPreferencesV2<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationPutPreferencesV2.QueryParams, AppBskyNotificationPutPreferencesV2.HandlerInput, AppBskyNotificationPutPreferencesV2.HandlerOutput>): void;
    registerPush<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationRegisterPush.QueryParams, AppBskyNotificationRegisterPush.HandlerInput, AppBskyNotificationRegisterPush.HandlerOutput>): void;
    unregisterPush<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationUnregisterPush.QueryParams, AppBskyNotificationUnregisterPush.HandlerInput, AppBskyNotificationUnregisterPush.HandlerOutput>): void;
    updateSeen<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyNotificationUpdateSeen.QueryParams, AppBskyNotificationUpdateSeen.HandlerInput, AppBskyNotificationUpdateSeen.HandlerOutput>): void;
}
export declare class AppBskyRichtextNS {
    _server: Server;
    constructor(server: Server);
}
export declare class AppBskyUnspeccedNS {
    _server: Server;
    constructor(server: Server);
    getAgeAssuranceState<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetAgeAssuranceState.QueryParams, AppBskyUnspeccedGetAgeAssuranceState.HandlerInput, AppBskyUnspeccedGetAgeAssuranceState.HandlerOutput>): void;
    getConfig<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetConfig.QueryParams, AppBskyUnspeccedGetConfig.HandlerInput, AppBskyUnspeccedGetConfig.HandlerOutput>): void;
    getOnboardingSuggestedStarterPacks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetOnboardingSuggestedStarterPacks.QueryParams, AppBskyUnspeccedGetOnboardingSuggestedStarterPacks.HandlerInput, AppBskyUnspeccedGetOnboardingSuggestedStarterPacks.HandlerOutput>): void;
    getOnboardingSuggestedStarterPacksSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetOnboardingSuggestedStarterPacksSkeleton.QueryParams, AppBskyUnspeccedGetOnboardingSuggestedStarterPacksSkeleton.HandlerInput, AppBskyUnspeccedGetOnboardingSuggestedStarterPacksSkeleton.HandlerOutput>): void;
    getOnboardingSuggestedUsersSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetOnboardingSuggestedUsersSkeleton.QueryParams, AppBskyUnspeccedGetOnboardingSuggestedUsersSkeleton.HandlerInput, AppBskyUnspeccedGetOnboardingSuggestedUsersSkeleton.HandlerOutput>): void;
    getPopularFeedGenerators<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetPopularFeedGenerators.QueryParams, AppBskyUnspeccedGetPopularFeedGenerators.HandlerInput, AppBskyUnspeccedGetPopularFeedGenerators.HandlerOutput>): void;
    getPostThreadOtherV2<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetPostThreadOtherV2.QueryParams, AppBskyUnspeccedGetPostThreadOtherV2.HandlerInput, AppBskyUnspeccedGetPostThreadOtherV2.HandlerOutput>): void;
    getPostThreadV2<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetPostThreadV2.QueryParams, AppBskyUnspeccedGetPostThreadV2.HandlerInput, AppBskyUnspeccedGetPostThreadV2.HandlerOutput>): void;
    getSuggestedFeeds<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedFeeds.QueryParams, AppBskyUnspeccedGetSuggestedFeeds.HandlerInput, AppBskyUnspeccedGetSuggestedFeeds.HandlerOutput>): void;
    getSuggestedFeedsSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedFeedsSkeleton.QueryParams, AppBskyUnspeccedGetSuggestedFeedsSkeleton.HandlerInput, AppBskyUnspeccedGetSuggestedFeedsSkeleton.HandlerOutput>): void;
    getSuggestedOnboardingUsers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedOnboardingUsers.QueryParams, AppBskyUnspeccedGetSuggestedOnboardingUsers.HandlerInput, AppBskyUnspeccedGetSuggestedOnboardingUsers.HandlerOutput>): void;
    getSuggestedStarterPacks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedStarterPacks.QueryParams, AppBskyUnspeccedGetSuggestedStarterPacks.HandlerInput, AppBskyUnspeccedGetSuggestedStarterPacks.HandlerOutput>): void;
    getSuggestedStarterPacksSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedStarterPacksSkeleton.QueryParams, AppBskyUnspeccedGetSuggestedStarterPacksSkeleton.HandlerInput, AppBskyUnspeccedGetSuggestedStarterPacksSkeleton.HandlerOutput>): void;
    getSuggestedUsers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsers.QueryParams, AppBskyUnspeccedGetSuggestedUsers.HandlerInput, AppBskyUnspeccedGetSuggestedUsers.HandlerOutput>): void;
    getSuggestedUsersForDiscover<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsersForDiscover.QueryParams, AppBskyUnspeccedGetSuggestedUsersForDiscover.HandlerInput, AppBskyUnspeccedGetSuggestedUsersForDiscover.HandlerOutput>): void;
    getSuggestedUsersForDiscoverSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsersForDiscoverSkeleton.QueryParams, AppBskyUnspeccedGetSuggestedUsersForDiscoverSkeleton.HandlerInput, AppBskyUnspeccedGetSuggestedUsersForDiscoverSkeleton.HandlerOutput>): void;
    getSuggestedUsersForExplore<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsersForExplore.QueryParams, AppBskyUnspeccedGetSuggestedUsersForExplore.HandlerInput, AppBskyUnspeccedGetSuggestedUsersForExplore.HandlerOutput>): void;
    getSuggestedUsersForExploreSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsersForExploreSkeleton.QueryParams, AppBskyUnspeccedGetSuggestedUsersForExploreSkeleton.HandlerInput, AppBskyUnspeccedGetSuggestedUsersForExploreSkeleton.HandlerOutput>): void;
    getSuggestedUsersForSeeMore<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsersForSeeMore.QueryParams, AppBskyUnspeccedGetSuggestedUsersForSeeMore.HandlerInput, AppBskyUnspeccedGetSuggestedUsersForSeeMore.HandlerOutput>): void;
    getSuggestedUsersForSeeMoreSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsersForSeeMoreSkeleton.QueryParams, AppBskyUnspeccedGetSuggestedUsersForSeeMoreSkeleton.HandlerInput, AppBskyUnspeccedGetSuggestedUsersForSeeMoreSkeleton.HandlerOutput>): void;
    getSuggestedUsersSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestedUsersSkeleton.QueryParams, AppBskyUnspeccedGetSuggestedUsersSkeleton.HandlerInput, AppBskyUnspeccedGetSuggestedUsersSkeleton.HandlerOutput>): void;
    getSuggestionsSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetSuggestionsSkeleton.QueryParams, AppBskyUnspeccedGetSuggestionsSkeleton.HandlerInput, AppBskyUnspeccedGetSuggestionsSkeleton.HandlerOutput>): void;
    getTaggedSuggestions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetTaggedSuggestions.QueryParams, AppBskyUnspeccedGetTaggedSuggestions.HandlerInput, AppBskyUnspeccedGetTaggedSuggestions.HandlerOutput>): void;
    getTrendingTopics<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetTrendingTopics.QueryParams, AppBskyUnspeccedGetTrendingTopics.HandlerInput, AppBskyUnspeccedGetTrendingTopics.HandlerOutput>): void;
    getTrends<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetTrends.QueryParams, AppBskyUnspeccedGetTrends.HandlerInput, AppBskyUnspeccedGetTrends.HandlerOutput>): void;
    getTrendsSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedGetTrendsSkeleton.QueryParams, AppBskyUnspeccedGetTrendsSkeleton.HandlerInput, AppBskyUnspeccedGetTrendsSkeleton.HandlerOutput>): void;
    initAgeAssurance<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedInitAgeAssurance.QueryParams, AppBskyUnspeccedInitAgeAssurance.HandlerInput, AppBskyUnspeccedInitAgeAssurance.HandlerOutput>): void;
    searchActorsSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedSearchActorsSkeleton.QueryParams, AppBskyUnspeccedSearchActorsSkeleton.HandlerInput, AppBskyUnspeccedSearchActorsSkeleton.HandlerOutput>): void;
    searchPostsSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedSearchPostsSkeleton.QueryParams, AppBskyUnspeccedSearchPostsSkeleton.HandlerInput, AppBskyUnspeccedSearchPostsSkeleton.HandlerOutput>): void;
    searchStarterPacksSkeleton<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyUnspeccedSearchStarterPacksSkeleton.QueryParams, AppBskyUnspeccedSearchStarterPacksSkeleton.HandlerInput, AppBskyUnspeccedSearchStarterPacksSkeleton.HandlerOutput>): void;
}
export declare class AppBskyVideoNS {
    _server: Server;
    constructor(server: Server);
    getJobStatus<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyVideoGetJobStatus.QueryParams, AppBskyVideoGetJobStatus.HandlerInput, AppBskyVideoGetJobStatus.HandlerOutput>): void;
    getUploadLimits<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyVideoGetUploadLimits.QueryParams, AppBskyVideoGetUploadLimits.HandlerInput, AppBskyVideoGetUploadLimits.HandlerOutput>): void;
    uploadVideo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, AppBskyVideoUploadVideo.QueryParams, AppBskyVideoUploadVideo.HandlerInput, AppBskyVideoUploadVideo.HandlerOutput>): void;
}
export declare class ChatNS {
    _server: Server;
    bsky: ChatBskyNS;
    constructor(server: Server);
}
export declare class ChatBskyNS {
    _server: Server;
    actor: ChatBskyActorNS;
    convo: ChatBskyConvoNS;
    group: ChatBskyGroupNS;
    moderation: ChatBskyModerationNS;
    constructor(server: Server);
}
export declare class ChatBskyActorNS {
    _server: Server;
    constructor(server: Server);
    deleteAccount<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyActorDeleteAccount.QueryParams, ChatBskyActorDeleteAccount.HandlerInput, ChatBskyActorDeleteAccount.HandlerOutput>): void;
    exportAccountData<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyActorExportAccountData.QueryParams, ChatBskyActorExportAccountData.HandlerInput, ChatBskyActorExportAccountData.HandlerOutput>): void;
}
export declare class ChatBskyConvoNS {
    _server: Server;
    constructor(server: Server);
    acceptConvo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoAcceptConvo.QueryParams, ChatBskyConvoAcceptConvo.HandlerInput, ChatBskyConvoAcceptConvo.HandlerOutput>): void;
    addReaction<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoAddReaction.QueryParams, ChatBskyConvoAddReaction.HandlerInput, ChatBskyConvoAddReaction.HandlerOutput>): void;
    deleteMessageForSelf<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoDeleteMessageForSelf.QueryParams, ChatBskyConvoDeleteMessageForSelf.HandlerInput, ChatBskyConvoDeleteMessageForSelf.HandlerOutput>): void;
    getConvo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoGetConvo.QueryParams, ChatBskyConvoGetConvo.HandlerInput, ChatBskyConvoGetConvo.HandlerOutput>): void;
    getConvoAvailability<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoGetConvoAvailability.QueryParams, ChatBskyConvoGetConvoAvailability.HandlerInput, ChatBskyConvoGetConvoAvailability.HandlerOutput>): void;
    getConvoForMembers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoGetConvoForMembers.QueryParams, ChatBskyConvoGetConvoForMembers.HandlerInput, ChatBskyConvoGetConvoForMembers.HandlerOutput>): void;
    getLog<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoGetLog.QueryParams, ChatBskyConvoGetLog.HandlerInput, ChatBskyConvoGetLog.HandlerOutput>): void;
    getMessages<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoGetMessages.QueryParams, ChatBskyConvoGetMessages.HandlerInput, ChatBskyConvoGetMessages.HandlerOutput>): void;
    leaveConvo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoLeaveConvo.QueryParams, ChatBskyConvoLeaveConvo.HandlerInput, ChatBskyConvoLeaveConvo.HandlerOutput>): void;
    listConvoRequests<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoListConvoRequests.QueryParams, ChatBskyConvoListConvoRequests.HandlerInput, ChatBskyConvoListConvoRequests.HandlerOutput>): void;
    listConvos<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoListConvos.QueryParams, ChatBskyConvoListConvos.HandlerInput, ChatBskyConvoListConvos.HandlerOutput>): void;
    lockConvo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoLockConvo.QueryParams, ChatBskyConvoLockConvo.HandlerInput, ChatBskyConvoLockConvo.HandlerOutput>): void;
    muteConvo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoMuteConvo.QueryParams, ChatBskyConvoMuteConvo.HandlerInput, ChatBskyConvoMuteConvo.HandlerOutput>): void;
    removeReaction<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoRemoveReaction.QueryParams, ChatBskyConvoRemoveReaction.HandlerInput, ChatBskyConvoRemoveReaction.HandlerOutput>): void;
    sendMessage<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoSendMessage.QueryParams, ChatBskyConvoSendMessage.HandlerInput, ChatBskyConvoSendMessage.HandlerOutput>): void;
    sendMessageBatch<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoSendMessageBatch.QueryParams, ChatBskyConvoSendMessageBatch.HandlerInput, ChatBskyConvoSendMessageBatch.HandlerOutput>): void;
    unlockConvo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoUnlockConvo.QueryParams, ChatBskyConvoUnlockConvo.HandlerInput, ChatBskyConvoUnlockConvo.HandlerOutput>): void;
    unmuteConvo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoUnmuteConvo.QueryParams, ChatBskyConvoUnmuteConvo.HandlerInput, ChatBskyConvoUnmuteConvo.HandlerOutput>): void;
    updateAllRead<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoUpdateAllRead.QueryParams, ChatBskyConvoUpdateAllRead.HandlerInput, ChatBskyConvoUpdateAllRead.HandlerOutput>): void;
    updateRead<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyConvoUpdateRead.QueryParams, ChatBskyConvoUpdateRead.HandlerInput, ChatBskyConvoUpdateRead.HandlerOutput>): void;
}
export declare class ChatBskyGroupNS {
    _server: Server;
    constructor(server: Server);
    addMembers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupAddMembers.QueryParams, ChatBskyGroupAddMembers.HandlerInput, ChatBskyGroupAddMembers.HandlerOutput>): void;
    approveJoinRequest<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupApproveJoinRequest.QueryParams, ChatBskyGroupApproveJoinRequest.HandlerInput, ChatBskyGroupApproveJoinRequest.HandlerOutput>): void;
    createGroup<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupCreateGroup.QueryParams, ChatBskyGroupCreateGroup.HandlerInput, ChatBskyGroupCreateGroup.HandlerOutput>): void;
    createJoinLink<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupCreateJoinLink.QueryParams, ChatBskyGroupCreateJoinLink.HandlerInput, ChatBskyGroupCreateJoinLink.HandlerOutput>): void;
    disableJoinLink<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupDisableJoinLink.QueryParams, ChatBskyGroupDisableJoinLink.HandlerInput, ChatBskyGroupDisableJoinLink.HandlerOutput>): void;
    editGroup<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupEditGroup.QueryParams, ChatBskyGroupEditGroup.HandlerInput, ChatBskyGroupEditGroup.HandlerOutput>): void;
    editJoinLink<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupEditJoinLink.QueryParams, ChatBskyGroupEditJoinLink.HandlerInput, ChatBskyGroupEditJoinLink.HandlerOutput>): void;
    enableJoinLink<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupEnableJoinLink.QueryParams, ChatBskyGroupEnableJoinLink.HandlerInput, ChatBskyGroupEnableJoinLink.HandlerOutput>): void;
    getGroupPublicInfo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupGetGroupPublicInfo.QueryParams, ChatBskyGroupGetGroupPublicInfo.HandlerInput, ChatBskyGroupGetGroupPublicInfo.HandlerOutput>): void;
    listJoinRequests<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupListJoinRequests.QueryParams, ChatBskyGroupListJoinRequests.HandlerInput, ChatBskyGroupListJoinRequests.HandlerOutput>): void;
    rejectJoinRequest<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupRejectJoinRequest.QueryParams, ChatBskyGroupRejectJoinRequest.HandlerInput, ChatBskyGroupRejectJoinRequest.HandlerOutput>): void;
    removeMembers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupRemoveMembers.QueryParams, ChatBskyGroupRemoveMembers.HandlerInput, ChatBskyGroupRemoveMembers.HandlerOutput>): void;
    requestJoin<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyGroupRequestJoin.QueryParams, ChatBskyGroupRequestJoin.HandlerInput, ChatBskyGroupRequestJoin.HandlerOutput>): void;
}
export declare class ChatBskyModerationNS {
    _server: Server;
    constructor(server: Server);
    getActorMetadata<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyModerationGetActorMetadata.QueryParams, ChatBskyModerationGetActorMetadata.HandlerInput, ChatBskyModerationGetActorMetadata.HandlerOutput>): void;
    getMessageContext<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyModerationGetMessageContext.QueryParams, ChatBskyModerationGetMessageContext.HandlerInput, ChatBskyModerationGetMessageContext.HandlerOutput>): void;
    subscribeModEvents<A extends Auth = void>(cfg: StreamConfigOrHandler<A, ChatBskyModerationSubscribeModEvents.QueryParams, ChatBskyModerationSubscribeModEvents.HandlerOutput>): void;
    updateActorAccess<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ChatBskyModerationUpdateActorAccess.QueryParams, ChatBskyModerationUpdateActorAccess.HandlerInput, ChatBskyModerationUpdateActorAccess.HandlerOutput>): void;
}
export declare class ComNS {
    _server: Server;
    atproto: ComAtprotoNS;
    para: ComParaNS;
    constructor(server: Server);
}
export declare class ComAtprotoNS {
    _server: Server;
    admin: ComAtprotoAdminNS;
    identity: ComAtprotoIdentityNS;
    label: ComAtprotoLabelNS;
    lexicon: ComAtprotoLexiconNS;
    moderation: ComAtprotoModerationNS;
    repo: ComAtprotoRepoNS;
    server: ComAtprotoServerNS;
    sync: ComAtprotoSyncNS;
    temp: ComAtprotoTempNS;
    constructor(server: Server);
}
export declare class ComAtprotoAdminNS {
    _server: Server;
    constructor(server: Server);
    deleteAccount<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminDeleteAccount.QueryParams, ComAtprotoAdminDeleteAccount.HandlerInput, ComAtprotoAdminDeleteAccount.HandlerOutput>): void;
    disableAccountInvites<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminDisableAccountInvites.QueryParams, ComAtprotoAdminDisableAccountInvites.HandlerInput, ComAtprotoAdminDisableAccountInvites.HandlerOutput>): void;
    disableInviteCodes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminDisableInviteCodes.QueryParams, ComAtprotoAdminDisableInviteCodes.HandlerInput, ComAtprotoAdminDisableInviteCodes.HandlerOutput>): void;
    enableAccountInvites<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminEnableAccountInvites.QueryParams, ComAtprotoAdminEnableAccountInvites.HandlerInput, ComAtprotoAdminEnableAccountInvites.HandlerOutput>): void;
    getAccountInfo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminGetAccountInfo.QueryParams, ComAtprotoAdminGetAccountInfo.HandlerInput, ComAtprotoAdminGetAccountInfo.HandlerOutput>): void;
    getAccountInfos<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminGetAccountInfos.QueryParams, ComAtprotoAdminGetAccountInfos.HandlerInput, ComAtprotoAdminGetAccountInfos.HandlerOutput>): void;
    getInviteCodes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminGetInviteCodes.QueryParams, ComAtprotoAdminGetInviteCodes.HandlerInput, ComAtprotoAdminGetInviteCodes.HandlerOutput>): void;
    getSubjectStatus<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminGetSubjectStatus.QueryParams, ComAtprotoAdminGetSubjectStatus.HandlerInput, ComAtprotoAdminGetSubjectStatus.HandlerOutput>): void;
    searchAccounts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminSearchAccounts.QueryParams, ComAtprotoAdminSearchAccounts.HandlerInput, ComAtprotoAdminSearchAccounts.HandlerOutput>): void;
    sendEmail<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminSendEmail.QueryParams, ComAtprotoAdminSendEmail.HandlerInput, ComAtprotoAdminSendEmail.HandlerOutput>): void;
    updateAccountEmail<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminUpdateAccountEmail.QueryParams, ComAtprotoAdminUpdateAccountEmail.HandlerInput, ComAtprotoAdminUpdateAccountEmail.HandlerOutput>): void;
    updateAccountHandle<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminUpdateAccountHandle.QueryParams, ComAtprotoAdminUpdateAccountHandle.HandlerInput, ComAtprotoAdminUpdateAccountHandle.HandlerOutput>): void;
    updateAccountPassword<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminUpdateAccountPassword.QueryParams, ComAtprotoAdminUpdateAccountPassword.HandlerInput, ComAtprotoAdminUpdateAccountPassword.HandlerOutput>): void;
    updateAccountSigningKey<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminUpdateAccountSigningKey.QueryParams, ComAtprotoAdminUpdateAccountSigningKey.HandlerInput, ComAtprotoAdminUpdateAccountSigningKey.HandlerOutput>): void;
    updateSubjectStatus<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoAdminUpdateSubjectStatus.QueryParams, ComAtprotoAdminUpdateSubjectStatus.HandlerInput, ComAtprotoAdminUpdateSubjectStatus.HandlerOutput>): void;
}
export declare class ComAtprotoIdentityNS {
    _server: Server;
    constructor(server: Server);
    getRecommendedDidCredentials<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentityGetRecommendedDidCredentials.QueryParams, ComAtprotoIdentityGetRecommendedDidCredentials.HandlerInput, ComAtprotoIdentityGetRecommendedDidCredentials.HandlerOutput>): void;
    refreshIdentity<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentityRefreshIdentity.QueryParams, ComAtprotoIdentityRefreshIdentity.HandlerInput, ComAtprotoIdentityRefreshIdentity.HandlerOutput>): void;
    requestPlcOperationSignature<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentityRequestPlcOperationSignature.QueryParams, ComAtprotoIdentityRequestPlcOperationSignature.HandlerInput, ComAtprotoIdentityRequestPlcOperationSignature.HandlerOutput>): void;
    resolveDid<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentityResolveDid.QueryParams, ComAtprotoIdentityResolveDid.HandlerInput, ComAtprotoIdentityResolveDid.HandlerOutput>): void;
    resolveHandle<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentityResolveHandle.QueryParams, ComAtprotoIdentityResolveHandle.HandlerInput, ComAtprotoIdentityResolveHandle.HandlerOutput>): void;
    resolveIdentity<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentityResolveIdentity.QueryParams, ComAtprotoIdentityResolveIdentity.HandlerInput, ComAtprotoIdentityResolveIdentity.HandlerOutput>): void;
    signPlcOperation<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentitySignPlcOperation.QueryParams, ComAtprotoIdentitySignPlcOperation.HandlerInput, ComAtprotoIdentitySignPlcOperation.HandlerOutput>): void;
    submitPlcOperation<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentitySubmitPlcOperation.QueryParams, ComAtprotoIdentitySubmitPlcOperation.HandlerInput, ComAtprotoIdentitySubmitPlcOperation.HandlerOutput>): void;
    updateHandle<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoIdentityUpdateHandle.QueryParams, ComAtprotoIdentityUpdateHandle.HandlerInput, ComAtprotoIdentityUpdateHandle.HandlerOutput>): void;
}
export declare class ComAtprotoLabelNS {
    _server: Server;
    constructor(server: Server);
    queryLabels<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoLabelQueryLabels.QueryParams, ComAtprotoLabelQueryLabels.HandlerInput, ComAtprotoLabelQueryLabels.HandlerOutput>): void;
    subscribeLabels<A extends Auth = void>(cfg: StreamConfigOrHandler<A, ComAtprotoLabelSubscribeLabels.QueryParams, ComAtprotoLabelSubscribeLabels.HandlerOutput>): void;
}
export declare class ComAtprotoLexiconNS {
    _server: Server;
    constructor(server: Server);
    resolveLexicon<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoLexiconResolveLexicon.QueryParams, ComAtprotoLexiconResolveLexicon.HandlerInput, ComAtprotoLexiconResolveLexicon.HandlerOutput>): void;
}
export declare class ComAtprotoModerationNS {
    _server: Server;
    constructor(server: Server);
    createReport<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoModerationCreateReport.QueryParams, ComAtprotoModerationCreateReport.HandlerInput, ComAtprotoModerationCreateReport.HandlerOutput>): void;
}
export declare class ComAtprotoRepoNS {
    _server: Server;
    constructor(server: Server);
    applyWrites<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoApplyWrites.QueryParams, ComAtprotoRepoApplyWrites.HandlerInput, ComAtprotoRepoApplyWrites.HandlerOutput>): void;
    createRecord<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoCreateRecord.QueryParams, ComAtprotoRepoCreateRecord.HandlerInput, ComAtprotoRepoCreateRecord.HandlerOutput>): void;
    deleteRecord<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoDeleteRecord.QueryParams, ComAtprotoRepoDeleteRecord.HandlerInput, ComAtprotoRepoDeleteRecord.HandlerOutput>): void;
    describeRepo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoDescribeRepo.QueryParams, ComAtprotoRepoDescribeRepo.HandlerInput, ComAtprotoRepoDescribeRepo.HandlerOutput>): void;
    getRecord<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoGetRecord.QueryParams, ComAtprotoRepoGetRecord.HandlerInput, ComAtprotoRepoGetRecord.HandlerOutput>): void;
    importRepo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoImportRepo.QueryParams, ComAtprotoRepoImportRepo.HandlerInput, ComAtprotoRepoImportRepo.HandlerOutput>): void;
    listMissingBlobs<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoListMissingBlobs.QueryParams, ComAtprotoRepoListMissingBlobs.HandlerInput, ComAtprotoRepoListMissingBlobs.HandlerOutput>): void;
    listRecords<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoListRecords.QueryParams, ComAtprotoRepoListRecords.HandlerInput, ComAtprotoRepoListRecords.HandlerOutput>): void;
    putRecord<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoPutRecord.QueryParams, ComAtprotoRepoPutRecord.HandlerInput, ComAtprotoRepoPutRecord.HandlerOutput>): void;
    uploadBlob<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoRepoUploadBlob.QueryParams, ComAtprotoRepoUploadBlob.HandlerInput, ComAtprotoRepoUploadBlob.HandlerOutput>): void;
}
export declare class ComAtprotoServerNS {
    _server: Server;
    constructor(server: Server);
    activateAccount<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerActivateAccount.QueryParams, ComAtprotoServerActivateAccount.HandlerInput, ComAtprotoServerActivateAccount.HandlerOutput>): void;
    checkAccountStatus<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerCheckAccountStatus.QueryParams, ComAtprotoServerCheckAccountStatus.HandlerInput, ComAtprotoServerCheckAccountStatus.HandlerOutput>): void;
    confirmEmail<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerConfirmEmail.QueryParams, ComAtprotoServerConfirmEmail.HandlerInput, ComAtprotoServerConfirmEmail.HandlerOutput>): void;
    createAccount<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerCreateAccount.QueryParams, ComAtprotoServerCreateAccount.HandlerInput, ComAtprotoServerCreateAccount.HandlerOutput>): void;
    createAppPassword<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerCreateAppPassword.QueryParams, ComAtprotoServerCreateAppPassword.HandlerInput, ComAtprotoServerCreateAppPassword.HandlerOutput>): void;
    createInviteCode<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerCreateInviteCode.QueryParams, ComAtprotoServerCreateInviteCode.HandlerInput, ComAtprotoServerCreateInviteCode.HandlerOutput>): void;
    createInviteCodes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerCreateInviteCodes.QueryParams, ComAtprotoServerCreateInviteCodes.HandlerInput, ComAtprotoServerCreateInviteCodes.HandlerOutput>): void;
    createSession<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerCreateSession.QueryParams, ComAtprotoServerCreateSession.HandlerInput, ComAtprotoServerCreateSession.HandlerOutput>): void;
    deactivateAccount<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerDeactivateAccount.QueryParams, ComAtprotoServerDeactivateAccount.HandlerInput, ComAtprotoServerDeactivateAccount.HandlerOutput>): void;
    deleteAccount<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerDeleteAccount.QueryParams, ComAtprotoServerDeleteAccount.HandlerInput, ComAtprotoServerDeleteAccount.HandlerOutput>): void;
    deleteSession<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerDeleteSession.QueryParams, ComAtprotoServerDeleteSession.HandlerInput, ComAtprotoServerDeleteSession.HandlerOutput>): void;
    describeServer<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerDescribeServer.QueryParams, ComAtprotoServerDescribeServer.HandlerInput, ComAtprotoServerDescribeServer.HandlerOutput>): void;
    getAccountInviteCodes<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerGetAccountInviteCodes.QueryParams, ComAtprotoServerGetAccountInviteCodes.HandlerInput, ComAtprotoServerGetAccountInviteCodes.HandlerOutput>): void;
    getServiceAuth<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerGetServiceAuth.QueryParams, ComAtprotoServerGetServiceAuth.HandlerInput, ComAtprotoServerGetServiceAuth.HandlerOutput>): void;
    getSession<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerGetSession.QueryParams, ComAtprotoServerGetSession.HandlerInput, ComAtprotoServerGetSession.HandlerOutput>): void;
    listAppPasswords<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerListAppPasswords.QueryParams, ComAtprotoServerListAppPasswords.HandlerInput, ComAtprotoServerListAppPasswords.HandlerOutput>): void;
    refreshSession<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerRefreshSession.QueryParams, ComAtprotoServerRefreshSession.HandlerInput, ComAtprotoServerRefreshSession.HandlerOutput>): void;
    requestAccountDelete<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerRequestAccountDelete.QueryParams, ComAtprotoServerRequestAccountDelete.HandlerInput, ComAtprotoServerRequestAccountDelete.HandlerOutput>): void;
    requestEmailConfirmation<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerRequestEmailConfirmation.QueryParams, ComAtprotoServerRequestEmailConfirmation.HandlerInput, ComAtprotoServerRequestEmailConfirmation.HandlerOutput>): void;
    requestEmailUpdate<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerRequestEmailUpdate.QueryParams, ComAtprotoServerRequestEmailUpdate.HandlerInput, ComAtprotoServerRequestEmailUpdate.HandlerOutput>): void;
    requestPasswordReset<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerRequestPasswordReset.QueryParams, ComAtprotoServerRequestPasswordReset.HandlerInput, ComAtprotoServerRequestPasswordReset.HandlerOutput>): void;
    reserveSigningKey<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerReserveSigningKey.QueryParams, ComAtprotoServerReserveSigningKey.HandlerInput, ComAtprotoServerReserveSigningKey.HandlerOutput>): void;
    resetPassword<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerResetPassword.QueryParams, ComAtprotoServerResetPassword.HandlerInput, ComAtprotoServerResetPassword.HandlerOutput>): void;
    revokeAppPassword<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerRevokeAppPassword.QueryParams, ComAtprotoServerRevokeAppPassword.HandlerInput, ComAtprotoServerRevokeAppPassword.HandlerOutput>): void;
    updateEmail<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoServerUpdateEmail.QueryParams, ComAtprotoServerUpdateEmail.HandlerInput, ComAtprotoServerUpdateEmail.HandlerOutput>): void;
}
export declare class ComAtprotoSyncNS {
    _server: Server;
    constructor(server: Server);
    getBlob<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetBlob.QueryParams, ComAtprotoSyncGetBlob.HandlerInput, ComAtprotoSyncGetBlob.HandlerOutput>): void;
    getBlocks<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetBlocks.QueryParams, ComAtprotoSyncGetBlocks.HandlerInput, ComAtprotoSyncGetBlocks.HandlerOutput>): void;
    getCheckout<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetCheckout.QueryParams, ComAtprotoSyncGetCheckout.HandlerInput, ComAtprotoSyncGetCheckout.HandlerOutput>): void;
    getHead<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetHead.QueryParams, ComAtprotoSyncGetHead.HandlerInput, ComAtprotoSyncGetHead.HandlerOutput>): void;
    getHostStatus<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetHostStatus.QueryParams, ComAtprotoSyncGetHostStatus.HandlerInput, ComAtprotoSyncGetHostStatus.HandlerOutput>): void;
    getLatestCommit<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetLatestCommit.QueryParams, ComAtprotoSyncGetLatestCommit.HandlerInput, ComAtprotoSyncGetLatestCommit.HandlerOutput>): void;
    getRecord<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetRecord.QueryParams, ComAtprotoSyncGetRecord.HandlerInput, ComAtprotoSyncGetRecord.HandlerOutput>): void;
    getRepo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetRepo.QueryParams, ComAtprotoSyncGetRepo.HandlerInput, ComAtprotoSyncGetRepo.HandlerOutput>): void;
    getRepoStatus<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncGetRepoStatus.QueryParams, ComAtprotoSyncGetRepoStatus.HandlerInput, ComAtprotoSyncGetRepoStatus.HandlerOutput>): void;
    listBlobs<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncListBlobs.QueryParams, ComAtprotoSyncListBlobs.HandlerInput, ComAtprotoSyncListBlobs.HandlerOutput>): void;
    listHosts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncListHosts.QueryParams, ComAtprotoSyncListHosts.HandlerInput, ComAtprotoSyncListHosts.HandlerOutput>): void;
    listRepos<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncListRepos.QueryParams, ComAtprotoSyncListRepos.HandlerInput, ComAtprotoSyncListRepos.HandlerOutput>): void;
    listReposByCollection<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncListReposByCollection.QueryParams, ComAtprotoSyncListReposByCollection.HandlerInput, ComAtprotoSyncListReposByCollection.HandlerOutput>): void;
    notifyOfUpdate<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncNotifyOfUpdate.QueryParams, ComAtprotoSyncNotifyOfUpdate.HandlerInput, ComAtprotoSyncNotifyOfUpdate.HandlerOutput>): void;
    requestCrawl<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoSyncRequestCrawl.QueryParams, ComAtprotoSyncRequestCrawl.HandlerInput, ComAtprotoSyncRequestCrawl.HandlerOutput>): void;
    subscribeRepos<A extends Auth = void>(cfg: StreamConfigOrHandler<A, ComAtprotoSyncSubscribeRepos.QueryParams, ComAtprotoSyncSubscribeRepos.HandlerOutput>): void;
}
export declare class ComAtprotoTempNS {
    _server: Server;
    constructor(server: Server);
    addReservedHandle<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoTempAddReservedHandle.QueryParams, ComAtprotoTempAddReservedHandle.HandlerInput, ComAtprotoTempAddReservedHandle.HandlerOutput>): void;
    checkHandleAvailability<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoTempCheckHandleAvailability.QueryParams, ComAtprotoTempCheckHandleAvailability.HandlerInput, ComAtprotoTempCheckHandleAvailability.HandlerOutput>): void;
    checkSignupQueue<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoTempCheckSignupQueue.QueryParams, ComAtprotoTempCheckSignupQueue.HandlerInput, ComAtprotoTempCheckSignupQueue.HandlerOutput>): void;
    dereferenceScope<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoTempDereferenceScope.QueryParams, ComAtprotoTempDereferenceScope.HandlerInput, ComAtprotoTempDereferenceScope.HandlerOutput>): void;
    fetchLabels<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoTempFetchLabels.QueryParams, ComAtprotoTempFetchLabels.HandlerInput, ComAtprotoTempFetchLabels.HandlerOutput>): void;
    requestPhoneVerification<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoTempRequestPhoneVerification.QueryParams, ComAtprotoTempRequestPhoneVerification.HandlerInput, ComAtprotoTempRequestPhoneVerification.HandlerOutput>): void;
    revokeAccountCredentials<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComAtprotoTempRevokeAccountCredentials.QueryParams, ComAtprotoTempRevokeAccountCredentials.HandlerInput, ComAtprotoTempRevokeAccountCredentials.HandlerOutput>): void;
}
export declare class ComParaNS {
    _server: Server;
    actor: ComParaActorNS;
    civic: ComParaCivicNS;
    community: ComParaCommunityNS;
    discourse: ComParaDiscourseNS;
    feed: ComParaFeedNS;
    highlight: ComParaHighlightNS;
    social: ComParaSocialNS;
    constructor(server: Server);
}
export declare class ComParaActorNS {
    _server: Server;
    constructor(server: Server);
    getProfileStats<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaActorGetProfileStats.QueryParams, ComParaActorGetProfileStats.HandlerInput, ComParaActorGetProfileStats.HandlerOutput>): void;
}
export declare class ComParaCivicNS {
    _server: Server;
    constructor(server: Server);
    castVote<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCivicCastVote.QueryParams, ComParaCivicCastVote.HandlerInput, ComParaCivicCastVote.HandlerOutput>): void;
    getCabildeo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCivicGetCabildeo.QueryParams, ComParaCivicGetCabildeo.HandlerInput, ComParaCivicGetCabildeo.HandlerOutput>): void;
    listCabildeoPositions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCivicListCabildeoPositions.QueryParams, ComParaCivicListCabildeoPositions.HandlerInput, ComParaCivicListCabildeoPositions.HandlerOutput>): void;
    listCabildeos<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCivicListCabildeos.QueryParams, ComParaCivicListCabildeos.HandlerInput, ComParaCivicListCabildeos.HandlerOutput>): void;
    putLivePresence<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCivicPutLivePresence.QueryParams, ComParaCivicPutLivePresence.HandlerInput, ComParaCivicPutLivePresence.HandlerOutput>): void;
}
export declare class ComParaCommunityNS {
    _server: Server;
    constructor(server: Server);
    acceptDraftInvite<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCommunityAcceptDraftInvite.QueryParams, ComParaCommunityAcceptDraftInvite.HandlerInput, ComParaCommunityAcceptDraftInvite.HandlerOutput>): void;
    createBoard<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCommunityCreateBoard.QueryParams, ComParaCommunityCreateBoard.HandlerInput, ComParaCommunityCreateBoard.HandlerOutput>): void;
    getBoard<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCommunityGetBoard.QueryParams, ComParaCommunityGetBoard.HandlerInput, ComParaCommunityGetBoard.HandlerOutput>): void;
    getGovernance<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCommunityGetGovernance.QueryParams, ComParaCommunityGetGovernance.HandlerInput, ComParaCommunityGetGovernance.HandlerOutput>): void;
    join<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCommunityJoin.QueryParams, ComParaCommunityJoin.HandlerInput, ComParaCommunityJoin.HandlerOutput>): void;
    leave<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCommunityLeave.QueryParams, ComParaCommunityLeave.HandlerInput, ComParaCommunityLeave.HandlerOutput>): void;
    listBoards<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaCommunityListBoards.QueryParams, ComParaCommunityListBoards.HandlerInput, ComParaCommunityListBoards.HandlerOutput>): void;
}
export declare class ComParaDiscourseNS {
    _server: Server;
    constructor(server: Server);
    getSentiment<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaDiscourseGetSentiment.QueryParams, ComParaDiscourseGetSentiment.HandlerInput, ComParaDiscourseGetSentiment.HandlerOutput>): void;
    getSnapshot<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaDiscourseGetSnapshot.QueryParams, ComParaDiscourseGetSnapshot.HandlerInput, ComParaDiscourseGetSnapshot.HandlerOutput>): void;
    getTopics<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaDiscourseGetTopics.QueryParams, ComParaDiscourseGetTopics.HandlerInput, ComParaDiscourseGetTopics.HandlerOutput>): void;
}
export declare class ComParaFeedNS {
    _server: Server;
    constructor(server: Server);
    getAuthorFeed<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaFeedGetAuthorFeed.QueryParams, ComParaFeedGetAuthorFeed.HandlerInput, ComParaFeedGetAuthorFeed.HandlerOutput>): void;
    getPostThread<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaFeedGetPostThread.QueryParams, ComParaFeedGetPostThread.HandlerInput, ComParaFeedGetPostThread.HandlerOutput>): void;
    getPosts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaFeedGetPosts.QueryParams, ComParaFeedGetPosts.HandlerInput, ComParaFeedGetPosts.HandlerOutput>): void;
    getTimeline<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaFeedGetTimeline.QueryParams, ComParaFeedGetTimeline.HandlerInput, ComParaFeedGetTimeline.HandlerOutput>): void;
}
export declare class ComParaHighlightNS {
    _server: Server;
    constructor(server: Server);
    getHighlight<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaHighlightGetHighlight.QueryParams, ComParaHighlightGetHighlight.HandlerInput, ComParaHighlightGetHighlight.HandlerOutput>): void;
    listHighlights<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaHighlightListHighlights.QueryParams, ComParaHighlightListHighlights.HandlerInput, ComParaHighlightListHighlights.HandlerOutput>): void;
}
export declare class ComParaSocialNS {
    _server: Server;
    constructor(server: Server);
    getPostMeta<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ComParaSocialGetPostMeta.QueryParams, ComParaSocialGetPostMeta.HandlerInput, ComParaSocialGetPostMeta.HandlerOutput>): void;
}
export declare class ToolsNS {
    _server: Server;
    ozone: ToolsOzoneNS;
    constructor(server: Server);
}
export declare class ToolsOzoneNS {
    _server: Server;
    communication: ToolsOzoneCommunicationNS;
    hosting: ToolsOzoneHostingNS;
    moderation: ToolsOzoneModerationNS;
    safelink: ToolsOzoneSafelinkNS;
    server: ToolsOzoneServerNS;
    set: ToolsOzoneSetNS;
    setting: ToolsOzoneSettingNS;
    signature: ToolsOzoneSignatureNS;
    team: ToolsOzoneTeamNS;
    verification: ToolsOzoneVerificationNS;
    constructor(server: Server);
}
export declare class ToolsOzoneCommunicationNS {
    _server: Server;
    constructor(server: Server);
    createTemplate<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneCommunicationCreateTemplate.QueryParams, ToolsOzoneCommunicationCreateTemplate.HandlerInput, ToolsOzoneCommunicationCreateTemplate.HandlerOutput>): void;
    deleteTemplate<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneCommunicationDeleteTemplate.QueryParams, ToolsOzoneCommunicationDeleteTemplate.HandlerInput, ToolsOzoneCommunicationDeleteTemplate.HandlerOutput>): void;
    listTemplates<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneCommunicationListTemplates.QueryParams, ToolsOzoneCommunicationListTemplates.HandlerInput, ToolsOzoneCommunicationListTemplates.HandlerOutput>): void;
    updateTemplate<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneCommunicationUpdateTemplate.QueryParams, ToolsOzoneCommunicationUpdateTemplate.HandlerInput, ToolsOzoneCommunicationUpdateTemplate.HandlerOutput>): void;
}
export declare class ToolsOzoneHostingNS {
    _server: Server;
    constructor(server: Server);
    getAccountHistory<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneHostingGetAccountHistory.QueryParams, ToolsOzoneHostingGetAccountHistory.HandlerInput, ToolsOzoneHostingGetAccountHistory.HandlerOutput>): void;
}
export declare class ToolsOzoneModerationNS {
    _server: Server;
    constructor(server: Server);
    cancelScheduledActions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationCancelScheduledActions.QueryParams, ToolsOzoneModerationCancelScheduledActions.HandlerInput, ToolsOzoneModerationCancelScheduledActions.HandlerOutput>): void;
    emitEvent<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationEmitEvent.QueryParams, ToolsOzoneModerationEmitEvent.HandlerInput, ToolsOzoneModerationEmitEvent.HandlerOutput>): void;
    getAccountTimeline<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetAccountTimeline.QueryParams, ToolsOzoneModerationGetAccountTimeline.HandlerInput, ToolsOzoneModerationGetAccountTimeline.HandlerOutput>): void;
    getEvent<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetEvent.QueryParams, ToolsOzoneModerationGetEvent.HandlerInput, ToolsOzoneModerationGetEvent.HandlerOutput>): void;
    getRecord<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetRecord.QueryParams, ToolsOzoneModerationGetRecord.HandlerInput, ToolsOzoneModerationGetRecord.HandlerOutput>): void;
    getRecords<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetRecords.QueryParams, ToolsOzoneModerationGetRecords.HandlerInput, ToolsOzoneModerationGetRecords.HandlerOutput>): void;
    getRepo<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetRepo.QueryParams, ToolsOzoneModerationGetRepo.HandlerInput, ToolsOzoneModerationGetRepo.HandlerOutput>): void;
    getReporterStats<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetReporterStats.QueryParams, ToolsOzoneModerationGetReporterStats.HandlerInput, ToolsOzoneModerationGetReporterStats.HandlerOutput>): void;
    getRepos<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetRepos.QueryParams, ToolsOzoneModerationGetRepos.HandlerInput, ToolsOzoneModerationGetRepos.HandlerOutput>): void;
    getSubjects<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationGetSubjects.QueryParams, ToolsOzoneModerationGetSubjects.HandlerInput, ToolsOzoneModerationGetSubjects.HandlerOutput>): void;
    listScheduledActions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationListScheduledActions.QueryParams, ToolsOzoneModerationListScheduledActions.HandlerInput, ToolsOzoneModerationListScheduledActions.HandlerOutput>): void;
    queryEvents<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationQueryEvents.QueryParams, ToolsOzoneModerationQueryEvents.HandlerInput, ToolsOzoneModerationQueryEvents.HandlerOutput>): void;
    queryStatuses<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationQueryStatuses.QueryParams, ToolsOzoneModerationQueryStatuses.HandlerInput, ToolsOzoneModerationQueryStatuses.HandlerOutput>): void;
    scheduleAction<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationScheduleAction.QueryParams, ToolsOzoneModerationScheduleAction.HandlerInput, ToolsOzoneModerationScheduleAction.HandlerOutput>): void;
    searchRepos<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneModerationSearchRepos.QueryParams, ToolsOzoneModerationSearchRepos.HandlerInput, ToolsOzoneModerationSearchRepos.HandlerOutput>): void;
}
export declare class ToolsOzoneSafelinkNS {
    _server: Server;
    constructor(server: Server);
    addRule<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSafelinkAddRule.QueryParams, ToolsOzoneSafelinkAddRule.HandlerInput, ToolsOzoneSafelinkAddRule.HandlerOutput>): void;
    queryEvents<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSafelinkQueryEvents.QueryParams, ToolsOzoneSafelinkQueryEvents.HandlerInput, ToolsOzoneSafelinkQueryEvents.HandlerOutput>): void;
    queryRules<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSafelinkQueryRules.QueryParams, ToolsOzoneSafelinkQueryRules.HandlerInput, ToolsOzoneSafelinkQueryRules.HandlerOutput>): void;
    removeRule<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSafelinkRemoveRule.QueryParams, ToolsOzoneSafelinkRemoveRule.HandlerInput, ToolsOzoneSafelinkRemoveRule.HandlerOutput>): void;
    updateRule<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSafelinkUpdateRule.QueryParams, ToolsOzoneSafelinkUpdateRule.HandlerInput, ToolsOzoneSafelinkUpdateRule.HandlerOutput>): void;
}
export declare class ToolsOzoneServerNS {
    _server: Server;
    constructor(server: Server);
    getConfig<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneServerGetConfig.QueryParams, ToolsOzoneServerGetConfig.HandlerInput, ToolsOzoneServerGetConfig.HandlerOutput>): void;
}
export declare class ToolsOzoneSetNS {
    _server: Server;
    constructor(server: Server);
    addValues<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSetAddValues.QueryParams, ToolsOzoneSetAddValues.HandlerInput, ToolsOzoneSetAddValues.HandlerOutput>): void;
    deleteSet<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSetDeleteSet.QueryParams, ToolsOzoneSetDeleteSet.HandlerInput, ToolsOzoneSetDeleteSet.HandlerOutput>): void;
    deleteValues<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSetDeleteValues.QueryParams, ToolsOzoneSetDeleteValues.HandlerInput, ToolsOzoneSetDeleteValues.HandlerOutput>): void;
    getValues<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSetGetValues.QueryParams, ToolsOzoneSetGetValues.HandlerInput, ToolsOzoneSetGetValues.HandlerOutput>): void;
    querySets<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSetQuerySets.QueryParams, ToolsOzoneSetQuerySets.HandlerInput, ToolsOzoneSetQuerySets.HandlerOutput>): void;
    upsertSet<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSetUpsertSet.QueryParams, ToolsOzoneSetUpsertSet.HandlerInput, ToolsOzoneSetUpsertSet.HandlerOutput>): void;
}
export declare class ToolsOzoneSettingNS {
    _server: Server;
    constructor(server: Server);
    listOptions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSettingListOptions.QueryParams, ToolsOzoneSettingListOptions.HandlerInput, ToolsOzoneSettingListOptions.HandlerOutput>): void;
    removeOptions<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSettingRemoveOptions.QueryParams, ToolsOzoneSettingRemoveOptions.HandlerInput, ToolsOzoneSettingRemoveOptions.HandlerOutput>): void;
    upsertOption<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSettingUpsertOption.QueryParams, ToolsOzoneSettingUpsertOption.HandlerInput, ToolsOzoneSettingUpsertOption.HandlerOutput>): void;
}
export declare class ToolsOzoneSignatureNS {
    _server: Server;
    constructor(server: Server);
    findCorrelation<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSignatureFindCorrelation.QueryParams, ToolsOzoneSignatureFindCorrelation.HandlerInput, ToolsOzoneSignatureFindCorrelation.HandlerOutput>): void;
    findRelatedAccounts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSignatureFindRelatedAccounts.QueryParams, ToolsOzoneSignatureFindRelatedAccounts.HandlerInput, ToolsOzoneSignatureFindRelatedAccounts.HandlerOutput>): void;
    searchAccounts<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneSignatureSearchAccounts.QueryParams, ToolsOzoneSignatureSearchAccounts.HandlerInput, ToolsOzoneSignatureSearchAccounts.HandlerOutput>): void;
}
export declare class ToolsOzoneTeamNS {
    _server: Server;
    constructor(server: Server);
    addMember<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneTeamAddMember.QueryParams, ToolsOzoneTeamAddMember.HandlerInput, ToolsOzoneTeamAddMember.HandlerOutput>): void;
    deleteMember<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneTeamDeleteMember.QueryParams, ToolsOzoneTeamDeleteMember.HandlerInput, ToolsOzoneTeamDeleteMember.HandlerOutput>): void;
    listMembers<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneTeamListMembers.QueryParams, ToolsOzoneTeamListMembers.HandlerInput, ToolsOzoneTeamListMembers.HandlerOutput>): void;
    updateMember<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneTeamUpdateMember.QueryParams, ToolsOzoneTeamUpdateMember.HandlerInput, ToolsOzoneTeamUpdateMember.HandlerOutput>): void;
}
export declare class ToolsOzoneVerificationNS {
    _server: Server;
    constructor(server: Server);
    grantVerifications<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneVerificationGrantVerifications.QueryParams, ToolsOzoneVerificationGrantVerifications.HandlerInput, ToolsOzoneVerificationGrantVerifications.HandlerOutput>): void;
    listVerifications<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneVerificationListVerifications.QueryParams, ToolsOzoneVerificationListVerifications.HandlerInput, ToolsOzoneVerificationListVerifications.HandlerOutput>): void;
    revokeVerifications<A extends Auth = void>(cfg: MethodConfigOrHandler<A, ToolsOzoneVerificationRevokeVerifications.QueryParams, ToolsOzoneVerificationRevokeVerifications.HandlerInput, ToolsOzoneVerificationRevokeVerifications.HandlerOutput>): void;
}
//# sourceMappingURL=index.d.ts.map