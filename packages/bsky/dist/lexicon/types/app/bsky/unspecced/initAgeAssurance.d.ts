import type * as AppBskyUnspeccedDefs from './defs.js';
export type QueryParams = {};
export interface InputSchema {
    /** The user's email address to receive assurance instructions. */
    email: string;
    /** The user's preferred language for communication during the assurance process. */
    language: string;
    /** An ISO 3166-1 alpha-2 code of the user's location. */
    countryCode: string;
}
export type OutputSchema = AppBskyUnspeccedDefs.AgeAssuranceState;
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
    error?: 'InvalidEmail' | 'DidTooLong' | 'InvalidInitiation';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=initAgeAssurance.d.ts.map