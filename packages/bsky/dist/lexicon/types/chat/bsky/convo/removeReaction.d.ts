import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    convoId: string;
    messageId: string;
    value: string;
}
export interface OutputSchema {
    message: ChatBskyConvoDefs.MessageView;
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
    error?: 'InvalidConvo' | 'ReactionNotAllowed' | 'ReactionMessageDeleted' | 'ReactionInvalidValue';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=removeReaction.d.ts.map