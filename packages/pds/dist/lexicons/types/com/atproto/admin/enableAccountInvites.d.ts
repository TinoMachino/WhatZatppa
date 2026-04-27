export type QueryParams = {};
export interface InputSchema {
    account: string;
    /** Optional reason for enabled invites. */
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
//# sourceMappingURL=enableAccountInvites.d.ts.map