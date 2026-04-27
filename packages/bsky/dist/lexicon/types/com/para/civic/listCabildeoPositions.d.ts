import type * as ComParaCivicDefs from './defs.js';
export type QueryParams = {
    cabildeo: string;
    stance?: 'for' | 'against' | 'amendment' | (string & {});
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    positions: ComParaCivicDefs.PositionView[];
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
//# sourceMappingURL=listCabildeoPositions.d.ts.map