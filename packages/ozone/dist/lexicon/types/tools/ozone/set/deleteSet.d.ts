export type QueryParams = {};
export interface InputSchema {
    /** Name of the set to delete */
    name: string;
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
    error?: 'SetNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=deleteSet.d.ts.map