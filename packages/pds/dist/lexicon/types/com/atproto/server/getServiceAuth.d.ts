export type QueryParams = {
    /** The "audience" DID service reference for the intended recipient of the request. Syntax is a DID with a service endpoint id, separated by a hash (eg 'did:web:example.com#app_svc'). For OAuth clients, this field must exactly match the 'aud' granted via permission. Use of a bare DID (with no hash or service id) is deprecated, and does not work with OAuth clients. */
    aud: string;
    /** The time in Unix Epoch seconds that the JWT expires. Defaults to 60 seconds in the future. The service may enforce certain time bounds on tokens depending on the requested scope. */
    exp?: number;
    /** Lexicon (XRPC) method to bind the requested token to. This field is effectively required. */
    lxm?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    token: string;
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
    error?: 'BadExpiration';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getServiceAuth.d.ts.map