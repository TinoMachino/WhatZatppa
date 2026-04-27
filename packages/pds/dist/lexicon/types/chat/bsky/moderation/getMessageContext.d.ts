import { type $Typed } from '../../../../util';
import type * as ChatBskyConvoDefs from '../convo/defs.js';
export type QueryParams = {
    /** Conversation that the message is from. NOTE: this field will eventually be required. */
    convoId?: string;
    messageId: string;
    before: number;
    after: number;
};
export type InputSchema = undefined;
export interface OutputSchema {
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
}
export type HandlerOutput = HandlerError | HandlerSuccess;
//# sourceMappingURL=getMessageContext.d.ts.map