export type QueryParams = {};
export interface InputSchema {
    account: string;
    /** Optional reason for disabled invites. */
    note?: string;
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
//# sourceMappingURL=disableAccountInvites.d.ts.map