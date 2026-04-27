export type QueryParams = {};
export interface InputSchema {
    convoId: string;
    member: string;
}
export interface OutputSchema {
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
    error?: 'InvalidConvo' | 'InsufficientRole';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=rejectJoinRequest.d.ts.map