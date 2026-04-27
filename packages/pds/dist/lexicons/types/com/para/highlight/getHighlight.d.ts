import type * as ComParaHighlightDefs from './defs.js';
export type QueryParams = {
    highlight: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    highlight?: ComParaHighlightDefs.HighlightView;
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
//# sourceMappingURL=getHighlight.d.ts.map