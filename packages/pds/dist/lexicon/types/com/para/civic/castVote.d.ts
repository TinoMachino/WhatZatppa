export type QueryParams = {};
export interface InputSchema {
    cabildeo: string;
    selectedOption: number;
}
export interface OutputSchema {
    uri: string;
    cid: string;
    commit: {
        cid: string;
        rev: string;
    };
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
    error?: 'NotFound' | 'InvalidPhase' | 'DeadlineExpired' | 'InvalidOption' | 'CommunityMembershipRequired';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=castVote.d.ts.map