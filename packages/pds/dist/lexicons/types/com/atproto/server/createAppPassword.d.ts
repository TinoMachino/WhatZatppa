/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {};
export interface InputSchema {
    /** A short name for the App Password, to help distinguish them. */
    name: string;
    /** If an app password has 'privileged' access to possibly sensitive account state. Meant for use with trusted clients. */
    privileged?: boolean;
}
export type OutputSchema = AppPassword;
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
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
    error?: 'AccountTakedown';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
export interface AppPassword {
    $type?: 'com.atproto.server.createAppPassword#appPassword';
    name: string;
    password: string;
    createdAt: string;
    privileged?: boolean;
}
export declare function isAppPassword<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.createAppPassword", "appPassword">;
export declare function validateAppPassword<V>(v: V): ValidationResult<AppPassword & V>;
//# sourceMappingURL=createAppPassword.d.ts.map