export type QueryParams = {};
export interface InputSchema {
    convoId: string;
}
export interface OutputSchema {
    /** Rev when the convo was accepted. If not present, the convo was already accepted. */
    rev?: string;
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
    error?: 'InvalidConvo';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=acceptConvo.d.ts.map