"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lexPlatformToProtoPlatform = exports.protobufToLex = void 0;
exports.assertLexPlatform = assertLexPlatform;
const bsky_pb_1 = require("../../../../proto/bsky_pb");
const courier_pb_1 = require("../../../../proto/courier_pb");
const ensureChatPreference = (p) => {
    const includeValues = ['all', 'accepted'];
    return {
        include: typeof p?.include === 'string' && includeValues.includes(p.include)
            ? p.include
            : 'all',
        push: p?.push ?? true,
    };
};
const ensureFilterablePreference = (p) => {
    const includeValues = ['all', 'follows'];
    return {
        include: typeof p?.include === 'string' && includeValues.includes(p.include)
            ? p.include
            : 'all',
        list: p?.list ?? true,
        push: p?.push ?? true,
    };
};
const ensurePreference = (p) => {
    return {
        list: p?.list ?? true,
        push: p?.push ?? true,
    };
};
const ensurePreferences = (p) => {
    return {
        chat: ensureChatPreference(p.chat),
        follow: ensureFilterablePreference(p.follow),
        like: ensureFilterablePreference(p.like),
        likeViaRepost: ensureFilterablePreference(p.likeViaRepost),
        mention: ensureFilterablePreference(p.mention),
        quote: ensureFilterablePreference(p.quote),
        reply: ensureFilterablePreference(p.reply),
        repost: ensureFilterablePreference(p.repost),
        repostViaRepost: ensureFilterablePreference(p.repostViaRepost),
        starterpackJoined: ensurePreference(p.starterpackJoined),
        subscribedPost: ensurePreference(p.subscribedPost),
        unverified: ensurePreference(p.unverified),
        verified: ensurePreference(p.verified),
    };
};
const protobufChatPreferenceToLex = (p) => {
    return {
        include: p?.include === bsky_pb_1.ChatNotificationInclude.ACCEPTED ? 'accepted' : 'all',
        push: p?.push?.enabled,
    };
};
const protobufFilterablePreferenceToLex = (p) => {
    return {
        include: p?.include === bsky_pb_1.NotificationInclude.FOLLOWS ? 'follows' : 'all',
        list: p?.list?.enabled,
        push: p?.push?.enabled,
    };
};
const protobufPreferenceToLex = (p) => {
    return {
        list: p?.list?.enabled,
        push: p?.push?.enabled,
    };
};
const protobufToLex = (res) => {
    return ensurePreferences({
        chat: protobufChatPreferenceToLex(res.chat),
        follow: protobufFilterablePreferenceToLex(res.follow),
        like: protobufFilterablePreferenceToLex(res.like),
        likeViaRepost: protobufFilterablePreferenceToLex(res.likeViaRepost),
        mention: protobufFilterablePreferenceToLex(res.mention),
        quote: protobufFilterablePreferenceToLex(res.quote),
        reply: protobufFilterablePreferenceToLex(res.reply),
        repost: protobufFilterablePreferenceToLex(res.repost),
        repostViaRepost: protobufFilterablePreferenceToLex(res.repostViaRepost),
        starterpackJoined: protobufPreferenceToLex(res.starterpackJoined),
        subscribedPost: protobufPreferenceToLex(res.subscribedPost),
        unverified: protobufPreferenceToLex(res.unverified),
        verified: protobufPreferenceToLex(res.verified),
    });
};
exports.protobufToLex = protobufToLex;
function assertLexPlatform(platform) {
    if (platform !== 'ios' && platform !== 'android' && platform !== 'web') {
        throw new Error('Unsupported platform: must be "ios", "android", or "web".');
    }
}
const lexPlatformToProtoPlatform = (platform) => platform === 'ios'
    ? courier_pb_1.AppPlatform.IOS
    : platform === 'android'
        ? courier_pb_1.AppPlatform.ANDROID
        : courier_pb_1.AppPlatform.WEB;
exports.lexPlatformToProtoPlatform = lexPlatformToProtoPlatform;
//# sourceMappingURL=util.js.map