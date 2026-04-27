import type * as AppBskyActorDefs from './defs.js';
export type QueryParams = {
    /** DEPRECATED: use 'q' instead. */
    term?: string;
    /** Search query prefix; not a full query string. */
    q?: string;
    limit: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    actors: AppBskyActorDefs.ProfileViewBasic[];
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
//# sourceMappingURL=searchActorsTypeahead.d.ts.map