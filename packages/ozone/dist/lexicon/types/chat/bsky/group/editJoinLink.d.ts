import type * as ChatBskyGroupDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    convoId: string;
    requireApproval?: boolean;
    joinRule?: ChatBskyGroupDefs.JoinRule;
}
export interface OutputSchema {
    joinLink: ChatBskyGroupDefs.JoinLinkView;
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
    error?: 'InvalidConvo' | 'InsufficientRole' | 'NoJoinLink';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=editJoinLink.d.ts.map