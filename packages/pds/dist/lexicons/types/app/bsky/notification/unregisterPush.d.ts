export type QueryParams = {};
export interface InputSchema {
    serviceDid: string;
    token: string;
    platform: 'ios' | 'android' | 'web' | (string & {});
    appId: string;
}
export interface HandlerInput {
    encoding: 'application/json';
    body: InputSchema;
}
export interface HandlerError {
    status: number;
    message?: string;
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=unregisterPush.d.ts.map