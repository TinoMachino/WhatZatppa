import type * as ChatBskyGroupDefs from './defs.js';
export type QueryParams = {
    convoId: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    requests: ChatBskyGroupDefs.JoinRequestView[];
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
    error?: 'InvalidConvo' | 'InsufficientRole';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=listJoinRequests.d.ts.map