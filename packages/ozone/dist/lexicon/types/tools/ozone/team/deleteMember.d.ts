export type QueryParams = {};
export interface InputSchema {
    did: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'MemberNotFound' | 'CannotDeleteSelf';
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=deleteMember.d.ts.map