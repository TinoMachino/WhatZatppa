export type QueryParams = {};
export interface InputSchema {
    name: string;
    quadrant: string;
    description?: string;
    /** User-provided name for the internal starter pack tracking founding members. If absent, a default name will be generated. */
    founderStarterPackName?: string;
}
export interface OutputSchema {
    uri: string;
    cid: string;
    delegatesChatId: string;
    subdelegatesChatId: string;
    /** Reference to the newly created founder starter pack. Present if status is draft. */
    founderStarterPackUri?: string;
}
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=createBoard.d.ts.map