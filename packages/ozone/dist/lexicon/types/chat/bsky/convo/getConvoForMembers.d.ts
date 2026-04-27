import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {
    members: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    convo: ChatBskyConvoDefs.ConvoView;
}
export type HandlerInput = void;
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
    error?: 'AccountSuspended' | 'BlockedActor' | 'MessagesDisabled' | 'NotFollowedBySender' | 'RecipientNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getConvoForMembers.d.ts.map