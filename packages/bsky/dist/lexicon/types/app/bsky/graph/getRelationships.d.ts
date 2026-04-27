import { type $Typed } from '../../../../util';
import type * as AppBskyGraphDefs from './defs.js';
export type QueryParams = {
    /** Primary account requesting relationships for. */
    actor: string;
    /** List of 'other' accounts to be related back to the primary. */
    others?: string[];
};
export type InputSchema = undefined;
export interface OutputSchema {
    actor?: string;
    relationships: ($Typed<AppBskyGraphDefs.Relationship> | $Typed<AppBskyGraphDefs.NotFoundActor> | {
        $type: string;
    })[];
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
    error?: 'ActorNotFound';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getRelationships.d.ts.map