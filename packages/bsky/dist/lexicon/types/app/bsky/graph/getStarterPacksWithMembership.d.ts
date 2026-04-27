/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import type * as AppBskyGraphDefs from './defs.js';
export type QueryParams = {
    /** The account (actor) to check for membership. */
    actor: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    starterPacksWithMembership: StarterPackWithMembership[];
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
/** A starter pack and an optional list item indicating membership of a target user to that starter pack. */
export interface StarterPackWithMembership {
    $type?: 'app.bsky.graph.getStarterPacksWithMembership#starterPackWithMembership';
    starterPack: AppBskyGraphDefs.StarterPackView;
    listItem?: AppBskyGraphDefs.ListItemView;
}
export declare function isStarterPackWithMembership<V>(v: V): v is import("../../../../util").$TypedObject<V, "app.bsky.graph.getStarterPacksWithMembership", "starterPackWithMembership">;
export declare function validateStarterPackWithMembership<V>(v: V): ValidationResult<StarterPackWithMembership & V>;
//# sourceMappingURL=getStarterPacksWithMembership.d.ts.map