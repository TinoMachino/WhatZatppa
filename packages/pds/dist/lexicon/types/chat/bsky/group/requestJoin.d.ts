import type * as ChatBskyConvoDefs from '../convo/defs.js';
export type QueryParams = {};
export interface InputSchema {
    code: string;
}
export interface OutputSchema {
    status: 'joined' | 'pending' | (string & {});
    convo?: ChatBskyConvoDefs.ConvoView;
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
    error?: 'ConvoLocked' | 'FollowRequired' | 'InvalidCode' | 'LinkDisabled' | 'MemberLimitReached' | 'UserKicked';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=requestJoin.d.ts.map