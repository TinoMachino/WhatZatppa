import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    cabildeo: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cabildeo: ComParaCivicDefs.CabildeoView;
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
//# sourceMappingURL=getCabildeo.d.ts.map