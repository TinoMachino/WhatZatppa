import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {
    members: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    canChat: boolean;
    convo?: ChatBskyConvoDefs.ConvoView;
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getConvoAvailability.d.ts.map