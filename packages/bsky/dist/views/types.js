"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateStrongRef = exports.isSelfLabelsType = exports.isMentionFacetType = exports.isLabelerRecordType = exports.isMentionRuleType = exports.isListRuleType = exports.isFollowingRuleType = exports.isFollowerRuleType = exports.isPostViewType = exports.isPostgateDisableRuleType = exports.isPostRecordType = exports.isRecordWithMediaType = exports.isRecordEmbedType = exports.isExternalEmbedType = exports.isVideoEmbedType = exports.isImagesEmbedType = exports.isProfileRecordType = void 0;
const index_js_1 = require("../lexicons/index.js");
exports.isProfileRecordType = index_js_1.app.bsky.actor.profile.$isTypeOf;
// app.bsky.embed
exports.isImagesEmbedType = index_js_1.app.bsky.embed.images.$isTypeOf;
exports.isVideoEmbedType = index_js_1.app.bsky.embed.video.$isTypeOf;
exports.isExternalEmbedType = index_js_1.app.bsky.embed.external.$isTypeOf;
exports.isRecordEmbedType = index_js_1.app.bsky.embed.record.$isTypeOf;
exports.isRecordWithMediaType = index_js_1.app.bsky.embed.recordWithMedia.$isTypeOf;
exports.isPostRecordType = index_js_1.app.bsky.feed.post.$isTypeOf;
exports.isPostgateDisableRuleType = index_js_1.app.bsky.feed.postgate.disableRule.$isTypeOf;
exports.isPostViewType = index_js_1.app.bsky.feed.defs.postView.$isTypeOf;
exports.isFollowerRuleType = index_js_1.app.bsky.feed.threadgate.followerRule.$isTypeOf;
exports.isFollowingRuleType = index_js_1.app.bsky.feed.threadgate.followingRule.$isTypeOf;
exports.isListRuleType = index_js_1.app.bsky.feed.threadgate.listRule.$isTypeOf;
exports.isMentionRuleType = index_js_1.app.bsky.feed.threadgate.mentionRule.$isTypeOf;
exports.isLabelerRecordType = index_js_1.app.bsky.labeler.service.$isTypeOf;
// app.bsky.richtext
exports.isMentionFacetType = index_js_1.app.bsky.richtext.facet.mention.$isTypeOf;
exports.isSelfLabelsType = index_js_1.com.atproto.label.defs.selfLabels.$isTypeOf;
exports.validateStrongRef = index_js_1.com.atproto.repo.strongRef.$safeValidate;
//# sourceMappingURL=types.js.map