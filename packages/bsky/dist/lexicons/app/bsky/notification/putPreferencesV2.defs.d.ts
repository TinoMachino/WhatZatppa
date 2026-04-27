import { l } from '@atproto/lex';
import * as NotificationDefs from './defs.defs.js';
declare const $nsid = "app.bsky.notification.putPreferencesV2";
export { $nsid };
/** Set notification-related preferences for an account. Requires auth. */
declare const main: l.Procedure<"app.bsky.notification.putPreferencesV2", l.ParamsSchema<{}>, l.Payload<"application/json", l.ObjectSchema<{
    chat: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.ChatPreference, NotificationDefs.ChatPreference>>>;
    follow: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    like: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    likeViaRepost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    mention: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    quote: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    reply: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    repost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    repostViaRepost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    starterpackJoined: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
    subscribedPost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
    unverified: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
    verified: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
}>>, l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<NotificationDefs.Preferences, NotificationDefs.Preferences>>;
}>>, undefined>;
export { main };
export type $Params = l.InferMethodParams<typeof main>;
export type $Input<B = l.BinaryData> = l.InferMethodInput<typeof main, B>;
export type $InputBody<B = l.BinaryData> = l.InferMethodInputBody<typeof main, B>;
export type $Output<B = l.BinaryData> = l.InferMethodOutput<typeof main, B>;
export type $OutputBody<B = l.BinaryData> = l.InferMethodOutputBody<typeof main, B>;
export declare const $lxm: "app.bsky.notification.putPreferencesV2", $params: l.ParamsSchema<{}>, $input: l.Payload<"application/json", l.ObjectSchema<{
    chat: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.ChatPreference, NotificationDefs.ChatPreference>>>;
    follow: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    like: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    likeViaRepost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    mention: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    quote: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    reply: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    repost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    repostViaRepost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.FilterablePreference, NotificationDefs.FilterablePreference>>>;
    starterpackJoined: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
    subscribedPost: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
    unverified: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
    verified: l.OptionalSchema<l.RefSchema<l.Validator<NotificationDefs.Preference, NotificationDefs.Preference>>>;
}>>, $output: l.Payload<"application/json", l.ObjectSchema<{
    preferences: l.RefSchema<l.Validator<NotificationDefs.Preferences, NotificationDefs.Preferences>>;
}>>;
//# sourceMappingURL=putPreferencesV2.defs.d.ts.map