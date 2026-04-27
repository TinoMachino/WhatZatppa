"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sitemap = exports.external = exports.blobResolver = exports.wellKnown = exports.health = void 0;
exports.default = default_1;
const lexicon_1 = require("../lexicon");
const lexicons_1 = require("../lexicon/lexicons");
const getProfile_1 = __importDefault(require("./app/bsky/actor/getProfile"));
const getProfiles_1 = __importDefault(require("./app/bsky/actor/getProfiles"));
const getSuggestions_1 = __importDefault(require("./app/bsky/actor/getSuggestions"));
const searchActors_1 = __importDefault(require("./app/bsky/actor/searchActors"));
const searchActorsTypeahead_1 = __importDefault(require("./app/bsky/actor/searchActorsTypeahead"));
const begin_1 = __importDefault(require("./app/bsky/ageassurance/begin"));
const getConfig_1 = __importDefault(require("./app/bsky/ageassurance/getConfig"));
const getState_1 = __importDefault(require("./app/bsky/ageassurance/getState"));
const createBookmark_1 = __importDefault(require("./app/bsky/bookmark/createBookmark"));
const deleteBookmark_1 = __importDefault(require("./app/bsky/bookmark/deleteBookmark"));
const getBookmarks_1 = __importDefault(require("./app/bsky/bookmark/getBookmarks"));
const dismissMatch_1 = __importDefault(require("./app/bsky/contact/dismissMatch"));
const getMatches_1 = __importDefault(require("./app/bsky/contact/getMatches"));
const getSyncStatus_1 = __importDefault(require("./app/bsky/contact/getSyncStatus"));
const importContacts_1 = __importDefault(require("./app/bsky/contact/importContacts"));
const removeData_1 = __importDefault(require("./app/bsky/contact/removeData"));
const sendNotification_1 = __importDefault(require("./app/bsky/contact/sendNotification"));
const startPhoneVerification_1 = __importDefault(require("./app/bsky/contact/startPhoneVerification"));
const verifyPhone_1 = __importDefault(require("./app/bsky/contact/verifyPhone"));
const createDraft_1 = __importDefault(require("./app/bsky/draft/createDraft"));
const deleteDraft_1 = __importDefault(require("./app/bsky/draft/deleteDraft"));
const getDrafts_1 = __importDefault(require("./app/bsky/draft/getDrafts"));
const updateDraft_1 = __importDefault(require("./app/bsky/draft/updateDraft"));
const getActorFeeds_1 = __importDefault(require("./app/bsky/feed/getActorFeeds"));
const getActorLikes_1 = __importDefault(require("./app/bsky/feed/getActorLikes"));
const getAuthorFeed_1 = __importDefault(require("./app/bsky/feed/getAuthorFeed"));
const getFeed_1 = __importDefault(require("./app/bsky/feed/getFeed"));
const getFeedGenerator_1 = __importDefault(require("./app/bsky/feed/getFeedGenerator"));
const getFeedGenerators_1 = __importDefault(require("./app/bsky/feed/getFeedGenerators"));
const getLikes_1 = __importDefault(require("./app/bsky/feed/getLikes"));
const getListFeed_1 = __importDefault(require("./app/bsky/feed/getListFeed"));
const getPostThread_1 = __importDefault(require("./app/bsky/feed/getPostThread"));
const getPosts_1 = __importDefault(require("./app/bsky/feed/getPosts"));
const getQuotes_1 = __importDefault(require("./app/bsky/feed/getQuotes"));
const getRepostedBy_1 = __importDefault(require("./app/bsky/feed/getRepostedBy"));
const getSuggestedFeeds_1 = __importDefault(require("./app/bsky/feed/getSuggestedFeeds"));
const getTimeline_1 = __importDefault(require("./app/bsky/feed/getTimeline"));
const searchPosts_1 = __importDefault(require("./app/bsky/feed/searchPosts"));
const getActorStarterPacks_1 = __importDefault(require("./app/bsky/graph/getActorStarterPacks"));
const getBlocks_1 = __importDefault(require("./app/bsky/graph/getBlocks"));
const getFollowers_1 = __importDefault(require("./app/bsky/graph/getFollowers"));
const getFollows_1 = __importDefault(require("./app/bsky/graph/getFollows"));
const getKnownFollowers_1 = __importDefault(require("./app/bsky/graph/getKnownFollowers"));
const getList_1 = __importDefault(require("./app/bsky/graph/getList"));
const getListBlocks_1 = __importDefault(require("./app/bsky/graph/getListBlocks"));
const getListMutes_1 = __importDefault(require("./app/bsky/graph/getListMutes"));
const getLists_1 = __importDefault(require("./app/bsky/graph/getLists"));
const getListsWithMembership_1 = __importDefault(require("./app/bsky/graph/getListsWithMembership"));
const getMutes_1 = __importDefault(require("./app/bsky/graph/getMutes"));
const getRelationships_1 = __importDefault(require("./app/bsky/graph/getRelationships"));
const getStarterPack_1 = __importDefault(require("./app/bsky/graph/getStarterPack"));
const getStarterPacks_1 = __importDefault(require("./app/bsky/graph/getStarterPacks"));
const getStarterPacksWithMembership_1 = __importDefault(require("./app/bsky/graph/getStarterPacksWithMembership"));
const getSuggestedFollowsByActor_1 = __importDefault(require("./app/bsky/graph/getSuggestedFollowsByActor"));
const muteActor_1 = __importDefault(require("./app/bsky/graph/muteActor"));
const muteActorList_1 = __importDefault(require("./app/bsky/graph/muteActorList"));
const muteThread_1 = __importDefault(require("./app/bsky/graph/muteThread"));
const searchStarterPacks_1 = __importDefault(require("./app/bsky/graph/searchStarterPacks"));
const unmuteActor_1 = __importDefault(require("./app/bsky/graph/unmuteActor"));
const unmuteActorList_1 = __importDefault(require("./app/bsky/graph/unmuteActorList"));
const unmuteThread_1 = __importDefault(require("./app/bsky/graph/unmuteThread"));
const getServices_1 = __importDefault(require("./app/bsky/labeler/getServices"));
const getPreferences_1 = __importDefault(require("./app/bsky/notification/getPreferences"));
const getUnreadCount_1 = __importDefault(require("./app/bsky/notification/getUnreadCount"));
const listActivitySubscriptions_1 = __importDefault(require("./app/bsky/notification/listActivitySubscriptions"));
const listNotifications_1 = __importDefault(require("./app/bsky/notification/listNotifications"));
const putActivitySubscription_1 = __importDefault(require("./app/bsky/notification/putActivitySubscription"));
const putPreferences_1 = __importDefault(require("./app/bsky/notification/putPreferences"));
const putPreferencesV2_1 = __importDefault(require("./app/bsky/notification/putPreferencesV2"));
const registerPush_1 = __importDefault(require("./app/bsky/notification/registerPush"));
const unregisterPush_1 = __importDefault(require("./app/bsky/notification/unregisterPush"));
const updateSeen_1 = __importDefault(require("./app/bsky/notification/updateSeen"));
const getAgeAssuranceState_1 = __importDefault(require("./app/bsky/unspecced/getAgeAssuranceState"));
const getConfig_2 = __importDefault(require("./app/bsky/unspecced/getConfig"));
const getOnboardingSuggestedStarterPacks_1 = __importDefault(require("./app/bsky/unspecced/getOnboardingSuggestedStarterPacks"));
const getPopularFeedGenerators_1 = __importDefault(require("./app/bsky/unspecced/getPopularFeedGenerators"));
const getPostThreadOtherV2_1 = __importDefault(require("./app/bsky/unspecced/getPostThreadOtherV2"));
const getPostThreadV2_1 = __importDefault(require("./app/bsky/unspecced/getPostThreadV2"));
const getSuggestedFeeds_2 = __importDefault(require("./app/bsky/unspecced/getSuggestedFeeds"));
const getSuggestedOnboardingUsers_1 = __importDefault(require("./app/bsky/unspecced/getSuggestedOnboardingUsers"));
const getSuggestedStarterPacks_1 = __importDefault(require("./app/bsky/unspecced/getSuggestedStarterPacks"));
const getSuggestedUsers_1 = __importDefault(require("./app/bsky/unspecced/getSuggestedUsers"));
const getSuggestedUsersForDiscover_1 = __importDefault(require("./app/bsky/unspecced/getSuggestedUsersForDiscover"));
const getSuggestedUsersForExplore_1 = __importDefault(require("./app/bsky/unspecced/getSuggestedUsersForExplore"));
const getSuggestedUsersForSeeMore_1 = __importDefault(require("./app/bsky/unspecced/getSuggestedUsersForSeeMore"));
const getTaggedSuggestions_1 = __importDefault(require("./app/bsky/unspecced/getTaggedSuggestions"));
const getTrendingTopics_1 = __importDefault(require("./app/bsky/unspecced/getTrendingTopics"));
const getTrends_1 = __importDefault(require("./app/bsky/unspecced/getTrends"));
const initAgeAssurance_1 = __importDefault(require("./app/bsky/unspecced/initAgeAssurance"));
const getAccountInfos_1 = __importDefault(require("./com/atproto/admin/getAccountInfos"));
const getSubjectStatus_1 = __importDefault(require("./com/atproto/admin/getSubjectStatus"));
const updateSubjectStatus_1 = __importDefault(require("./com/atproto/admin/updateSubjectStatus"));
const resolveHandle_1 = __importDefault(require("./com/atproto/identity/resolveHandle"));
const queryLabels_1 = __importDefault(require("./com/atproto/label/queryLabels"));
const getRecord_1 = __importDefault(require("./com/atproto/repo/getRecord"));
const fetchLabels_1 = __importDefault(require("./com/atproto/temp/fetchLabels"));
const getProfileStats_1 = __importDefault(require("./com/para/actor/getProfileStats"));
const getCabildeo_1 = __importDefault(require("./com/para/civic/getCabildeo"));
const getPolicyTally_1 = __importDefault(require("./com/para/civic/getPolicyTally"));
const listCabildeoPositions_1 = __importDefault(require("./com/para/civic/listCabildeoPositions"));
const listCabildeos_1 = __importDefault(require("./com/para/civic/listCabildeos"));
const listDelegationCandidates_1 = __importDefault(require("./com/para/civic/listDelegationCandidates"));
const putLivePresence_1 = __importDefault(require("./com/para/civic/putLivePresence"));
const getBoard_1 = __importDefault(require("./com/para/community/getBoard"));
const getGovernance_1 = __importDefault(require("./com/para/community/getGovernance"));
const listBoards_1 = __importDefault(require("./com/para/community/listBoards"));
const listMembers_1 = __importDefault(require("./com/para/community/listMembers"));
const getSentiment_1 = __importDefault(require("./com/para/discourse/getSentiment"));
const getSnapshot_1 = __importDefault(require("./com/para/discourse/getSnapshot"));
const getTopics_1 = __importDefault(require("./com/para/discourse/getTopics"));
const getAuthorFeed_2 = __importDefault(require("./com/para/feed/getAuthorFeed"));
const getPostThread_2 = __importDefault(require("./com/para/feed/getPostThread"));
const getPosts_2 = __importDefault(require("./com/para/feed/getPosts"));
const getTimeline_2 = __importDefault(require("./com/para/feed/getTimeline"));
const getHighlight_1 = __importDefault(require("./com/para/highlight/getHighlight"));
const listHighlights_1 = __importDefault(require("./com/para/highlight/listHighlights"));
const getPostSubscription_1 = __importDefault(require("./com/para/notification/getPostSubscription"));
const putPostSubscription_1 = __importDefault(require("./com/para/notification/putPostSubscription"));
const getPostMeta_1 = __importDefault(require("./com/para/social/getPostMeta"));
exports.health = __importStar(require("./health"));
exports.wellKnown = __importStar(require("./well-known"));
exports.blobResolver = __importStar(require("./blob-resolver"));
exports.external = __importStar(require("./external"));
exports.sitemap = __importStar(require("./sitemap"));
function default_1(server, ctx) {
    const notificationLexicons = [
        {
            lexicon: 1,
            id: 'com.para.notification.getPostSubscription',
            defs: {
                main: {
                    type: 'query',
                    description: "Get the requesting viewer's notification subscription for a post.",
                    parameters: {
                        type: 'params',
                        required: ['post'],
                        properties: {
                            post: { type: 'string', format: 'at-uri' },
                        },
                    },
                    output: {
                        encoding: 'application/json',
                        schema: {
                            type: 'object',
                            required: ['post', 'reply', 'quote'],
                            properties: {
                                post: { type: 'string', format: 'at-uri' },
                                reply: { type: 'boolean' },
                                quote: { type: 'boolean' },
                                indexedAt: { type: 'string', format: 'datetime' },
                            },
                        },
                    },
                },
            },
        },
        {
            lexicon: 1,
            id: 'com.para.notification.putPostSubscription',
            defs: {
                main: {
                    type: 'procedure',
                    description: 'Enable or disable notification subscriptions for a post. Requires auth.',
                    input: {
                        encoding: 'application/json',
                        schema: {
                            type: 'object',
                            required: ['post', 'reply', 'quote'],
                            properties: {
                                post: { type: 'string', format: 'at-uri' },
                                reply: { type: 'boolean' },
                                quote: { type: 'boolean' },
                            },
                        },
                    },
                    output: {
                        encoding: 'application/json',
                        schema: {
                            type: 'object',
                            required: ['post', 'reply', 'quote'],
                            properties: {
                                post: { type: 'string', format: 'at-uri' },
                                reply: { type: 'boolean' },
                                quote: { type: 'boolean' },
                                indexedAt: { type: 'string', format: 'datetime' },
                            },
                        },
                    },
                },
            },
        },
    ];
    server.addLexicons(lexicons_1.schemas);
    server.addLexicons(notificationLexicons);
    const paraServer = { xrpc: server };
    const para = new lexicon_1.ComParaNS(paraServer);
    paraServer.com = { para };
    para.notification = {
        getPostSubscription: (cfg) => paraServer.xrpc.method('com.para.notification.getPostSubscription', cfg),
        putPostSubscription: (cfg) => paraServer.xrpc.method('com.para.notification.putPostSubscription', cfg),
    };
    // app.bsky
    (0, getTimeline_1.default)(server, ctx);
    (0, createBookmark_1.default)(server, ctx);
    (0, deleteBookmark_1.default)(server, ctx);
    (0, getBookmarks_1.default)(server, ctx);
    (0, createDraft_1.default)(server, ctx);
    (0, deleteDraft_1.default)(server, ctx);
    (0, getDrafts_1.default)(server, ctx);
    (0, updateDraft_1.default)(server, ctx);
    (0, dismissMatch_1.default)(server, ctx);
    (0, getMatches_1.default)(server, ctx);
    (0, getSyncStatus_1.default)(server, ctx);
    (0, importContacts_1.default)(server, ctx);
    (0, removeData_1.default)(server, ctx);
    (0, sendNotification_1.default)(server, ctx);
    (0, startPhoneVerification_1.default)(server, ctx);
    (0, verifyPhone_1.default)(server, ctx);
    (0, getActorFeeds_1.default)(server, ctx);
    (0, getSuggestedFeeds_1.default)(server, ctx);
    (0, getAuthorFeed_1.default)(server, ctx);
    (0, getFeed_1.default)(server, ctx);
    (0, getFeedGenerator_1.default)(server, ctx);
    (0, getFeedGenerators_1.default)(server, ctx);
    (0, getLikes_1.default)(server, ctx);
    (0, getListFeed_1.default)(server, ctx);
    (0, getQuotes_1.default)(server, ctx);
    (0, getPostThread_1.default)(server, ctx);
    (0, getPostThreadOtherV2_1.default)(server, ctx);
    (0, getPostThreadV2_1.default)(server, ctx);
    (0, getPosts_1.default)(server, ctx);
    (0, searchPosts_1.default)(server, ctx);
    (0, getActorLikes_1.default)(server, ctx);
    (0, getProfile_1.default)(server, ctx);
    (0, getProfiles_1.default)(server, ctx);
    (0, getRepostedBy_1.default)(server, ctx);
    (0, getActorStarterPacks_1.default)(server, ctx);
    (0, getBlocks_1.default)(server, ctx);
    (0, getListBlocks_1.default)(server, ctx);
    (0, getFollowers_1.default)(server, ctx);
    (0, getKnownFollowers_1.default)(server, ctx);
    (0, getFollows_1.default)(server, ctx);
    (0, getList_1.default)(server, ctx);
    (0, getLists_1.default)(server, ctx);
    (0, getListsWithMembership_1.default)(server, ctx);
    (0, getListMutes_1.default)(server, ctx);
    (0, getMutes_1.default)(server, ctx);
    (0, getRelationships_1.default)(server, ctx);
    (0, getStarterPack_1.default)(server, ctx);
    (0, getStarterPacks_1.default)(server, ctx);
    (0, getStarterPacksWithMembership_1.default)(server, ctx);
    (0, searchStarterPacks_1.default)(server, ctx);
    (0, muteActor_1.default)(server, ctx);
    (0, unmuteActor_1.default)(server, ctx);
    (0, muteActorList_1.default)(server, ctx);
    (0, unmuteActorList_1.default)(server, ctx);
    (0, muteThread_1.default)(server, ctx);
    (0, unmuteThread_1.default)(server, ctx);
    (0, getSuggestedFollowsByActor_1.default)(server, ctx);
    (0, getTrendingTopics_1.default)(server, ctx);
    (0, getTrends_1.default)(server, ctx);
    (0, getOnboardingSuggestedStarterPacks_1.default)(server, ctx);
    (0, getSuggestedOnboardingUsers_1.default)(server, ctx);
    (0, getSuggestedStarterPacks_1.default)(server, ctx);
    (0, getSuggestedUsers_1.default)(server, ctx);
    (0, getSuggestedUsersForDiscover_1.default)(server, ctx);
    (0, getSuggestedUsersForExplore_1.default)(server, ctx);
    (0, getSuggestedUsersForSeeMore_1.default)(server, ctx);
    (0, getSuggestedFeeds_2.default)(server, ctx);
    (0, getServices_1.default)(server, ctx);
    (0, searchActors_1.default)(server, ctx);
    (0, searchActorsTypeahead_1.default)(server, ctx);
    (0, getSuggestions_1.default)(server, ctx);
    (0, getPreferences_1.default)(server, ctx);
    (0, getUnreadCount_1.default)(server, ctx);
    (0, listActivitySubscriptions_1.default)(server, ctx);
    (0, listNotifications_1.default)(server, ctx);
    (0, putActivitySubscription_1.default)(server, ctx);
    (0, updateSeen_1.default)(server, ctx);
    (0, putPreferences_1.default)(server, ctx);
    (0, putPreferencesV2_1.default)(server, ctx);
    (0, registerPush_1.default)(server, ctx);
    (0, unregisterPush_1.default)(server, ctx);
    (0, getConfig_2.default)(server, ctx);
    (0, getPopularFeedGenerators_1.default)(server, ctx);
    (0, getTaggedSuggestions_1.default)(server, ctx);
    (0, getAgeAssuranceState_1.default)(server, ctx);
    (0, initAgeAssurance_1.default)(server, ctx);
    (0, getConfig_1.default)(server, ctx);
    (0, getState_1.default)(server, ctx);
    (0, begin_1.default)(server, ctx);
    // com.atproto
    (0, getSubjectStatus_1.default)(server, ctx);
    (0, updateSubjectStatus_1.default)(server, ctx);
    (0, getAccountInfos_1.default)(server, ctx);
    (0, resolveHandle_1.default)(server, ctx);
    (0, getRecord_1.default)(server, ctx);
    (0, fetchLabels_1.default)(server, ctx);
    (0, queryLabels_1.default)(server, ctx);
    // com.para
    (0, getProfileStats_1.default)(paraServer, ctx);
    (0, listCabildeos_1.default)(paraServer, ctx);
    (0, getCabildeo_1.default)(paraServer, ctx);
    (0, getPolicyTally_1.default)(paraServer, ctx);
    (0, listCabildeoPositions_1.default)(paraServer, ctx);
    (0, listDelegationCandidates_1.default)(paraServer, ctx);
    (0, putLivePresence_1.default)(paraServer, ctx);
    (0, getBoard_1.default)(paraServer, ctx);
    (0, getGovernance_1.default)(paraServer, ctx);
    (0, listBoards_1.default)(paraServer, ctx);
    (0, listMembers_1.default)(paraServer, ctx);
    (0, listHighlights_1.default)(paraServer, ctx);
    (0, getHighlight_1.default)(paraServer, ctx);
    (0, getPostSubscription_1.default)(paraServer, ctx);
    (0, putPostSubscription_1.default)(paraServer, ctx);
    (0, getAuthorFeed_2.default)(paraServer, ctx);
    (0, getPostThread_2.default)(paraServer, ctx);
    (0, getPosts_2.default)(paraServer, ctx);
    (0, getTimeline_2.default)(paraServer, ctx);
    (0, getPostMeta_1.default)(paraServer, ctx);
    (0, getSnapshot_1.default)(paraServer, ctx);
    (0, getTopics_1.default)(paraServer, ctx);
    (0, getSentiment_1.default)(paraServer, ctx);
}
//# sourceMappingURL=index.js.map