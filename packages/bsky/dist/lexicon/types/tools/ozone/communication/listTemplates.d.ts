import type * as ToolsOzoneCommunicationDefs from './defs.js';
export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    communicationTemplates: ToolsOzoneCommunicationDefs.TemplateView[];
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
//# sourceMappingURL=listTemplates.d.ts.map