export type QueryParams = {};
export interface InputSchema {
    /** The DID of who this notification comes from. */
    from: string;
    /** The DID of who this notification should go to. */
    to: string;
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=sendNotification.d.ts.map