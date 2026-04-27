import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {
    convoId: string;
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
    error?: 'InvalidConvo';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getConvo.d.ts.map