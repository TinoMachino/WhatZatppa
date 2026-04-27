import http from 'node:http';
import { AtpAgent, ChatBskyConvoDefs } from '@atproto/api';
type ConvoStatus = 'request' | 'accepted';
type InternalReaction = {
    value: string;
    senderDid: string;
    createdAt: string;
};
type InternalMessage = {
    id: string;
    rev: string;
    text: string;
    facets?: ChatBskyConvoDefs.MessageInput['facets'];
    embed?: ChatBskyConvoDefs.MessageInput['embed'];
    senderDid: string;
    sentAt: string;
    reactions: InternalReaction[];
};
type InternalMemberState = {
    status: ConvoStatus;
    muted: boolean;
    left: boolean;
    deletedMessageIds: Set<string>;
    lastReadMessageId?: string;
};
type InternalConvo = {
    id: string;
    key: string;
    rev: string;
    memberDids: string[];
    memberStates: Map<string, InternalMemberState>;
    messages: InternalMessage[];
    sizeLimit?: number;
};
export type TestChatConfig = {
    plcUrl?: string;
    port?: number;
    serviceDid?: string;
    serverDid?: string;
    pds?: unknown;
};
export declare class TestChat {
    url: string;
    port: number;
    server: http.Server;
    did: string;
    destroyed: boolean;
    private readonly idResolver;
    private readonly profileCache;
    private readonly convos;
    private readonly convoKeys;
    private readonly logs;
    private revSeq;
    private convoSeq;
    private messageSeq;
    constructor(url: string, port: number, server: http.Server, did: string, plcUrl: string);
    static create(config: TestChatConfig): Promise<TestChat>;
    getClient(): AtpAgent;
    close(): Promise<void>;
    private requireAuth;
    private parseMessageInput;
    private getOrCreateConvo;
    createGroupConvo(ownerDid: string, sizeLimit: number): InternalConvo;
    private findConvoByMembers;
    private requireConvo;
    private requireAccessibleConvo;
    private requireMessage;
    private getMemberState;
    private appendMessage;
    private resolveReadTarget;
    private isConvoVisibleTo;
    private listVisibleConvos;
    private getVisibleMessages;
    private getVisibleMessageModels;
    private getUnreadCount;
    private canViewLog;
    private toLogView;
    private toConvoView;
    private getLastReaction;
    private toVisibleMessage;
    private toMessageView;
    private toDeletedMessageView;
    private toReactionView;
    private getProfile;
    private bumpConvoRev;
    private nextRev;
}
export {};
//# sourceMappingURL=chat.d.ts.map