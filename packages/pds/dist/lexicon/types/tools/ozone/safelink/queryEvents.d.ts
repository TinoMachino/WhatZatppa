import type * as ToolsOzoneSafelinkDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    /** Cursor for pagination */
    cursor?: string;
    /** Maximum number of results to return */
    limit: number;
    /** Filter by specific URLs or domains */
    urls?: string[];
    /** Filter by pattern type */
    patternType?: string;
    /** Sort direction */
    sortDirection: 'asc' | 'desc' | (string & {});
}
export interface OutputSchema {
    /** Next cursor for pagination. Only present if there are more results. */
    cursor?: string;
    events: ToolsOzoneSafelinkDefs.Event[];
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=queryEvents.d.ts.map