import type * as ComParaActorDefs from './defs.js';
export type QueryParams = {
    /** Handle or DID of the actor. */
    actor: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    actor: string;
    stats: ComParaActorDefs.ProfileStats;
    status?: ComParaActorDefs.StatusView;
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
    error?: 'NotFound' | 'BlockedActor' | 'BlockedByActor';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getProfileStats.d.ts.map