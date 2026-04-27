import type * as AppBskyGraphDefs from './defs.js';
export type QueryParams = {
    /** The account (actor) to enumerate lists from. */
    actor: string;
    limit: number;
    cursor?: string;
    /** Optional filter by list purpose. If not specified, all supported types are returned. */
    purposes?: 'modlist' | 'curatelist' | (string & {})[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    lists: AppBskyGraphDefs.ListView[];
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
//# sourceMappingURL=getLists.d.ts.map