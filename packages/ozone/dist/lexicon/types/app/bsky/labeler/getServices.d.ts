import { type $Typed } from '../../../../util';
import type * as AppBskyLabelerDefs from './defs.js';
export type QueryParams = {
    dids: string[];
    detailed: boolean;
};
export type InputSchema = undefined;
export interface OutputSchema {
    views: ($Typed<AppBskyLabelerDefs.LabelerView> | $Typed<AppBskyLabelerDefs.LabelerViewDetailed> | {
        $type: string;
    })[];
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
//# sourceMappingURL=getServices.d.ts.map