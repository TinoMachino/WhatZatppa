import type * as AppBskyFeedDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    feed?: string;
    interactions: AppBskyFeedDefs.Interaction[];
}
export interface OutputSchema {
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=sendInteractions.d.ts.map