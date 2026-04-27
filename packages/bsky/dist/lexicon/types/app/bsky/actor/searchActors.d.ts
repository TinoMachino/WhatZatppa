import type * as AppBskyActorDefs from './defs.js';
export type QueryParams = {
    /** DEPRECATED: use 'q' instead. */
    term?: string;
    /** Search query string. Syntax, phrase, boolean, and faceting is unspecified, but Lucene query syntax is recommended. */
    q?: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    actors: AppBskyActorDefs.ProfileView[];
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
//# sourceMappingURL=searchActors.d.ts.map