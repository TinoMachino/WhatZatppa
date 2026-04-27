export type QueryParams = {};
export interface InputSchema {
    status?: 'request' | 'accepted' | (string & {});
}
export interface OutputSchema {
    /** The count of updated convos. */
    updatedCount: number;
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
//# sourceMappingURL=updateAllRead.d.ts.map