import { l } from '@atproto/lex';
declare const $nsid = "chat.bsky.moderation.subscribeModEvents";
export { $nsid };
/** Subscribe to stream of chat events targeted to moderation. Private endpoint. */
declare const main: l.Subscription<"chat.bsky.moderation.subscribeModEvents", l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<EventConvoFirstMessage, EventConvoFirstMessage>>], false>, readonly ["FutureCursor", "ConsumerTooSlow"]>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Message = l.InferSubscriptionMessage<typeof main>;
export declare const $lxm: "chat.bsky.moderation.subscribeModEvents", $params: l.ParamsSchema<{
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
}>, $message: l.TypedUnionSchema<readonly [l.TypedRefSchema<l.TypedObjectValidator<EventConvoFirstMessage, EventConvoFirstMessage>>], false>;
type EventConvoFirstMessage = {
    $type?: 'chat.bsky.moderation.subscribeModEvents#eventConvoFirstMessage';
    convoId: string;
    createdAt: l.DatetimeString;
    messageId?: string;
    /**
     * The list of DIDs message recipients. Does not include the sender, which is in the `user` field
     */
    recipients: l.DidString[];
    rev: string;
    /**
     * The DID of the message author.
     */
    user: l.DidString;
};
export type { EventConvoFirstMessage };
declare const eventConvoFirstMessage: l.TypedObjectSchema<"chat.bsky.moderation.subscribeModEvents#eventConvoFirstMessage", l.Validator<EventConvoFirstMessage, EventConvoFirstMessage>>;
export { eventConvoFirstMessage };
//# sourceMappingURL=subscribeModEvents.defs.d.ts.map