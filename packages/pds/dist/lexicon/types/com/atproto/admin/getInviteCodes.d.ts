import type * as ComAtprotoServerDefs from '../server/defs.js';
export type QueryParams = {
    sort: 'recent' | 'usage' | (string & {});
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    codes: ComAtprotoServerDefs.InviteCode[];
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
//# sourceMappingURL=getInviteCodes.d.ts.map