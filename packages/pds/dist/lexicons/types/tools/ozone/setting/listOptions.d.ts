import type * as ToolsOzoneSettingDefs from './defs.js';
export type QueryParams = {
    limit: number;
    cursor?: string;
    scope: 'instance' | 'personal' | (string & {});
    /** Filter keys by prefix */
    prefix?: string;
    /** Filter for only the specified keys. Ignored if prefix is provided */
    keys?: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    options: ToolsOzoneSettingDefs.Option[];
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
//# sourceMappingURL=listOptions.d.ts.map