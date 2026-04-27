export type QueryParams = {};
export interface InputSchema {
    /** The new handle. */
    handle: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=updateHandle.d.ts.map