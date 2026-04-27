export type QueryParams = {};
export interface InputSchema {
    convoId: string;
}
export interface OutputSchema {
    convoId: string;
    rev: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
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
    error?: 'InvalidConvo' | 'OwnerCannotLeave';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=leaveConvo.d.ts.map