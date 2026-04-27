import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    post: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    tally: ComParaCivicDefs.PolicyTally;
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
    error?: 'NotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getPolicyTally.d.ts.map