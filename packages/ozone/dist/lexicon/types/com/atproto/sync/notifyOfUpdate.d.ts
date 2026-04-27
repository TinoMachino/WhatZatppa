export type QueryParams = {};
export interface InputSchema {
    /** Hostname of the current service (usually a PDS) that is notifying of update. */
    hostname: string;
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
//# sourceMappingURL=notifyOfUpdate.d.ts.map