import type * as ChatBskyConvoDefs from '../convo/defs.js';
export type QueryParams = {};
export interface InputSchema {
    convoId: string;
    members: string[];
}
export interface OutputSchema {
    convo: ChatBskyConvoDefs.ConvoView;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerSuccess {
    encoding: 'application/json';
    body: OutputSchema;
    headers?: {
        [key: string]: string;
    };
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'AccountSuspended' | 'BlockedActor' | 'GroupInvitesDisabled' | 'ConvoLocked' | 'InsufficientRole' | 'InvalidConvo' | 'MemberLimitReached' | 'NotFollowedBySender' | 'RecipientNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=addMembers.d.ts.map