import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    /** Optional community filter. */
    community?: string;
    /** Optional phase filter. */
    phase?: 'draft' | 'open' | 'deliberating' | 'voting' | 'resolved' | (string & {});
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    cabildeos: ComParaCivicDefs.CabildeoView[];
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
//# sourceMappingURL=listCabildeos.d.ts.map