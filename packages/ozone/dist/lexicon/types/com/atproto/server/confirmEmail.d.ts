export type QueryParams = {};
export interface InputSchema {
    email: string;
    token: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'AccountNotFound' | 'ExpiredToken' | 'InvalidToken' | 'InvalidEmail';
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=confirmEmail.d.ts.map