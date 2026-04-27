import type * as AppBskyDraftDefs from './defs.js';
export type QueryParams = {
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    drafts: AppBskyDraftDefs.DraftView[];
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
//# sourceMappingURL=getDrafts.d.ts.map