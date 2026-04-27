export type QueryParams = {};
export interface InputSchema {
    operation: {
        [_ in string]: unknown;
    };
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
//# sourceMappingURL=submitPlcOperation.d.ts.map