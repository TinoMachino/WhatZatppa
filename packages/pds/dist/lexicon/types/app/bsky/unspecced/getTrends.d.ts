import type * as AppBskyUnspeccedDefs from './defs.js';
export type QueryParams = {
    limit: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    trends: AppBskyUnspeccedDefs.TrendView[];
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
//# sourceMappingURL=getTrends.d.ts.map