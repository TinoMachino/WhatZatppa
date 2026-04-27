import type * as ComAtprotoAdminDefs from './defs.js';
export type QueryParams = {
    email?: string;
    cursor?: string;
    limit: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    accounts: ComAtprotoAdminDefs.AccountView[];
}
export type HandlerInput = void;
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
//# sourceMappingURL=searchAccounts.d.ts.map