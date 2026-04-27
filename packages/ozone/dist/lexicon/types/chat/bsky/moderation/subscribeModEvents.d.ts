/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { type ValidationResult } from '@atproto/lexicon';
import { type $Typed } from '../../../../util';
import { ErrorFrame } from '@atproto/xrpc-server';
export type QueryParams = {
    /** The last known event seq number to backfill from. Use '2222222222222' to backfill from the beginning. Don't specify a cursor to listen only for new events. */
    cursor?: string;
};
export type OutputSchema = $Typed<EventConvoFirstMessage> | {
    $type: string;
};
export type HandlerError = ErrorFrame<'FutureCursor' | 'ConsumerTooSlow'>;
export type HandlerOutput = HandlerError | OutputSchema;
export interface EventConvoFirstMessage {
    $type?: 'chat.bsky.moderation.subscribeModEvents#eventConvoFirstMessage';
    convoId: string;
    createdAt: string;
    messageId?: string;
    /** The list of DIDs message recipients. Does not include the sender, which is in the `user` field */
    recipients: string[];
    rev: string;
    /** The DID of the message author. */
    user: string;
}
export declare function isEventConvoFirstMessage<V>(v: V): v is import("../../../../util").$TypedObject<V, "chat.bsky.moderation.subscribeModEvents", "eventConvoFirstMessage">;
export declare function validateEventConvoFirstMessage<V>(v: V): ValidationResult<EventConvoFirstMessage & V>;
//# sourceMappingURL=subscribeModEvents.d.ts.map