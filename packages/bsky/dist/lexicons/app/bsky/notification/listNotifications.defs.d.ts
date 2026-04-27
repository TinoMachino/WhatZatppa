import { l } from '@atproto/lex';
import * as ActorDefs from '../actor/defs.defs.js';
import * as LabelDefs from '../../../com/atproto/label/defs.defs.js';
declare const $nsid = "app.bsky.notification.listNotifications";
export { $nsid };
/** Enumerate notifications for the requesting account. Requires auth. */
declare const main: l.Query<"app.bsky.notification.listNotifications", l.ParamsSchema<{
    readonly reasons: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly priority: l.OptionalSchema<l.BooleanSchema>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly seenAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>, l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    notifications: l.ArraySchema<l.RefSchema<l.Validator<Notification, Notification>>>;
    priority: l.OptionalSchema<l.BooleanSchema>;
    seenAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.listNotifications", $params: l.ParamsSchema<{
    readonly reasons: l.OptionalSchema<l.ArraySchema<l.StringSchema<{}>>>;
    readonly limit: l.OptionalSchema<l.WithDefaultSchema<l.IntegerSchema>>;
    readonly priority: l.OptionalSchema<l.BooleanSchema>;
    readonly cursor: l.OptionalSchema<l.StringSchema<{}>>;
    readonly seenAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>, $output: l.Payload<"application/json", l.ObjectSchema<{
    cursor: l.OptionalSchema<l.StringSchema<{}>>;
    notifications: l.ArraySchema<l.RefSchema<l.Validator<Notification, Notification>>>;
    priority: l.OptionalSchema<l.BooleanSchema>;
    seenAt: l.OptionalSchema<l.StringSchema<{
        readonly format: "datetime";
    }>>;
}>>;
type Notification = {
    $type?: 'app.bsky.notification.listNotifications#notification';
    uri: l.AtUriString;
    cid: l.CidString;
    author: ActorDefs.ProfileView;
    /**
     * The reason why this notification was delivered - e.g. your post was liked, or you received a new follower.
     */
    reason: 'like' | 'repost' | 'follow' | 'mention' | 'reply' | 'quote' | 'starterpack-joined' | 'verified' | 'unverified' | 'like-via-repost' | 'repost-via-repost' | 'subscribed-post' | 'contact-match' | l.UnknownString;
    reasonSubject?: l.AtUriString;
    record: l.LexMap;
    isRead: boolean;
    indexedAt: l.DatetimeString;
    labels?: LabelDefs.Label[];
};
export type { Notification };
declare const notification: l.TypedObjectSchema<"app.bsky.notification.listNotifications#notification", l.Validator<Notification, Notification>>;
export { notification };
//# sourceMappingURL=listNotifications.defs.d.ts.map