export type QueryParams = {};
export interface InputSchema {
    /** Name of the set to add values to */
    name: string;
    /** Array of string values to add to the set */
    values: string[];
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
//# sourceMappingURL=addValues.d.ts.map