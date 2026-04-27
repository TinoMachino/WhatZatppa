export type QueryParams = {};
export interface InputSchema {
    /** The subject's DID to dismiss the match with. */
    subject: string;
}
export interface OutputSchema {
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
    error?: 'InvalidDid' | 'InternalError';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=dismissMatch.d.ts.map