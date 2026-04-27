export type QueryParams = {};
export interface InputSchema {
    actor: string;
    allowAccess: boolean;
    ref?: string;
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
//# sourceMappingURL=updateActorAccess.d.ts.map