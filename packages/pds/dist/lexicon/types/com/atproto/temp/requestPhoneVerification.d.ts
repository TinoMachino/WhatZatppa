export type QueryParams = {};
export interface InputSchema {
    phoneNumber: string;
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
//# sourceMappingURL=requestPhoneVerification.d.ts.map