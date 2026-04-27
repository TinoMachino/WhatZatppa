import type * as AppBskyActorDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    preferences: AppBskyActorDefs.Preferences;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=putPreferences.d.ts.map