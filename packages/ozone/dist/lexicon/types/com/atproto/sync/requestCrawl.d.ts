export type QueryParams = {};
export interface InputSchema {
    /** Hostname of the current service (eg, PDS) that is requesting to be crawled. */
    hostname: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'HostBanned';
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=requestCrawl.d.ts.map