import type * as AppBskyDraftDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    draft: AppBskyDraftDefs.DraftWithId;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=updateDraft.d.ts.map