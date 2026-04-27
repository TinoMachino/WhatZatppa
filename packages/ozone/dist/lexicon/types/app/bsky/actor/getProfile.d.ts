import type * as AppBskyActorDefs from './defs.js';
export type QueryParams = {
    /** Handle or DID of account to fetch profile of. */
    actor: string;
};
export type InputSchema = undefined;
export type OutputSchema = AppBskyActorDefs.ProfileViewDetailed;
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
//# sourceMappingURL=getProfile.d.ts.map