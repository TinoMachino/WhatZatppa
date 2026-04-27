"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientUa = exports.kwsWwwAuthenticate = exports.parseStatus = exports.parseExternalPayload = exports.serializeExternalPayload = exports.validateSignature = exports.createStashEvent = void 0;
const node_crypto_1 = __importDefault(require("node:crypto"));
const common_1 = require("@atproto/common");
const stash_1 = require("../../stash");
const types_1 = require("./types");
const createStashEvent = async (ctx, { actorDid, attemptId, email, initIp, initUa, completeIp, completeUa, status, }) => {
    const stashPayload = {
        createdAt: new Date().toISOString(),
        email,
        status,
        attemptId,
        initIp,
        initUa,
        completeIp,
        completeUa,
    };
    await ctx.stashClient.create({
        actorDid,
        namespace: stash_1.Namespaces.AppBskyUnspeccedDefsAgeAssuranceEvent,
        key: common_1.TID.nextStr(),
        payload: stashPayload,
    });
    return stashPayload;
};
exports.createStashEvent = createStashEvent;
const validateSignature = (key, data, signature) => {
    const expectedSignature = node_crypto_1.default
        .createHmac('sha256', key)
        .update(data)
        .digest('hex');
    const expectedSignatureBuf = Buffer.from(expectedSignature, 'hex');
    const actualSignatureBuf = Buffer.from(signature, 'hex');
    if (expectedSignatureBuf.length !== actualSignatureBuf.length) {
        throw new Error(`Signature mismatch`);
    }
    if (!node_crypto_1.default.timingSafeEqual(expectedSignatureBuf, actualSignatureBuf)) {
        throw new Error(`Signature mismatch`);
    }
};
exports.validateSignature = validateSignature;
const serializeExternalPayload = (value) => {
    return JSON.stringify(value);
};
exports.serializeExternalPayload = serializeExternalPayload;
const parseExternalPayload = (serialized) => {
    try {
        const value = JSON.parse(serialized);
        return types_1.externalPayloadSchema.parse(value);
    }
    catch (err) {
        throw new Error(`Invalid external payload: ${serialized}`, { cause: err });
    }
};
exports.parseExternalPayload = parseExternalPayload;
const parseStatus = (serialized) => {
    try {
        const value = JSON.parse(serialized);
        return types_1.statusSchema.parse(value);
    }
    catch (err) {
        throw new Error(`Invalid status: ${serialized}`, { cause: err });
    }
};
exports.parseStatus = parseStatus;
const kwsWwwAuthenticate = () => ({
    'www-authenticate': `Signature realm="kws"`,
});
exports.kwsWwwAuthenticate = kwsWwwAuthenticate;
const getClientUa = (req) => {
    return req.headers['user-agent'];
};
exports.getClientUa = getClientUa;
//# sourceMappingURL=util.js.map