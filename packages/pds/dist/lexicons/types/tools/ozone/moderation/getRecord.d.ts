import type * as ToolsOzoneModerationDefs from './defs.js';
export type QueryParams = {
    uri: string;
    cid?: string;
};
export type InputSchema = undefined;
export type OutputSchema = ToolsOzoneModerationDefs.RecordViewDetail;
export type HandlerInput = void;
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
    error?: 'RecordNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getRecord.d.ts.map