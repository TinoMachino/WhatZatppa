export type QueryParams = {};
export interface InputSchema {
    did: string;
    password: string;
    token: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'ExpiredToken' | 'InvalidToken';
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=deleteAccount.d.ts.map