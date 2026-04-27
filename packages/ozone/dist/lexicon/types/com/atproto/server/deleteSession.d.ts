export type QueryParams = {};
export type InputSchema = undefined;
export type HandlerInput = void;
export interface HandlerError {
    status: number;
    message?: string;
    error?: 'InvalidToken' | 'ExpiredToken';
}
export type HandlerOutput = HandlerError | void;
//# sourceMappingURL=deleteSession.d.ts.map