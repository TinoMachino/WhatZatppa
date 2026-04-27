import type * as ChatBskyGroupDefs from './defs.js';
export type QueryParams = {
    code: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    group: ChatBskyGroupDefs.GroupPublicView;
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
    error?: 'InvalidCode';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getGroupPublicInfo.d.ts.map