"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Views = void 0;
const common_1 = require("@atproto/common");
const lex_1 = require("@atproto/lex");
const syntax_1 = require("@atproto/syntax");
const util_1 = require("../hydration/util");
const index_js_1 = require("../lexicons/index.js");
const uris_1 = require("../util/uris");
const threads_v2_1 = require("./threads-v2");
const types_js_1 = require("./types.js");
const util_2 = require("./util");
const notificationDeletedRecord = index_js_1.app.bsky.notification.defs.recordDeleted.$build({});
// Pre-computed CID for the `notificationDeletedRecord`.
const notificationDeletedRecordCid = 'bafyreidad6nyekfa4a67yfb573ptxiv6s7kyxyg2ra6qbbemcruadvtuim';
class Views {
    constructor(opts) {
        Object.defineProperty(this, "opts", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: opts
        });
        Object.defineProperty(this, "imgUriBuilder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.opts.imgUriBuilder
        });
        Object.defineProperty(this, "videoUriBuilder", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.opts.videoUriBuilder
        });
        Object.defineProperty(this, "indexedAtEpoch", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.opts.indexedAtEpoch
        });
        Object.defineProperty(this, "threadTagsBumpDown", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.opts.threadTagsBumpDown
        });
        Object.defineProperty(this, "threadTagsHide", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.opts.threadTagsHide
        });
        Object.defineProperty(this, "visibilityTagHide", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.opts.visibilityTagHide
        });
        Object.defineProperty(this, "visibilityTagRankPrefix", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: this.opts.visibilityTagRankPrefix
        });
    }
    // Actor
    // ------------
    actorIsNoHosted(did, state) {
        return (this.actorIsDeactivated(did, state) || this.actorIsTakendown(did, state));
    }
    actorIsDeactivated(did, state) {
        if (state.actors?.get(did)?.upstreamStatus === 'deactivated')
            return true;
        return false;
    }
    actorIsTakendown(did, state) {
        const actor = state.actors?.get(did);
        if (actor?.takedownRef)
            return true;
        if (actor?.upstreamStatus === 'takendown')
            return true;
        if (actor?.upstreamStatus === 'suspended')
            return true;
        if (state.labels?.get(did)?.isTakendown)
            return true;
        return false;
    }
    noUnauthenticatedPost(state, post) {
        const isNoUnauthenticated = post.author.labels?.some((l) => l.val === '!no-unauthenticated');
        return !state.ctx?.viewer && !!isNoUnauthenticated;
    }
    viewerBlockExists(did, state) {
        if (state.ctx?.skipViewerBlocks)
            return false;
        const viewer = state.profileViewers?.get(did);
        if (!viewer)
            return false;
        return !!(viewer.blockedBy ||
            viewer.blocking ||
            this.blockedByList(viewer, state) ||
            this.blockingByList(viewer, state));
    }
    viewerMuteExists(did, state) {
        const viewer = state.profileViewers?.get(did);
        if (!viewer)
            return false;
        return !!(viewer.muted || this.mutedByList(viewer, state));
    }
    blockingByList(viewer, state) {
        return (viewer.blockingByList && this.recordActive(viewer.blockingByList, state));
    }
    blockedByList(viewer, state) {
        return (viewer.blockedByList && this.recordActive(viewer.blockedByList, state));
    }
    mutedByList(viewer, state) {
        return viewer.mutedByList && this.recordActive(viewer.mutedByList, state);
    }
    recordActive(uri, state) {
        const did = (0, uris_1.uriToDid)(uri);
        const actor = state.actors?.get(did);
        if (!actor || this.actorIsTakendown(did, state)) {
            // actor may not be present when takedowns are eagerly applied during hydration.
            // so it's important to _try_ to hydrate the actor for records checked this way.
            return;
        }
        return uri;
    }
    viewerSeesNeedsReview({ did, uri }, state) {
        const { labels, profileViewers, ctx } = state;
        did = did || (uri && (0, uris_1.uriToDid)(uri));
        if (!did) {
            return true;
        }
        if (labels?.get(did)?.needsReview ||
            (uri && labels?.get(uri)?.needsReview)) {
            // content marked as needs review
            return ctx?.viewer === did || !!profileViewers?.get(did)?.following;
        }
        return true;
    }
    replyIsHiddenByThreadgate(replyUri, rootPostUri, state) {
        const threadgateUri = (0, uris_1.postUriToThreadgateUri)(rootPostUri);
        const threadgate = state.threadgates?.get(threadgateUri);
        return !!threadgate?.record?.hiddenReplies?.includes(replyUri);
    }
    profileDetailed(did, state) {
        const actor = state.actors?.get(did);
        if (!actor)
            return;
        const baseView = this.profile(did, state);
        if (!baseView)
            return;
        const knownFollowers = this.knownFollowers(did, state);
        const profileAggs = state.profileAggs?.get(did);
        return {
            ...baseView,
            website: this.profileWebsite(did, state),
            viewer: baseView.viewer
                ? {
                    ...baseView.viewer,
                    knownFollowers,
                }
                : undefined,
            banner: actor.profile?.banner
                ? this.imgUriBuilder.getPresetUri('banner', did, (0, lex_1.getBlobCidString)(actor.profile.banner))
                : undefined,
            followersCount: profileAggs?.followers ?? 0,
            followsCount: profileAggs?.follows ?? 0,
            postsCount: profileAggs?.posts ?? 0,
            associated: {
                lists: profileAggs?.lists,
                feedgens: profileAggs?.feeds,
                starterPacks: profileAggs?.starterPacks,
                labeler: actor.isLabeler,
                chat: this.profileAssociatedChat(actor),
                activitySubscription: this.profileAssociatedActivitySubscription(actor),
                germ: actor.germ?.record.messageMe
                    ? {
                        showButtonTo: actor.germ.record.messageMe.showButtonTo,
                        messageMeUrl: actor.germ.record.messageMe.messageMeUrl,
                    }
                    : undefined,
            },
            joinedViaStarterPack: actor.profile?.joinedViaStarterPack
                ? this.starterPackBasic(actor.profile.joinedViaStarterPack.uri, state)
                : undefined,
            pinnedPost: (0, uris_1.safePinnedPost)(actor.profile?.pinnedPost),
        };
    }
    profile(did, state) {
        const actor = state.actors?.get(did);
        if (!actor)
            return;
        const basicView = this.profileBasic(did, state);
        if (!basicView)
            return;
        return {
            ...basicView,
            description: actor.profile?.description || undefined,
            indexedAt: actor.indexedAt && actor.sortedAt
                ? this.indexedAt({
                    sortedAt: actor.sortedAt,
                    indexedAt: actor.indexedAt,
                }).toISOString()
                : undefined,
        };
    }
    profileBasic(did, state) {
        const actor = state.actors?.get(did);
        if (!actor)
            return;
        const profileUri = syntax_1.AtUri.make(did, index_js_1.app.bsky.actor.profile.$nsid, 'self').toString();
        const labels = [
            ...(state.labels?.getBySubject(did) ?? []),
            ...(state.labels?.getBySubject(profileUri) ?? []),
            ...this.selfLabels({
                uri: profileUri,
                cid: actor.profileCid?.toString(),
                record: actor.profile,
            }),
        ];
        return {
            did,
            handle: actor.handle ?? syntax_1.INVALID_HANDLE,
            displayName: actor.profile?.displayName,
            pronouns: actor.profile?.pronouns,
            avatar: actor.profile?.avatar
                ? this.imgUriBuilder.getPresetUri('avatar', did, (0, lex_1.getBlobCidString)(actor.profile.avatar))
                : undefined,
            // associated.feedgens and associated.lists info not necessarily included
            // on profile and profile-basic views, but should be on profile-detailed.
            associated: {
                labeler: actor.isLabeler ? true : undefined,
                chat: this.profileAssociatedChat(actor),
                activitySubscription: this.profileAssociatedActivitySubscription(actor),
                germ: actor.germ?.record.messageMe
                    ? {
                        showButtonTo: actor.germ.record.messageMe.showButtonTo,
                        messageMeUrl: actor.germ.record.messageMe.messageMeUrl,
                    }
                    : undefined,
            },
            viewer: this.profileViewer(did, state),
            labels,
            createdAt: actor.createdAt
                ? actor.createdAt.toISOString()
                : undefined,
            verification: this.verification(did, state),
            status: this.status(did, state),
            cabildeoLive: this.profileCabildeoLive(did, state),
            debug: state.ctx?.includeDebugField ? actor.debug : undefined,
        };
    }
    profileCabildeoLive(did, state) {
        const actor = state.actors?.get(did);
        if (!actor?.cabildeoLive)
            return undefined;
        const status = actor.status;
        if (status && !status.takedownRef) {
            const { record, sortedAt } = status;
            const minDuration = 5 * common_1.MINUTE;
            const maxDuration = 4 * common_1.HOUR;
            const expiresAtMs = record.durationMinutes
                ? sortedAt.getTime() +
                    Math.max(Math.min(record.durationMinutes * common_1.MINUTE, maxDuration), minDuration)
                : undefined;
            const statusIsActive = expiresAtMs ? expiresAtMs > Date.now() : true;
            const embed = record.embed;
            if (statusIsActive && embed && (0, types_js_1.isExternalEmbedType)(embed)) {
                if (embed.external.uri !== actor.cabildeoLive.liveUri) {
                    return undefined;
                }
            }
            else if (statusIsActive && embed) {
                return undefined;
            }
        }
        return {
            $type: 'com.para.civic.defs#cabildeoLive',
            cabildeoUri: actor.cabildeoLive.cabildeoUri,
            community: actor.cabildeoLive.community,
            phase: actor.cabildeoLive.phase,
            expiresAt: actor.cabildeoLive.expiresAt,
        };
    }
    profileAssociatedChat(actor) {
        if (!actor.allowIncomingChatsFrom)
            return undefined;
        return {
            allowIncoming: actor.allowIncomingChatsFrom,
            allowGroupInvites: actor.allowGroupChatInvitesFrom,
        };
    }
    profileAssociatedActivitySubscription(actor) {
        return { allowSubscriptions: actor.allowActivitySubscriptionsFrom };
    }
    profileKnownFollowers(did, state) {
        const actor = state.actors?.get(did);
        if (!actor)
            return;
        const baseView = this.profile(did, state);
        if (!baseView)
            return;
        const knownFollowers = this.knownFollowers(did, state);
        return {
            ...baseView,
            viewer: baseView.viewer
                ? {
                    ...baseView.viewer,
                    knownFollowers,
                }
                : undefined,
        };
    }
    profileViewer(did, state) {
        const viewer = state.profileViewers?.get(did);
        if (!viewer)
            return;
        const blockedByList = this.blockedByList(viewer, state);
        const blockedByUri = viewer.blockedBy || blockedByList;
        const blockingByList = this.blockingByList(viewer, state);
        const blockingUri = viewer.blocking || blockingByList;
        const block = !!blockedByUri || !!blockingUri;
        const mutedByList = this.mutedByList(viewer, state);
        return {
            muted: !!(viewer.muted || mutedByList),
            mutedByList: mutedByList ? this.listBasic(mutedByList, state) : undefined,
            blockedBy: !!blockedByUri,
            blocking: blockingUri,
            blockingByList: blockingByList
                ? this.listBasic(blockingByList, state)
                : undefined,
            following: viewer.following && !block ? viewer.following : undefined,
            followedBy: viewer.followedBy && !block ? viewer.followedBy : undefined,
            activitySubscription: this.profileViewerActivitySubscription(viewer, did, state),
        };
    }
    profileViewerActivitySubscription(profileViewer, did, state) {
        const actor = state.actors?.get(did);
        if (!actor)
            return undefined;
        const activitySubscription = state.activitySubscriptions?.get(did);
        if (!activitySubscription)
            return undefined;
        const allowFrom = actor.allowActivitySubscriptionsFrom;
        const actorFollowsViewer = !!profileViewer.followedBy;
        const viewerFollowsActor = !!profileViewer.following;
        if ((allowFrom === 'followers' && viewerFollowsActor) ||
            (allowFrom === 'mutuals' && actorFollowsViewer && viewerFollowsActor)) {
            return activitySubscription;
        }
        return undefined;
    }
    profileWebsite(did, state) {
        const actor = state.actors?.get(did);
        if (!actor?.profile?.website)
            return;
        const { website } = actor.profile;
        // The record property accepts any URI, but we don't want
        // to pass the client any schemes other than HTTPS.
        return website.startsWith('https://') ? website : undefined;
    }
    knownFollowers(did, state) {
        const knownFollowers = state.knownFollowers?.get(did);
        if (!knownFollowers)
            return;
        const blocks = state.bidirectionalBlocks?.get(did);
        const followers = (0, common_1.mapDefined)(knownFollowers.followers, (followerDid) => {
            if (this.viewerBlockExists(followerDid, state)) {
                return undefined;
            }
            if (blocks?.get(followerDid)) {
                return undefined;
            }
            if (this.actorIsNoHosted(followerDid, state)) {
                // @TODO only needed right now to work around getProfile's { includeTakedowns: true }
                return undefined;
            }
            return this.profileBasic(followerDid, state);
        });
        return { count: knownFollowers.count, followers };
    }
    verification(did, state) {
        const actor = state.actors?.get(did);
        if (!actor)
            return;
        // Currently, the handle comes as "handle.invalid" from the production dataplane.
        // But the contract allows for empty handle, so we cover both cases.
        if (!actor.handle || actor.handle === syntax_1.INVALID_HANDLE)
            return;
        const isImpersonation = state.labels?.get(did)?.isImpersonation;
        const verifications = actor.verifications.map(({ issuer, uri, displayName, handle, createdAt }) => {
            // @NOTE: We don't factor-in impersonation when evaluating the validity of each verification,
            // only in the overall profile verification validity.
            const isValid = !!displayName &&
                displayName === actor.profile?.displayName &&
                !!handle &&
                handle === actor.handle;
            return {
                issuer,
                uri,
                isValid,
                createdAt,
            };
        });
        const hasValidVerification = verifications.some((v) => v.isValid);
        const verifiedStatus = verifications.length
            ? hasValidVerification && !isImpersonation
                ? 'valid'
                : 'invalid'
            : 'none';
        const trustedVerifierStatus = actor.trustedVerifier
            ? isImpersonation
                ? 'invalid'
                : 'valid'
            : 'none';
        if (verifications.length === 0 &&
            verifiedStatus === 'none' &&
            trustedVerifierStatus === 'none') {
            return undefined;
        }
        return {
            verifications,
            verifiedStatus,
            trustedVerifierStatus,
        };
    }
    status(did, state) {
        const actor = state.actors?.get(did);
        if (!actor?.status)
            return;
        const isViewerStatusOwner = did === state.ctx?.viewer;
        const { status } = actor;
        const { record, sortedAt, cid, takedownRef } = status;
        const isTakenDown = !!takedownRef;
        /*
         * Manual filter for takendown status records. If this is ever removed, we
         * need to reinstate `includeTakedowns` handling in the `Actor.getActors`
         * hydrator.
         */
        if (isTakenDown && !isViewerStatusOwner) {
            return undefined;
        }
        const uri = syntax_1.AtUri.make(did, index_js_1.app.bsky.actor.status.$nsid, 'self').toString();
        const labels = state.labels?.getBySubject(uri);
        const minDuration = 5 * common_1.MINUTE;
        const maxDuration = 4 * common_1.HOUR;
        const expiresAtMs = record.durationMinutes
            ? sortedAt.getTime() +
                Math.max(Math.min(record.durationMinutes * common_1.MINUTE, maxDuration), minDuration)
            : undefined;
        const expiresAt = expiresAtMs
            ? new Date(expiresAtMs).toISOString()
            : undefined;
        const isActive = expiresAtMs ? expiresAtMs > Date.now() : undefined;
        const response = {
            uri,
            cid,
            record: record,
            status: record.status,
            embed: record.embed && (0, types_js_1.isExternalEmbedType)(record.embed)
                ? this.externalEmbed(did, record.embed)
                : undefined,
            labels,
            expiresAt,
            isActive,
        };
        if (isViewerStatusOwner) {
            response.isDisabled = isTakenDown;
        }
        return response;
    }
    blockedProfileViewer(did, state) {
        const viewer = state.profileViewers?.get(did);
        if (!viewer)
            return;
        const blockedByUri = viewer.blockedBy || this.blockedByList(viewer, state);
        const blockingUri = viewer.blocking || this.blockingByList(viewer, state);
        return {
            blockedBy: !!blockedByUri,
            blocking: blockingUri,
        };
    }
    // Graph
    // ------------
    list(uri, state) {
        const creatorDid = (0, uris_1.uriToDid)(uri);
        const list = state.lists?.get(uri);
        if (!list)
            return;
        const creator = this.profile(creatorDid, state);
        if (!creator)
            return;
        const basicView = this.listBasic(uri, state);
        if (!basicView)
            return;
        return {
            ...basicView,
            creator,
            description: list.record.description,
            descriptionFacets: list.record.descriptionFacets,
            indexedAt: this.indexedAt(list).toISOString(),
        };
    }
    listBasic(uri, state) {
        const list = state.lists?.get(uri);
        if (!list) {
            return undefined;
        }
        const listAgg = state.listAggs?.get(uri);
        const listViewer = state.listViewers?.get(uri);
        const labels = state.labels?.getBySubject(uri) ?? [];
        const creator = (0, uris_1.uriToDid)(uri);
        return {
            uri,
            cid: list.cid,
            name: list.record.name,
            purpose: list.record.purpose,
            avatar: list.record.avatar
                ? this.imgUriBuilder.getPresetUri('avatar', creator, (0, lex_1.getBlobCidString)(list.record.avatar))
                : undefined,
            listItemCount: listAgg?.listItems ?? 0,
            indexedAt: this.indexedAt(list).toISOString(),
            labels,
            viewer: listViewer
                ? {
                    muted: !!listViewer.viewerMuted,
                    blocked: listViewer.viewerListBlockUri,
                }
                : undefined,
        };
    }
    listItemView(uri, did, state) {
        const subject = this.profile(did, state);
        if (!subject)
            return;
        return { uri, subject };
    }
    starterPackBasic(uri, state) {
        const sp = state.starterPacks?.get(uri);
        if (!sp)
            return;
        const parsedUri = new syntax_1.AtUri(uri);
        const creator = this.profileBasic(parsedUri.did, state);
        if (!creator)
            return;
        const agg = state.starterPackAggs?.get(uri);
        const labels = state.labels?.getBySubject(uri) ?? [];
        return {
            uri,
            cid: sp.cid,
            record: sp.record,
            creator,
            joinedAllTimeCount: agg?.joinedAllTime ?? 0,
            joinedWeekCount: agg?.joinedWeek ?? 0,
            labels,
            indexedAt: this.indexedAt(sp).toISOString(),
        };
    }
    starterPack(uri, state) {
        const sp = state.starterPacks?.get(uri);
        const basicView = this.starterPackBasic(uri, state);
        if (!sp || !basicView)
            return;
        const agg = state.starterPackAggs?.get(uri);
        const feeds = (0, common_1.mapDefined)(sp.record.feeds ?? [], (feed) => this.feedGenerator(feed.uri, state));
        const list = this.listBasic(sp.record.list, state);
        const listItemsSample = (0, common_1.mapDefined)(agg?.listItemSampleUris ?? [], (uri) => {
            const li = state.listItems?.get(uri);
            if (!li)
                return;
            const subject = this.profile(li.record.subject, state);
            if (!subject)
                return;
            return { uri, subject };
        });
        return {
            ...basicView,
            feeds,
            list,
            listItemsSample,
        };
    }
    // Labels
    // ------------
    selfLabels({ uri, cid, record, }) {
        if (!uri || !cid || !record)
            return [];
        // Only these have a "labels" property:
        if (!(0, types_js_1.isPostRecordType)(record) &&
            !(0, types_js_1.isProfileRecordType)(record) &&
            !(0, types_js_1.isLabelerRecordType)(record)) {
            return [];
        }
        // Ignore if no labels defines
        if (!record.labels ||
            !(0, types_js_1.isSelfLabelsType)(record.labels) ||
            !record.labels.values.length) {
            return [];
        }
        const src = (0, uris_1.uriToDid)(uri); // record creator
        const cts = typeof record.createdAt === 'string'
            ? (0, syntax_1.normalizeDatetimeAlways)(record.createdAt)
            : new Date(0).toISOString();
        return record.labels.values.map(({ val }) => {
            return { src, uri, cid, val, cts };
        });
    }
    labeler(did, state) {
        const labeler = state.labelers?.get(did);
        if (!labeler)
            return;
        const creator = this.profile(did, state);
        if (!creator)
            return;
        const viewer = state.labelerViewers?.get(did);
        const aggs = state.labelerAggs?.get(did);
        const uri = syntax_1.AtUri.make(did, index_js_1.app.bsky.labeler.service.$type, 'self').toString();
        const labels = [
            ...(state.labels?.getBySubject(uri) ?? []),
            ...this.selfLabels({
                uri,
                cid: labeler.cid.toString(),
                record: labeler.record,
            }),
        ];
        return {
            uri,
            cid: labeler.cid.toString(),
            creator,
            likeCount: aggs?.likes ?? 0,
            viewer: viewer
                ? {
                    like: viewer.like,
                }
                : undefined,
            indexedAt: this.indexedAt(labeler).toISOString(),
            labels,
        };
    }
    labelerDetailed(did, state) {
        const baseView = this.labeler(did, state);
        if (!baseView)
            return;
        const labeler = state.labelers?.get(did);
        if (!labeler)
            return;
        return {
            ...baseView,
            policies: labeler.record.policies,
            reasonTypes: labeler.record.reasonTypes,
            subjectTypes: labeler.record.subjectTypes,
            subjectCollections: labeler.record.subjectCollections,
        };
    }
    // Feed
    // ------------
    feedItemBlocksAndMutes(item, state) {
        const authorDid = (0, uris_1.uriToDid)(item.post.uri);
        const originatorDid = item.repost
            ? (0, uris_1.uriToDid)(item.repost.uri)
            : authorDid;
        const post = state.posts?.get(item.post.uri);
        const parentUri = post?.record.reply?.parent.uri;
        const parentAuthorDid = parentUri && (0, uris_1.uriToDid)(parentUri);
        const parent = parentUri ? state.posts?.get(parentUri) : undefined;
        const grandparentUri = parent?.record.reply?.parent.uri;
        const grandparentAuthorDid = grandparentUri && (0, uris_1.uriToDid)(grandparentUri);
        return {
            originatorMuted: this.viewerMuteExists(originatorDid, state),
            originatorBlocked: this.viewerBlockExists(originatorDid, state),
            authorMuted: this.viewerMuteExists(authorDid, state),
            authorBlocked: this.viewerBlockExists(authorDid, state),
            ancestorAuthorBlocked: (!!parentAuthorDid && this.viewerBlockExists(parentAuthorDid, state)) ||
                (!!grandparentAuthorDid &&
                    this.viewerBlockExists(grandparentAuthorDid, state)),
        };
    }
    feedGenerator(uri, state) {
        const feedgen = state.feedgens?.get(uri);
        if (!feedgen)
            return;
        const creatorDid = (0, uris_1.uriToDid)(uri);
        const creator = this.profile(creatorDid, state);
        if (!creator)
            return;
        const viewer = state.feedgenViewers?.get(uri);
        const aggs = state.feedgenAggs?.get(uri);
        const labels = state.labels?.getBySubject(uri) ?? [];
        return {
            uri,
            cid: feedgen.cid,
            did: feedgen.record.did,
            creator,
            displayName: feedgen.record.displayName,
            description: feedgen.record.description,
            descriptionFacets: feedgen.record.descriptionFacets,
            avatar: feedgen.record.avatar
                ? this.imgUriBuilder.getPresetUri('avatar', creatorDid, (0, lex_1.getBlobCidString)(feedgen.record.avatar))
                : undefined,
            likeCount: aggs?.likes ?? 0,
            acceptsInteractions: feedgen.record.acceptsInteractions,
            labels,
            viewer: viewer
                ? {
                    like: viewer.like,
                }
                : undefined,
            contentMode: feedgen.record.contentMode,
            indexedAt: this.indexedAt(feedgen).toISOString(),
        };
    }
    threadgate(uri, state) {
        const gate = state.threadgates?.get(uri);
        if (!gate)
            return;
        return {
            uri,
            cid: gate.cid,
            record: gate.record,
            lists: (0, common_1.mapDefined)(gate.record.allow ?? [], (rule) => {
                if (!(0, types_js_1.isListRuleType)(rule))
                    return;
                return this.listBasic(rule.list, state);
            }),
        };
    }
    post(uri, state, depth = 0) {
        const post = state.posts?.get(uri);
        if (!post)
            return;
        const parsedUri = new syntax_1.AtUri(uri);
        const authorDid = parsedUri.did;
        const author = this.profileBasic(authorDid, state);
        if (!author)
            return;
        const aggs = state.postAggs?.get(uri);
        const viewer = state.postViewers?.get(uri);
        const threadgateUri = (0, uris_1.postUriToThreadgateUri)(uri);
        const labels = [
            ...(state.labels?.getBySubject(uri) ?? []),
            ...this.selfLabels({
                uri,
                cid: post.cid,
                record: post.record,
            }),
        ];
        return {
            uri,
            cid: post.cid,
            author,
            record: post.record,
            embed: depth < 2 && post.record.embed
                ? this.embed(uri, post.record.embed, state, depth + 1)
                : undefined,
            bookmarkCount: aggs?.bookmarks ?? 0,
            replyCount: aggs?.replies ?? 0,
            repostCount: aggs?.reposts ?? 0,
            likeCount: aggs?.likes ?? 0,
            quoteCount: aggs?.quotes ?? 0,
            indexedAt: this.indexedAt(post).toISOString(),
            viewer: viewer
                ? {
                    repost: viewer.repost,
                    like: viewer.like,
                    bookmarked: viewer.bookmarked,
                    threadMuted: viewer.threadMuted,
                    replyDisabled: this.userReplyDisabled(uri, state),
                    embeddingDisabled: this.userPostEmbeddingDisabled(uri, state),
                    pinned: this.viewerPinned(uri, state, authorDid),
                }
                : undefined,
            labels,
            threadgate: !post.record.reply // only hydrate gate on root post
                ? this.threadgate(threadgateUri, state)
                : undefined,
            debug: state.ctx?.includeDebugField
                ? { post: post.debug, author: author.debug }
                : undefined,
        };
    }
    feedViewPost(item, state) {
        const postInfo = state.posts?.get(item.post.uri);
        let reason;
        if (item.authorPinned) {
            reason = this.reasonPin();
        }
        else if (item.repost) {
            const repost = state.reposts?.get(item.repost.uri);
            if (!repost)
                return;
            if (repost.record.subject.uri !== item.post.uri)
                return;
            reason = this.reasonRepost(item.repost.uri, repost, state);
            if (!reason)
                return;
        }
        const post = this.post(item.post.uri, state);
        if (!post)
            return;
        const reply = !postInfo?.violatesThreadGate
            ? this.replyRef(item.post.uri, state)
            : undefined;
        return {
            post,
            reason,
            reply,
        };
    }
    replyRef(uri, state) {
        const postRecord = state.posts?.get(uri)?.record;
        if (!postRecord?.reply)
            return;
        let root = this.maybePost(postRecord.reply.root.uri, state);
        let parent = this.maybePost(postRecord.reply.parent.uri, state);
        if (!state.ctx?.include3pBlocks) {
            const childBlocks = state.postBlocks?.get(uri);
            const parentBlocks = state.postBlocks?.get(parent.uri);
            // if child blocks parent, block parent
            if ((0, types_js_1.isPostViewType)(parent) && childBlocks?.parent) {
                parent = this.blockedPost(parent.uri, parent.author.did, state);
            }
            // if child or parent blocks root, block root
            if ((0, types_js_1.isPostViewType)(root) && (childBlocks?.root || parentBlocks?.root)) {
                root = this.blockedPost(root.uri, root.author.did, state);
            }
        }
        let grandparentAuthor;
        if ((0, types_js_1.isPostViewType)(parent)) {
            // @NOTE The "parent.record" property is of type "unknown" in the lexicon
            // schema, which means that it is typed as LexMap here. In order to avoid
            // (expensive) validation using "isPostRecord(parent.record)", we only
            // check that the "$type" property is a post record type, then use a
            // try/catch to "validate" the post uri.
            if ((0, types_js_1.isPostRecordType)(parent.record) && parent.record.reply != null) {
                const uri = parent.record.reply.parent?.uri;
                if (typeof uri === 'string') {
                    try {
                        grandparentAuthor = this.profileBasic((0, uris_1.uriToDid)(uri), state);
                    }
                    catch {
                        // ignore (just as if validation had failed)
                    }
                }
            }
        }
        return {
            root,
            parent,
            grandparentAuthor,
        };
    }
    maybePost(uri, state) {
        const post = this.post(uri, state);
        if (!post) {
            return this.notFoundPost(uri);
        }
        if (this.viewerBlockExists(post.author.did, state)) {
            return this.blockedPost(uri, post.author.did, state);
        }
        return index_js_1.app.bsky.feed.defs.postView.$build(post);
    }
    blockedPost(uri, authorDid, state) {
        return index_js_1.app.bsky.feed.defs.blockedPost.$build({
            uri,
            blocked: true,
            author: {
                did: authorDid,
                viewer: this.blockedProfileViewer(authorDid, state),
            },
        });
    }
    notFoundPost(uri) {
        return index_js_1.app.bsky.feed.defs.notFoundPost.$build({
            uri,
            notFound: true,
        });
    }
    reasonRepost(uri, repost, state) {
        const creatorDid = (0, uris_1.uriToDid)(uri);
        const creator = this.profileBasic(creatorDid, state);
        if (!creator)
            return;
        return index_js_1.app.bsky.feed.defs.reasonRepost.$build({
            by: creator,
            uri,
            cid: repost.cid,
            indexedAt: this.indexedAt(repost).toISOString(),
        });
    }
    reasonPin() {
        return index_js_1.app.bsky.feed.defs.reasonPin.$build({});
    }
    // Bookmarks
    // ------------
    bookmark(key, state) {
        const viewer = state.ctx?.viewer;
        if (!viewer)
            return;
        const bookmark = state.bookmarks?.get(viewer)?.get(key);
        if (!bookmark)
            return;
        const atUri = new syntax_1.AtUri(bookmark.subjectUri);
        if (atUri.collection !== index_js_1.app.bsky.feed.post.$type)
            return;
        const item = this.maybePost(atUri.href, state);
        return {
            createdAt: bookmark.indexedAt
                ? bookmark.indexedAt.toISOString()
                : undefined,
            subject: {
                uri: atUri.href,
                cid: bookmark.subjectCid,
            },
            item,
        };
    }
    // Threads
    // ------------
    thread(skele, state, opts) {
        const { anchor, uris } = skele;
        const post = this.post(anchor, state);
        const postInfo = state.posts?.get(anchor);
        if (!postInfo || !post)
            return this.notFoundPost(anchor);
        if (this.viewerBlockExists(post.author.did, state)) {
            return this.blockedPost(anchor, post.author.did, state);
        }
        const includedPosts = new Set([anchor]);
        const childrenByParentUri = {};
        uris.forEach((uri) => {
            const post = state.posts?.get(uri);
            const parentUri = post?.record.reply?.parent.uri;
            if (!parentUri)
                return;
            if (includedPosts.has(uri))
                return;
            includedPosts.add(uri);
            childrenByParentUri[parentUri] ?? (childrenByParentUri[parentUri] = []);
            childrenByParentUri[parentUri].push(uri);
        });
        const rootUri = getRootUri(anchor, postInfo);
        const violatesThreadGate = postInfo.violatesThreadGate;
        return index_js_1.app.bsky.feed.defs.threadViewPost.$build({
            post,
            parent: !violatesThreadGate
                ? this.threadParent(anchor, rootUri, state, opts.height)
                : undefined,
            replies: !violatesThreadGate
                ? this.threadReplies(anchor, rootUri, childrenByParentUri, state, opts.depth)
                : undefined,
            threadContext: {
                rootAuthorLike: state.threadContexts?.get(post.uri)?.like,
            },
        });
    }
    threadParent(childUri, rootUri, state, height) {
        if (height < 1)
            return undefined;
        const parentUri = state.posts?.get(childUri)?.record.reply?.parent.uri;
        if (!parentUri)
            return undefined;
        if (!state.ctx?.include3pBlocks &&
            state.postBlocks?.get(childUri)?.parent) {
            return this.blockedPost(parentUri, (0, uris_1.uriToDid)(parentUri), state);
        }
        const post = this.post(parentUri, state);
        const postInfo = state.posts?.get(parentUri);
        if (!postInfo || !post)
            return this.notFoundPost(parentUri);
        if (rootUri !== getRootUri(parentUri, postInfo))
            return; // outside thread boundary
        if (this.viewerBlockExists(post.author.did, state)) {
            return this.blockedPost(parentUri, post.author.did, state);
        }
        return index_js_1.app.bsky.feed.defs.threadViewPost.$build({
            post,
            parent: this.threadParent(parentUri, rootUri, state, height - 1),
            threadContext: {
                rootAuthorLike: state.threadContexts?.get(post.uri)?.like,
            },
        });
    }
    threadReplies(parentUri, rootUri, childrenByParentUri, state, depth) {
        if (depth < 1)
            return undefined;
        const childrenUris = childrenByParentUri[parentUri] ?? [];
        return (0, common_1.mapDefined)(childrenUris, (uri) => {
            const postInfo = state.posts?.get(uri);
            if (postInfo?.violatesThreadGate) {
                return undefined;
            }
            if (!state.ctx?.include3pBlocks && state.postBlocks?.get(uri)?.parent) {
                return undefined;
            }
            const post = this.post(uri, state);
            if (!postInfo || !post) {
                // in the future we might consider keeping a placeholder for deleted
                // posts that have replies under them, but not supported at the moment.
                // this case is mostly likely hit when a takedown was applied to a post.
                return undefined;
            }
            if (rootUri !== getRootUri(uri, postInfo))
                return; // outside thread boundary
            if (this.viewerBlockExists(post.author.did, state)) {
                return this.blockedPost(uri, post.author.did, state);
            }
            if (!this.viewerSeesNeedsReview({ uri, did: post.author.did }, state)) {
                return undefined;
            }
            return index_js_1.app.bsky.feed.defs.threadViewPost.$build({
                post,
                replies: this.threadReplies(uri, rootUri, childrenByParentUri, state, depth - 1),
                threadContext: {
                    rootAuthorLike: state.threadContexts?.get(post.uri)?.like,
                },
            });
        });
    }
    // Threads V2
    // ------------
    threadV2(skeleton, state, { above, below, branchingFactor, sort, }) {
        const { anchor: anchorUri, uris } = skeleton;
        // Not found.
        const postView = this.post(anchorUri, state);
        const post = state.posts?.get(anchorUri);
        if (!post || !postView) {
            return {
                hasOtherReplies: false,
                thread: [
                    this.threadV2ItemNotFound({
                        uri: anchorUri,
                        depth: 0,
                    }),
                ],
            };
        }
        // Blocked (only 1p for anchor).
        if (this.viewerBlockExists(postView.author.did, state)) {
            return {
                hasOtherReplies: false,
                thread: [
                    this.threadV2ItemBlocked({
                        uri: anchorUri,
                        depth: 0,
                        authorDid: postView.author.did,
                        state,
                    }),
                ],
            };
        }
        const childrenByParentUri = this.groupThreadChildrenByParent(anchorUri, uris, state);
        const rootUri = getRootUri(anchorUri, post);
        const opDid = (0, uris_1.uriToDid)(rootUri);
        const authorDid = postView.author.did;
        const isOPPost = authorDid === opDid;
        const anchorViolatesThreadGate = post.violatesThreadGate;
        // Builds the parent tree, and whether it is a contiguous OP thread.
        const parentTree = !anchorViolatesThreadGate
            ? this.threadV2Parent({
                childUri: anchorUri,
                opDid,
                rootUri,
                above,
                depth: -1,
            }, state)
            : undefined;
        const { tree: parent, isOPThread: isOPThreadFromRootToParent } = parentTree ?? { tree: undefined, isOPThread: false };
        const isOPThread = parent
            ? isOPThreadFromRootToParent && isOPPost
            : isOPPost;
        const anchorDepth = 0; // The depth of the anchor post is always 0.
        let anchorTree;
        let hasOtherReplies = false;
        if (this.noUnauthenticatedPost(state, postView)) {
            anchorTree = {
                type: 'noUnauthenticated',
                item: this.threadV2ItemNoUnauthenticated({
                    uri: anchorUri,
                    depth: anchorDepth,
                }),
                parent,
            };
        }
        else {
            const { replies, hasOtherReplies: hasOtherRepliesShadow } = !anchorViolatesThreadGate
                ? this.threadV2Replies({
                    parentUri: anchorUri,
                    isOPThread,
                    opDid,
                    rootUri,
                    childrenByParentUri,
                    below,
                    depth: 1,
                    branchingFactor,
                }, state)
                : { replies: undefined, hasOtherReplies: false };
            hasOtherReplies = hasOtherRepliesShadow;
            anchorTree = {
                type: 'post',
                item: this.threadV2ItemPost({
                    depth: anchorDepth,
                    isOPThread,
                    postView,
                    repliesAllowance: Infinity, // While we don't have pagination.
                    uri: anchorUri,
                }),
                tags: post.tags,
                hasOPLike: !!state.threadContexts?.get(postView.uri)?.like,
                parent,
                replies,
            };
        }
        const thread = (0, threads_v2_1.sortTrimFlattenThreadTree)(anchorTree, {
            opDid,
            branchingFactor,
            sort,
            viewer: state.ctx?.viewer ?? null,
            threadTagsBumpDown: this.threadTagsBumpDown,
            threadTagsHide: this.threadTagsHide,
            visibilityTagRankPrefix: this.visibilityTagRankPrefix,
        }, state.ctx?.features.checkGate(state.ctx.features.Gate.ThreadsReplyRankingExplorationEnable));
        return {
            hasOtherReplies,
            thread,
        };
    }
    threadV2Parent({ childUri, opDid, rootUri, above, depth, }, state) {
        // Reached the `above` limit.
        if (Math.abs(depth) > above) {
            return undefined;
        }
        // Not found.
        const uri = state.posts?.get(childUri)?.record.reply?.parent.uri;
        if (!uri) {
            return undefined;
        }
        const postView = this.post(uri, state);
        const post = state.posts?.get(uri);
        if (!post || !postView) {
            return {
                tree: {
                    type: 'notFound',
                    item: this.threadV2ItemNotFound({ uri, depth }),
                },
                isOPThread: false,
            };
        }
        if (rootUri !== getRootUri(uri, post)) {
            // Outside thread boundary.
            return undefined;
        }
        // Blocked (1p and 3p for parent).
        const authorDid = postView.author.did;
        const has1pBlock = this.viewerBlockExists(authorDid, state);
        const has3pBlock = !state.ctx?.include3pBlocks && state.postBlocks?.get(childUri)?.parent;
        if (has1pBlock || has3pBlock) {
            return {
                tree: {
                    type: 'blocked',
                    item: this.threadV2ItemBlocked({
                        uri,
                        depth,
                        authorDid,
                        state,
                    }),
                },
                isOPThread: false,
            };
        }
        // Recurse up.
        const parentTree = this.threadV2Parent({
            childUri: uri,
            opDid,
            rootUri,
            above,
            depth: depth - 1,
        }, state);
        const { tree: parent, isOPThread: isOPThreadFromRootToParent } = parentTree ?? { tree: undefined, isOPThread: false };
        const isOPPost = authorDid === opDid;
        const isOPThread = parent
            ? isOPThreadFromRootToParent && isOPPost
            : isOPPost;
        if (this.noUnauthenticatedPost(state, postView)) {
            return {
                tree: {
                    type: 'noUnauthenticated',
                    item: this.threadV2ItemNoUnauthenticated({
                        uri,
                        depth,
                    }),
                    parent,
                },
                isOPThread,
            };
        }
        const parentUri = post.record.reply?.parent.uri;
        const hasMoreParents = !!parentUri && !parent;
        return {
            tree: {
                type: 'post',
                item: this.threadV2ItemPost({
                    depth,
                    isOPThread,
                    moreParents: hasMoreParents,
                    postView,
                    uri,
                }),
                tags: post.tags,
                hasOPLike: !!state.threadContexts?.get(postView.uri)?.like,
                parent,
                replies: undefined,
            },
            isOPThread,
        };
    }
    threadV2Replies({ parentUri, isOPThread: isOPThreadFromRootToParent, opDid, rootUri, childrenByParentUri, below, depth, branchingFactor, }, state) {
        // Reached the `below` limit.
        if (depth > below) {
            return { replies: undefined, hasOtherReplies: false };
        }
        const childrenUris = childrenByParentUri[parentUri] ?? [];
        let hasOtherReplies = false;
        const replies = (0, common_1.mapDefined)(childrenUris, (uri) => {
            const replyInclusion = this.checkThreadV2ReplyInclusion({
                uri,
                rootUri,
                state,
            });
            if (!replyInclusion) {
                return undefined;
            }
            const { authorDid, post, postView } = replyInclusion;
            // Hidden.
            const { isOther } = this.isOtherThreadPost({ post, postView, rootUri, uri }, state);
            if (isOther) {
                // Only care about anchor replies
                if (depth === 1) {
                    hasOtherReplies = true;
                }
                return undefined;
            }
            // Recurse down.
            const isOPThread = isOPThreadFromRootToParent && authorDid === opDid;
            const { replies: nestedReplies } = this.threadV2Replies({
                parentUri: uri,
                isOPThread,
                opDid,
                rootUri,
                childrenByParentUri,
                below,
                depth: depth + 1,
                branchingFactor,
            }, state);
            const reachedDepth = depth === below;
            const repliesAllowance = reachedDepth ? 0 : branchingFactor;
            const tree = {
                type: 'post',
                item: this.threadV2ItemPost({
                    depth,
                    isOPThread,
                    postView,
                    repliesAllowance,
                    uri,
                }),
                tags: post.tags,
                hasOPLike: !!state.threadContexts?.get(postView.uri)?.like,
                parent: undefined,
                replies: nestedReplies,
            };
            return tree;
        });
        return {
            replies,
            hasOtherReplies,
        };
    }
    threadV2ItemPost({ depth, isOPThread, moreParents, postView, repliesAllowance, uri, }) {
        const moreReplies = repliesAllowance === undefined
            ? 0
            : Math.max((postView.replyCount ?? 0) - repliesAllowance, 0);
        return {
            uri,
            depth,
            value: index_js_1.app.bsky.unspecced.defs.threadItemPost.$build({
                post: postView,
                moreParents: moreParents ?? false,
                moreReplies,
                opThread: isOPThread,
                hiddenByThreadgate: false, // Hidden posts are handled by threadOtherV2
                mutedByViewer: false, // Hidden posts are handled by threadOtherV2
            }),
        };
    }
    threadV2ItemNoUnauthenticated({ uri, depth, }) {
        return {
            uri,
            depth,
            value: index_js_1.app.bsky.unspecced.defs.threadItemNoUnauthenticated.$build({}),
        };
    }
    threadV2ItemNotFound({ uri, depth, }) {
        return {
            uri,
            depth,
            value: index_js_1.app.bsky.unspecced.defs.threadItemNotFound.$build({}),
        };
    }
    threadV2ItemBlocked({ uri, depth, authorDid, state, }) {
        return {
            uri,
            depth,
            value: index_js_1.app.bsky.unspecced.defs.threadItemBlocked.$build({
                author: {
                    did: authorDid,
                    viewer: this.blockedProfileViewer(authorDid, state),
                },
            }),
        };
    }
    threadOtherV2(skeleton, state, { below, branchingFactor, }) {
        const { anchor: anchorUri, uris } = skeleton;
        // Not found.
        const postView = this.post(anchorUri, state);
        const post = state.posts?.get(anchorUri);
        if (!post || !postView) {
            return [];
        }
        // Blocked (only 1p for anchor).
        if (this.viewerBlockExists(postView.author.did, state)) {
            return [];
        }
        const childrenByParentUri = this.groupThreadChildrenByParent(anchorUri, uris, state);
        const rootUri = getRootUri(anchorUri, post);
        const opDid = (0, uris_1.uriToDid)(rootUri);
        const anchorTree = {
            type: 'hiddenAnchor',
            item: this.threadOtherV2ItemPostAnchor({ depth: 0, uri: anchorUri }),
            replies: this.threadOtherV2Replies({
                parentUri: anchorUri,
                rootUri,
                childrenByParentUri,
                below,
                depth: 1,
            }, state),
        };
        return (0, threads_v2_1.sortTrimFlattenThreadTree)(anchorTree, {
            opDid,
            branchingFactor,
            viewer: state.ctx?.viewer ?? null,
            threadTagsBumpDown: this.threadTagsBumpDown,
            threadTagsHide: this.threadTagsHide,
            visibilityTagRankPrefix: this.visibilityTagRankPrefix,
        }, state.ctx?.features.checkGate(state.ctx.features.Gate.ThreadsReplyRankingExplorationEnable));
    }
    threadOtherV2Replies({ parentUri, rootUri, childrenByParentUri, below, depth, }, state) {
        // Reached the `below` limit.
        if (depth > below) {
            return undefined;
        }
        const childrenUris = childrenByParentUri[parentUri] ?? [];
        return (0, common_1.mapDefined)(childrenUris, (uri) => {
            const replyInclusion = this.checkThreadV2ReplyInclusion({
                uri,
                rootUri,
                state,
            });
            if (!replyInclusion) {
                return undefined;
            }
            const { post, postView } = replyInclusion;
            // Other posts to pull out
            const { isOther, hiddenByThreadgate, mutedByViewer } = this.isOtherThreadPost({ post, postView, rootUri, uri }, state);
            if (isOther) {
                // Only show hidden anchor replies, not all hidden.
                if (depth > 1) {
                    return undefined;
                }
            }
            else if (depth === 1) {
                // Don't include non-hidden anchor replies.
                return undefined;
            }
            // Recurse down.
            const replies = this.threadOtherV2Replies({
                parentUri: uri,
                rootUri,
                childrenByParentUri,
                below,
                depth: depth + 1,
            }, state);
            const item = this.threadOtherV2ItemPost({
                depth,
                hiddenByThreadgate,
                mutedByViewer,
                postView,
                uri,
            });
            const tree = {
                type: 'hiddenPost',
                item: item,
                tags: post.tags,
                replies,
            };
            return tree;
        });
    }
    threadOtherV2ItemPostAnchor({ depth, uri, }) {
        return {
            uri,
            depth,
            // In hidden replies, the anchor value is undefined, so it doesn't include the anchor in the result.
            // This is helpful so we can use the same internal structure for hidden and non-hidden, while omitting anchor for hidden.
            value: undefined,
        };
    }
    threadOtherV2ItemPost({ depth, hiddenByThreadgate, mutedByViewer, postView, uri, }) {
        const base = this.threadOtherV2ItemPostAnchor({ depth, uri });
        return {
            ...base,
            value: index_js_1.app.bsky.unspecced.defs.threadItemPost.$build({
                post: postView,
                hiddenByThreadgate,
                mutedByViewer,
                moreParents: false, // "Other" replies don't have parents.
                moreReplies: 0, // "Other" replies don't have replies hydrated.
                opThread: false, // "Other" replies don't contain OP threads.
            }),
        };
    }
    checkThreadV2ReplyInclusion({ uri, rootUri, state, }) {
        // Not found.
        const post = state.posts?.get(uri);
        if (post?.violatesThreadGate) {
            return null;
        }
        const postView = this.post(uri, state);
        if (!post || !postView) {
            return null;
        }
        const authorDid = postView.author.did;
        if (rootUri !== getRootUri(uri, post)) {
            // outside thread boundary
            return null;
        }
        // Blocked (1p and 3p for replies).
        const has1pBlock = this.viewerBlockExists(authorDid, state);
        const has3pBlock = !state.ctx?.include3pBlocks && state.postBlocks?.get(uri)?.parent;
        if (has1pBlock || has3pBlock) {
            return null;
        }
        if (!this.viewerSeesNeedsReview({ uri, did: authorDid }, state)) {
            return null;
        }
        // No unauthenticated.
        if (this.noUnauthenticatedPost(state, postView)) {
            return null;
        }
        return { authorDid, post, postView };
    }
    isOtherThreadPost({ post, postView, rootUri, uri, }, state) {
        const opDid = (0, uris_1.uriToDid)(rootUri);
        const authorDid = (0, uris_1.uriToDid)(uri);
        let hiddenByTag = false;
        if (state.ctx?.features.checkGate(state.ctx.features.Gate.ThreadsReplyRankingExplorationEnable)) {
            hiddenByTag = authorDid !== opDid && post.tags.has(this.visibilityTagHide);
        }
        else {
            const showBecauseFollowing = !!postView.author.viewer?.following;
            hiddenByTag =
                authorDid !== opDid &&
                    authorDid !== state.ctx?.viewer &&
                    !showBecauseFollowing &&
                    this.threadTagsHide.some((t) => post.tags.has(t));
        }
        const hiddenByThreadgate = state.ctx?.viewer !== authorDid &&
            this.replyIsHiddenByThreadgate(uri, rootUri, state);
        const mutedByViewer = this.viewerMuteExists(authorDid, state);
        const isPushPin = (0, types_js_1.isPostRecordType)(post.record) && post.record.text.trim() === '📌';
        return {
            isOther: hiddenByTag || hiddenByThreadgate || mutedByViewer || isPushPin,
            hiddenByTag,
            hiddenByThreadgate,
            mutedByViewer,
        };
    }
    groupThreadChildrenByParent(anchorUri, uris, state) {
        // Groups children of each parent.
        const includedPosts = new Set([anchorUri]);
        const childrenByParentUri = {};
        uris.forEach((uri) => {
            const post = state.posts?.get(uri);
            const parentUri = post?.record.reply?.parent.uri;
            if (!parentUri)
                return;
            if (includedPosts.has(uri))
                return;
            includedPosts.add(uri);
            childrenByParentUri[parentUri] ?? (childrenByParentUri[parentUri] = []);
            childrenByParentUri[parentUri].push(uri);
        });
        return childrenByParentUri;
    }
    // Embeds
    // ------------
    embed(postUri, embed, state, depth) {
        if ((0, types_js_1.isImagesEmbedType)(embed)) {
            return this.imagesEmbed((0, uris_1.uriToDid)(postUri), embed);
        }
        else if ((0, types_js_1.isVideoEmbedType)(embed)) {
            return this.videoEmbed((0, uris_1.uriToDid)(postUri), embed);
        }
        else if ((0, types_js_1.isExternalEmbedType)(embed)) {
            return this.externalEmbed((0, uris_1.uriToDid)(postUri), embed);
        }
        else if ((0, types_js_1.isRecordEmbedType)(embed)) {
            return this.recordEmbed(postUri, embed, state, depth);
        }
        else if ((0, types_js_1.isRecordWithMediaType)(embed)) {
            return this.recordWithMediaEmbed(postUri, embed, state, depth);
        }
        else {
            return undefined;
        }
    }
    imagesEmbed(did, embed) {
        const imgViews = embed.images.map((img) => ({
            thumb: this.imgUriBuilder.getPresetUri('feed_thumbnail', did, (0, lex_1.getBlobCidString)(img.image)),
            fullsize: this.imgUriBuilder.getPresetUri('feed_fullsize', did, (0, lex_1.getBlobCidString)(img.image)),
            alt: img.alt,
            aspectRatio: img.aspectRatio,
        }));
        return index_js_1.app.bsky.embed.images.view.$build({
            images: imgViews,
        });
    }
    videoEmbed(did, embed) {
        const cid = (0, lex_1.getBlobCidString)(embed.video);
        return index_js_1.app.bsky.embed.video.view.$build({
            cid,
            playlist: this.videoUriBuilder.playlist({ did, cid }),
            thumbnail: this.videoUriBuilder.thumbnail({ did, cid }),
            alt: embed.alt,
            aspectRatio: embed.aspectRatio,
            presentation: embed.presentation,
        });
    }
    externalEmbed(did, embed) {
        const { uri, title, description, thumb } = embed.external;
        return index_js_1.app.bsky.embed.external.view.$build({
            external: {
                uri,
                title,
                description,
                thumb: thumb
                    ? this.imgUriBuilder.getPresetUri('feed_thumbnail', did, (0, lex_1.getBlobCidString)(thumb))
                    : undefined,
            },
        });
    }
    embedNotFound(uri) {
        return index_js_1.app.bsky.embed.record.view.$build({
            record: index_js_1.app.bsky.embed.record.viewNotFound.$build({
                uri,
                notFound: true,
            }),
        });
    }
    embedDetached(uri) {
        return index_js_1.app.bsky.embed.record.view.$build({
            record: index_js_1.app.bsky.embed.record.viewDetached.$build({
                uri,
                detached: true,
            }),
        });
    }
    embedBlocked(uri, state) {
        const creator = (0, uris_1.uriToDid)(uri);
        return index_js_1.app.bsky.embed.record.view.$build({
            record: index_js_1.app.bsky.embed.record.viewBlocked.$build({
                uri,
                blocked: true,
                author: {
                    did: creator,
                    viewer: this.blockedProfileViewer(creator, state),
                },
            }),
        });
    }
    embedPostView(uri, state, depth) {
        const postView = this.post(uri, state, depth);
        if (!postView)
            return;
        return index_js_1.app.bsky.embed.record.viewRecord.$build({
            uri: postView.uri,
            cid: postView.cid,
            author: postView.author,
            value: postView.record,
            labels: postView.labels,
            likeCount: postView.likeCount,
            replyCount: postView.replyCount,
            repostCount: postView.repostCount,
            quoteCount: postView.quoteCount,
            indexedAt: postView.indexedAt,
            embeds: depth > 1 ? undefined : postView.embed ? [postView.embed] : [],
        });
    }
    recordEmbed(postUri, embed, state, depth, withTypeTag = true) {
        const uri = embed.record.uri;
        const parsedUri = new syntax_1.AtUri(uri);
        if (this.viewerBlockExists(parsedUri.did, state) ||
            (!state.ctx?.include3pBlocks && state.postBlocks?.get(postUri)?.embed)) {
            return this.embedBlocked(uri, state);
        }
        const post = state.posts?.get(postUri);
        if (post?.violatesEmbeddingRules) {
            return this.embedDetached(uri);
        }
        if (parsedUri.collection === index_js_1.app.bsky.feed.post.$type) {
            const view = this.embedPostView(uri, state, depth);
            if (!view)
                return this.embedNotFound(uri);
            const postgateRecordUri = (0, uris_1.postUriToPostgateUri)(parsedUri.toString());
            const postgate = state.postgates?.get(postgateRecordUri);
            if (postgate?.record?.detachedEmbeddingUris?.includes(postUri)) {
                return this.embedDetached(uri);
            }
            return this.recordEmbedWrapper(view, withTypeTag);
        }
        else if (parsedUri.collection === index_js_1.app.bsky.feed.generator.$type) {
            const view = this.feedGenerator(uri, state);
            if (!view)
                return this.embedNotFound(uri);
            return this.recordEmbedWrapper(index_js_1.app.bsky.feed.defs.generatorView.$build(view), withTypeTag);
        }
        else if (parsedUri.collection === index_js_1.app.bsky.graph.list.$type) {
            const view = this.list(uri, state);
            if (!view)
                return this.embedNotFound(uri);
            return this.recordEmbedWrapper(index_js_1.app.bsky.graph.defs.listView.$build(view), withTypeTag);
        }
        else if (parsedUri.collection === index_js_1.app.bsky.labeler.service.$type) {
            const view = this.labeler(parsedUri.did, state);
            if (!view)
                return this.embedNotFound(uri);
            return this.recordEmbedWrapper(index_js_1.app.bsky.labeler.defs.labelerView.$build(view), withTypeTag);
        }
        else if (parsedUri.collection === index_js_1.app.bsky.graph.starterpack.$type) {
            const view = this.starterPackBasic(uri, state);
            if (!view)
                return this.embedNotFound(uri);
            return this.recordEmbedWrapper(index_js_1.app.bsky.graph.defs.starterPackViewBasic.$build(view), withTypeTag);
        }
        return this.embedNotFound(uri);
    }
    recordEmbedWrapper(record, withTypeTag) {
        return withTypeTag
            ? index_js_1.app.bsky.embed.record.view.$build({ record })
            : { record };
    }
    recordWithMediaEmbed(postUri, embed, state, depth) {
        const creator = (0, uris_1.uriToDid)(postUri);
        let mediaEmbed;
        if ((0, types_js_1.isImagesEmbedType)(embed.media)) {
            mediaEmbed = this.imagesEmbed(creator, embed.media);
        }
        else if ((0, types_js_1.isVideoEmbedType)(embed.media)) {
            mediaEmbed = this.videoEmbed(creator, embed.media);
        }
        else if ((0, types_js_1.isExternalEmbedType)(embed.media)) {
            mediaEmbed = this.externalEmbed(creator, embed.media);
        }
        else {
            return;
        }
        return index_js_1.app.bsky.embed.recordWithMedia.view.$build({
            media: mediaEmbed,
            record: this.recordEmbed(postUri, embed.record, state, depth, false),
        });
    }
    userReplyDisabled(uri, state) {
        const post = state.posts?.get(uri);
        if (post?.violatesThreadGate) {
            return true;
        }
        const rootUriStr = post?.record.reply?.root.uri ?? uri;
        const gate = state.threadgates?.get((0, uris_1.postUriToThreadgateUri)(rootUriStr))?.record;
        const viewer = state.ctx?.viewer;
        if (!gate || !viewer) {
            return undefined;
        }
        const rootPost = state.posts?.get(rootUriStr)?.record;
        const ownerDid = (0, uris_1.uriToDid)(rootUriStr);
        const { canReply, allowFollower, allowFollowing, allowListUris = [], } = (0, util_2.parseThreadGate)(viewer, ownerDid, rootPost ?? null, gate);
        if (canReply) {
            return false;
        }
        if (allowFollower && state.profileViewers?.get(ownerDid)?.following) {
            return false;
        }
        if (allowFollowing && state.profileViewers?.get(ownerDid)?.followedBy) {
            return false;
        }
        for (const listUri of allowListUris) {
            const list = state.listViewers?.get(listUri);
            if (list?.viewerInList) {
                return false;
            }
        }
        return true;
    }
    userPostEmbeddingDisabled(uri, state) {
        const post = state.posts?.get(uri);
        if (!post) {
            return true;
        }
        const postgateRecordUri = (0, uris_1.postUriToPostgateUri)(uri);
        const gate = state.postgates?.get(postgateRecordUri)?.record;
        const viewerDid = state.ctx?.viewer ?? undefined;
        const { embeddingRules: { canEmbed }, } = (0, util_2.parsePostgate)({
            gate,
            viewerDid,
            authorDid: (0, uris_1.uriToDid)(uri),
        });
        if (canEmbed) {
            return false;
        }
        return true;
    }
    viewerPinned(uri, state, authorDid) {
        if (!state.ctx?.viewer || state.ctx.viewer !== authorDid)
            return;
        const actor = state.actors?.get(authorDid);
        if (!actor)
            return;
        const pinnedPost = (0, uris_1.safePinnedPost)(actor.profile?.pinnedPost);
        if (!pinnedPost)
            return undefined;
        return pinnedPost.uri === uri;
    }
    notification(notif, lastSeenAt, state) {
        if (!notif.timestamp || !notif.reason)
            return;
        const uri = new syntax_1.AtUri(notif.uri);
        const author = this.profile(uri.did, state);
        if (!author)
            return;
        let recordInfo;
        if (uri.collection === index_js_1.app.bsky.feed.post.$type) {
            recordInfo = state.posts?.get(notif.uri);
        }
        else if (uri.collection === index_js_1.app.bsky.feed.like.$type) {
            recordInfo = state.likes?.get(notif.uri);
        }
        else if (uri.collection === index_js_1.app.bsky.feed.repost.$type) {
            recordInfo = state.reposts?.get(notif.uri);
        }
        else if (uri.collection === index_js_1.app.bsky.graph.follow.$type) {
            recordInfo = state.follows?.get(notif.uri);
        }
        else if (uri.collection === index_js_1.app.bsky.graph.verification.$type) {
            // When a verification record is removed, the record won't be found,
            // both for the `verified` and `unverified` notifications.
            recordInfo = state.verifications?.get(notif.uri) ?? {
                record: notificationDeletedRecord,
                cid: notificationDeletedRecordCid,
            };
        }
        else if (uri.collection === index_js_1.app.bsky.actor.profile.$type) {
            const actor = state.actors?.get(author.did);
            recordInfo =
                actor && actor.profile && actor.profileCid
                    ? {
                        record: actor.profile,
                        cid: actor.profileCid,
                        sortedAt: actor.sortedAt ?? new Date(0), // @NOTE will be present since profile record is present
                        indexedAt: actor.indexedAt ?? new Date(0), // @NOTE will be present since profile record is present
                        takedownRef: actor.profileTakedownRef,
                    }
                    : undefined;
        }
        if (!recordInfo)
            return;
        const labels = state.labels?.getBySubject(notif.uri) ?? [];
        const selfLabels = this.selfLabels({
            uri: (0, util_1.parseString)(notif.uri),
            cid: recordInfo.cid,
            record: recordInfo.record,
        });
        const indexedAt = notif.timestamp.toDate().toISOString();
        return {
            uri: notif.uri,
            cid: recordInfo.cid,
            author,
            reason: notif.reason,
            reasonSubject: (0, util_1.parseString)(notif.reasonSubject),
            record: recordInfo.record,
            // @NOTE works with a hack in listNotifications so that when there's no last-seen time,
            // the user's first notification is marked unread, and all previous read. in this case,
            // the last seen time will be equal to the first notification's indexed time.
            isRead: lastSeenAt ? lastSeenAt > indexedAt : true,
            indexedAt: notif.timestamp.toDate().toISOString(),
            labels: [...labels, ...selfLabels],
        };
    }
    indexedAt({ sortedAt, indexedAt }) {
        if (!this.indexedAtEpoch)
            return sortedAt;
        return indexedAt && indexedAt > this.indexedAtEpoch ? indexedAt : sortedAt;
    }
}
exports.Views = Views;
const getRootUri = (uri, post) => {
    return post.record.reply?.root.uri ?? uri;
};
//# sourceMappingURL=index.js.map