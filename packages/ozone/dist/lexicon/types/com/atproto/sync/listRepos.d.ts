/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {
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
    $type?: 'com.atproto.sync.listRepos#repo';
    did: string;
    /** Current repo commit CID */
    head: string;
    rev: string;
    active?: boolean;
    /** If active=false, this optional field indicates a possible reason for why the account is not active. If active=false and no status is supplied, then the host makes no claim for why the repository is no longer being hosted. */
    status?: 'takendown' | 'suspended' | 'deleted' | 'deactivated' | 'desynchronized' | 'throttled' | (string & {});
}
export declare function isRepo<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.sync.listRepos", "repo">;
export declare function validateRepo<V>(v: V): ValidationResult<Repo & V>;
//# sourceMappingURL=listRepos.d.ts.map