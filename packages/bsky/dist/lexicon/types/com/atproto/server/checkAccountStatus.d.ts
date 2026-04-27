export type QueryParams = {};
export type InputSchema = undefined;
export interface OutputSchema {
    activated: boolean;
    validDid: boolean;
    repoCommit: string;
    repoRev: string;
    repoBlocks: number;
    indexedRecords: number;
    privateStateValues: number;
    expectedBlobs: number;
    importedBlobs: number;
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
//# sourceMappingURL=checkAccountStatus.d.ts.map