import type * as ToolsOzoneModerationDefs from './defs.js';
export type QueryParams = {
    subjects: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    subjects: ToolsOzoneModerationDefs.SubjectView[];
}
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getSubjects.d.ts.map