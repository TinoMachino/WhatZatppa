/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
    collection: string;
    /** Maximum size of response set. Recommend setting a large maximum (1000+) when enumerating large DID lists. */
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    repos: Repo[];
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
export interface Repo {
    $type?: 'com.atproto.sync.listReposByCollection#repo';
    did: string;
}
export declare function isRepo<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.listReposByCollection", "repo">;
export declare function validateRepo<V>(v: V): ValidationResult<Repo & V>;
//# sourceMappingURL=listReposByCollection.d.ts.map