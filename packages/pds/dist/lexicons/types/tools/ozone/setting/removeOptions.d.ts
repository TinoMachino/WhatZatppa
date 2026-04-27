export type QueryParams = {};
export interface InputSchema {
    keys: string[];
    scope: 'instance' | 'personal' | (string & {});
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=removeOptions.d.ts.map