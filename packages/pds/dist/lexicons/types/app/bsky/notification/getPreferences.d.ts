import type * as AppBskyNotificationDefs from './defs.js';
export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    preferences: AppBskyNotificationDefs.Preferences;
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
//# sourceMappingURL=getPreferences.d.ts.map