import type * as AppBskyAgeassuranceDefs from './defs.js';
export type QueryParams = {};
export type InputSchema = undefined;
export type OutputSchema = AppBskyAgeassuranceDefs.Config;
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
//# sourceMappingURL=getConfig.d.ts.map