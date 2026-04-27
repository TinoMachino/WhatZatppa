import type * as ComAtprotoLabelDefs from './defs.js';
export type QueryParams = {
    /** List of AT URI patterns to match (boolean 'OR'). Each may be a prefix (ending with '*'; will match inclusive of the string leading to '*'), or a full URI. */
    uriPatterns: string[];
    /** Optional list of label sources (DIDs) to filter on. */
    sources?: string[];
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    labels: ComAtprotoLabelDefs.Label[];
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
//# sourceMappingURL=queryLabels.d.ts.map