import type * as AppBskyActorDefs from '../actor/defs.js';
export type QueryParams = {
    actor: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    subject: AppBskyActorDefs.ProfileView;
    cursor?: string;
    follows: AppBskyActorDefs.ProfileView[];
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
//# sourceMappingURL=getFollows.d.ts.map