import type * as AppBskyActorDefs from './defs.js';
export type QueryParams = {
    actors: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    profiles: AppBskyActorDefs.ProfileViewDetailed[];
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
//# sourceMappingURL=getProfiles.d.ts.map