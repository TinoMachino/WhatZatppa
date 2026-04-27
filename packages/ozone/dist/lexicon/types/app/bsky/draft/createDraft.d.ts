import type * as AppBskyDraftDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    draft: AppBskyDraftDefs.Draft;
}
export interface OutputSchema {
    /** The ID of the created draft. */
    id: string;
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
    error?: 'DraftLimitReached';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=createDraft.d.ts.map