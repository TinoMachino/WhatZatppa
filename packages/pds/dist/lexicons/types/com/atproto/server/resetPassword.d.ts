export type QueryParams = {};
export interface InputSchema {
    token: string;
    password: string;
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
//# sourceMappingURL=resetPassword.d.ts.map