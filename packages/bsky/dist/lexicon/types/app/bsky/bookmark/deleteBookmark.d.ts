export type QueryParams = {};
export interface InputSchema {
    uri: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'UnsupportedCollection';
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=deleteBookmark.d.ts.map