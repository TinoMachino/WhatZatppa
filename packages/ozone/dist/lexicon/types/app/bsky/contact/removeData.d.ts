export type QueryParams = {};
export interface InputSchema {
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
//# sourceMappingURL=removeData.d.ts.map