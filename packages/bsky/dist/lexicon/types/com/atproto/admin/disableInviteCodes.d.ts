export type QueryParams = {};
export interface InputSchema {
    codes?: string[];
    accounts?: string[];
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
//# sourceMappingURL=disableInviteCodes.d.ts.map