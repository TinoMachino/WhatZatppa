import type * as ComParaHighlightDefs from './defs.js';
export type QueryParams = {
    community?: string;
    state?: string;
    subject?: string;
    creator?: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    highlights: ComParaHighlightDefs.HighlightView[];
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
//# sourceMappingURL=listHighlights.d.ts.map