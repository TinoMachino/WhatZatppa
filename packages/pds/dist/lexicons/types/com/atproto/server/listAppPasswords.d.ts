/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    passwords: AppPassword[];
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
    error?: 'AccountTakedown';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
export interface AppPassword {
    $type?: 'com.atproto.server.listAppPasswords#appPassword';
    name: string;
    createdAt: string;
    privileged?: boolean;
}
export declare function isAppPassword<V>(v: V): v is import("../../../../util").$TypedObject<V, "com.atproto.server.listAppPasswords", "appPassword">;
export declare function validateAppPassword<V>(v: V): ValidationResult<AppPassword & V>;
//# sourceMappingURL=listAppPasswords.d.ts.map