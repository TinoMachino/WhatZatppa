export type QueryParams = {};
export interface InputSchema {
    cabildeo: string;
    sessionId: string;
    present: boolean;
}
export interface OutputSchema {
    cabildeo: string;
    present: boolean;
    expiresAt?: string;
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
    error?: 'NotFound' | 'InvalidPhase' | 'LiveStatusRequired';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=putLivePresence.d.ts.map