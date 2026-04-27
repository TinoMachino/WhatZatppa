export type QueryParams = {};
export interface InputSchema {
    uri: string;
    cid: string;
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
//# sourceMappingURL=createBookmark.d.ts.map