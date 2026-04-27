import { type $Typed } from '../../../../util';
import type * as ChatBskyConvoDefs from './defs.js';
import type * as ChatBskyGroupDefs from '../group/defs.js';
export type QueryParams = {
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    requests: ($Typed<ChatBskyConvoDefs.ConvoView> | $Typed<ChatBskyGroupDefs.JoinRequestView> | {
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
//# sourceMappingURL=listConvoRequests.d.ts.map