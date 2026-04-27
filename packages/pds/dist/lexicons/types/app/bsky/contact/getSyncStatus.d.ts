import type * as AppBskyContactDefs from './defs.js';
export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    syncStatus?: AppBskyContactDefs.SyncStatus;
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
    error?: 'InvalidDid' | 'InternalError';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getSyncStatus.d.ts.map