import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    convoId: string;
    messageId?: string;
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
    error?: 'InvalidConvo';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=updateRead.d.ts.map