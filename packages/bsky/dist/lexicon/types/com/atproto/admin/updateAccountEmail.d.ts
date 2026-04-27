export type QueryParams = {};
export interface InputSchema {
    /** The handle or DID of the repo. */
    account: string;
    email: string;
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
//# sourceMappingURL=updateAccountEmail.d.ts.map