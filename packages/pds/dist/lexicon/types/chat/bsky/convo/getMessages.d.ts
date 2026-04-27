import { type $Typed } from '../../../../util';
import type * as ChatBskyConvoDefs from './defs.js';
export type QueryParams = {
    convoId: string;
    limit: number;
    cursor?: string;
};
export type InputSchema = undefined;
export interface OutputSchema {
    cursor?: string;
    messages: ($Typed<ChatBskyConvoDefs.MessageView> | $Typed<ChatBskyConvoDefs.DeletedMessageView> | $Typed<ChatBskyConvoDefs.SystemMessageView> | {
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
    error?: 'InvalidConvo';
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getMessages.d.ts.map