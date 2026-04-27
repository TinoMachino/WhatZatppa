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
exports.TestChat = void 0;
const node_events_1 = __importDefault(require("node:events"));
const node_http_1 = __importDefault(require("node:http"));
const plc = __importStar(require("@did-plc/lib"));
const express_1 = __importDefault(require("express"));
const get_port_1 = __importDefault(require("get-port"));
const api_1 = require("@atproto/api");
const crypto_1 = require("@atproto/crypto");
const identity_1 = require("@atproto/identity");
const pds_1 = require("@atproto/pds");
const xrpc_server_1 = require("@atproto/xrpc-server");
class TestChat {
    constructor(url, port, server, did, plcUrl) {
        Object.defineProperty(this, "url", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: url
        });
        Object.defineProperty(this, "port", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: port
        });
        Object.defineProperty(this, "server", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: server
        });
        Object.defineProperty(this, "did", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: did
        });
        Object.defineProperty(this, "destroyed", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "idResolver", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "profileCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "convos", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "convoKeys", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: new Map()
        });
        Object.defineProperty(this, "logs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: []
        });
        Object.defineProperty(this, "revSeq", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "convoSeq", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        Object.defineProperty(this, "messageSeq", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 0
        });
        this.idResolver = new identity_1.IdResolver({ plcUrl });
    }
    static async create(config) {
        const plcUrl = getPlcUrl(config);
        if (!plcUrl) {
            throw new Error('TestChat requires plcUrl or a TestPds instance with a PLC URL');
        }
        const port = config.port || (await (0, get_port_1.default)());
        const did = config.serviceDid ||
            config.serverDid ||
            (await createChatDid(plcUrl, port));
        const url = `http://localhost:${port}`;
        const app = (0, express_1.default)();
        const lexServer = (0, pds_1.createLexiconServer)({
            validateResponse: false,
            payload: {
                jsonLimit: 150 * 1024,
                textLimit: 150 * 1024,
                blobLimit: 5 * 1024 * 1024,
            },
        });
        const server = node_http_1.default.createServer(app);
        const chat = new TestChat(url, port, server, did, plcUrl);
        lexServer.chat.bsky.actor.deleteAccount(async (args) => {
            await chat.requireAuth(args.req);
            return {
                encoding: 'application/json',
                body: {},
            };
        });
        lexServer.chat.bsky.convo.getConvo(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.params.convoId, auth.did);
            return {
                encoding: 'application/json',
                body: { convo: await chat.toConvoView(convo, auth.did) },
            };
        });
        lexServer.chat.bsky.convo.getConvoAvailability(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const memberDids = normalizeMemberList(args.params.members, auth.did);
            const convo = chat.findConvoByMembers(memberDids);
            return {
                encoding: 'application/json',
                body: convo
                    ? {
                        canChat: true,
                        convo: await chat.toConvoView(convo, auth.did),
                    }
                    : {
                        canChat: true,
                    },
            };
        });
        lexServer.chat.bsky.convo.getConvoForMembers(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.getOrCreateConvo(normalizeMemberList(args.params.members, auth.did), auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            if (memberState.left) {
                memberState.left = false;
            }
            return {
                encoding: 'application/json',
                body: { convo: await chat.toConvoView(convo, auth.did) },
            };
        });
        lexServer.chat.bsky.convo.listConvos(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const status = normalizeStatus(args.params.status);
            const readState = normalizeReadState(args.params.readState);
            const limit = clampLimit(args.params.limit, 100);
            const visible = await chat.listVisibleConvos(auth.did, {
                readState,
                status,
            });
            const offset = decodeCursor(args.params.cursor);
            const slice = visible.slice(offset, offset + limit);
            return {
                encoding: 'application/json',
                body: {
                    cursor: offset + limit < visible.length ? encodeCursor(offset + limit) : undefined,
                    convos: slice,
                },
            };
        });
        lexServer.chat.bsky.convo.getMessages(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.params.convoId, auth.did);
            const messages = chat.getVisibleMessages(convo, auth.did);
            const limit = clampLimit(args.params.limit, 100);
            const offset = decodeCursor(args.params.cursor);
            const slice = messages.slice(offset, offset + limit);
            return {
                encoding: 'application/json',
                body: {
                    cursor: offset + limit < messages.length ? encodeCursor(offset + limit) : undefined,
                    messages: slice,
                },
            };
        });
        lexServer.chat.bsky.convo.getLog(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const cursor = args.params.cursor;
            const visibleLogs = chat.logs
                .filter((log) => chat.canViewLog(log, auth.did))
                .filter((log) => (cursor ? log.rev > cursor : true));
            return {
                encoding: 'application/json',
                body: {
                    cursor: visibleLogs.length
                        ? visibleLogs[visibleLogs.length - 1]?.rev
                        : cursor,
                    logs: visibleLogs.map((log) => chat.toLogView(log, auth.did)),
                },
            };
        });
        lexServer.chat.bsky.convo.sendMessage(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did, {
                allowLeft: true,
            });
            const message = chat.appendMessage(convo, auth.did, chat.parseMessageInput(args.input.body.message));
            return {
                encoding: 'application/json',
                body: message,
            };
        });
        lexServer.chat.bsky.convo.sendMessageBatch(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const items = Array.isArray(args.input.body.items) ? args.input.body.items : [];
            const written = items.map((item) => {
                const convo = chat.requireAccessibleConvo(item.convoId, auth.did, {
                    allowLeft: true,
                });
                return chat.appendMessage(convo, auth.did, chat.parseMessageInput(item.message));
            });
            return {
                encoding: 'application/json',
                body: { items: written },
            };
        });
        lexServer.chat.bsky.convo.acceptConvo(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            if (memberState.status === 'accepted') {
                return {
                    encoding: 'application/json',
                    body: {},
                };
            }
            memberState.status = 'accepted';
            const rev = chat.bumpConvoRev(convo);
            chat.logs.push({
                type: 'accept',
                rev,
                convoId: convo.id,
            });
            return {
                encoding: 'application/json',
                body: { rev },
            };
        });
        lexServer.chat.bsky.convo.leaveConvo(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            memberState.left = true;
            const rev = chat.bumpConvoRev(convo);
            chat.logs.push({
                type: 'leave',
                rev,
                convoId: convo.id,
            });
            return {
                encoding: 'application/json',
                body: {
                    convoId: convo.id,
                    rev,
                },
            };
        });
        lexServer.chat.bsky.convo.muteConvo(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            memberState.muted = true;
            const rev = chat.bumpConvoRev(convo);
            chat.logs.push({
                type: 'mute',
                rev,
                convoId: convo.id,
            });
            return {
                encoding: 'application/json',
                body: {
                    convo: await chat.toConvoView(convo, auth.did),
                },
            };
        });
        lexServer.chat.bsky.convo.unmuteConvo(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            memberState.muted = false;
            const rev = chat.bumpConvoRev(convo);
            chat.logs.push({
                type: 'unmute',
                rev,
                convoId: convo.id,
            });
            return {
                encoding: 'application/json',
                body: {
                    convo: await chat.toConvoView(convo, auth.did),
                },
            };
        });
        lexServer.chat.bsky.convo.updateRead(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            const target = chat.resolveReadTarget(convo, auth.did, args.input.body.messageId);
            if (target) {
                memberState.lastReadMessageId = target.id;
                const rev = chat.bumpConvoRev(convo);
                chat.logs.push({
                    type: 'read-message',
                    rev,
                    convoId: convo.id,
                    messageId: target.id,
                });
            }
            return {
                encoding: 'application/json',
                body: {
                    convo: await chat.toConvoView(convo, auth.did),
                },
            };
        });
        lexServer.chat.bsky.convo.updateAllRead(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const status = normalizeStatus(args.input.body.status);
            let updatedCount = 0;
            for (const convo of chat.convos.values()) {
                if (!chat.isConvoVisibleTo(convo, auth.did))
                    continue;
                const memberState = chat.getMemberState(convo, auth.did);
                if (status && memberState.status !== status)
                    continue;
                const target = chat.resolveReadTarget(convo, auth.did);
                if (!target)
                    continue;
                memberState.lastReadMessageId = target.id;
                const rev = chat.bumpConvoRev(convo);
                chat.logs.push({
                    type: 'read-message',
                    rev,
                    convoId: convo.id,
                    messageId: target.id,
                });
                updatedCount += 1;
            }
            return {
                encoding: 'application/json',
                body: { updatedCount },
            };
        });
        lexServer.chat.bsky.convo.deleteMessageForSelf(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            const message = chat.requireMessage(convo, args.input.body.messageId);
            memberState.deletedMessageIds.add(message.id);
            const rev = chat.bumpConvoRev(convo);
            chat.logs.push({
                type: 'delete-message',
                rev,
                convoId: convo.id,
                messageId: message.id,
            });
            return {
                encoding: 'application/json',
                body: chat.toDeletedMessageView(message, rev),
            };
        });
        lexServer.chat.bsky.convo.addReaction(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            const value = normalizeReactionValue(args.input.body.value);
            const message = chat.requireMessage(convo, args.input.body.messageId);
            if (memberState.deletedMessageIds.has(message.id)) {
                return {
                    status: 400,
                    error: 'ReactionMessageDeleted',
                    message: 'cannot react to a deleted message',
                };
            }
            if (!message.reactions.find((reaction) => reaction.senderDid === auth.did && reaction.value === value) &&
                message.reactions.length >= 20) {
                return {
                    status: 400,
                    error: 'ReactionLimitReached',
                    message: 'reaction limit reached',
                };
            }
            message.reactions = message.reactions.filter((reaction) => !(reaction.senderDid === auth.did && reaction.value === value));
            const createdAt = new Date().toISOString();
            message.reactions.push({
                value,
                senderDid: auth.did,
                createdAt,
            });
            message.reactions.sort((left, right) => left.createdAt.localeCompare(right.createdAt));
            const rev = chat.bumpConvoRev(convo);
            message.rev = rev;
            chat.logs.push({
                type: 'add-reaction',
                rev,
                convoId: convo.id,
                messageId: message.id,
                senderDid: auth.did,
                value,
            });
            return {
                encoding: 'application/json',
                body: {
                    message: chat.toMessageView(message),
                },
            };
        });
        lexServer.chat.bsky.convo.removeReaction(async (args) => {
            const auth = await chat.requireAuth(args.req);
            const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
            const memberState = chat.getMemberState(convo, auth.did);
            const value = normalizeReactionValue(args.input.body.value);
            const message = chat.requireMessage(convo, args.input.body.messageId);
            if (memberState.deletedMessageIds.has(message.id)) {
                return {
                    status: 400,
                    error: 'ReactionMessageDeleted',
                    message: 'cannot react to a deleted message',
                };
            }
            message.reactions = message.reactions.filter((reaction) => !(reaction.senderDid === auth.did && reaction.value === value));
            const rev = chat.bumpConvoRev(convo);
            message.rev = rev;
            chat.logs.push({
                type: 'remove-reaction',
                rev,
                convoId: convo.id,
                messageId: message.id,
                senderDid: auth.did,
                value,
            });
            return {
                encoding: 'application/json',
                body: {
                    message: chat.toMessageView(message),
                },
            };
        });
        if (lexServer.com.para.community) {
            lexServer.com.para.community.createBoard(async (args) => {
                const auth = await chat.requireAuth(args.req);
                // MOCK: Generate the two specific groups required for PARA communities
                const delConvo = chat.createGroupConvo(auth.did, 270);
                const subConvo = chat.createGroupConvo(auth.did, 30);
                // Normally would insert com.para.community.board to repo, just returning mock for now
                return {
                    encoding: 'application/json',
                    body: {
                        uri: `at://${auth.did}/com.para.community.board/mocktest`,
                        cid: 'bafyreimocktest',
                        delegatesChatId: delConvo.id,
                        subdelegatesChatId: subConvo.id,
                    },
                };
            });
        }
        if (lexServer.chat.bsky.group) {
            lexServer.chat.bsky.group.addMembers(async (args) => {
                const auth = await chat.requireAuth(args.req);
                const convo = chat.requireAccessibleConvo(args.input.body.convoId, auth.did);
                const newMembers = args.input.body.members;
                const totalSize = convo.memberDids.length + newMembers.length;
                if (convo.sizeLimit && totalSize > convo.sizeLimit) {
                    return {
                        status: 400,
                        error: 'MemberLimitReached',
                        message: `Group size limit exceeded. Max is ${convo.sizeLimit}`
                    };
                }
                for (const did of newMembers) {
                    if (!convo.memberDids.includes(did)) {
                        convo.memberDids.push(did);
                        convo.memberStates.set(did, {
                            status: 'request',
                            muted: false,
                            left: false,
                            deletedMessageIds: new Set(),
                        });
                    }
                }
                return {
                    encoding: 'application/json',
                    body: { convo: await chat.toConvoView(convo, auth.did) }
                };
            });
        }
        app.use(lexServer.xrpc.router);
        server.listen(port);
        await node_events_1.default.once(server, 'listening');
        return chat;
    }
    getClient() {
        return new api_1.AtpAgent({ service: this.url });
    }
    close() {
        return new Promise((resolve, reject) => {
            if (this.destroyed)
                return resolve();
            this.server.close((err) => {
                if (err)
                    return reject(err);
                this.destroyed = true;
                resolve();
            });
        });
    }
    async requireAuth(req) {
        const authorization = req.headers.authorization;
        if (!authorization?.startsWith('Bearer ')) {
            throw new xrpc_server_1.AuthRequiredError('missing jwt', 'MissingJwt');
        }
        const token = authorization.slice('Bearer '.length).trim();
        const nsid = (0, xrpc_server_1.parseReqNsid)(req);
        const payload = await (0, xrpc_server_1.verifyJwt)(token, this.did, nsid, async (did, forceRefresh) => {
            const atprotoData = await this.idResolver.did.resolveAtprotoData(did, Boolean(forceRefresh));
            return atprotoData.signingKey;
        });
        return { did: payload.iss };
    }
    parseMessageInput(input) {
        if (!input || typeof input.text !== 'string') {
            throw new xrpc_server_1.InvalidRequestError('message text is required');
        }
        return {
            text: input.text,
            facets: Array.isArray(input.facets)
                ? input.facets
                : undefined,
            embed: input.embed,
        };
    }
    getOrCreateConvo(memberDids, requesterDid) {
        const key = convoKey(memberDids);
        const existingId = this.convoKeys.get(key);
        if (existingId) {
            const existing = this.requireConvo(existingId);
            const requester = this.getMemberState(existing, requesterDid);
            requester.left = false;
            return existing;
        }
        const id = `convo-${++this.convoSeq}`;
        const rev = this.nextRev();
        const memberStates = new Map();
        for (const did of memberDids) {
            memberStates.set(did, {
                status: did === requesterDid ? 'accepted' : 'request',
                muted: false,
                left: false,
                deletedMessageIds: new Set(),
            });
        }
        const convo = {
            id,
            key,
            rev,
            memberDids,
            memberStates,
            messages: [],
        };
        this.convos.set(id, convo);
        this.convoKeys.set(key, id);
        this.logs.push({
            type: 'begin',
            rev,
            convoId: id,
        });
        return convo;
    }
    createGroupConvo(ownerDid, sizeLimit) {
        const id = `group-${++this.convoSeq}`;
        const rev = this.nextRev();
        const memberStates = new Map();
        memberStates.set(ownerDid, {
            status: 'accepted',
            muted: false,
            left: false,
            deletedMessageIds: new Set(),
        });
        const convo = {
            id,
            key: id, // unique key, bypassing member based key deduplication
            rev,
            memberDids: [ownerDid],
            memberStates,
            messages: [],
            sizeLimit,
        };
        this.convos.set(id, convo);
        this.convoKeys.set(id, id);
        this.logs.push({
            type: 'begin',
            rev,
            convoId: id,
        });
        return convo;
    }
    findConvoByMembers(memberDids) {
        const convoId = this.convoKeys.get(convoKey(memberDids));
        return convoId ? this.convos.get(convoId) : undefined;
    }
    requireConvo(convoId) {
        const convo = this.convos.get(convoId);
        if (!convo) {
            throw new xrpc_server_1.InvalidRequestError('unknown convo', 'NotFound');
        }
        return convo;
    }
    requireAccessibleConvo(convoId, did, opts) {
        const convo = this.requireConvo(convoId);
        const memberState = convo.memberStates.get(did);
        if (!memberState) {
            throw new xrpc_server_1.AuthRequiredError('not a conversation member');
        }
        if (memberState.left && !opts?.allowLeft) {
            throw new xrpc_server_1.InvalidRequestError('conversation not found', 'NotFound');
        }
        return convo;
    }
    requireMessage(convo, messageId) {
        const message = convo.messages.find((item) => item.id === messageId);
        if (!message) {
            throw new xrpc_server_1.InvalidRequestError('unknown message', 'NotFound');
        }
        return message;
    }
    getMemberState(convo, did) {
        const memberState = convo.memberStates.get(did);
        if (!memberState) {
            throw new xrpc_server_1.AuthRequiredError('not a conversation member');
        }
        return memberState;
    }
    appendMessage(convo, senderDid, input) {
        const senderState = this.getMemberState(convo, senderDid);
        senderState.left = false;
        senderState.status = 'accepted';
        const now = new Date().toISOString();
        const rev = this.bumpConvoRev(convo);
        const message = {
            id: `msg-${++this.messageSeq}`,
            rev,
            text: input.text,
            facets: input.facets,
            embed: input.embed,
            senderDid,
            sentAt: now,
            reactions: [],
        };
        convo.messages.push(message);
        senderState.lastReadMessageId = message.id;
        this.logs.push({
            type: 'create-message',
            rev,
            convoId: convo.id,
            messageId: message.id,
        });
        return this.toMessageView(message);
    }
    resolveReadTarget(convo, viewerDid, messageId) {
        if (messageId) {
            return this.requireMessage(convo, messageId);
        }
        const visible = this.getVisibleMessageModels(convo, viewerDid);
        return visible[0];
    }
    isConvoVisibleTo(convo, did) {
        const state = convo.memberStates.get(did);
        return Boolean(state && !state.left);
    }
    async listVisibleConvos(did, opts) {
        const sorted = [...this.convos.values()].sort((left, right) => right.rev.localeCompare(left.rev));
        const result = [];
        for (const convo of sorted) {
            if (!this.isConvoVisibleTo(convo, did))
                continue;
            const memberState = this.getMemberState(convo, did);
            if (opts.status && memberState.status !== opts.status)
                continue;
            const unreadCount = this.getUnreadCount(convo, did);
            if (opts.readState === 'unread' && unreadCount < 1)
                continue;
            result.push(await this.toConvoView(convo, did));
        }
        return result;
    }
    getVisibleMessages(convo, viewerDid) {
        return [...convo.messages]
            .sort((left, right) => right.rev.localeCompare(left.rev))
            .map((message) => this.toVisibleMessage(message, convo, viewerDid));
    }
    getVisibleMessageModels(convo, viewerDid) {
        const deleted = this.getMemberState(convo, viewerDid).deletedMessageIds;
        return [...convo.messages]
            .filter((message) => !deleted.has(message.id))
            .sort((left, right) => right.rev.localeCompare(left.rev));
    }
    getUnreadCount(convo, viewerDid) {
        const memberState = this.getMemberState(convo, viewerDid);
        const visible = this.getVisibleMessageModels(convo, viewerDid);
        if (!visible.length)
            return 0;
        if (!memberState.lastReadMessageId) {
            return visible.filter((message) => message.senderDid !== viewerDid).length;
        }
        let unreadCount = 0;
        for (const message of visible) {
            if (message.id === memberState.lastReadMessageId) {
                break;
            }
            if (message.senderDid !== viewerDid) {
                unreadCount += 1;
            }
        }
        return unreadCount;
    }
    canViewLog(log, viewerDid) {
        const convo = this.convos.get(log.convoId);
        if (!convo)
            return false;
        return this.isConvoVisibleTo(convo, viewerDid);
    }
    toLogView(log, viewerDid) {
        const base = {
            rev: log.rev,
            convoId: log.convoId,
        };
        if (log.type === 'begin') {
            return {
                $type: 'chat.bsky.convo.defs#logBeginConvo',
                ...base,
            };
        }
        if (log.type === 'accept') {
            return {
                $type: 'chat.bsky.convo.defs#logAcceptConvo',
                ...base,
            };
        }
        if (log.type === 'leave') {
            return {
                $type: 'chat.bsky.convo.defs#logLeaveConvo',
                ...base,
            };
        }
        if (log.type === 'mute') {
            return {
                $type: 'chat.bsky.convo.defs#logMuteConvo',
                ...base,
            };
        }
        if (log.type === 'unmute') {
            return {
                $type: 'chat.bsky.convo.defs#logUnmuteConvo',
                ...base,
            };
        }
        const convo = this.requireConvo(log.convoId);
        const message = this.requireMessage(convo, log.messageId);
        const visibleMessage = this.toVisibleMessage(message, convo, viewerDid);
        if (log.type === 'create-message') {
            return {
                $type: 'chat.bsky.convo.defs#logCreateMessage',
                ...base,
                message: visibleMessage,
            };
        }
        if (log.type === 'delete-message') {
            return {
                $type: 'chat.bsky.convo.defs#logDeleteMessage',
                ...base,
                message: visibleMessage,
            };
        }
        if (log.type === 'read-message') {
            return {
                $type: 'chat.bsky.convo.defs#logReadMessage',
                ...base,
                message: visibleMessage,
            };
        }
        const reaction = this.toReactionView({
            value: log.value,
            senderDid: log.senderDid,
            createdAt: message.reactions.find((item) => item.value === log.value && item.senderDid === log.senderDid)?.createdAt ?? message.sentAt,
        });
        if (log.type === 'add-reaction') {
            return {
                $type: 'chat.bsky.convo.defs#logAddReaction',
                ...base,
                message: visibleMessage,
                reaction: reaction,
            };
        }
        return {
            $type: 'chat.bsky.convo.defs#logRemoveReaction',
            ...base,
            message: visibleMessage,
            reaction: reaction,
        };
    }
    async toConvoView(convo, viewerDid) {
        const memberState = this.getMemberState(convo, viewerDid);
        const members = await Promise.all(convo.memberDids.map((did) => this.getProfile(did)));
        const lastVisibleMessage = convo.messages.length
            ? this.toVisibleMessage(convo.messages[convo.messages.length - 1], convo, viewerDid)
            : undefined;
        const lastReaction = this.getLastReaction(convo, viewerDid);
        return {
            $type: 'chat.bsky.convo.defs#convoView',
            id: convo.id,
            rev: convo.rev,
            members,
            lastMessage: lastVisibleMessage,
            lastReaction: lastReaction,
            muted: memberState.muted,
            status: memberState.status,
            unreadCount: this.getUnreadCount(convo, viewerDid),
        };
    }
    getLastReaction(convo, viewerDid) {
        const deleted = this.getMemberState(convo, viewerDid).deletedMessageIds;
        for (let index = convo.messages.length - 1; index >= 0; index -= 1) {
            const message = convo.messages[index];
            if (!message || deleted.has(message.id))
                continue;
            const reaction = message.reactions[message.reactions.length - 1];
            if (!reaction)
                continue;
            return {
                $type: 'chat.bsky.convo.defs#messageAndReactionView',
                message: this.toMessageView(message),
                reaction: this.toReactionView(reaction),
            };
        }
        return undefined;
    }
    toVisibleMessage(message, convo, viewerDid) {
        const deleted = this.getMemberState(convo, viewerDid).deletedMessageIds;
        if (deleted.has(message.id)) {
            return this.toDeletedMessageView(message);
        }
        return this.toMessageView(message);
    }
    toMessageView(message) {
        return {
            $type: 'chat.bsky.convo.defs#messageView',
            id: message.id,
            rev: message.rev,
            text: message.text,
            facets: message.facets,
            embed: message.embed,
            reactions: message.reactions.length
                ? message.reactions.map((reaction) => this.toReactionView(reaction))
                : undefined,
            sender: {
                $type: 'chat.bsky.convo.defs#messageViewSender',
                did: message.senderDid,
            },
            sentAt: message.sentAt,
        };
    }
    toDeletedMessageView(message, rev = message.rev) {
        return {
            $type: 'chat.bsky.convo.defs#deletedMessageView',
            id: message.id,
            rev,
            sender: {
                $type: 'chat.bsky.convo.defs#messageViewSender',
                did: message.senderDid,
            },
            sentAt: message.sentAt,
        };
    }
    toReactionView(reaction) {
        return {
            $type: 'chat.bsky.convo.defs#reactionView',
            value: reaction.value,
            sender: {
                $type: 'chat.bsky.convo.defs#reactionViewSender',
                did: reaction.senderDid,
            },
            createdAt: reaction.createdAt,
        };
    }
    async getProfile(did) {
        const cached = this.profileCache.get(did);
        if (cached)
            return cached;
        try {
            const atprotoData = await this.idResolver.did.resolveAtprotoData(did);
            const profile = {
                $type: 'chat.bsky.actor.defs#profileViewBasic',
                did,
                handle: atprotoData.handle,
                displayName: deriveDisplayName(atprotoData.handle),
            };
            this.profileCache.set(did, profile);
            return profile;
        }
        catch {
            const fallback = {
                $type: 'chat.bsky.actor.defs#profileViewBasic',
                did,
                handle: did,
                displayName: did,
            };
            this.profileCache.set(did, fallback);
            return fallback;
        }
    }
    bumpConvoRev(convo) {
        const rev = this.nextRev();
        convo.rev = rev;
        return rev;
    }
    nextRev() {
        this.revSeq += 1;
        return this.revSeq.toString().padStart(12, '0');
    }
}
exports.TestChat = TestChat;
const createChatDid = async (plcUrl, port) => {
    const keypair = await crypto_1.Secp256k1Keypair.create();
    const plcClient = new plc.Client(plcUrl);
    const op = await plc.signOperation({
        type: 'plc_operation',
        verificationMethods: {
            atproto: keypair.did(),
        },
        rotationKeys: [keypair.did()],
        alsoKnownAs: [],
        services: {
            bsky_chat: {
                type: 'BskyChatService',
                endpoint: `http://localhost:${port}`,
            },
        },
        prev: null,
    }, keypair);
    const did = await plc.didForCreateOp(op);
    await plcClient.sendOperation(did, op);
    return did;
};
const convoKey = (memberDids) => [...memberDids].sort().join('|');
const normalizeMemberList = (value, requesterDid) => {
    const members = Array.isArray(value)
        ? value
        : typeof value === 'string'
            ? [value]
            : [];
    return [...new Set([...members, requesterDid])].sort();
};
const normalizeStatus = (value) => {
    return value === 'request' || value === 'accepted' ? value : undefined;
};
const normalizeReadState = (value) => {
    return value === 'unread' ? value : undefined;
};
const decodeCursor = (cursor) => {
    if (!cursor)
        return 0;
    const parsed = Number.parseInt(cursor, 10);
    return Number.isFinite(parsed) && parsed > 0 ? parsed : 0;
};
const encodeCursor = (offset) => String(offset);
const clampLimit = (limit, max) => {
    if (!limit || !Number.isFinite(limit) || limit < 1)
        return 50;
    return Math.min(limit, max);
};
const deriveDisplayName = (handle) => {
    const [first] = handle.split('.');
    return first || handle;
};
const normalizeReactionValue = (value) => {
    if (typeof value !== 'string') {
        throw new xrpc_server_1.InvalidRequestError('reaction value must be a string', 'ReactionInvalidValue');
    }
    const trimmed = value.trim();
    if (!trimmed) {
        throw new xrpc_server_1.InvalidRequestError('reaction value must not be empty', 'ReactionInvalidValue');
    }
    if (trimmed.length > 32) {
        throw new xrpc_server_1.InvalidRequestError('reaction value is too long', 'ReactionInvalidValue');
    }
    return trimmed;
};
const getPlcUrl = (config) => {
    if (config.plcUrl)
        return config.plcUrl;
    const maybePds = config.pds;
    return maybePds?.ctx?.cfg?.didPlcUrl || maybePds?.ctx?.cfg?.identity?.plcUrl;
};
//# sourceMappingURL=chat.js.map