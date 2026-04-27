import type * as ToolsOzoneModerationDefs from './defs.js';
export type QueryParams = {
    did: string;
};
export type InputSchema = undefined;
export type OutputSchema = ToolsOzoneModerationDefs.RepoViewDetail;
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
    error?: 'RepoNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getRepo.d.ts.map