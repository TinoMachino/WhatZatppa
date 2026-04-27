import type * as AppBskyGraphDefs from './defs.js';
export type QueryParams = {
    uris: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    starterPacks: AppBskyGraphDefs.StarterPackViewBasic[];
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
//# sourceMappingURL=getStarterPacks.d.ts.map