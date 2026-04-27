export type QueryParams = {};
export interface InputSchema {
    communityUri: string;
}
export interface OutputSchema {
    status: string;
    memberCount: number;
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=acceptDraftInvite.d.ts.map