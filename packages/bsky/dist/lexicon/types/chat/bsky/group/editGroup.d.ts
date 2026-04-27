import type * as ChatBskyConvoDefs from '../convo/defs.js';
export type QueryParams = {};
export interface InputSchema {
    convoId: string;
    name: string;
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
    error?: 'ConvoLocked' | 'InvalidConvo' | 'InsufficientRole';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=editGroup.d.ts.map