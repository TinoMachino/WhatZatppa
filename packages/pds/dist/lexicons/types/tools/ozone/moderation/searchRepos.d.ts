import type * as ToolsOzoneModerationDefs from './defs.js';
export type QueryParams = {
    /** DEPRECATED: use 'q' instead */
    term?: string;
    q?: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    repos: ToolsOzoneModerationDefs.RepoView[];
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
//# sourceMappingURL=searchRepos.d.ts.map